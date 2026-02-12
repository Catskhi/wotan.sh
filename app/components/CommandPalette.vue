<template>
  <Teleport to="body">
    <!-- Overlay -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
        @click="close"
      />
    </Transition>

    <!-- Palette -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95 -translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 -translate-y-4"
    >
      <div
        v-if="open"
        class="fixed top-[15vh] left-1/2 -translate-x-1/2 w-[90vw] max-w-lg bg-surface border border-border rounded-lg shadow-2xl z-[101] overflow-hidden"
      >
        <!-- Search input -->
        <div class="flex items-center gap-2 px-4 py-3 border-b border-border">
          <span class="text-muted text-sm">$</span>
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            :placeholder="t('palette.placeholder')"
            class="flex-1 bg-transparent text-sm text-gray-200 outline-none placeholder:text-muted/50"
            @keydown.escape="close"
            @keydown.down.prevent="moveDown"
            @keydown.up.prevent="moveUp"
            @keydown.enter.prevent="selectCurrent"
          />
          <kbd class="text-2xs text-muted border border-border rounded px-1.5 py-0.5">esc</kbd>
        </div>

        <!-- Results -->
        <div class="max-h-[50vh] overflow-y-auto py-1">
          <div v-if="results.length === 0 && query" class="px-4 py-6 text-center text-xs text-muted">
            {{ t('palette.no_results') }}
          </div>

          <!-- Navigation section -->
          <div v-if="navResults.length">
            <div class="px-4 py-1.5 text-2xs text-muted/60 uppercase tracking-wider">
              {{ t('palette.navigation') }}
            </div>
            <button
              v-for="(item, i) in navResults"
              :key="item.path"
              @click="navigate(item.path)"
              @mouseenter="activeIndex = results.indexOf(item)"
              class="w-full flex items-center gap-3 px-4 py-2 text-left text-sm transition-colors"
              :class="results.indexOf(item) === activeIndex ? 'bg-surface-raised text-accent' : 'text-gray-300 hover:bg-surface-raised'"
            >
              <span class="text-muted text-xs">~/</span>
              <span>{{ item.label }}</span>
            </button>
          </div>

          <!-- Posts section -->
          <div v-if="postResults.length">
            <div class="px-4 py-1.5 text-2xs text-muted/60 uppercase tracking-wider">
              {{ t('palette.posts') }}
            </div>
            <button
              v-for="(item, i) in postResults"
              :key="item.path"
              @click="navigate(item.path)"
              @mouseenter="activeIndex = results.indexOf(item)"
              class="w-full flex items-center gap-3 px-4 py-2 text-left text-sm transition-colors"
              :class="results.indexOf(item) === activeIndex ? 'bg-surface-raised text-accent' : 'text-gray-300 hover:bg-surface-raised'"
            >
              <span class="text-muted text-xs shrink-0">>_</span>
              <div class="flex-1 min-w-0">
                <div class="truncate">{{ item.label }}</div>
                <div v-if="item.description" class="text-2xs text-muted truncate">{{ item.description }}</div>
              </div>
            </button>
          </div>
        </div>

        <!-- Footer hint -->
        <div class="border-t border-border px-4 py-2 flex items-center gap-4 text-2xs text-muted/50">
          <span><kbd class="border border-border rounded px-1 py-0.5">↑↓</kbd> navigate</span>
          <span><kbd class="border border-border rounded px-1 py-0.5">↵</kbd> select</span>
          <span><kbd class="border border-border rounded px-1 py-0.5">esc</kbd> close</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface PaletteItem {
  label: string
  path: string
  description?: string
  type: 'nav' | 'post'
}

const { t, locale } = useI18n()
const localePath = useLocalePath()
const router = useRouter()

const open = ref(false)
const query = ref('')
const activeIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

// Fetch posts for search
const { data: allPosts } = await useAsyncData(
  `palette-posts-${locale.value}`,
  () => queryCollection('blog')
    .where('lang', '=', locale.value)
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all()
)

const navItems = computed<PaletteItem[]>(() => [
  { label: t('nav.home'), path: '/', type: 'nav' },
  { label: t('nav.blog'), path: '/blog', type: 'nav' },
  { label: t('nav.projects'), path: '/projects', type: 'nav' },
  { label: t('nav.about'), path: '/about', type: 'nav' },
  { label: t('nav.now'), path: '/now', type: 'nav' },
  { label: t('nav.uses'), path: '/uses', type: 'nav' },
])

const postItems = computed<PaletteItem[]>(() => {
  if (!allPosts.value) return []
  return allPosts.value.map(p => ({
    label: p.title,
    path: `/blog/${p.stem?.split('/').pop()}`,
    description: p.description,
    type: 'post' as const,
  }))
})

const allItems = computed(() => [...navItems.value, ...postItems.value])

const results = computed<PaletteItem[]>(() => {
  if (!query.value) return allItems.value
  const q = query.value.toLowerCase()
  return allItems.value.filter(item =>
    item.label.toLowerCase().includes(q) ||
    item.description?.toLowerCase().includes(q) ||
    item.path.toLowerCase().includes(q)
  )
})

const navResults = computed(() => results.value.filter(r => r.type === 'nav'))
const postResults = computed(() => results.value.filter(r => r.type === 'post'))

watch(query, () => {
  activeIndex.value = 0
})

function toggle() {
  open.value = !open.value
  if (open.value) {
    query.value = ''
    activeIndex.value = 0
    nextTick(() => inputRef.value?.focus())
  }
}

function close() {
  open.value = false
}

function moveDown() {
  if (results.value.length === 0) return
  activeIndex.value = (activeIndex.value + 1) % results.value.length
}

function moveUp() {
  if (results.value.length === 0) return
  activeIndex.value = (activeIndex.value - 1 + results.value.length) % results.value.length
}

function selectCurrent() {
  const item = results.value[activeIndex.value]
  if (item) navigate(item.path)
}

function navigate(path: string) {
  close()
  router.push(localePath(path))
}

// Keyboard shortcut: Ctrl+K
if (import.meta.client) {
  const handler = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      toggle()
    }
  }
  onMounted(() => document.addEventListener('keydown', handler))
  onUnmounted(() => document.removeEventListener('keydown', handler))
}
</script>
