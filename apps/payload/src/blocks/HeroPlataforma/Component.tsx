'use client'

import * as Dialog from '@radix-ui/react-dialog'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { Activity, ArrowRight, ChevronDown, PlayCircle, TrendingUp, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

import HeroNeuralFlow from '@/components/bu1lder/plataforma/HeroNeuralFlow'
import { botaoClasses } from '@/components/ui/button'
import { IconeLucide } from '@/lib/icones'
import type { BlocoHeroPlataforma } from '@/payload-types'

// Porte de apps/bu1lder/src/components/site/Hero.tsx. O vídeo ambiente
// (ambient.mp4) não veio no pacote: como na prévia, só o pôster aparece.
export function HeroPlataformaBloco({ bloco }: { bloco: BlocoHeroPlataforma }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const blobAx = useTransform(sx, (v) => v * 30)
  const blobAy = useTransform(sy, (v) => v * 20)
  const blobBx = useTransform(sx, (v) => v * -30)
  const blobBy = useTransform(sy, (v) => v * -20)
  const cenaX = useTransform(sx, (v) => v * 12)
  const cenaY = useTransform(sy, (v) => v * 12)

  function onMove(e: React.MouseEvent) {
    if (reduced) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const principal = bloco.botaoPrincipal
  const cartoes = bloco.cartoes
  const integracoes = bloco.integracoes?.itens ?? []

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={onMove}
      className="relative min-h-[100svh] pt-28 pb-20 lg:pt-32 lg:pb-28 overflow-hidden"
    >
      {/* Camada 1: pôster do vídeo ambiente */}
      <div className="absolute inset-0 -z-30">
        <video
          poster="/bu1lder/media/ambient-poster.jpg"
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          tabIndex={-1}
          className="w-full h-full object-cover opacity-50 dark:opacity-50 [.light_&]:opacity-25 [.light_&]:mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_85%)]" />
      </div>

      {/* Camada 2: auroras */}
      <motion.div
        aria-hidden
        style={{ x: blobAx, y: blobAy }}
        className="absolute -z-20 top-[10%] -left-32 w-[600px] h-[600px] rounded-full"
      >
        <div className="w-full h-full rounded-full bg-brand-blue/40 [.light_&]:bg-brand-blue/20 blur-[140px] aurora-drift" />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x: blobBx, y: blobBy }}
        className="absolute -z-20 top-[20%] -right-32 w-[600px] h-[600px] rounded-full"
      >
        <div
          className="w-full h-full rounded-full bg-brand-violet/40 [.light_&]:bg-brand-violet/20 blur-[140px] aurora-drift"
          style={{ animationDelay: '-8s' }}
        />
      </motion.div>

      {/* Camada 3: grade em perspectiva */}
      <div className="absolute -z-10 inset-x-0 bottom-0 h-[60%] [perspective:800px] pointer-events-none">
        <div
          className="absolute inset-0 grid-bg origin-top"
          style={{
            transform: 'rotateX(60deg) translateY(20%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative container-editorial">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
          <div className="relative z-10">
            {bloco.etiqueta && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-medium tracking-wide"
              >
                <span className="size-1.5 rounded-full bg-brand-cyan animate-pulse" />
                {bloco.etiqueta}
              </motion.div>
            )}

            <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block overflow-hidden"
              >
                <span className="block">{bloco.tituloLinha1}</span>
              </motion.span>
              {bloco.tituloLinha2 && (
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="block overflow-hidden"
                >
                  <span className="block text-gradient animate-gradient-x bg-[length:200%_auto]">
                    {bloco.tituloLinha2}
                  </span>
                </motion.span>
              )}
            </h1>

            {bloco.texto && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed"
              >
                {bloco.texto}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="mt-8 flex flex-wrap gap-4 items-center"
            >
              {principal?.texto && (
                <a
                  href={principal.url || '#contato'}
                  className={botaoClasses({
                    size: 'lg',
                    className:
                      'px-8 py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-background hover:opacity-95 border-0 font-semibold shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-shadow',
                  })}
                >
                  {principal.texto} <ArrowRight className="ml-1 size-4" />
                </a>
              )}
              {bloco.video?.textoBotao && <JanelaVideo video={bloco.video} />}
            </motion.div>

            {(bloco.selos ?? []).length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-10 flex flex-wrap gap-2 opacity-70"
              >
                {(bloco.selos ?? []).map((b) => (
                  <span
                    key={b}
                    className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground"
                  >
                    {b}
                  </span>
                ))}
              </motion.div>
            )}
          </div>

          {/* Cena animada com os cartões flutuantes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square max-w-[580px] mx-auto w-full"
            style={{ transform: 'translate3d(0,0,0)' }}
          >
            <motion.div style={{ x: cenaX, y: cenaY }} className="absolute inset-0">
              <HeroNeuralFlow />
            </motion.div>

            {cartoes?.desempenho && (
              <CartaoHud pos="-top-6 -left-16 lg:-left-20 rotate-[2deg]" delay={0.9} sx={sx} sy={sy} factor={8}>
                <Activity className="size-3.5 text-brand-cyan" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-foreground/90">{cartoes.desempenho}</span>
                  <Sparkline />
                </div>
              </CartaoHud>
            )}

            {cartoes?.economiaTitulo && (
              <CartaoHud
                pos="-bottom-8 -right-14 lg:-right-20 rotate-[-1deg]"
                delay={1.02}
                sx={sx}
                sy={sy}
                factor={-12}
              >
                <div className="flex flex-col gap-1.5 min-w-[180px]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                      {cartoes.economiaTitulo}
                    </span>
                    {cartoes.economiaPeriodo && (
                      <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-brand-mint/10 text-brand-mint whitespace-nowrap">
                        {cartoes.economiaPeriodo}
                      </span>
                    )}
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    <ContadorDinheiro alvo={cartoes.economiaValor ?? 0} />
                    <MiniBarras />
                  </div>
                  {cartoes.economiaVariacao && (
                    <div className="flex items-center gap-1">
                      <TrendingUp className="size-3 text-brand-mint" />
                      <span className="text-[10px] font-semibold text-brand-mint whitespace-nowrap">
                        {cartoes.economiaVariacao}
                      </span>
                    </div>
                  )}
                </div>
              </CartaoHud>
            )}
          </motion.div>
        </div>

        {integracoes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 lg:mt-20 relative z-10 border-t border-foreground/10 pt-8"
          >
            {bloco.integracoes?.titulo && (
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium text-center mb-5">
                {bloco.integracoes.titulo}
              </div>
            )}
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <div className="flex gap-3 animate-marquee whitespace-nowrap py-2">
                {[0, 1].flatMap((k) =>
                  integracoes.map((item, i) => (
                    <span
                      key={`${k}-${item.id ?? i}`}
                      aria-hidden={k === 1 ? true : undefined}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-foreground/80 hover:text-foreground hover:border-brand-cyan/30 transition-colors"
                    >
                      <IconeLucide nome={item.icone} className="size-3.5 text-brand-cyan/80" />
                      {item.nome}
                    </span>
                  )),
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {bloco.rotuloRolagem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground text-[10px] uppercase tracking-[0.2em]"
        >
          <span>{bloco.rotuloRolagem}</span>
          <ChevronDown className="w-4 h-4 text-brand-cyan animate-chevron-bounce" strokeWidth={2.5} />
        </motion.div>
      )}
    </section>
  )
}

function JanelaVideo({ video }: { video: NonNullable<BlocoHeroPlataforma['video']> }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={botaoClasses({
            variant: 'outline',
            size: 'lg',
            className:
              'px-8 py-4 rounded-xl border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 font-semibold',
          })}
        >
          <PlayCircle className="mr-1 size-4" /> {video.textoBotao}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg max-w-4xl p-0 overflow-hidden bg-black border-white/10"
        >
          <Dialog.Title className="sr-only">{video.tituloModal || video.textoBotao}</Dialog.Title>
          <div className="aspect-video w-full">
            {video.url ? (
              <video src={video.url} controls autoPlay playsInline className="h-full w-full" />
            ) : (
              <div className="flex h-full items-center justify-center p-8 text-center text-white">
                {video.avisoSemVideo}
              </div>
            )}
          </div>
          <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-white">
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function CartaoHud({
  pos,
  delay,
  sx,
  sy,
  factor,
  children,
}: {
  pos: string
  delay: number
  sx: MotionValue<number>
  sy: MotionValue<number>
  factor: number
  children: React.ReactNode
}) {
  const x = useTransform(sx, (v) => v * factor)
  const y = useTransform(sy, (v) => v * factor)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      style={{ x, y }}
      className={`absolute ${pos} z-20 pointer-events-none hidden lg:block`}
    >
      <div className="glass rounded-xl px-3 py-2 flex items-center gap-2 text-[11px] whitespace-nowrap shadow-[0_8px_30px_-10px_oklch(0.13_0.025_265/0.6)]">
        {children}
      </div>
    </motion.div>
  )
}

function Sparkline() {
  return (
    <svg width="90" height="14" viewBox="0 0 90 14" className="overflow-visible">
      <defs>
        <linearGradient id="spark" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--brand-cyan)" />
          <stop offset="100%" stopColor="var(--brand-violet)" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 10 L10 7 L20 9 L30 5 L40 6 L50 3 L60 6 L70 2 L80 4 L90 1"
        fill="none"
        stroke="url(#spark)"
        strokeWidth="1.4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.4 }}
      />
    </svg>
  )
}

const FORMATO_BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

function ContadorDinheiro({ alvo }: { alvo: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [valor, setValor] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValor(alvo)
      return
    }
    let raf = 0
    let iniciado = false
    const rodar = () => {
      const inicio = performance.now()
      const tick = (agora: number) => {
        const t = Math.min(1, (agora - inicio) / 2000)
        setValor(Math.round(alvo * (1 - Math.pow(1 - t, 3))))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !iniciado) {
          iniciado = true
          rodar()
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [alvo])

  return (
    <span
      ref={ref}
      className="text-xl font-bold leading-none tabular-nums bg-gradient-to-r from-foreground to-brand-mint bg-clip-text text-transparent"
    >
      {FORMATO_BRL.format(valor)}
    </span>
  )
}

function MiniBarras() {
  return (
    <div className="flex items-end gap-0.5 h-6">
      {[40, 60, 75, 100].map((h, i) => (
        <motion.span
          key={i}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 0.8 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: `${h}%`, transformOrigin: 'bottom' }}
          className="w-1 rounded-sm bg-gradient-to-t from-brand-mint/40 to-brand-mint"
        />
      ))}
    </div>
  )
}
