<template>
  <div class="min-h-screen bg-bg font-mono flex flex-col items-center justify-center px-4 text-center">
    <pre class="text-accent text-xs sm:text-sm mb-6 select-none leading-tight">{{ ASCII_SKULL }}</pre>

    <h1 class="text-xl font-semibold text-gray-100 mb-2">
      {{ is404 ? 'SIGSEGV' : 'SIGABRT' }}
    </h1>

    <p class="text-sm text-muted mb-1">
      {{ is404 ? 'Segmentation fault — page not found' : 'Something went wrong' }}
    </p>

    <p class="text-2xs text-border-bright mb-6">
      {{ is404 ? `exit code 404` : `exit code ${error?.statusCode || 500}` }}
    </p>

    <button
      @click="handleError"
      class="px-4 py-2 text-xs border border-accent text-accent hover:bg-accent hover:text-bg transition-colors"
    >
      cd ~
    </button>
  </div>
</template>

<script setup lang="ts">
import { ASCII_SKULL } from '~/utils/ascii'

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
