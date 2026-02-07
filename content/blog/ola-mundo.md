---
title: "Ola Mundo"
description: "Primeiro post no blog — uma visao geral da stack e o que esperar."
date: 2026-02-05
tags: ["meta", "nuxt", "cloudflare"]
category: "til"
draft: false
lang: "pt-BR"
---

# Ola Mundo

Bem-vindo ao meu cantinho da internet. Este e o site pessoal e blog tech do **0xw0tan**.

## A Stack

Este site foi construido com:

- **Nuxt 3** para geracao de site estatico
- **Tailwind CSS** para estilizacao
- **Nuxt Content** para posts em Markdown
- **Cloudflare Pages** para deploy

## O que Esperar

Vou escrever sobre:

- Padroes e arquitetura de engenharia backend
- Pesquisa e write-ups de seguranca
- Ferramentas que construo e uso
- Coisas que aprendo ao longo do caminho

## Exemplo de Codigo

Um exemplo simples para testar o syntax highlighting:

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

Fique ligado para mais.
