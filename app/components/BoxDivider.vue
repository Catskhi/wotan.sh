<template>
  <div class="flex items-center gap-2 text-border-bright text-xs select-none my-6" aria-hidden="true">
    <span class="flex-1 overflow-hidden whitespace-nowrap">────────────────────────────────────────</span>
    <span v-if="label" class="text-muted shrink-0">{{ label }}</span>
    <span v-if="label" class="flex-1 overflow-hidden whitespace-nowrap">────────────────────────────────────────</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>
