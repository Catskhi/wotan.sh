<template>
  <div v-if="post">
    <ReadingProgress />

    <!-- Back link -->
    <NuxtLink
      :to="localePath('/blog')"
      class="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors mb-6"
    >
      &larr; {{ t('common.back') }}
    </NuxtLink>

    <!-- Post header -->
    <header class="mb-8">
      <div class="flex items-center gap-2 text-2xs text-muted mb-3">
        <time :datetime="post.date">{{ formatDate(post.date) }}</time>
        <span class="text-border-bright">᛬</span>
        <span>{{ post.category }}</span>
        <span class="text-border-bright">᛬</span>
        <span>{{ readTime }} {{ t('common.min_read') }}</span>
      </div>

      <h1 class="text-xl sm:text-2xl font-semibold text-gray-100 mb-3">
        {{ post.title }}
      </h1>

      <p v-if="post.description" class="text-sm text-muted mb-4">
        {{ post.description }}
      </p>

      <div class="flex flex-wrap gap-1.5">
        <TagBadge v-for="tag in post.tags" :key="tag" :tag="tag" />
      </div>
    </header>

    <!-- Table of Contents -->
    <TableOfContents v-if="toc?.links?.length" :links="toc.links" />

    <BoxDivider />

    <!-- Content -->
    <article class="prose max-w-none">
      <ContentRenderer :value="post" />
    </article>

    <BoxDivider />

    <!-- Back link bottom -->
    <div class="mt-8">
      <NuxtLink
        :to="localePath('/blog')"
        class="text-xs text-muted hover:text-accent transition-colors"
      >
        &larr; {{ t('common.back') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { estimateReadingTime } from '~/utils/readingTime'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const slug = (route.params.slug as string[])?.join('/') || ''

const { data: post } = await useAsyncData(
  `blog-post-${slug}`,
  () => queryCollection('blog')
    .where('stem', '=', `blog/${slug}`)
    .first()
)

const toc = computed(() => {
  if (!post.value) return { links: [] }
  return (post.value as any).body?.toc || { links: [] }
})

const readTime = computed(() => {
  if (!post.value) return 0
  const raw = (post.value as any).rawbody || (post.value as any).body?.raw || ''
  return raw ? estimateReadingTime(raw) : 1
})

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// SEO
useHead({
  title: () => post.value ? `${post.value.title} - 0xw0tan` : '0xw0tan',
  meta: [
    { name: 'description', content: () => post.value?.description || '' },
  ],
})
</script>
