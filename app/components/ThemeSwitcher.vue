<template>
  <div class="relative">
    <button
      @click="open = !open"
      class="p-1.5 text-muted hover:text-accent transition-colors"
      aria-label="Switch theme"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    </button>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="open"
        class="absolute right-0 top-full mt-1 bg-surface border border-border rounded py-1 min-w-[140px] shadow-lg z-50"
      >
        <button
          v-for="theme in themes"
          :key="theme.id"
          @click="selectTheme(theme.id)"
          class="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-muted hover:text-gray-200 hover:bg-surface-raised transition-colors"
          :class="{ '!text-gray-200': current === theme.id }"
        >
          <span
            class="w-2.5 h-2.5 rounded-full shrink-0"
            :style="{ backgroundColor: theme.accent }"
          />
          {{ theme.name }}
          <span v-if="current === theme.id" class="ml-auto text-accent">*</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { current, setTheme, themes } = useTheme()
const open = ref(false)

function selectTheme(id: ThemeId) {
  setTheme(id)
  open.value = false
}

// Close on click outside
if (import.meta.client) {
  const handleClick = (e: Event) => {
    const el = (e.target as HTMLElement).closest('.relative')
    if (!el) open.value = false
  }
  onMounted(() => document.addEventListener('click', handleClick))
  onUnmounted(() => document.removeEventListener('click', handleClick))
}
</script>
