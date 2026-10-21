'use client'

import { motion } from 'framer-motion'

import { CabecalhoSecao } from '@/components/bu1lder/plataforma/CabecalhoSecao'
import { IconeLucide } from '@/lib/icones'
import type { BlocoCamadas } from '@/payload-types'

// Porte de SolutionSection (Sections.tsx): torre de camadas.
const CORES = {
  ciano: 'from-brand-cyan/30 to-transparent',
  azul: 'from-brand-blue/30 to-transparent',
  violeta: 'from-brand-violet/30 to-transparent',
  menta: 'from-brand-mint/30 to-transparent',
} as const

const DESLOCAMENTOS = ['md:-translate-x-2', 'md:-translate-x-1', 'md:translate-x-0', 'md:translate-x-1', 'md:translate-x-2']

export function CamadasBloco({ bloco }: { bloco: BlocoCamadas }) {
  const camadas = bloco.camadas ?? []
  return (
    <section id={bloco.ancora || undefined} className="relative section-pad">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 via-transparent to-transparent" />
      <div className="relative container-editorial">
        <CabecalhoSecao cabecalho={bloco.cabecalho} />
        <div className="relative group/stack space-y-3 md:space-y-2.5">
          {camadas.map((l, i) => (
            <motion.div
              key={l.id ?? i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden transform-gpu transition-all duration-500 ${DESLOCAMENTOS[i] ?? ''} hover:!translate-x-0 hover:-translate-y-1 hover:border-brand-cyan/40 hover:z-10 md:group-hover/stack:opacity-60 md:hover:!opacity-100`}
              style={{
                boxShadow: `0 ${8 + i * 4}px ${24 + i * 6}px -${14 - i}px oklch(0.13 0.025 265 / 0.${35 + i * 5})`,
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${CORES[l.cor ?? 'ciano']} opacity-50`} />
              <span className="absolute top-3 right-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70 font-semibold tabular-nums z-10">
                {bloco.rotuloCamada ? `${bloco.rotuloCamada} ` : ''}
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="relative p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 md:w-56 shrink-0">
                  <div className="size-10 rounded-lg border border-brand-cyan/25 bg-brand-cyan/10 grid place-items-center">
                    <IconeLucide nome={l.icone} className="size-5 text-brand-cyan" />
                  </div>
                  <div className="font-display font-semibold">{l.titulo}</div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(l.itens ?? []).map((c) => (
                    <span
                      key={c}
                      className="text-xs px-2.5 py-1 rounded-md bg-brand-cyan/[0.06] border border-brand-cyan/15 text-foreground/75 hover:border-brand-cyan/30 hover:text-foreground transition-colors"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
