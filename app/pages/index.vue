<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: '0xw0tan',
  description: t('hero.subtitle'),
})

const { data: recentPosts } = await useAsyncData(`recent-posts-${locale.value}`, () =>
  queryCollection('blog')
    .where('draft', '=', false)
    .where('lang', '=', locale.value)
    .order('date', 'DESC')
    .limit(5)
    .all()
)

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <div>
    <!-- Hero -->
    <TypingHero />

    <!-- Content below fold -->
    <div class="space-y-16 pb-16">

      <!-- Recent Posts -->
      <section v-if="recentPosts?.length">
        <div class="flex items-baseline justify-between mb-6">
          <h2 class="text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
            {{ t('blog.recent_posts') }}
          </h2>
          <NuxtLink
            :to="localePath('/blog')"
            class="text-xs text-gray-700 hover:text-white transition-colors"
          >
            {{ t('blog.view_all') }} &rarr;
          </NuxtLink>
        </div>

        <div class="divide-y divide-border">
          <NuxtLink
            v-for="post in recentPosts"
            :key="post.path"
            :to="post.path"
            class="group flex items-baseline gap-4 py-4 transition-colors"
          >
            <time class="text-xs text-gray-700 shrink-0 tabular-nums">
              {{ formatDate(post.date) }}
            </time>
            <div class="min-w-0">
              <span class="text-gray-300 group-hover:text-white transition-colors block truncate">
                {{ post.title }}
              </span>
              <span v-if="post.description" class="text-xs text-gray-600 block mt-1 truncate">
                {{ post.description }}
              </span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- About snippet -->
      <section>
        <h2 class="text-xs font-medium text-gray-500 uppercase tracking-[0.2em] mb-4">
          {{ t('about.bio_title') }}
        </h2>
        <p class="text-sm text-gray-500 leading-relaxed max-w-xl">
          {{ t('hero.subtitle') }}
        </p>
        <NuxtLink
          :to="localePath('/about')"
          class="inline-block mt-3 text-xs text-gray-700 hover:text-white transition-colors"
        >
          {{ t('common.read_more') }} &rarr;
        </NuxtLink>
      </section>
    </div>
  </div>
</template>
