<template>
  <header class="sticky top-0 z-50 bg-bg/90 backdrop-blur-sm border-b border-border">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
      <!-- Brand -->
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2 group">
        <img
          src="/wotan/skull_transparent.png"
          alt="0xw0tan"
          class="w-7 h-7 opacity-80 group-hover:opacity-100 transition-opacity"
        />
        <span class="font-pixel text-sm text-gray-200 group-hover:text-accent transition-colors">
          0xw0tan
        </span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.path"
          :to="localePath(link.path)"
          class="px-2.5 py-1.5 text-sm text-muted hover:text-accent transition-colors"
          active-class="!text-accent"
        >
          {{ link.label }}
        </NuxtLink>
        <div class="w-px h-4 bg-border mx-1.5" />
        <!-- Search trigger -->
        <button
          class="flex items-center gap-1.5 px-2 py-1 text-xs text-muted hover:text-accent transition-colors border border-border rounded"
          @click="openPalette"
          aria-label="Search"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <kbd class="text-2xs text-muted/60">⌘K</kbd>
        </button>
        <ThemeSwitcher />
      </nav>

      <!-- Mobile controls -->
      <div class="md:hidden flex items-center gap-1">
        <!-- Mobile search button -->
        <button
          class="p-2.5 text-muted hover:text-accent transition-colors"
          @click="openPalette"
          aria-label="Search"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <!-- Mobile menu button -->
        <button
          class="p-2.5 text-muted hover:text-accent transition-colors"
          @click="mobileOpen = !mobileOpen"
          :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
        >
        <svg v-if="!mobileOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" class="md:hidden border-t border-border bg-bg/95 backdrop-blur-sm">
        <nav class="max-w-3xl mx-auto px-4 py-3 flex flex-col gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="localePath(link.path)"
            class="px-3 py-2.5 text-sm text-muted hover:text-accent transition-colors"
            active-class="!text-accent"
            @click="mobileOpen = false"
          >
            ~/{{ link.label.toLowerCase() }}
          </NuxtLink>
          <div class="border-t border-border my-1" />
          <div class="flex items-center gap-2 px-3 py-2">
            <ThemeSwitcher />
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const mobileOpen = ref(false)

const navLinks = computed(() => [
  { path: '/blog', label: t('nav.blog') },
  { path: '/projects', label: t('nav.projects') },
  { path: '/about', label: t('nav.about') },
])

function openPalette() {
  // Dispatch Ctrl+K to trigger CommandPalette
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))
}
</script>
