<template>
  <div class="flex items-center gap-2 text-border-bright text-xs select-none my-6" aria-hidden="true">
    <span class="flex-1 overflow-hidden whitespace-nowrap">{{ dividerLine }}</span>
    <span v-if="label" class="text-muted shrink-0">{{ label }}</span>
    <span v-if="label" class="flex-1 overflow-hidden whitespace-nowrap">{{ dividerLine }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label?: string
  runes?: boolean
}>()

const RUNE_CHARS = ['ᚦ', 'ᚨ', 'ᚾ', 'ᛟ', 'ᚱ', 'ᛗ']

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
