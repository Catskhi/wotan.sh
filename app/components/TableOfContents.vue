<template>
  <div v-if="links?.length" class="mb-8">
    <button
      @click="open = !open"
      class="flex items-center gap-2 text-xs text-muted hover:text-accent transition-colors mb-2"
    >
      <span>{{ open ? '[-]' : '[+]' }}</span>
      <span>table of contents</span>
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-96"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 max-h-96"
      leave-to-class="opacity-0 max-h-0"
    >
      <nav v-if="open" class="border-l border-border pl-3 overflow-hidden">
        <ul class="space-y-1">
          <li
            v-for="link in flatLinks"
            :key="link.id"
            :style="{ paddingLeft: `${(link.depth - 2) * 12}px` }"
          >
            <a
              :href="`#${link.id}`"
              class="text-xs text-muted hover:text-accent transition-colors block py-0.5"
            >
              {{ link.text }}
            </a>
          </li>
        </ul>
      </nav>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

const props = defineProps<{
  links: TocLink[]
}>()

const open = ref(true)

const flatLinks = computed(() => {
  const flat: TocLink[] = []
  function walk(items: TocLink[]) {
    for (const item of items) {
      flat.push(item)
      if (item.children?.length) walk(item.children)
    }
  }
  walk(props.links || [])
  return flat
})
</script>
