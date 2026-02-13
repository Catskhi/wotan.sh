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
        surface: '#0c0c0c',
        'surface-raised': '#141414',
        border: '#1a1a1a',
        'border-bright': '#2a2a2a',
        muted: '#666666',
        accent: 'var(--color-accent)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        'theme-green': 'var(--color-green)',
        'theme-red': 'var(--color-red)',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', '"IBM Plex Mono"', 'monospace'],
        pixel: ['"WebPlus_ToshibaSat_8x14"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
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
            '--tw-prose-body': 'var(--prose-body)',
            '--tw-prose-headings': 'var(--prose-heading)',
            '--tw-prose-links': 'var(--color-accent)',
            '--tw-prose-bold': 'var(--prose-bold)',
            '--tw-prose-code': 'var(--prose-code)',
            '--tw-prose-pre-bg': 'var(--prose-pre-bg)',
            '--tw-prose-pre-code': 'var(--prose-body)',
            '--tw-prose-quotes': 'var(--prose-muted)',
            '--tw-prose-quote-borders': 'var(--prose-border)',
            '--tw-prose-counters': 'var(--prose-muted)',
            '--tw-prose-bullets': 'var(--prose-muted)',
            '--tw-prose-hr': 'var(--prose-border)',
            '--tw-prose-th-borders': 'var(--prose-border)',
            '--tw-prose-td-borders': 'var(--prose-border)',
            // Headings
            h1: {
              fontWeight: '600',
              letterSpacing: '-0.02em',
            },
            h2: {
              fontWeight: '600',
              letterSpacing: '-0.01em',
              marginTop: '2.5em',
              marginBottom: '0.8em',
            },
            h3: {
              fontWeight: '500',
              letterSpacing: '-0.01em',
              marginTop: '2em',
              marginBottom: '0.6em',
            },
            h4: {
              fontWeight: '500',
              marginTop: '1.5em',
            },
            // Paragraphs
            p: {
              lineHeight: '1.85',
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            // Lists
            li: {
              lineHeight: '1.8',
              marginTop: '0.3em',
              marginBottom: '0.3em',
            },
            'ul > li::marker': {
              color: 'var(--prose-muted)',
            },
            'ol > li::marker': {
              color: 'var(--prose-muted)',
            },
            // Links
            a: {
              fontWeight: '400',
              textDecoration: 'none',
            },
            'a:hover': {
              color: 'var(--prose-heading)',
            },
            // Inline code
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              backgroundColor: 'var(--prose-code-bg)',
              padding: '0.15em 0.4em',
              borderRadius: '0.2rem',
              fontWeight: '400',
              fontSize: '0.875em',
              border: '1px solid var(--prose-code-border)',
            },
            // Block quotes
            blockquote: {
              fontStyle: 'normal',
              borderLeftWidth: '2px',
              borderLeftColor: 'var(--prose-border)',
              paddingLeft: '1.25em',
            },
            'blockquote p:first-of-type::before': { content: '""' },
            'blockquote p:last-of-type::after': { content: '""' },
            // Horizontal rules
            hr: {
              borderColor: 'var(--prose-border)',
              marginTop: '2.5em',
              marginBottom: '2.5em',
            },
            // Strong
            strong: {
              fontWeight: '600',
            },
            // Images
            img: {
              borderRadius: '0.375rem',
              maxWidth: '100%',
              height: 'auto',
            },
            // Pre
            pre: {
              fontSize: '0.85em',
              lineHeight: '1.75',
            },
            // Tables
            thead: {
              borderBottomColor: 'var(--prose-border)',
            },
            'thead th': {
              fontWeight: '500',
              color: 'var(--prose-heading)',
              paddingBottom: '0.75em',
            },
            'tbody td': {
              paddingTop: '0.6em',
              paddingBottom: '0.6em',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
}
