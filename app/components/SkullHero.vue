<template>
  <section class="relative min-h-[100dvh] flex flex-col items-center justify-center text-center overflow-hidden">
    <!-- Floating skulls background -->
    <SkullBackground />

    <!-- Subtle radial gradient overlay for depth -->
    <div
      class="absolute inset-0 pointer-events-none z-[1]"
      style="background: radial-gradient(ellipse at center, transparent 40%, #050505 100%)"
    />

    <!-- Content -->
    <div class="relative z-10 flex flex-col items-center px-4">
      <!-- Skull with chromatic aberration + CSS mask-image -->
      <div
        class="skull-container mb-6"
        :class="[
          glitching ? 'skull-glitch' : '',
          showSkull ? 'opacity-100' : 'opacity-0',
        ]"
        aria-hidden="true"
      >
        <!-- Chromatic aberration layers -->
        <div class="skull-aberration skull-aberration--red" :class="mouthOpen ? 'mouth-open' : 'mouth-closed'" />
        <div class="skull-aberration skull-aberration--blue" :class="mouthOpen ? 'mouth-open' : 'mouth-closed'" />
        <!-- Main skull mask -->
        <div class="skull-mask" :class="mouthOpen ? 'mouth-open' : 'mouth-closed'" />
      </div>

      <!-- ASCII art name -->
      <div
        class="ascii-name mb-4 transition-all duration-500"
        :class="showName ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'"
        aria-hidden="true"
      >
        <pre class="text-accent text-[0.35rem] sm:text-[0.5rem] md:text-[0.6rem] leading-none font-mono select-none"><template v-for="(line, i) in asciiName" :key="i">{{ line }}
</template></pre>
      </div>

      <!-- Screen-reader accessible name -->
      <h1 class="sr-only">0xw0tan</h1>

      <!-- Typing tagline with blinking cursor -->
      <p
        class="text-sm sm:text-base text-accent mb-4 flex items-center justify-center gap-0.5 h-6 transition-opacity duration-300"
        :class="showTagline ? 'opacity-100' : 'opacity-0'"
      >
        <span>{{ displayedTagline }}</span>
        <span class="animate-blink text-accent">_</span>
      </p>

      <!-- Neofetch info block -->
      <div
        class="neofetch mb-8 text-left inline-block transition-all duration-500"
        :class="showNeofetch ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'"
      >
        <div class="text-xs font-mono">
          <span class="text-accent">0xw0tan</span><span class="text-muted">@</span><span class="text-secondary">web</span>
        </div>
        <div class="text-border-bright text-xs select-none my-1" aria-hidden="true">──────────</div>
        <div class="neofetch-grid text-xs font-mono">
          <span class="text-muted">stack</span><span class="text-border-bright mx-2">᛬</span><span class="text-gray-300">{{ neofetch.stack }}</span>
        </div>
        <div class="neofetch-grid text-xs font-mono">
          <span class="text-muted">focus</span><span class="text-border-bright mx-2">᛬</span><span class="text-gray-300">{{ neofetch.focus }}</span>
        </div>
        <div class="neofetch-grid text-xs font-mono">
          <span class="text-muted">shell</span><span class="text-border-bright mx-2">᛬</span><span class="text-gray-300">{{ neofetch.shell }}</span>
        </div>
        <div class="neofetch-grid text-xs font-mono">
          <span class="text-muted">theme</span><span class="text-border-bright mx-2">᛬</span><span class="text-accent">{{ currentThemeName }}</span>
        </div>
      </div>

      <!-- CTA buttons -->
      <div
        class="flex items-center gap-4 transition-all duration-500"
        :class="showCta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'"
      >
        <NuxtLink
          :to="localePath('/blog')"
          class="group px-5 py-2.5 text-xs sm:text-sm border border-accent text-accent hover:bg-accent hover:text-bg transition-all duration-200"
        >
          {{ t('hero.cta_blog') }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/projects')"
          class="px-5 py-2.5 text-xs sm:text-sm border border-border text-muted hover:border-accent hover:text-accent transition-all duration-200"
        >
          {{ t('hero.cta_projects') }}
        </NuxtLink>
      </div>

      <!-- Social links -->
      <div
        class="mt-5 transition-all duration-500"
        :class="showCta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'"
      >
        <SocialLinks />
      </div>

      <!-- Latest post teaser -->
      <div
        v-if="latestPost"
        class="mt-5 transition-all duration-500"
        :class="showCta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'"
      >
        <NuxtLink
          :to="localePath(`/blog/${latestPost.stem?.split('/').pop() ?? ''}`)"
          class="text-2xs text-muted hover:text-accent transition-colors"
        >
          {{ t('hero.latest') }}: "{{ latestPost.title }}"
        </NuxtLink>
      </div>

      <!-- Keyboard shortcut hint -->
      <div
        class="mt-3 transition-all duration-700"
        :class="showCta ? 'opacity-100' : 'opacity-0'"
      >
        <span class="text-2xs text-muted/40">{{ t('hero.search_hint') }}</span>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 transition-all duration-700"
      :class="showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'"
    >
      <span class="text-2xs text-muted/50 font-mono">scroll</span>
      <span class="text-muted/40 text-xs font-mono">╰─▸</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ASCII_NAME } from '~/utils/ascii'

