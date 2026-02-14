export type ThemeId = 'w0tan' | 'catppuccin' | 'tokyo-night' | 'gruvbox' | 'dracula' | 'anonymous' | 'bloodmoon'

export interface ThemeOption {
  id: ThemeId
  name: string
  accent: string
}

export const THEMES: ThemeOption[] = [
  { id: 'anonymous', name: 'Anonymous', accent: '#ffffff' },
  { id: 'w0tan', name: 'W0tan', accent: '#b0bcc8' },
  { id: 'catppuccin', name: 'Catppuccin', accent: '#cba6f7' },
  { id: 'tokyo-night', name: 'Tokyo Night', accent: '#7aa2f7' },
  { id: 'gruvbox', name: 'Gruvbox', accent: '#fe8019' },
  { id: 'dracula', name: 'Dracula', accent: '#bd93f9' },
  { id: 'bloodmoon', name: 'Bloodmoon', accent: '#ff3333' },
]

export function useTheme() {
  const current = useState<ThemeId>('theme', () => 'anonymous')

  function setTheme(id: ThemeId) {
    current.value = id
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', id === 'anonymous' ? '' : id)
      localStorage.setItem('theme', id)
    }
  }

  function initTheme() {
    if (import.meta.client) {
      const saved = localStorage.getItem('theme') as ThemeId | null
      if (saved && THEMES.some(t => t.id === saved)) {
        setTheme(saved)
      }
    }
  }

  return { current, setTheme, initTheme, themes: THEMES }
}
