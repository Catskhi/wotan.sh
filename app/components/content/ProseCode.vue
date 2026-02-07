<script setup lang="ts">
defineProps<{
  code?: string
  language?: string
  filename?: string
}>()

const copied = ref(false)

async function copyCode(code?: string) {
  if (!code) return
  await navigator.clipboard.writeText(code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div class="relative group my-4 rounded-lg overflow-hidden border border-border">
    <div class="flex items-center justify-between px-4 py-2 bg-surface text-xs text-gray-700 border-b border-border">
      <span>{{ filename || language || 'code' }}</span>
      <button
        class="hover:text-white transition-colors"
        @click="copyCode(code)"
      >
        {{ copied ? 'copied!' : 'copy' }}
      </button>
    </div>
    <pre class="!m-0 !rounded-none"><slot /></pre>
  </div>
</template>
