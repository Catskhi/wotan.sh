<template>
  <div>
    <header class="mb-8">
      <h1 class="text-xl font-semibold text-gray-100 mb-1">
        {{ t('blog.title') }}
      </h1>
      <p class="text-sm text-muted">
        {{ t('blog.description') }}
      </p>
    </header>

    <!-- Category filter -->
    <div v-if="allCategories.length" class="flex flex-wrap gap-2 mb-4">
      <button
        class="text-xs font-mono px-2 py-0.5 border transition-colors"
        :class="!activeCategory ? 'border-accent text-accent' : 'border-border text-muted hover:text-accent hover:border-accent/50'"
        @click="activeCategory = ''; activeTag = ''"
      >
        {{ t('blog.all_categories') }}
      </button>
      <button
        v-for="cat in allCategories"
        :key="cat"
        class="text-xs font-mono px-2 py-0.5 border transition-colors"
        :class="activeCategory === cat ? 'border-accent text-accent' : 'border-border text-muted hover:text-accent hover:border-accent/50'"
        @click="activeCategory = activeCategory === cat ? '' : cat; activeTag = ''"
      >
        {{ t(`blog.categories.${cat}`) }}
      </button>
    </div>

    <!-- Tag filter -->
    <div v-if="allTags.length" class="flex flex-wrap gap-1.5 mb-6">
      <TagBadge
        :tag="t('blog.all_tags')"
        :clickable="true"
        :active="!activeTag"
        @click="activeTag = ''"
      />
      <TagBadge
        v-for="tag in allTags"
        :key="tag"
        :tag="tag"
        :clickable="true"
        :active="activeTag === tag"
        @click="activeTag = activeTag === tag ? '' : tag"
      />
    </div>

    <BoxDivider />

    <!-- Posts list -->
    <div v-if="filteredPosts.length" class="space-y-2">
      <PostCard
        v-for="post in filteredPosts"
        :key="post.stem"
        :post="post"
      />
    </div>

    <p v-else class="text-sm text-muted py-8 text-center">
      {{ t('blog.no_posts') }}
    </p>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const { data: posts } = await useAsyncData(
  'blog-posts',
  () => queryCollection('blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all()
)

const activeCategory = ref('')
const activeTag = ref('')

const allCategories = computed(() => {
  if (!posts.value) return []
  const cats = new Set<string>()
  posts.value.forEach(p => { if (p.category) cats.add(p.category) })
  return [...cats].sort()
})

const allTags = computed(() => {
  if (!posts.value) return []
  const tags = new Set<string>()
  const source = activeCategory.value
    ? posts.value.filter(p => p.category === activeCategory.value)
    : posts.value
  source.forEach(p => p.tags?.forEach(t => tags.add(t)))
  return [...tags].sort()
})

const filteredPosts = computed(() => {
  if (!posts.value) return []
  let result = posts.value
  if (activeCategory.value) {
    result = result.filter(p => p.category === activeCategory.value)
  }
  if (activeTag.value) {
    result = result.filter(p => p.tags?.includes(activeTag.value))
  }
  return result
})

useHead({
  title: `${t('blog.title')} - 0xw0tan`,
})
</script>
