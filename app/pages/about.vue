<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: `${t('about.title')} | 0xw0tan`,
  description: t('about.description'),
})

const skills = [
  { category: 'Languages', items: ['Java', 'Go', 'Python', 'TypeScript'] },
  { category: 'Backend', items: ['Spring Boot', 'gRPC', 'REST', 'PostgreSQL', 'Redis'] },
  { category: 'DevOps', items: ['Docker', 'Kubernetes', 'CI/CD', 'Linux'] },
  { category: 'Security', items: ['OWASP', 'Pentesting', 'Cryptography'] },
]

const socials = [
  { name: 'GitHub', url: 'https://github.com/0xw0tan' },
  { name: 'Twitter/X', url: 'https://x.com/0xw0tan' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/0xw0tan' },
]
</script>

<template>
  <div>
    <header class="mb-10">
      <h1 class="text-xl font-bold text-gray-100 mb-2">{{ t('about.title') }}</h1>
    </header>

    <section class="mb-12">
      <h2 class="text-xs font-medium text-gray-500 uppercase tracking-[0.2em] mb-4">
        {{ t('about.bio_title') }}
      </h2>
      <div class="text-sm text-gray-400 space-y-3 leading-relaxed max-w-xl">
        <p>
          Backend engineer focused on building reliable, secure systems. I enjoy working close to the metal —
          understanding how things break to build them better.
        </p>
        <p>
          When I'm not writing code, I'm probably reading about security research, contributing to open source,
          or experimenting with new tools.
        </p>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-xs font-medium text-gray-500 uppercase tracking-[0.2em] mb-5">
        {{ t('about.skills_title') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="group in skills"
          :key="group.category"
          class="border border-border rounded-lg p-4"
        >
          <h3 class="text-sm font-medium text-gray-300 mb-3">{{ group.category }}</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="item in group.items"
              :key="item"
              class="text-xs px-2 py-0.5 rounded border border-border text-gray-700"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-medium text-gray-500 uppercase tracking-[0.2em] mb-4">
        {{ t('about.connect_title') }}
      </h2>
      <div class="flex gap-4">
        <a
          v-for="social in socials"
          :key="social.name"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-gray-600 hover:text-white transition-colors"
        >
          {{ social.name }}
        </a>
      </div>
    </section>
  </div>
</template>
