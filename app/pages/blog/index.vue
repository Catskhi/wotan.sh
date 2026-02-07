<script setup lang="ts">
const { t, locale } = useI18n()

useSeoMeta({
  title: `${t('blog.title')} | 0xw0tan`,
  description: t('blog.description'),
})

const { data: posts } = await useAsyncData(`blog-posts-${locale.value}`, () =>
  queryCollection('blog')
    .where('draft', '=', false)
    .where('lang', '=', locale.value)
    .order('date', 'DESC')
    .all()
)

const allTags = computed(() => {
  if (!posts.value) return []
  const tagSet = new Set<string>()
  posts.value.forEach((p) => p.tags?.forEach((t: string) => tagSet.add(t)))
  return Array.from(tagSet).sort()
})

const activeTag = ref<string | null>(null)

const filteredPosts = computed(() => {
  if (!posts.value) return []
  if (!activeTag.value) return posts.value
  return posts.value.filter((p) => p.tags?.includes(activeTag.value!))
})

function toggleTag(tag: string) {
  activeTag.value = activeTag.value === tag ? null : tag
}
</script>

<template>
  <div>
    <header class="mb-8">
      <h1 class="text-xl font-bold text-gray-100 mb-2">{{ t('blog.title') }}</h1>
      <p class="text-sm text-gray-600">{{ t('blog.description') }}</p>
    </header>

    <div v-if="allTags.length" class="flex flex-wrap gap-2 mb-8">
      <TagBadge
        :tag="t('blog.all_tags')"
        :active="!activeTag"
        clickable
        @click="activeTag = null"
      />
      <TagBadge
        v-for="tag in allTags"
        :key="tag"
        :tag="tag"
        :active="activeTag === tag"
        clickable
        @click="toggleTag(tag)"
      />
    </div>

    <div v-if="filteredPosts.length" class="space-y-4">
      <PostCard v-for="post in filteredPosts" :key="post.path" :post="post" />
    </div>
    <p v-else class="text-gray-600 text-sm">{{ t('blog.no_posts') }}</p>
  </div>
</template>
