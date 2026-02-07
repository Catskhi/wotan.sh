<script setup lang="ts">
defineProps<{
  links: Array<{
    id: string
    text: string
    depth: number
    children?: Array<{ id: string; text: string; depth: number }>
  }>
}>()

const open = ref(false)
</script>

<template>
  <nav v-if="links?.length" class="border border-border rounded-lg mb-8">
    <button
      class="w-full flex items-center justify-between px-4 py-3 text-xs text-gray-500 uppercase tracking-[0.2em] hover:text-gray-300 transition-colors"
      @click="open = !open"
    >
      <span>Table of Contents</span>
      <span class="text-gray-700 transition-transform duration-200" :class="open && 'rotate-180'">
        &#9660;
      </span>
    </button>
    <div v-show="open" class="px-4 pb-4 space-y-1">
      <template v-for="link in links" :key="link.id">
        <a
          :href="`#${link.id}`"
          class="block text-sm text-gray-600 hover:text-white transition-colors py-1"
          @click="open = false"
        >
          {{ link.text }}
        </a>
        <template v-if="link.children?.length">
          <a
            v-for="child in link.children"
            :key="child.id"
            :href="`#${child.id}`"
            class="block text-sm text-gray-700 hover:text-gray-300 transition-colors py-1 pl-4"
            @click="open = false"
          >
            {{ child.text }}
          </a>
        </template>
      </template>
    </div>
  </nav>
</template>
