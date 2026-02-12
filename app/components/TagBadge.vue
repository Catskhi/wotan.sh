<template>
  <component
    :is="clickable ? 'button' : 'span'"
    class="text-2xs font-mono text-muted transition-colors"
    :class="[
      active ? '!text-accent' : '',
      clickable ? 'hover:text-accent cursor-pointer' : '',
    ]"
    @click="clickable && $emit('click')"
  >
    [{{ tag }}]
  </component>
</template>

<script setup lang="ts">
defineProps<{
  tag: string
  clickable?: boolean
  active?: boolean
}>()

defineEmits<{
  click: []
}>()
</script>
