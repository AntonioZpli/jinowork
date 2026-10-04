// ─── Pinia Store: Theme ──────────────────────────────────────────────────────
// Dark mode is enforced across the app.

import { defineStore } from 'pinia'
import { ref } from 'vue'

type Theme = 'dark'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>('dark')

  function applyTheme(t: Theme) {
    const html = document.documentElement
    html.classList.remove('dark', 'light')
    html.classList.add(t)
    localStorage.setItem('jinowork-theme', t)
  }

  applyTheme(theme.value)

  function toggle() {
    theme.value = 'dark'
    applyTheme(theme.value)
  }

  function setTheme(t: Theme) {
    theme.value = 'dark'
    applyTheme('dark')
  }

  return { theme, toggle, setTheme }
})
