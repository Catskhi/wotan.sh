export type ThemeId = 'catppuccin' | 'tokyo-night' | 'gruvbox' | 'dracula' | 'anonymous' | 'bloodmoon'

export interface ThemeOption {
  id: ThemeId
  name: string
  accent: string
}

export const THEMES: ThemeOption[] = [
  { id: 'catppuccin', name: 'Catppuccin', accent: '#cba6f7' },
  { id: 'tokyo-night', name: 'Tokyo Night', accent: '#7aa2f7' },
  { id: 'gruvbox', name: 'Gruvbox', accent: '#fe8019' },
  { id: 'dracula', name: 'Dracula', accent: '#bd93f9' },
  { id: 'anonymous', name: 'Anonymous', accent: '#ffffff' },
  { id: 'bloodmoon', name: 'Bloodmoon', accent: '#ff3333' },
]

export function useTheme() {
  const current = useState<ThemeId>('theme', () => 'catppuccin')

  function setTheme(id: ThemeId) {
    current.value = id
    if (import.meta.client) {
      const attr = id === 'catppuccin' ? '' : id
      document.documentElement.setAttribute('data-theme', attr)
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
