'use client'

import { motion } from 'framer-motion'

import { TextoMarcado } from '@/components/bu1lder/plataforma/TextoMarcado'
import type { BlocoMetricas } from '@/payload-types'

// Porte de MetricsSection (NarrativeSections.tsx).
export function MetricasBloco({ bloco }: { bloco: BlocoMetricas }) {
  const secundarios = bloco.secundarios ?? []
  return (
    <section id={bloco.ancora || undefined} className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-cyan/8 blur-[160px]" />
      </div>

      <div className="container-editorial">
        <div className="mb-16">
          {bloco.etiqueta && (
            <div className="flex items-center gap-3">
              {bloco.marcador && (
                <span className="num text-brand-cyan text-xs font-semibold tracking-[0.18em]">{bloco.marcador}</span>
              )}
              {bloco.marcador && <span className="brand-divider !w-10" />}
              <span className="eyebrow text-brand-cyan/90">{bloco.etiqueta}</span>
            </div>
          )}
          {bloco.titulo && (
            <h2 className="mt-4 display-l max-w-3xl">
              <TextoMarcado texto={bloco.titulo} />
            </h2>
          )}
        </div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-end border-t border-foreground/10 pt-16"
        >
          <div>
            <div
              className="num font-semibold leading-[0.82] tracking-[-0.06em] bg-gradient-to-br from-foreground via-brand-cyan to-brand-violet bg-clip-text text-transparent"
              style={{ fontSize: 'clamp(7rem, 17vw, 13rem)' }}
            >
              {bloco.principal?.valor}
            </div>
            <div className="brand-divider mt-6" />
            {bloco.principal?.rotulo && <p className="mt-5 lead max-w-md">{bloco.principal.rotulo}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-8">
            {secundarios.map((m, i) => (
              <div key={m.id ?? i} className="border-l border-foreground/10 pl-5">
                <div className="num font-semibold text-4xl md:text-5xl tracking-[-0.04em] leading-none text-foreground">
                  {m.valor}
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-[240px]">{m.rotulo}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
