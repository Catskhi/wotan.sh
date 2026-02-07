---
title: "Hello World"
description: "First post on the blog — a quick overview of the stack and what to expect."
date: 2026-02-05
tags: ["meta", "nuxt", "cloudflare"]
category: "til"
draft: false
lang: "en"
---

# Hello World

Welcome to my corner of the internet. This is **0xw0tan's** personal site and tech blog.

## The Stack

This site is built with:

- **Nuxt 3** for static site generation
- **Tailwind CSS** for styling
- **Nuxt Content** for Markdown-based blog posts
- **Cloudflare Pages** for deployment

## What to Expect

I'll be writing about:

- Backend engineering patterns and architecture
- Security research and write-ups
- Tools I build and use
- Things I learn along the way

## A Code Sample

Here's a simple example to test syntax highlighting:

```typescript
interface Post {
  title: string
  date: string
  tags: string[]
  draft: boolean
}

function getPublishedPosts(posts: Post[]): Post[] {
  return posts
    .filter(post => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
```

And some bash:

```bash
# deploy to cloudflare pages
npm run generate
npx wrangler pages deploy .output/public/
```

Stay tuned for more.
