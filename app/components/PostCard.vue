<script setup lang="ts">
defineProps<{
  post: {
    path: string
    title: string
    description: string
    date: string
    tags: string[]
  }
}>()

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <article class="group border border-border rounded-lg p-4 sm:p-5 hover:border-gray-700 transition-colors">
    <NuxtLink :to="post.path" class="block space-y-2">
      <time class="text-xs text-gray-700 tabular-nums">{{ formatDate(post.date) }}</time>
      <h3 class="text-base font-medium text-gray-200 group-hover:text-white transition-colors">
        {{ post.title }}
      </h3>
      <p class="text-sm text-gray-600 line-clamp-2">
        {{ post.description }}
      </p>
      <div v-if="post.tags?.length" class="flex flex-wrap gap-2 pt-1">
        <TagBadge v-for="tag in post.tags" :key="tag" :tag="tag" />
      </div>
    </NuxtLink>
  </article>
</template>
