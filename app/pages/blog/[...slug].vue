<script setup lang="ts">
const { t, locale, defaultLocale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const contentPath = computed(() => {
  const path = route.path
  if (locale.value !== defaultLocale && path.startsWith(`/${locale.value}`)) {
    return path.slice(`/${locale.value}`.length) || '/'
  }
  return path
})

const { data: post } = await useAsyncData(`post-${route.path}`, () =>
  queryCollection('blog').path(contentPath.value).first()
)

if (post.value) {
  useSeoMeta({
    title: `${post.value.title} | 0xw0tan`,
    description: post.value.description,
    ogTitle: post.value.title,
    ogDescription: post.value.description,
  })
}

// Estimate reading time from body text
const readingTime = computed(() => {
  try {
    if (!post.value?.body) return null
    const parts: string[] = []
    function walk(node: any) {
      if (!node) return
      if (typeof node === 'string') { parts.push(node); return }
      if (typeof node.value === 'string') { parts.push(node.value) }
      if (Array.isArray(node.children)) node.children.forEach(walk)
    }
    walk(post.value.body)
    const text = parts.join(' ')
    if (!text) return null
    const words = text.trim().split(/\s+/).length
    return Math.max(1, Math.ceil(words / 200))
  } catch {
    return null
  }
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div v-if="post">
    <ReadingProgress />

    <article>
      <header class="mb-8 pb-6 border-b border-border">
        <NuxtLink
          :to="localePath('/blog')"
          class="text-sm text-gray-700 hover:text-white transition-colors mb-4 inline-block"
        >
          &larr; {{ t('common.back') }}
        </NuxtLink>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-100 mt-2 mb-3">
          {{ post.title }}
        </h1>
        <div class="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <time>{{ formatDate(post.date) }}</time>
          <span v-if="post.category" class="text-gray-700">{{ post.category }}</span>
          <span v-if="readingTime" class="text-gray-700">&middot; {{ readingTime }} {{ t('common.min_read') }}</span>
        </div>
        <div v-if="post.tags?.length" class="flex flex-wrap gap-2 mt-3">
          <TagBadge v-for="tag in post.tags" :key="tag" :tag="tag" />
        </div>
      </header>

      <!-- Table of contents -->
      <TableOfContents v-if="post.body?.toc?.links" :links="post.body.toc.links" />

      <div class="prose prose-invert max-w-none prose-headings:scroll-mt-20 prose-p:leading-[1.8] prose-li:leading-[1.8]">
        <ContentRenderer :value="post" />
      </div>
    </article>
  </div>
  <div v-else class="text-center py-20">
    <p class="text-gray-600">Post not found.</p>
    <NuxtLink
      :to="localePath('/blog')"
      class="text-sm text-gray-500 hover:text-white transition-colors mt-4 inline-block"
    >
      &larr; {{ t('common.back') }}
    </NuxtLink>
  </div>
</template>