const { t, tm, rt, locale } = useI18n()
const localePath = useLocalePath()
const { current: currentTheme, themes } = useTheme()

const asciiName = ASCII_NAME

// Theme name for neofetch
const currentThemeName = computed(() => {
  const theme = themes.find(th => th.id === currentTheme.value)
  return theme ? theme.name.toLowerCase() : 'catppuccin'
})

// Neofetch data
const neofetch = computed(() => ({
  stack: t('hero.neofetch.stack'),
  focus: t('hero.neofetch.focus'),
  shell: t('hero.neofetch.shell'),
}))

// Random tagline — tm() returns raw message nodes, rt() resolves each to string
const taglines = computed(() => {
  const raw = tm('hero.taglines') as unknown
  if (Array.isArray(raw)) return (raw as string[]).map((v: string) => rt(v))
  return [t('hero.tagline')]
})

const chosenTagline = ref('')
const displayedTagline = ref('')

// Skull animation state
const mouthOpen = ref(false)
const glitching = ref(true)

// Staggered visibility
const showSkull = ref(true)
const showName = ref(false)
const showTagline = ref(false)
const showNeofetch = ref(false)
const showCta = ref(false)
const showScroll = ref(false)

// Latest post
const { data: latestPost } = await useAsyncData(
  `hero-latest-${locale.value}`,
  () => queryCollection('blog')
    .where('lang', '=', locale.value)
    .where('draft', '=', false)
    .order('date', 'DESC')
    .limit(1)
    .first()
)

// Typing animation
function typeText(text: string, onChar: (partial: string) => void, speed = 30): Promise<void> {
  return new Promise((resolve) => {
    let i = 0
    const interval = setInterval(() => {
      i++
      onChar(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        resolve()
      }
    }, speed)
  })
}

onMounted(async () => {
  // Pick random tagline
  const idx = Math.floor(Math.random() * taglines.value.length)
  chosenTagline.value = taglines.value[idx] || taglines.value[0]

  // --- Staggered entrance sequence ---

  // 0ms: Skull is visible + glitching (already true)
  // Skull mouth sequence: closed → open → closed → open
  setTimeout(() => { mouthOpen.value = true }, 400)
  setTimeout(() => { mouthOpen.value = false }, 900)
  setTimeout(() => {
    mouthOpen.value = true
    glitching.value = false
  }, 1400)

  // 800ms: ASCII name fades in
  setTimeout(() => { showName.value = true }, 800)

  // 1200ms: Tagline starts typing
  setTimeout(() => {
    showTagline.value = true
    typeText(chosenTagline.value, (partial) => {
      displayedTagline.value = partial
    }, 35)
  }, 1200)

  // 1600ms: Neofetch block appears
  setTimeout(() => { showNeofetch.value = true }, 1600)

  // 2000ms: CTAs + social + latest post fade in
  setTimeout(() => { showCta.value = true }, 2000)

  // 2500ms: Scroll indicator
  setTimeout(() => { showScroll.value = true }, 2500)

  // --- Periodic random glitch bursts ---
  function scheduleGlitch() {
    const delay = 8000 + Math.random() * 7000 // 8-15s
    glitchTimer = window.setTimeout(() => {
      glitching.value = true
      // Random mouth flicker during burst
      const flickerCount = 1 + Math.floor(Math.random() * 2)
      for (let i = 0; i < flickerCount; i++) {
        setTimeout(() => { mouthOpen.value = !mouthOpen.value }, i * 80)
      }
      // End glitch after 200-400ms
      const duration = 200 + Math.random() * 200
      setTimeout(() => {
        glitching.value = false
        mouthOpen.value = true
        scheduleGlitch()
      }, duration)
    }, delay)
  }

  // Start periodic glitches after entrance completes
  setTimeout(() => scheduleGlitch(), 3000)
})

let glitchTimer: number | undefined

onUnmounted(() => {
  if (glitchTimer) window.clearTimeout(glitchTimer)
})
</script>

