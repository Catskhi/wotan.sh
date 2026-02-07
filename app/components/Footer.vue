<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border mt-auto">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-700">
        <span>{{ t('footer.built_with') }}</span>
        <span>&copy; {{ year }} {{ t('footer.copyright') }}</span>
      </div>
    </div>
  </footer>
</template>
