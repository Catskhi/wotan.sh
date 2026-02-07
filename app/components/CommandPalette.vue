<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const router = useRouter()

const isOpen = ref(false)
const query = ref('')
const selectedIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

// Static navigation items
const navItems = computed(() => [
  { label: t('nav.home'), path: localePath('/'), type: 'page' as const },
  { label: t('nav.blog'), path: localePath('/blog'), type: 'page' as const },
  { label: t('nav.projects'), path: localePath('/projects'), type: 'page' as const },
  { label: t('nav.about'), path: localePath('/about'), type: 'page' as const },
  { label: 'Uses', path: localePath('/uses'), type: 'page' as const },
  { label: 'Now', path: localePath('/now'), type: 'page' as const },
])

// Blog posts
const { data: posts } = await useAsyncData(`cmd-posts-${locale.value}`, () =>
  queryCollection('blog')
    .where('draft', '=', false)
    .where('lang', '=', locale.value)
    .order('date', 'DESC')
    .all()
)

const allItems = computed(() => {
  const items: Array<{ label: string; path: string; type: 'page' | 'post'; description?: string }> = [
    ...navItems.value,
  ]
  if (posts.value) {
    posts.value.forEach(p => {
      items.push({ label: p.title, path: p.path, type: 'post', description: p.description })
    })
  }
  return items
})

const filtered = computed(() => {
  const q = query.value.toLowerCase().trim()
  if (!q) return allItems.value
  return allItems.value.filter(item =>
    item.label.toLowerCase().includes(q) ||
    item.description?.toLowerCase().includes(q)
  )
})

watch(query, () => {
  selectedIndex.value = 0
})

function open() {
  isOpen.value = true
  query.value = ''
  selectedIndex.value = 0
  nextTick(() => inputRef.value?.focus())
}

function close() {
  isOpen.value = false
}

function navigate(path: string) {
  close()
  router.push(path)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = Math.min(selectedIndex.value + 1, filtered.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const item = filtered.value[selectedIndex.value]
    if (item) navigate(item.path)
  } else if (e.key === 'Escape') {
    close()
  }
}

// Global keyboard shortcut
onMounted(() => {
  const handler = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      if (isOpen.value) close()
      else open()
    }
  }
  window.addEventListener('keydown', handler)
  onUnmounted(() => window.removeEventListener('keydown', handler))
})
</script>

<template>
  <!-- Backdrop -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm" @click="close">
        <div class="flex items-start justify-center pt-[15vh]" @click.stop>
          <div class="w-full max-w-lg mx-4 bg-bg border border-border rounded-lg shadow-2xl overflow-hidden">
            <!-- Input -->
            <div class="flex items-center gap-3 px-4 py-3 border-b border-border">
              <span class="text-gray-600 text-sm">/</span>
              <input
                ref="inputRef"
                v-model="query"
                type="text"
                placeholder="Search pages and posts..."
                class="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-700 outline-none"
                @keydown="onKeydown"
              >
              <kbd class="text-[10px] text-gray-700 border border-border rounded px-1.5 py-0.5">ESC</kbd>
            </div>

            <!-- Results -->
            <div class="max-h-72 overflow-y-auto py-2">
              <div v-if="!filtered.length" class="px-4 py-6 text-center text-sm text-gray-700">
                No results.
              </div>
              <button
                v-for="(item, i) in filtered"
                :key="item.path"
                class="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                :class="i === selectedIndex ? 'bg-white/5 text-white' : 'text-gray-400 hover:bg-white/[0.02]'"
                @click="navigate(item.path)"
                @mouseenter="selectedIndex = i"
              >
                <span class="text-[10px] text-gray-700 uppercase w-8 shrink-0">
                  {{ item.type === 'post' ? 'post' : 'page' }}
                </span>
                <div class="min-w-0">
                  <span class="text-sm block truncate">{{ item.label }}</span>
                  <span v-if="item.description" class="text-xs text-gray-700 block truncate">
                    {{ item.description }}
                  </span>
                </div>
              </button>
            </div>

            <!-- Footer -->
            <div class="px-4 py-2 border-t border-border flex items-center gap-4 text-[10px] text-gray-700">
              <span><kbd class="border border-border rounded px-1 py-0.5">↑↓</kbd> navigate</span>
              <span><kbd class="border border-border rounded px-1 py-0.5">↵</kbd> open</span>
              <span><kbd class="border border-border rounded px-1 py-0.5">esc</kbd> close</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
