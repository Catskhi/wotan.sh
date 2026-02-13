<template>
  <div class="flex items-center gap-2 text-border-bright text-xs select-none my-6" aria-hidden="true">
    <template v-if="label && runes">
      <span class="shrink-0">╭─{{ labelRune }}</span>
      <span class="text-muted shrink-0">{{ label }}</span>
      <span class="flex-1 overflow-hidden whitespace-nowrap">{{ dividerLine }}</span>
    </template>
    <template v-else>
      <span class="flex-1 overflow-hidden whitespace-nowrap">{{ dividerLine }}</span>
      <span v-if="label" class="text-muted shrink-0">{{ label }}</span>
      <span v-if="label" class="flex-1 overflow-hidden whitespace-nowrap">{{ dividerLine }}</span>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label?: string
  runes?: boolean
}>()

const RUNE_CHARS = ['ᚦ', 'ᚨ', 'ᚾ', 'ᛟ', 'ᚱ', 'ᛗ']

// Pick a deterministic rune based on label text
const labelRune = computed(() => {
  if (!props.label) return RUNE_CHARS[0]
  const hash = props.label.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return RUNE_CHARS[hash % RUNE_CHARS.length]
})

const dividerLine = computed(() => {
  if (!props.runes) return '────────────────────────────────────────'
  let line = ''
  let runeIdx = 0
  for (let i = 0; i < 40; i++) {
    if (i > 0 && i % 7 === 0 && runeIdx < RUNE_CHARS.length) {
      line += RUNE_CHARS[runeIdx++]
    } else {
      line += '─'
    }
  }
  return line
})
</script>
