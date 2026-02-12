<template>
  <div>
    <header class="mb-8">
      <h1 class="text-xl font-semibold text-gray-100 mb-1">
        {{ t('projects.title') }}
      </h1>
      <p class="text-sm text-muted">
        {{ t('projects.description') }}
      </p>
    </header>

    <BoxDivider />

    <div class="grid gap-4 sm:grid-cols-2">
      <ProjectCard
        v-for="project in PROJECTS"
        :key="project.name"
        :project="project"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PROJECTS } from '~/utils/projects'

const { t } = useI18n()

useHead({
  title: `${t('projects.title')} - 0xw0tan`,
})
</script>
