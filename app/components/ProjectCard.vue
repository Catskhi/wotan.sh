<script setup lang="ts">
const { t } = useI18n()

defineProps<{
  name: string
  description: string
  tech: string[]
  github?: string
  live?: string
}>()
</script>

<template>
  <div class="border border-border rounded-lg p-4 sm:p-5 hover:border-gray-700 transition-colors space-y-3">
    <h3 class="text-base font-medium text-gray-200">{{ name }}</h3>
    <p class="text-sm text-gray-600">{{ description }}</p>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="item in tech"
        :key="item"
        class="text-xs px-2 py-0.5 rounded border border-border text-gray-700"
      >
        {{ item }}
      </span>
    </div>
    <div class="flex gap-3 pt-1">
      <a
        v-if="github"
        :href="github"
        target="_blank"
        rel="noopener noreferrer"
        class="text-xs text-gray-600 hover:text-white transition-colors"
      >
        [{{ t('projects.source') }}]
      </a>
      <a
        v-if="live"
        :href="live"
        target="_blank"
        rel="noopener noreferrer"
        class="text-xs text-gray-600 hover:text-white transition-colors"
      >
        [{{ t('projects.live') }}]
      </a>
    </div>
  </div>
</template>
