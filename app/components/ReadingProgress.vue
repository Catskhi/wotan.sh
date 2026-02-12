<template>
  <div
    class="fixed top-0 left-0 h-0.5 bg-accent z-[60] transition-[width] duration-75"
    :style="{ width: `${progress}%` }"
  />
</template>

<script setup lang="ts">
const progress = ref(0)

function updateProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>