<style scoped>
.skull-container {
  width: 140px;
  height: 140px;
  position: relative;
  transition: opacity 0.3s;
}

@media (min-width: 640px) {
  .skull-container {
    width: 180px;
    height: 180px;
  }
}

@media (min-width: 768px) {
  .skull-container {
    width: 200px;
    height: 200px;
  }
}

/* Main skull mask */
.skull-mask {
  position: absolute;
  inset: 0;
  background-color: var(--color-accent);
  mask-size: contain;
  -webkit-mask-size: contain;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-position: center;
  transition: mask-image 0.05s, -webkit-mask-image 0.05s;
  z-index: 2;
}

/* Chromatic aberration layers */
.skull-aberration {
  position: absolute;
  inset: 0;
  mask-size: contain;
  -webkit-mask-size: contain;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-position: center;
  transition: mask-image 0.05s, -webkit-mask-image 0.05s;
  opacity: 0.3;
  z-index: 1;
}

.skull-aberration--red {
  background-color: var(--color-aberration-a);
  transform: translate(-3px, 1px);
}

.skull-aberration--blue {
  background-color: var(--color-aberration-b);
  transform: translate(3px, -1px);
}

/* When not glitching, hide aberration */
.skull-container:not(.skull-glitch) .skull-aberration {
  opacity: 0;
  transition: opacity 0.3s;
}

.skull-container.skull-glitch .skull-aberration--red {
  opacity: 0.3;
  animation: aberration-jitter-red 100ms steps(1) infinite;
}

.skull-container.skull-glitch .skull-aberration--blue {
  opacity: 0.3;
  animation: aberration-jitter-blue 100ms steps(1) infinite;
}

.mouth-closed {
  mask-image: url('/wotan/skull_closed_mouth_transparent.png');
  -webkit-mask-image: url('/wotan/skull_closed_mouth_transparent.png');
}

.mouth-open {
  mask-image: url('/wotan/skull_transparent.png');
  -webkit-mask-image: url('/wotan/skull_transparent.png');
}

/* Glitch effect — horizontal slice displacement + jitter + flicker */
.skull-glitch {
  animation: skull-glitch-shift 120ms steps(1) infinite;
}

.skull-glitch .skull-mask {
  animation: skull-glitch-slice 80ms steps(1) infinite;
}

@keyframes skull-glitch-shift {
  0% { transform: translate(0, 0); }
  10% { transform: translate(-3px, 1px); }
  20% { transform: translate(4px, -1px); opacity: 0.7; }
  30% { transform: translate(-2px, 2px); }
  40% { transform: translate(1px, -3px); opacity: 1; }
  50% { transform: translate(3px, 0); }
  60% { transform: translate(-4px, 1px); opacity: 0.5; }
  70% { transform: translate(2px, -2px); }
  80% { transform: translate(0, 3px); opacity: 1; }
  90% { transform: translate(-1px, -1px); opacity: 0.8; }
  100% { transform: translate(0, 0); }
}

@keyframes skull-glitch-slice {
  0% { clip-path: inset(0 0 0 0); }
  10% { clip-path: inset(20% 0 60% 0); transform: translateX(6px); }
  20% { clip-path: inset(0 0 0 0); transform: translateX(0); }
  30% { clip-path: inset(50% 0 20% 0); transform: translateX(-8px); }
  40% { clip-path: inset(0 0 0 0); transform: translateX(0); }
  50% { clip-path: inset(10% 0 70% 0); transform: translateX(4px); }
  60% { clip-path: inset(0 0 0 0); transform: translateX(0); }
  70% { clip-path: inset(65% 0 10% 0); transform: translateX(-5px); }
  80% { clip-path: inset(0 0 0 0); transform: translateX(0); }
  90% { clip-path: inset(30% 0 40% 0); transform: translateX(7px); }
  100% { clip-path: inset(0 0 0 0); transform: translateX(0); }
}

@keyframes aberration-jitter-red {
  0% { transform: translate(-3px, 1px); }
  25% { transform: translate(-5px, 2px); }
  50% { transform: translate(-2px, 0px); }
  75% { transform: translate(-4px, 1px); }
  100% { transform: translate(-3px, 1px); }
}

@keyframes aberration-jitter-blue {
  0% { transform: translate(3px, -1px); }
  25% { transform: translate(5px, -2px); }
  50% { transform: translate(2px, 0px); }
  75% { transform: translate(4px, -1px); }
  100% { transform: translate(3px, -1px); }
}

/* ASCII name responsive */
.ascii-name pre {
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* Neofetch grid alignment */
.neofetch-grid {
  display: flex;
  align-items: center;
  line-height: 1.6;
}
</style>
