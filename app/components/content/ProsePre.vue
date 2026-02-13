<template>
  <div class="group relative my-4">
    <!-- Language label -->
    <span
      v-if="language"
      class="absolute top-2 left-3 text-2xs select-none pointer-events-none z-10"
      style="color: var(--prose-muted)"
    >
      {{ language }}
    </span>

    <!-- Copy button -->
    <button
      @click="copy"
      class="absolute top-2 right-2 px-2 py-0.5 text-2xs hover:text-accent rounded opacity-0 group-hover:opacity-100 transition-all z-10"
      style="color: var(--prose-muted)"
      :aria-label="copied ? 'Copied' : 'Copy code'"
    >
      {{ copied ? 'copied!' : 'copy' }}
    </button>

    <!-- Code block -->
    <pre
      ref="preRef"
      :class="[$props.class, 'code-block !mt-0 !rounded', language ? '!pt-8' : '']"
    ><slot /></pre>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
  class?: string
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
