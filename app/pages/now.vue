<template>
  <div>
    <header class="mb-8">
      <h1 class="text-xl font-semibold text-gray-100 mb-1">
        $ {{ t('now.title') }}
      </h1>
      <p class="text-sm text-muted">
        {{ t('now.description') }}
      </p>
      <p class="text-2xs text-muted/50 mt-2">
        {{ t('now.last_updated') }}: {{ lastUpdated }}
      </p>
    </header>

    <BoxDivider />

    <!-- Currently working on -->
    <section class="mb-8">
      <h2 class="text-sm font-medium text-gray-200 mb-4 flex items-center gap-2">
        <span class="text-accent">></span> {{ t('now.working_on') }}
      </h2>
      <ul class="space-y-2">
        <li v-for="item in workingOn" :key="item" class="text-sm text-gray-300 flex items-start gap-2">
          <span class="text-muted shrink-0">-</span>
          <span>{{ item }}</span>
        </li>
      </ul>
    </section>

    <!-- Currently learning -->
    <BoxDivider :label="t('now.learning')" />
    <section class="mb-8">
      <ul class="space-y-2">
        <li v-for="item in learning" :key="item" class="text-sm text-gray-300 flex items-start gap-2">
          <span class="text-muted shrink-0">-</span>
          <span>{{ item }}</span>
        </li>
      </ul>
    </section>

    <!-- Currently reading -->
    <BoxDivider :label="t('now.reading')" />
    <section class="mb-8">
      <ul class="space-y-2">
        <li v-for="item in reading" :key="item" class="text-sm text-gray-300 flex items-start gap-2">
          <span class="text-muted shrink-0">-</span>
          <span>{{ item }}</span>
        </li>
      </ul>
    </section>

    <BoxDivider />

    <p class="text-2xs text-muted mt-4">
      {{ t('now.inspired_by') }}
      <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">nownownow.com</a>
    </p>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const lastUpdated = 'February 2026'

const workingOn = [
  'Building this personal site (Nuxt + Tailwind)',
  'CTF challenges on HackingClub & HackTheBox',
  'A message broker from scratch in Java',
]

const learning = [
  'Advanced Spring Boot internals',
  'Kubernetes networking & service mesh',
  'Binary exploitation & reverse engineering',
  'Go concurrency patterns',
]

const reading = [
  'Designing Data-Intensive Applications — Martin Kleppmann',
  'The Art of Exploitation — Jon Erickson',
]

useHead({
  title: `${t('now.title')} - 0xw0tan`,
})
</script>
