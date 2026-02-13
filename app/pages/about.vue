<template>
  <div>
    <header class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <!-- Small skull -->
        <div class="skull-small" aria-hidden="true" />
        <div>
          <h1 class="text-xl font-semibold text-gray-100">
            $ {{ t('about.bio_title') }}
          </h1>
          <p class="text-sm text-muted">
            {{ t('about.description') }}
          </p>
        </div>
      </div>
    </header>

    <BoxDivider :runes="true" />

    <!-- Bio -->
    <section class="mb-8">
      <p class="text-sm text-gray-300 leading-relaxed mb-4">
        {{ t('about.bio_p1') }}
      </p>
      <p class="text-sm text-gray-300 leading-relaxed">
        {{ t('about.bio_p2') }}
      </p>
    </section>

    <!-- Skills -->
    <BoxDivider :label="t('about.skills_title')" :runes="true" />

    <section class="mb-8">
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <div
          v-for="skill in skills"
          :key="skill"
          class="text-xs text-muted"
        >
          <span class="text-accent mr-1">></span>{{ skill }}
        </div>
      </div>
    </section>

    <!-- Connect -->
    <BoxDivider :label="t('about.connect_title')" :runes="true" />

    <section>
      <SocialLinks />
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const skills = [
  'Java / Spring Boot',
  'Go',
  'TypeScript / Node.js',
  'Python',
  'PostgreSQL / Redis',
  'Docker / K8s',
  'AWS / GCP',
  'Linux',
  'Security / Pentesting',
]

useHead({
  title: `${t('about.title')} - 0xw0tan`,
})
</script>

<style scoped>
.skull-small {
  width: 40px;
  height: 40px;
  background-color: var(--color-accent);
  mask-image: url('/wotan/skull_transparent.png');
  -webkit-mask-image: url('/wotan/skull_transparent.png');
  mask-size: contain;
  -webkit-mask-size: contain;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-position: center;
  flex-shrink: 0;
}
</style>
