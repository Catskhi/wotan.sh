# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal site and tech blog for **0xw0tan**. Static-generated site with blog posts in Markdown/MDX, dark hacker/terminal aesthetic.

## Stack

- **Nuxt 3** — Vue meta-framework with SSG via `nuxt generate`
- **Nuxt Content** — Markdown/MDX content management
- **Tailwind CSS** — styling
- **Shiki** — syntax highlighting (built into Nuxt Content)
- **Cloudflare Pages** — deployment target

## Commands

```bash
npm run dev        # Start dev server
npm run generate   # Static site generation (output: .output/public/)
npm run preview    # Preview production build locally
npm run build      # Build for server/hybrid rendering
```

## Architecture

- `content/blog/` — Markdown/MDX blog posts with YAML frontmatter
- `components/` — Vue components (Header, Footer, PostCard, Tag, etc.)
- `layouts/` — Layout wrappers (default, post)
- `pages/` — File-based routing (index, about, projects, blog/index, blog/[...slug])
- `assets/css/` — Global styles
- `public/` — Static assets (favicon, OG image)

## Blog Post Frontmatter

```yaml
---
title: "Post Title"
description: "Short description for SEO and preview"
date: 2026-02-05
tags: ["backend", "java", "spring-boot"]
category: "deep-dive"  # write-up | deep-dive | til | project | tool | opinion
draft: false
---
```

## Design Constraints

- **Dark mode only** (or dark by default)
- Monospace font (JetBrains Mono, Fira Code, or IBM Plex Mono)
- Palette: dark background (#0a0a0a), terminal green (#00ff41) as accent, white/light gray for text
- Minimalist — no excessive animations
- Terminal/hacker aesthetic (blinking cursor, ASCII art, dark code blocks with copy button)

## Deploy

Push to `main` triggers automatic build on Cloudflare Pages. Build command: `nuxt generate`, output directory: `.output/public/`.
