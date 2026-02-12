<template>
  <div class="flex items-center gap-0.5 text-xs">
    <NuxtLink
      :to="switchLocalePath('en')"
      class="px-1.5 py-0.5 transition-colors"
      :class="locale === 'en' ? 'text-accent' : 'text-muted hover:text-gray-300'"
    >
      [EN]
    </NuxtLink>
    <span class="text-border-bright">/</span>
    <NuxtLink
      :to="switchLocalePath('pt-BR')"
      class="px-1.5 py-0.5 transition-colors"
      :class="locale === 'pt-BR' ? 'text-accent' : 'text-muted hover:text-gray-300'"
    >
      [PT]
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>
