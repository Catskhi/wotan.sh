<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: `${t('projects.title')} | 0xw0tan`,
  description: t('projects.description'),
})

const projects = [
  {
    name: 'personal-site',
    description: 'This site — built with Nuxt 3, Tailwind, and deployed on Cloudflare Pages.',
    tech: ['Nuxt', 'Tailwind CSS', 'Cloudflare Pages'],
    github: 'https://github.com/0xw0tan/personal-site',
  },
  {
    name: 'security-scanner',
    description: 'Lightweight vulnerability scanner for web applications. Detects common misconfigurations.',
    tech: ['Go', 'Docker', 'REST API'],
    github: 'https://github.com/0xw0tan/security-scanner',
  },
  {
    name: 'api-gateway',
    description: 'Custom API gateway with rate limiting, auth middleware, and request logging.',
    tech: ['Java', 'Spring Boot', 'Redis'],
    github: 'https://github.com/0xw0tan/api-gateway',
  },
]
</script>

<template>
  <div>
    <header class="mb-8">
      <h1 class="text-xl font-bold text-gray-100 mb-2">{{ t('projects.title') }}</h1>
      <p class="text-sm text-gray-600">{{ t('projects.description') }}</p>
    </header>

    <div class="grid gap-4">
      <ProjectCard
        v-for="project in projects"
        :key="project.name"
        v-bind="project"
      />
    </div>
  </div>
</template>
