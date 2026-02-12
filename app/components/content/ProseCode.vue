<template>
  <div class="group relative my-4">
    <!-- Language label -->
    <span
      v-if="language"
      class="absolute top-2 left-3 text-2xs text-muted select-none pointer-events-none"
    >
      {{ language }}
    </span>

    <!-- Copy button -->
    <button
      @click="copy"
      class="absolute top-2 right-2 px-2 py-0.5 text-2xs text-muted hover:text-accent border border-transparent hover:border-border rounded opacity-0 group-hover:opacity-100 transition-all"
      :aria-label="copied ? 'Copied' : 'Copy code'"
    >
      {{ copied ? 'copied!' : 'copy' }}
    </button>

    <!-- Code block -->
    <pre
      ref="preRef"
      class="!mt-0 !rounded border border-border"
      :class="language ? '!pt-8' : ''"
    ><slot /></pre>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
}>()

const preRef = ref<HTMLElement>()
const copied = ref(false)

function copy() {
  const code = preRef.value?.querySelector('code')?.textContent
  if (code) {
    navigator.clipboard.writeText(code)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}
</script>
