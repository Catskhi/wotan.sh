<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <CommandPalette />
    <main class="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-8">
      <slot />
    </main>
    <Footer />
  </div>
</template>
