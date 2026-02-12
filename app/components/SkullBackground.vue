<template>
  <canvas
    ref="canvas"
    class="absolute inset-0 w-full h-full pointer-events-none"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
interface SkullParticle {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  blinkPhase: number
  blinkSpeed: number
  mouthOpen: boolean
  mouthTimer: number
  polarity: number // 1 = open is bright, -1 = closed is bright
  // Glitch state
  isGlitching: boolean
  glitchTimeLeft: number
  nextGlitchIn: number
}

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationId: number | null = null
let particles: SkullParticle[] = []
let skullOpenImg: HTMLImageElement | null = null
let skullClosedImg: HTMLImageElement | null = null

const BRIGHT_OPACITY = 0.4
const DIM_OPACITY = 0.2
const MIN_SIZE = 40
const MAX_SIZE = 60
const MIN_SPEED = 1
const MAX_SPEED = 2
const DENSITY_REF = 1920 * 1080
const MIN_MOUTH_INTERVAL = 0.5
const MAX_MOUTH_INTERVAL = 2.5
const MIN_GLITCH_DURATION = 0.08
const MAX_GLITCH_DURATION = 0.35
const MIN_GLITCH_INTERVAL = 3
const MAX_GLITCH_INTERVAL = 12
const GLITCH_SLICE_COUNT = 4
const GLITCH_MAX_OFFSET = 8

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function getParticleCount(w: number, h: number): number {
  const area = w * h
  return Math.max(12, Math.round(35 * (area / DENSITY_REF)))
}

function createParticle(w: number, h: number, offscreen = false): SkullParticle {
  let x: number, y: number

  if (offscreen) {
    if (Math.random() > 0.5) {
      x = rand(-MAX_SIZE, w)
      y = -rand(0, MAX_SIZE * 2)
    } else {
      x = -rand(0, MAX_SIZE * 2)
      y = rand(-MAX_SIZE, h)
    }
  } else {
    x = rand(-MAX_SIZE, w)
    y = rand(-MAX_SIZE, h)
  }

  const mouthOpen = Math.random() > 0.5
  const polarity = Math.random() > 0.5 ? 1 : -1
  const isBright = polarity === 1 ? mouthOpen : !mouthOpen
  const opacity = isBright ? BRIGHT_OPACITY : DIM_OPACITY

  return {
    x,
    y,
    size: rand(MIN_SIZE, MAX_SIZE),
    speed: rand(MIN_SPEED, MAX_SPEED),
    opacity,
    blinkPhase: rand(0, Math.PI * 2),
    blinkSpeed: rand(0.3, 1.2),
    mouthOpen,
    mouthTimer: rand(MIN_MOUTH_INTERVAL, MAX_MOUTH_INTERVAL),
    polarity,
    isGlitching: false,
    glitchTimeLeft: 0,
    nextGlitchIn: rand(MIN_GLITCH_INTERVAL, MAX_GLITCH_INTERVAL),
  }
}

function initParticles(w: number, h: number) {
  const count = getParticleCount(w, h)
  particles = Array.from({ length: count }, () => createParticle(w, h, false))
}

function resizeCanvas() {
  if (!canvas.value) return
  const parent = canvas.value.parentElement
  if (!parent) return

  const dpr = window.devicePixelRatio || 1
  const rect = parent.getBoundingClientRect()
  canvas.value.width = rect.width * dpr
  canvas.value.height = rect.height * dpr
  canvas.value.style.width = `${rect.width}px`
  canvas.value.style.height = `${rect.height}px`

  if (ctx) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  initParticles(rect.width, rect.height)
}

let lastTime = 0

