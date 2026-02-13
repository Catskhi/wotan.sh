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
  bright: boolean
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
let accentColor = '#cdd6f4'

const SKULL_OPACITY = 0.5
const BRIGHT_TINT = '#c0c0c0'  // lighter grey for "bright" state
const DIM_TINT = '#3a3a3a'     // dark grey for "dim" state
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

// ASCII connection lines
const CONNECTION_DISTANCE = 200
const CONNECTION_MAX_OPACITY = 0.35
const CONNECTION_MIN_OPACITY = 0.5

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
  const bright = polarity === 1 ? mouthOpen : !mouthOpen

  return {
    x,
    y,
    size: rand(MIN_SIZE, MAX_SIZE),
    speed: rand(MIN_SPEED, MAX_SPEED),
    bright,
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

// Offscreen canvas for tinting skulls
let tintCanvas: HTMLCanvasElement | null = null
let tintCtx: CanvasRenderingContext2D | null = null

function getTintCanvas(size: number): CanvasRenderingContext2D | null {
  if (!tintCanvas) {
    tintCanvas = document.createElement('canvas')
    tintCtx = tintCanvas.getContext('2d')
  }
  if (!tintCtx) return null
  tintCanvas.width = size
  tintCanvas.height = size
  return tintCtx
}

function drawTintedSkull(
  c: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number, y: number, size: number,
  tint: string, alpha: number,
) {
  const tc = getTintCanvas(size)
  if (!tc) return
  // Draw original skull
  tc.clearRect(0, 0, size, size)
  tc.drawImage(img, 0, 0, size, size)
  // Tint: fill with color, using source-atop to only color opaque pixels
  tc.globalCompositeOperation = 'source-atop'
  tc.fillStyle = tint
  tc.fillRect(0, 0, size, size)
  tc.globalCompositeOperation = 'source-over'
  // Draw to main canvas
  c.globalAlpha = alpha
  c.drawImage(tintCanvas!, x, y, size, size)
}

function updateAccentColor() {
  const style = getComputedStyle(document.documentElement)
  accentColor = style.getPropertyValue('--color-accent').trim() || '#cdd6f4'
}

function drawConnections(c: CanvasRenderingContext2D) {
  c.strokeStyle = accentColor
  c.lineWidth = 1
  c.setLineDash([6, 5])

  for (let i = 0; i < particles.length; i++) {
    const a = particles[i]!
    const ax = a.x + a.size / 2
    const ay = a.y + a.size / 2

    for (let j = i + 1; j < particles.length; j++) {
      const b = particles[j]!
      const bx = b.x + b.size / 2
      const by = b.y + b.size / 2

      const dx = bx - ax
      const dy = by - ay
      const distSq = dx * dx + dy * dy

      if (distSq > CONNECTION_DISTANCE * CONNECTION_DISTANCE) continue

      const dist = Math.sqrt(distSq)
      if (dist < 10) continue

      const alpha = CONNECTION_MIN_OPACITY + (CONNECTION_MAX_OPACITY - CONNECTION_MIN_OPACITY) * (1 - dist / CONNECTION_DISTANCE)
      c.globalAlpha = alpha

      c.beginPath()
      c.moveTo(ax, ay)
      c.lineTo(bx, by)
      c.stroke()
    }
  }

  c.setLineDash([])
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

  // Draw connections first so skulls render on top
  drawConnections(ctx)

  for (const p of particles) {
    // Update position — diagonal drift
    p.x += p.speed
    p.y += p.speed * 0.7

    // Mouth toggle timer
    p.mouthTimer -= dt
    if (p.mouthTimer <= 0) {
      p.mouthOpen = !p.mouthOpen
      p.mouthTimer = rand(MIN_MOUTH_INTERVAL, MAX_MOUTH_INTERVAL)

      // Snap tint based on mouth state and polarity
      p.bright = p.polarity === 1 ? p.mouthOpen : !p.mouthOpen
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
    const tint = p.bright ? BRIGHT_TINT : DIM_TINT

    if (p.isGlitching) {
      // Glitch draw — horizontal slices with random offsets + opacity flicker
      const flickerAlpha = Math.random() > 0.3 ? SKULL_OPACITY : SKULL_OPACITY * (0.3 + Math.random() * 0.7)

      const sliceH = p.size / GLITCH_SLICE_COUNT
      for (let i = 0; i < GLITCH_SLICE_COUNT; i++) {
        const srcY = (i / GLITCH_SLICE_COUNT) * img.naturalHeight
        const srcH = img.naturalHeight / GLITCH_SLICE_COUNT
        const offsetX = (Math.random() - 0.5) * GLITCH_MAX_OFFSET * 2

        // Tint each glitch slice via offscreen canvas
        const tc = getTintCanvas(Math.ceil(p.size))
        if (tc) {
          const sz = Math.ceil(p.size)
          tc.clearRect(0, 0, sz, sz)
          tc.drawImage(img, 0, srcY, img.naturalWidth, srcH, 0, 0, sz, sliceH)
          tc.globalCompositeOperation = 'source-atop'
          tc.fillStyle = tint
          tc.fillRect(0, 0, sz, sliceH)
          tc.globalCompositeOperation = 'source-over'
          ctx.globalAlpha = Math.max(0.03, flickerAlpha)
          ctx.drawImage(tintCanvas!, p.x + offsetX, p.y + sliceH * i, sz, sliceH)
        }
      }
    } else {
      drawTintedSkull(ctx, img, p.x, p.y, p.size, tint, SKULL_OPACITY)
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
      p.bright = fresh.bright
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

  updateAccentColor()
  resizeCanvas()
  lastTime = 0
  animationId = requestAnimationFrame(animate)

  const ro = new ResizeObserver(() => {
    updateAccentColor()
    resizeCanvas()
  })
  if (canvas.value.parentElement) {
    ro.observe(canvas.value.parentElement)
  }

  // Re-read accent color when theme changes
  const mo = new MutationObserver(() => {
    updateAccentColor()
  })
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId)
    ro.disconnect()
    mo.disconnect()
  })
})
</script>
