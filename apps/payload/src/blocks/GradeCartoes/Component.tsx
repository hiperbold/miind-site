'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { CabecalhoSecao } from '@/components/bu1lder/plataforma/CabecalhoSecao'
import { IconeLucide } from '@/lib/icones'
import type { BlocoGradeCartoes } from '@/payload-types'

// Porte das grades de Sections.tsx: ProblemSection, WhatYouBuildSection,
// DifferentialsSection, BenefitsSection, MethodologySection e GovernanceSection.
const CARD_BASE =
  'group relative rounded-xl glass p-5 transition-all duration-300 hover:border-brand-cyan/30 hover:-translate-y-0.5'

const dois = (i: number) => String(i + 1).padStart(2, '0')

export function GradeCartoesBloco({ bloco }: { bloco: BlocoGradeCartoes }) {
  const itens = bloco.itens ?? []
  const variante = bloco.variante
  const frase = bloco.fraseFinal?.texto || bloco.fraseFinal?.destaque ? bloco.fraseFinal : null

  let grade: React.ReactNode
  if (variante === 'problema') {
    grade = (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {itens.map((p, i) => (
          <motion.div
            key={p.id ?? i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="relative rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:border-brand-violet/40 hover:bg-white/[0.05] hover:-translate-y-0.5"
          >
            <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70 font-semibold tabular-nums">
              {dois(i)}
            </span>
            <div className="size-9 rounded-lg bg-brand-violet/10 grid place-items-center border border-brand-violet/25">
              <IconeLucide nome={p.icone} className="size-4 text-brand-violet" />
            </div>
            <p className="mt-4 text-sm font-medium text-foreground/85 leading-snug">{p.titulo}</p>
          </motion.div>
        ))}
      </div>
    )
  } else if (variante === 'construir') {
    grade = (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {itens.map((b, i) => (
          <motion.div
            key={b.id ?? i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group relative rounded-xl border border-white/10 bg-white/[0.03] p-5 md:p-6 backdrop-blur-sm transition-all duration-300 hover:border-brand-cyan/40 hover:bg-white/[0.05] hover:-translate-y-1"
          >
            <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70 font-semibold tabular-nums">
              {dois(i)}
            </span>
            <div className="size-10 rounded-lg bg-gradient-to-br from-brand-cyan/25 to-brand-violet/25 grid place-items-center border border-brand-cyan/20 mb-4 group-hover:scale-105 transition-transform">
              <IconeLucide nome={b.icone} className="size-5 text-brand-cyan" />
            </div>
            <h3 className="font-display font-semibold text-lg">{b.titulo}</h3>
            {b.texto && <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.texto}</p>}
          </motion.div>
        ))}
      </div>
    )
  } else if (variante === 'diferencial') {
    grade = (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {itens.map((d, i) => (
          <motion.div
            key={d.id ?? i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className={CARD_BASE}
          >
            <div className="text-[10px] uppercase tracking-[0.18em] text-brand-cyan/80 mb-2">
              {dois(i)}
              {bloco.rotuloItem ? ` · ${bloco.rotuloItem}` : ''}
            </div>
            <h3 className="font-display font-semibold">{d.titulo}</h3>
            {d.texto && <p className="mt-2 text-sm text-muted-foreground">{d.texto}</p>}
          </motion.div>
        ))}
      </div>
    )
  } else if (variante === 'beneficio') {
    grade = (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {itens.map((b, i) => (
          <motion.div
            key={b.id ?? i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={CARD_BASE}
          >
            <div className="size-9 rounded-lg bg-brand-cyan/10 border border-brand-cyan/25 grid place-items-center mb-3">
              {b.icone ? (
                <IconeLucide nome={b.icone} className="size-4 text-brand-cyan" />
              ) : (
                <ArrowRight className="size-4 text-brand-cyan" />
              )}
            </div>
            <h3 className="font-display font-semibold">{b.titulo}</h3>
            {b.texto && <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.texto}</p>}
          </motion.div>
        ))}
      </div>
    )
  } else if (variante === 'metodologia') {
    grade = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {itens.map((r, i) => (
          <motion.div
            key={r.id ?? i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`${CARD_BASE} flex flex-col`}
          >
            <div className="text-5xl font-display font-bold text-brand-cyan/80 leading-none">{r.numero || i + 1}</div>
            <div className="mt-4 font-display font-semibold">{r.titulo}</div>
            {r.texto && <p className="mt-2 text-sm text-muted-foreground">{r.texto}</p>}
          </motion.div>
        ))}
      </div>
    )
  } else {
    grade = (
      <div className="relative rounded-2xl glass p-6 md:p-8 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse,black,transparent_70%)]" />
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {itens.map((g, i) => (
            <motion.div
              key={g.id ?? i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="flex items-center gap-3 rounded-lg border border-foreground/10 bg-foreground/[0.03] px-4 py-3 min-w-0"
            >
              <div className="size-8 rounded-md bg-brand-mint/10 border border-brand-mint/20 grid place-items-center shrink-0">
                <IconeLucide nome={g.icone} className="size-4 text-brand-mint" />
              </div>
              <span className="text-sm min-w-0 break-words">{g.titulo}</span>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  const governanca = variante === 'governanca'
  return (
    <section id={bloco.ancora || undefined} className="relative section-pad">
      {governanca && <div className="absolute inset-0 bg-gradient-to-b from-brand-mint/5 via-transparent to-transparent" />}
      <div className={`${governanca ? 'relative ' : ''}container-editorial`}>
        <CabecalhoSecao cabecalho={bloco.cabecalho} />
        {grade}
        {frase && (
          <p className="mt-10 text-center text-lg font-display text-muted-foreground">
            {frase.texto}
            {frase.texto && frase.destaque ? ' ' : ''}
            {frase.destaque && <span className="text-foreground">{frase.destaque}</span>}
          </p>
        )}
      </div>
    </section>
  )
}
