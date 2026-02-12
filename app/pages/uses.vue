<template>
  <div>
    <header class="mb-8">
      <h1 class="text-xl font-semibold text-gray-100 mb-1">
        $ {{ t('uses.title') }}
      </h1>
      <p class="text-sm text-muted">
        {{ t('uses.description') }}
      </p>
    </header>

    <BoxDivider />

    <section v-for="category in categories" :key="category.title" class="mb-8">
      <h2 class="text-sm font-medium text-gray-200 mb-4 flex items-center gap-2">
        <span class="text-accent">></span> {{ category.title }}
      </h2>

      <div class="space-y-3">
        <div
          v-for="item in category.items"
          :key="item.name"
          class="border-l-2 border-transparent hover:border-accent/30 pl-4 py-1.5 transition-colors"
        >
          <div class="flex items-baseline gap-2">
            <span class="text-sm text-gray-200 font-medium">{{ item.name }}</span>
            <span v-if="item.detail" class="text-2xs text-muted">{{ item.detail }}</span>
          </div>
          <p v-if="item.description" class="text-xs text-muted mt-0.5">
            {{ item.description }}
          </p>
        </div>
      </div>

      <BoxDivider class="mt-6" />
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

interface UsesItem {
  name: string
  detail?: string
  description?: string
}

interface UsesCategory {
  title: string
  items: UsesItem[]
}

const categories: UsesCategory[] = [
  {
    title: 'Editor & Terminal',
    items: [
      { name: 'Neovim', detail: 'primary editor', description: 'LazyVim config with custom keybindings. Fast, modal, and stays out of the way.' },
      { name: 'VS Code', detail: 'secondary', description: 'For larger projects, debugging, and when I need a GUI.' },
      { name: 'Alacritty', description: 'GPU-accelerated terminal. Minimal config, maximum speed.' },
      { name: 'tmux', description: 'Terminal multiplexer. Splits, sessions, and persistent workspaces.' },
      { name: 'fish shell', description: 'Autosuggestions and syntax highlighting out of the box.' },
    ],
  },
  {
    title: 'Development',
    items: [
      { name: 'Docker', description: 'Containerize everything. Dev environments, databases, services.' },
      { name: 'Git', detail: '+ lazygit', description: 'lazygit for interactive staging. git CLI for everything else.' },
      { name: 'IntelliJ IDEA', detail: 'for Java/Spring', description: 'When the JVM needs a proper IDE.' },
      { name: 'Postman / httpie', description: 'API testing. httpie for quick CLI requests, Postman for collections.' },
      { name: 'DBeaver', description: 'Database client for PostgreSQL, MySQL, and everything else.' },
    ],
  },
  {
    title: 'Security & CTF',
    items: [
      { name: 'Burp Suite', description: 'Web application security testing. The standard.' },
      { name: 'Ghidra', description: 'Reverse engineering framework. NSA-built, surprisingly good.' },
      { name: 'pwntools', detail: 'Python', description: 'CTF framework for binary exploitation.' },
      { name: 'Nmap / Masscan', description: 'Network scanning and enumeration.' },
      { name: 'Wireshark', description: 'Packet analysis when things get weird.' },
    ],
  },
  {
    title: 'Hardware',
    items: [
      { name: 'Linux', detail: 'Arch btw', description: 'Daily driver. i3wm tiling window manager.' },
      { name: 'Mechanical keyboard', detail: 'custom', description: 'Tactile switches. Life is too short for mushy keys.' },
    ],
  },
]

useHead({
  title: `${t('uses.title')} - 0xw0tan`,
})
</script>
