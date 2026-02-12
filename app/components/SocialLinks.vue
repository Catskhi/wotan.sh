<template>
  <div class="flex items-center gap-3">
    <a
      v-for="link in SOCIAL_LINKS"
      :key="link.name"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
      class="text-muted hover:text-accent transition-colors text-xs"
      :aria-label="link.name"
    >
      [{{ link.name.toLowerCase() }}]
    </a>
  </div>
</template>

<script setup lang="ts">
import { SOCIAL_LINKS } from '~/utils/constants'
</script>
