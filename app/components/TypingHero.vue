<script setup lang="ts">
const { t } = useI18n()

const revealed = ref(false)
const scrolledPast = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    revealed.value = true
  })

  const onScroll = () => {
    scrolledPast.value = window.scrollY > 80
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

function scrollDown() {
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
}
</script>

<template>
  <section class="relative flex flex-col items-center justify-center min-h-[calc(100vh-3rem)]">
    <div
      class="flex flex-col items-center gap-6 sm:gap-8 transition-all duration-700 ease-out"
      :class="revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'"
    >
      <!-- Skull -->
      <img
        src="/wotan/beta002-semfundo.png"
        alt="0xw0tan"
        class="w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 pixelated opacity-80"
      >

      <!-- Title -->
      <h1 class="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.15em]">
        0xw0tan
      </h1>

      <!-- Tagline -->
      <p class="text-muted text-xs sm:text-sm tracking-[0.2em] uppercase">
        {{ t('hero.tagline') }}
      </p>
    </div>

    <!-- Scroll indicator -->
    <button
      class="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-700 hover:text-gray-500 transition-all duration-500 flex flex-col items-center gap-2"
      :class="scrolledPast ? 'opacity-0 pointer-events-none' : 'opacity-100'"
      @click="scrollDown"
    >
      <span class="text-[10px] tracking-[0.3em] uppercase">scroll</span>
      <span class="animate-blink text-sm">&darr;</span>
    </button>
  </section>
</template>
