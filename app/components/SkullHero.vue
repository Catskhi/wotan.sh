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
      <!-- Skull with CSS mask-image for theme-aware color -->
      <div class="skull-container mb-6" aria-hidden="true">
        <div class="skull-mask" :class="mouthOpen ? 'mouth-open' : 'mouth-closed'" />
      </div>

      <!-- Name -->
      <h1 class="font-pixel text-3xl sm:text-4xl md:text-5xl text-gray-100 mb-3 tracking-wider">
        {{ t('hero.name') }}
      </h1>

      <!-- Tagline with blinking cursor -->
      <p class="text-sm sm:text-base text-accent mb-2 flex items-center gap-1">
        <span>{{ t('hero.tagline') }}</span>
        <span class="animate-blink text-accent">_</span>
      </p>

      <!-- Subtitle -->
      <p class="text-xs sm:text-sm text-muted max-w-lg mb-8 leading-relaxed">
        {{ t('hero.subtitle') }}
      </p>

      <!-- CTA buttons -->
      <div class="flex items-center gap-4">
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
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
      <span class="text-2xs text-muted/50">scroll</span>
      <div class="w-px h-8 bg-gradient-to-b from-muted/40 to-transparent scroll-line" />
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const mouthOpen = ref(false)

onMounted(() => {
  // Sequence: closed → open → closed → open (ends open)
  setTimeout(() => {
    mouthOpen.value = true
  }, 400)
  setTimeout(() => {
    mouthOpen.value = false
  }, 900)
  setTimeout(() => {
    mouthOpen.value = true
  }, 1400)
})
</script>

<style scoped>
.skull-container {
  width: 140px;
  height: 140px;
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

.skull-mask {
  width: 100%;
  height: 100%;
  background-color: var(--color-accent);
  mask-size: contain;
  -webkit-mask-size: contain;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-position: center;
  transition: mask-image 0.05s, -webkit-mask-image 0.05s;
}

.skull-mask.mouth-closed {
  mask-image: url('/wotan/skull_closed_mouth_transparent.png');
  -webkit-mask-image: url('/wotan/skull_closed_mouth_transparent.png');
}

.skull-mask.mouth-open {
  mask-image: url('/wotan/skull_transparent.png');
  -webkit-mask-image: url('/wotan/skull_transparent.png');
}

.scroll-line {
  animation: scroll-pulse 2s ease-in-out infinite;
}

@keyframes scroll-pulse {
  0%, 100% {
    opacity: 0.4;
    transform: translateY(0);
  }
  50% {
    opacity: 0.8;
    transform: translateY(4px);
  }
}
</style>
