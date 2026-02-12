<template>
  <div class="min-h-screen bg-bg font-mono flex flex-col">
    <Header />
    <main class="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <slot />
    </main>
    <Footer />
    <CommandPalette />
  </div>
</template>

<script setup lang="ts">
const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>
