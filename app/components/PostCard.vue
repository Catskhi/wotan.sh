<template>
  <NuxtLink
    :to="localePath(`/blog/${post.stem?.split('/').pop()}`)"
    class="group block border-l-2 border-transparent hover:border-accent pl-4 py-3 transition-all duration-200 hover:bg-surface/50"
  >
    <!-- Meta row -->
    <div class="flex items-center gap-2 text-2xs text-muted mb-1.5">
      <time :datetime="post.date">{{ formatDate(post.date) }}</time>
      <span class="text-border-bright">/</span>
      <span>{{ post.category }}</span>
      <span v-if="readTime" class="text-border-bright">/</span>
      <span v-if="readTime">{{ readTime }} {{ t('common.min_read') }}</span>
    </div>

    <!-- Title -->
    <h3 class="text-sm font-medium text-gray-200 group-hover:text-accent transition-colors duration-200 mb-1">
      {{ post.title }}
    </h3>

    <!-- Description -->
    <p class="text-xs text-muted line-clamp-2 mb-2">
      {{ post.description }}
    </p>

    <!-- Tags -->
    <div class="flex flex-wrap gap-1.5">
      <TagBadge v-for="tag in post.tags" :key="tag" :tag="tag" />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  post: {
    title: string
    description: string
    date: string
    tags: string[]
    category: string
    stem?: string
    body?: string
    rawbody?: string
  }
  readTime?: number
}>()

const { t } = useI18n()
const localePath = useLocalePath()

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>
