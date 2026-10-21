'use client'

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { botaoClasses } from '@/components/ui/button'

import { BrandLockup } from '../BrandLockup'
import { ThemeToggle } from '../ThemeToggle'

// Porte de Header.tsx + MobileMenu.tsx da homepage (apps/bu1lder/src/components/site).
export type ItemMenu = { rotulo: string; url: string }

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1]
const idDoLink = (url: string) => (url.startsWith('#') ? url.slice(1) : null)

export function CabecalhoPlataforma({
  itens,
  textoBotao,
  textoBotaoCelular,
  urlBotao,
}: {
  itens: ItemMenu[]
  textoBotao?: string | null
  textoBotaoCelular?: string | null
  urlBotao?: string | null
}) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  const scaleX = reduced ? scrollYProgress : smooth
  const destino = urlBotao || '#contato'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const targets = itens
      .map((i) => idDoLink(i.url))
      .map((id) => (id ? document.getElementById(id) : null))
      .filter((el): el is HTMLElement => Boolean(el))
    if (targets.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.01, 0.5, 1] },
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [itens])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl bg-background/70 border-b border-border/80' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div
        className={`container-editorial flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'h-14' : 'h-16'
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/bu1lder/" className="flex items-center gap-2 group">
          <BrandLockup />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {itens.map((item) => {
            const isActive = activeId !== null && activeId === idDoLink(item.url)
            return (
              <a
                key={item.url}
                href={item.url}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative text-sm transition-colors py-1 ${
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.rotulo}
                <span
                  className={`pointer-events-none absolute left-0 -bottom-0.5 h-px w-full origin-left bg-gradient-to-r from-brand-cyan to-brand-blue transition-transform duration-300 ease-out ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            )
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle />
          {textoBotao && (
            <a
              href={destino}
              className={botaoClasses({
                size: 'sm',
                className:
                  'bg-gradient-to-r from-brand-cyan to-brand-blue text-background hover:opacity-90 motion-safe:hover:-translate-y-0.5 transition-all duration-300 shadow-[0_8px_30px_-8px_oklch(0.82_0.14_210/0.6)] hover:shadow-[0_12px_40px_-10px_oklch(0.82_0.14_210/0.8)]',
              })}
            >
              {textoBotao}
            </a>
          )}
        </div>

        <button
          className="lg:hidden relative p-2 rounded-md hover:bg-white/5 active:bg-white/10 transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="relative grid place-items-center size-5">
            <motion.span
              animate={{ opacity: open ? 0 : 1, rotate: open ? -90 : 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.25, ease: EASE_OUT_EXPO }}
              className="absolute inset-0 grid place-items-center"
            >
              <Menu className="size-5" />
            </motion.span>
            <motion.span
              animate={{ opacity: open ? 1 : 0, rotate: open ? 0 : 90 }}
              transition={reduced ? { duration: 0 } : { duration: 0.25, ease: EASE_OUT_EXPO }}
              className="absolute inset-0 grid place-items-center"
            >
              <X className="size-5" />
            </motion.span>
          </span>
        </button>
      </div>

      <motion.div
        style={{ scaleX, transformOrigin: 'left' }}
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <MenuCelular
        open={open}
        onClose={() => setOpen(false)}
        activeId={activeId}
        scrolled={scrolled}
        itens={itens}
        textoBotao={textoBotaoCelular}
        urlBotao={destino}
      />
    </header>
  )
}

function MenuCelular({
  open,
  onClose,
  activeId,
  scrolled,
  itens,
  textoBotao,
  urlBotao,
}: {
  open: boolean
  onClose: () => void
  activeId: string | null
  scrolled: boolean
  itens: ItemMenu[]
  textoBotao?: string | null
  urlBotao: string
}) {
  const reduced = useReducedMotion()
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => firstLinkRef.current?.focus(), reduced ? 0 : 120)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [open, onClose, reduced])

  const fade = reduced
    ? { initial: false as const, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0 } }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } }
  const panelAnim = reduced
    ? { initial: false as const, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.28, ease: EASE_OUT_EXPO },
      }
  const containerVariants = reduced
    ? { hidden: {}, show: {} }
    : { hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }
  const itemVariants = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0, transition: { duration: 0.22, ease: EASE_OUT_EXPO } } }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            {...fade}
            onClick={onClose}
            className={`lg:hidden fixed inset-x-0 bottom-0 z-40 bg-background/60 backdrop-blur-sm ${
              scrolled ? 'top-14' : 'top-16'
            }`}
            aria-hidden="true"
          />
          <motion.div
            key="panel"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            {...panelAnim}
            className="lg:hidden fixed left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl"
            style={{ top: scrolled ? '3.5rem' : '4rem' }}
          >
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={containerVariants}
              className="container-editorial py-4 flex flex-col gap-1"
            >
              {itens.map((item, i) => {
                const isActive = activeId !== null && activeId === idDoLink(item.url)
                return (
                  <motion.a
                    key={item.url}
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={item.url}
                    onClick={onClose}
                    aria-current={isActive ? 'page' : undefined}
                    variants={itemVariants}
                    whileTap={reduced ? undefined : { scale: 0.98 }}
                    className={`group flex items-center gap-3 text-sm py-2.5 rounded-md transition-all duration-200 ${
                      isActive
                        ? 'bg-white/[0.04] border-l-2 border-brand-cyan pl-3 font-medium text-foreground'
                        : 'border-l-2 border-transparent pl-3 text-muted-foreground hover:text-foreground motion-safe:hover:translate-x-0.5'
                    }`}
                  >
                    <span className="text-[10px] tabular-nums text-muted-foreground/60 w-5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`size-1.5 rounded-full bg-brand-cyan transition-opacity ${
                        isActive ? 'opacity-100 shadow-[0_0_8px_oklch(0.82_0.14_210/0.6)]' : 'opacity-0'
                      }`}
                    />
                    <span>{item.rotulo}</span>
                  </motion.a>
                )
              })}

              <motion.div
                variants={itemVariants}
                className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-2"
              />

              {textoBotao && (
                <motion.div variants={itemVariants}>
                  <a
                    href={urlBotao}
                    onClick={onClose}
                    className={botaoClasses({
                      size: 'sm',
                      className: 'w-full bg-gradient-to-r from-brand-cyan to-brand-blue text-background',
                    })}
                  >
                    {textoBotao}
                  </a>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
