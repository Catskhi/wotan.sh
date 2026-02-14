<template>
  <div>
    <!-- Full-screen hero breaks out of the constrained layout -->
    <div class="hero-breakout">
      <SkullHero />
    </div>

    <!-- Recent posts section -->
    <section class="mt-2">
      <BoxDivider :label="t('blog.recent_posts')" :runes="true" />

      <div class="space-y-2">
        <PostCard
          v-for="post in posts"
          :key="post.stem"
          :post="post"
        />
      </div>

      <div v-if="posts?.length" class="mt-6 text-center">
        <NuxtLink
          :to="localePath('/blog')"
          class="text-xs text-muted hover:text-accent transition-colors"
        >
          {{ t('blog.view_all') }} &rarr;
        </NuxtLink>
      </div>
    </section>

    <!-- About snippet -->
    <section class="mt-12">
      <BoxDivider :label="t('about.bio_title')" :runes="true" />
      <p class="text-sm text-gray-300 leading-relaxed mb-3">
        {{ t('about.bio_p1') }}
      </p>
      <NuxtLink
        :to="localePath('/about')"
        class="text-xs text-muted hover:text-accent transition-colors"
      >
        {{ t('common.read_more') }} &rarr;
      </NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const { data: posts } = await useAsyncData(
  'home-posts',
  () => queryCollection('blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .limit(5)
    .all()
)

useHead({
  title: '0xw0tan',
})
</script>

<style scoped>
.hero-breakout {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}
</style>
