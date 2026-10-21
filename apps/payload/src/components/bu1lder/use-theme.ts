'use client'

import { useCallback, useEffect, useState } from 'react'

// Porte de apps/bu1lder/src/hooks/use-theme.ts.
export type Theme = 'dark' | 'light'
const STORAGE_KEY = 'bu1lder-theme'

function getInitial(): Theme {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.classList.contains('light') ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitial)

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === 'light' || e.newValue === 'dark')) {
        applyTheme(e.newValue)
        setThemeState(e.newValue)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const setTheme = useCallback((t: Theme) => {
    applyTheme(t)
    try {
      localStorage.setItem(STORAGE_KEY, t)
    } catch {}
    setThemeState(t)
    window.dispatchEvent(new CustomEvent('themechange', { detail: t }))
  }, [])

  const toggle = useCallback(() => setTheme(theme === 'dark' ? 'light' : 'dark'), [theme, setTheme])

  return { theme, setTheme, toggle }
}

function applyTheme(t: Theme) {
  const r = document.documentElement
  if (t === 'light') r.classList.add('light')
  else r.classList.remove('light')
  r.style.colorScheme = t
}
