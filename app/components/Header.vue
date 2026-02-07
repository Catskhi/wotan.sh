<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const navLinks = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.blog'), to: localePath('/blog') },
  { label: t('nav.projects'), to: localePath('/projects') },
  { label: t('nav.about'), to: localePath('/about') },
])

const mobileOpen = ref(false)

const route = useRoute()
watch(() => route.fullPath, () => {
  mobileOpen.value = false
})
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-sm border-b border-border h-12 flex items-center">
    <nav class="max-w-4xl w-full mx-auto px-4 sm:px-6 flex items-center justify-between">

      <!-- Brand -->
      <NuxtLink :to="localePath('/')" class="text-white text-sm font-bold hover:opacity-70 transition-opacity">
        0xw0tan
      </NuxtLink>

      <!-- Desktop nav -->
      <div class="hidden sm:flex items-center gap-6">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-wider"
          active-class="!text-white"
        >
          {{ link.label }}
        </NuxtLink>
        <div class="w-px h-4 bg-border" />
        <button
          class="hidden lg:flex items-center gap-2 text-[10px] text-gray-600 hover:text-gray-400 transition-colors border border-border rounded px-2 py-1"
          @click="$event.preventDefault(); window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))"
        >
          <span>Search</span>
          <kbd class="text-[9px] border border-border rounded px-1">Ctrl+K</kbd>
        </button>
        <div class="w-px h-4 bg-border" />
        <LanguageSwitcher />
      </div>

      <!-- Mobile toggle -->
      <div class="flex items-center gap-3 sm:hidden">
        <LanguageSwitcher />
        <button
          class="text-gray-500 hover:text-white transition-colors text-sm"
          @click="mobileOpen = !mobileOpen"
        >
          <span v-if="mobileOpen">&times;</span>
          <span v-else>&#9776;</span>
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div
      v-if="mobileOpen"
      class="absolute top-12 left-0 right-0 bg-bg/95 backdrop-blur-sm border-b border-border flex flex-col"
    >
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="text-gray-500 hover:text-white py-3 px-6 text-xs uppercase tracking-wider transition-colors border-b border-border/50"
        active-class="!text-white"
        @click="mobileOpen = false"
      >
        {{ link.label }}
      </NuxtLink>
    </div>
  </header>
</template>
