<template>
  <footer class="border-t border-border mt-auto">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <!-- Box-drawing top border with rune decoration -->
      <BoxDivider :runes="true" class="!my-0 mb-4" />

      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <SocialLinks class="text-sm" />
          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            class="text-muted hover:text-accent transition-colors text-xs"
            aria-label="RSS Feed"
          >
            [rss]
          </a>
        </div>
        <div class="text-2xs text-muted text-center sm:text-right">
          <p>{{ t('footer.built_with') }}</p>
          <p class="mt-0.5">&copy; {{ year }} {{ t('footer.copyright') }} <span class="text-border-bright">ᚨ</span></p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()
</script>
