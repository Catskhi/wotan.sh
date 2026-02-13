<template>
  <div class="min-h-screen bg-bg font-mono flex flex-col items-center justify-center px-4 text-center">
    <!-- Othala rune — large, stark -->
    <div class="text-accent text-6xl sm:text-8xl mb-6 select-none" aria-hidden="true">ᛟ</div>

    <!-- ASCII Huginn & Muninn (Odin's ravens) -->
    <pre class="text-muted text-2xs sm:text-xs mb-6 select-none leading-tight" aria-hidden="true">{{ ASCII_RAVENS }}</pre>

    <h1 class="text-lg sm:text-xl font-semibold text-gray-100 mb-2">
      {{ is404 ? 'Ginnungagap' : 'SIGABRT' }}
    </h1>

    <p class="text-sm text-muted mb-1">
      {{ is404 ? 'You wander into the void between worlds.' : 'Something went wrong.' }}
    </p>

    <p class="text-2xs text-border-bright mb-1">
      {{ is404 ? 'The path you seek does not exist.' : `exit code ${error?.statusCode || 500}` }}
    </p>

    <p v-if="is404" class="text-2xs text-muted/40 mb-6">
      exit code 404
    </p>
    <div v-else class="mb-6" />

    <button
      @click="handleError"
      class="px-4 py-2 text-xs border border-accent text-accent hover:bg-accent hover:text-bg transition-colors"
    >
      cd ~
    </button>
  </div>
</template>

<script setup lang="ts">
const ASCII_RAVENS = `  ⟋⟍     ⟋⟍
 (o  )   (  o)
  ╰─╯ᚺᚢᚷ╰─╯`

const props = defineProps<{
  error: {
    statusCode?: number
    message?: string
  }
}>()

const is404 = computed(() => props.error?.statusCode === 404)

function handleError() {
  clearError({ redirect: '/' })
}
</script>
