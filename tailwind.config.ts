import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default <Config>{
  content: [
    './app/**/*.{vue,ts}',
    './content/**/*.md',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        surface: '#111111',
        border: '#222222',
        muted: '#777777',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', '"IBM Plex Mono"', 'monospace'],
        pixel: ['"WebPlus_ToshibaSat_8x14"', 'monospace'],
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#b5b5b5',
            '--tw-prose-headings': '#e0e0e0',
            '--tw-prose-links': '#ffffff',
            '--tw-prose-bold': '#e0e0e0',
            '--tw-prose-code': '#cccccc',
            '--tw-prose-pre-bg': '#0a0a0a',
            '--tw-prose-pre-code': '#b5b5b5',
            '--tw-prose-quotes': '#999999',
            '--tw-prose-quote-borders': '#444444',
            '--tw-prose-counters': '#999999',
            '--tw-prose-bullets': '#777777',
            '--tw-prose-hr': '#222222',
            '--tw-prose-th-borders': '#222222',
            '--tw-prose-td-borders': '#222222',
            'a:hover': {
              color: '#e0e0e0',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              backgroundColor: '#0a0a0a',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
}
