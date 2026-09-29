// ─── Pinia Store: Theme ──────────────────────────────────────────────────────
// Handles dark/light mode toggle with localStorage persistence.

import { defineStore } from 'pinia'
import { ref } from 'vue'

type Theme = 'dark' | 'light'

export const useThemeStore = defineStore('theme', () => {
  const stored = localStorage.getItem('jinowork-theme') as Theme | null
  const theme = ref<Theme>(stored ?? 'dark')

  function applyTheme(t: Theme) {
    const html = document.documentElement
    html.classList.remove('dark', 'light')
    html.classList.add(t)
    localStorage.setItem('jinowork-theme', t)
  }

  // Apply on init
  applyTheme(theme.value)

  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    applyTheme(theme.value)
  }

  function setTheme(t: Theme) {
    theme.value = t
    applyTheme(t)
  }

  return { theme, toggle, setTheme }
})
