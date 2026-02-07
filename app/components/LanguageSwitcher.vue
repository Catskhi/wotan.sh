<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() =>
  locales.value.filter((l: any) => l.code !== locale.value)
)
</script>

<template>
  <NuxtLink
    v-for="loc in availableLocales"
    :key="loc.code"
    :to="switchLocalePath(loc.code)"
    class="text-xs text-gray-600 hover:text-white transition-colors border border-border hover:border-gray-600 rounded px-2 py-1 uppercase tracking-wide"
  >
    {{ loc.code }}
  </NuxtLink>
</template>
