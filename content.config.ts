import { defineCollection, z } from '@nuxt/content'

export const collections = {
  blog: defineCollection({
    type: 'page',
    source: 'blog/**/*.md',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
      tags: z.array(z.string()).default([]),
      category: z.enum(['write-up', 'deep-dive', 'til', 'project', 'tool', 'opinion']).default('deep-dive'),
      draft: z.boolean().default(false),
      lang: z.enum(['en', 'pt-BR']).default('en'),
    }),
  }),
}
