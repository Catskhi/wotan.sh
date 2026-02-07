<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
  }
}>()

const localePath = useLocalePath()

const asciiSkull = `
    ██████████
  ██          ██
██   ██  ██    ██
██              ██
██    ██████    ██
  ██  ██  ██  ██
    ██████████
       ████
`

function handleError() {
  clearError({ redirect: localePath('/') })
}
</script>

<template>
  <div class="min-h-screen bg-bg flex flex-col items-center justify-center px-4 font-mono">
    <pre class="text-gray-700 text-xs leading-none select-none mb-8">{{ asciiSkull }}</pre>

    <h1 class="text-white text-4xl font-bold mb-2">
      {{ error.statusCode }}
    </h1>

    <p class="text-gray-600 text-sm mb-8">
      <template v-if="error.statusCode === 404">
        Segmentation fault (core dumped)
      </template>
      <template v-else>
        {{ error.statusMessage || 'Something went wrong' }}
      </template>
    </p>

    <button
      class="text-xs text-gray-600 hover:text-white transition-colors border border-border hover:border-gray-600 rounded px-4 py-2"
      @click="handleError"
    >
      cd ~
    </button>
  </div>
</template>
