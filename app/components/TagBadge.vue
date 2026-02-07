<script setup lang="ts">
defineProps<{
  tag: string
  active?: boolean
  clickable?: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <span
    :class="[
      'inline-block text-xs px-2 py-0.5 rounded border transition-colors',
      active
        ? 'bg-white/5 border-gray-600 text-gray-300'
        : 'border-border text-gray-700',
      clickable && 'cursor-pointer hover:border-gray-600 hover:text-gray-300',
    ]"
    @click="clickable && $emit('click')"
  >
    {{ tag }}
  </span>
</template>
