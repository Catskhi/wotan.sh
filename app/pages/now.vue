<script setup lang="ts">
useSeoMeta({
  title: 'Now | 0xw0tan',
  description: 'What I\'m currently working on and thinking about.',
})
</script>

<template>
  <div>
    <header class="mb-10">
      <h1 class="text-xl font-bold text-gray-100 mb-2">Now</h1>
      <p class="text-sm text-gray-600">
        What I'm currently focused on.
        <span class="text-gray-700">Updated February 2026.</span>
      </p>
    </header>

    <div class="space-y-8 text-sm text-gray-400 leading-relaxed max-w-xl">
      <section>
        <h2 class="text-xs font-medium text-gray-500 uppercase tracking-[0.2em] mb-3">
          Building
        </h2>
        <ul class="space-y-2">
          <li>This personal site — iterating on design and writing new posts.</li>
          <li>Security tooling in Go — lightweight scanners and automation.</li>
          <li>Contributing to open source projects in the backend/infra space.</li>
        </ul>
      </section>

      <section>
        <h2 class="text-xs font-medium text-gray-500 uppercase tracking-[0.2em] mb-3">
          Learning
        </h2>
        <ul class="space-y-2">
          <li>Low-level systems programming — diving deeper into memory management and OS internals.</li>
          <li>Malware analysis and reverse engineering techniques.</li>
          <li>Rust — exploring it for performance-critical security tools.</li>
        </ul>
      </section>

      <section>
        <h2 class="text-xs font-medium text-gray-500 uppercase tracking-[0.2em] mb-3">
          Reading
        </h2>
        <ul class="space-y-2">
          <li>Security research papers and CTF writeups.</li>
          <li>Technical blogs from engineers I respect.</li>
        </ul>
      </section>
    </div>

    <p class="text-xs text-gray-700 mt-12">
      Inspired by <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" class="hover:text-gray-400 transition-colors">nownownow.com</a>.
    </p>
  </div>
</template>
