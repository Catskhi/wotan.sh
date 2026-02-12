<template>
  <div class="border border-border p-4 hover:border-accent/30 transition-colors">
    <!-- Project name -->
    <h3 class="text-sm font-medium text-gray-200 mb-1">
      {{ project.name }}
    </h3>

    <!-- Description -->
    <p class="text-xs text-muted mb-3">
      {{ project.description }}
    </p>

    <!-- Tech tags -->
    <div class="flex flex-wrap gap-1.5 mb-3">
      <TagBadge v-for="tag in project.tech" :key="tag" :tag="tag" />
    </div>

    <!-- Links -->
    <div class="flex items-center gap-3 text-xs">
      <a
        v-if="project.github"
        :href="project.github"
        target="_blank"
        rel="noopener noreferrer"
        class="text-muted hover:text-accent transition-colors"
      >
        [{{ t('projects.source') }}]
      </a>
      <a
        v-if="project.live"
        :href="project.live"
        target="_blank"
        rel="noopener noreferrer"
        class="text-muted hover:text-accent transition-colors"
      >
        [{{ t('projects.live') }}]
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/utils/projects'

defineProps<{
  project: Project
}>()

const { t } = useI18n()
</script>
