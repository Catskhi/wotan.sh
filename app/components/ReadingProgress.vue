<script setup lang="ts">
const progress = ref(0)

onMounted(() => {
  const update = () => {
    const el = document.documentElement
    const scrollTop = el.scrollTop
    const scrollHeight = el.scrollHeight - el.clientHeight
    progress.value = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
  }
  window.addEventListener('scroll', update, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', update))
})
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
    <div
      class="h-full bg-white/25 transition-[width] duration-75 ease-linear"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>
