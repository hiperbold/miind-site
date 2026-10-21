'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useTheme } from './use-theme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])

  // SSR e primeira pintura do cliente: marcador estável para evitar diferença de hidratação
  if (!mounted) {
    return (
      <button
        aria-label="Alternar tema"
        className="relative w-9 h-9 rounded-full glass grid place-items-center overflow-hidden"
      >
        <Sun className="size-4 text-brand-cyan" />
      </button>
    )
  }

  const isDark = theme === 'dark'
  return (
    <button
      onClick={toggle}
      aria-label={`Ativar modo ${isDark ? 'claro' : 'escuro'}`}
      className="relative w-9 h-9 rounded-full glass grid place-items-center overflow-hidden hover:border-brand-cyan/40 transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 12, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -12, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.25 }}
          className="absolute"
        >
          {isDark ? <Sun className="size-4 text-brand-cyan" /> : <Moon className="size-4 text-brand-blue" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
