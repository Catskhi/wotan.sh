export interface Project {
  name: string
  description: string
  tech: string[]
  github?: string
  live?: string
}

export const PROJECTS: Project[] = [
  {
    name: '0xw0tan.dev',
    description: 'Personal site and tech blog. Built with Nuxt, Tailwind, and deployed on Cloudflare Pages.',
    tech: ['nuxt', 'tailwind', 'cloudflare'],
    github: 'https://github.com/0xw0tan/0xw0tan.dev',
    live: 'https://0xw0tan.dev',
  },
]
