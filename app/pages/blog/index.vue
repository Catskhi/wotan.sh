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
const { t, locale } = useI18n()

const { data: posts } = await useAsyncData(
  `blog-posts-${locale.value}`,
  () => queryCollection('blog')
    .where('lang', '=', locale.value)
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all()
)

const activeTag = ref('')

const allTags = computed(() => {
  if (!posts.value) return []
  const tags = new Set<string>()
  posts.value.forEach(p => p.tags?.forEach(t => tags.add(t)))
  return [...tags].sort()
})

const filteredPosts = computed(() => {
  if (!posts.value) return []
  if (!activeTag.value) return posts.value
  return posts.value.filter(p => p.tags?.includes(activeTag.value))
})

useHead({
  title: `${t('blog.title')} - 0xw0tan`,
})
</script>
