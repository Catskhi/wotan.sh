<script setup lang="ts">
useSeoMeta({
  title: 'Uses | 0xw0tan',
  description: 'Tools, hardware, and software I use daily.',
})

const sections = [
  {
    title: 'Editor & Terminal',
    items: [
      { name: 'Neovim', description: 'Primary editor. Custom config with LSP, Treesitter, Telescope.' },
      { name: 'Alacritty', description: 'GPU-accelerated terminal emulator. Fast and minimal.' },
      { name: 'tmux', description: 'Terminal multiplexer. Session management and split panes.' },
      { name: 'zsh + starship', description: 'Shell with a minimal, informative prompt.' },
    ],
  },
  {
    title: 'Development',
    items: [
      { name: 'Docker', description: 'Containerized development and deployment.' },
      { name: 'Git', description: 'Version control. CLI only, no GUI.' },
      { name: 'Postman / curl', description: 'API testing and debugging.' },
      { name: 'DBeaver', description: 'Database management when needed.' },
    ],
  },
  {
    title: 'Security',
    items: [
      { name: 'Burp Suite', description: 'Web application security testing.' },
      { name: 'Wireshark', description: 'Network protocol analysis.' },
      { name: 'Ghidra', description: 'Reverse engineering and binary analysis.' },
      { name: 'nmap', description: 'Network discovery and security auditing.' },
    ],
  },
  {
    title: 'Hardware',
    items: [
      { name: 'ThinkPad', description: 'Daily driver. Reliable, repairable, Linux-friendly.' },
      { name: 'Arch Linux', description: 'BTW. Rolling release, minimal base.' },
      { name: 'Mechanical keyboard', description: 'Cherry MX switches. No RGB.' },
    ],
  },
]
</script>

<template>
  <div>
    <header class="mb-10">
      <h1 class="text-xl font-bold text-gray-100 mb-2">Uses</h1>
      <p class="text-sm text-gray-600">Tools, hardware, and software I use daily.</p>
    </header>

    <div class="space-y-10">
      <section v-for="section in sections" :key="section.title">
        <h2 class="text-xs font-medium text-gray-500 uppercase tracking-[0.2em] mb-4">
          {{ section.title }}
        </h2>
        <div class="space-y-3">
          <div
            v-for="item in section.items"
            :key="item.name"
            class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-2 border-b border-border/50"
          >
            <span class="text-sm text-gray-200 shrink-0 sm:w-40">{{ item.name }}</span>
            <span class="text-sm text-gray-600">{{ item.description }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