function animate(time: number) {
  if (!ctx || !canvas.value || !skullOpenImg || !skullClosedImg) return

  const parent = canvas.value.parentElement
  if (!parent) return
  const rect = parent.getBoundingClientRect()
  const w = rect.width
  const h = rect.height

  const dt = lastTime ? (time - lastTime) / 1000 : 0.016
  lastTime = time

  ctx.clearRect(0, 0, w, h)

  for (const p of particles) {
    // Update position — diagonal drift
    p.x += p.speed
    p.y += p.speed * 0.7

    // Mouth toggle timer
    p.mouthTimer -= dt
    if (p.mouthTimer <= 0) {
      p.mouthOpen = !p.mouthOpen
      p.mouthTimer = rand(MIN_MOUTH_INTERVAL, MAX_MOUTH_INTERVAL)

      // Snap opacity based on mouth state and polarity
      const isBright = p.polarity === 1 ? p.mouthOpen : !p.mouthOpen
      p.opacity = isBright ? BRIGHT_OPACITY : DIM_OPACITY
    }

    // Glitch timer
    if (p.isGlitching) {
      p.glitchTimeLeft -= dt
      if (p.glitchTimeLeft <= 0) {
        p.isGlitching = false
        p.nextGlitchIn = rand(MIN_GLITCH_INTERVAL, MAX_GLITCH_INTERVAL)
      }
    } else {
      p.nextGlitchIn -= dt
      if (p.nextGlitchIn <= 0) {
        p.isGlitching = true
        p.glitchTimeLeft = rand(MIN_GLITCH_DURATION, MAX_GLITCH_DURATION)
      }
    }

    // Draw
    const img = p.mouthOpen ? skullOpenImg : skullClosedImg

    if (p.isGlitching) {
      // Glitch draw — horizontal slices with random offsets + opacity flicker
      const flickerAlpha = Math.random() > 0.3 ? p.opacity : p.opacity * (0.3 + Math.random() * 0.7)
      ctx.globalAlpha = Math.max(0.03, flickerAlpha)

      const sliceH = p.size / GLITCH_SLICE_COUNT
      for (let i = 0; i < GLITCH_SLICE_COUNT; i++) {
        const srcY = (i / GLITCH_SLICE_COUNT) * img.naturalHeight
        const srcH = img.naturalHeight / GLITCH_SLICE_COUNT
        const offsetX = (Math.random() - 0.5) * GLITCH_MAX_OFFSET * 2
        ctx.drawImage(
          img,
          0, srcY, img.naturalWidth, srcH,
          p.x + offsetX, p.y + sliceH * i, p.size, sliceH,
        )
      }
    } else {
      ctx.globalAlpha = Math.max(0.03, p.opacity)
      ctx.drawImage(img, p.x, p.y, p.size, p.size)
    }

    // Respawn if off-screen
    if (p.x > w + p.size || p.y > h + p.size) {
      const fresh = createParticle(w, h, true)
      p.x = fresh.x
      p.y = fresh.y
      p.size = fresh.size
      p.speed = fresh.speed
      p.blinkPhase = fresh.blinkPhase
      p.blinkSpeed = fresh.blinkSpeed
      p.mouthOpen = fresh.mouthOpen
      p.mouthTimer = fresh.mouthTimer
      p.polarity = fresh.polarity
      p.opacity = fresh.opacity
      p.isGlitching = fresh.isGlitching
      p.glitchTimeLeft = fresh.glitchTimeLeft
      p.nextGlitchIn = fresh.nextGlitchIn
    }
  }

  ctx.globalAlpha = 1
  animationId = requestAnimationFrame(animate)
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onload = () => resolve(img)
    img.onerror = reject
  })
}

onMounted(async () => {
  if (!canvas.value) return

  ctx = canvas.value.getContext('2d')
  if (!ctx) return

  // Load both skull images
  const [openImg, closedImg] = await Promise.all([
    loadImage('/wotan/skull_transparent.png'),
    loadImage('/wotan/skull_closed_mouth_transparent.png'),
  ])
  skullOpenImg = openImg
  skullClosedImg = closedImg

  resizeCanvas()
  lastTime = 0
  animationId = requestAnimationFrame(animate)

  const ro = new ResizeObserver(() => {
    resizeCanvas()
  })
  if (canvas.value.parentElement) {
    ro.observe(canvas.value.parentElement)
  }

  onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId)
    ro.disconnect()
  })
})
</script>
