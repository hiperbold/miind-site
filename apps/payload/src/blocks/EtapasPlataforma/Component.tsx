'use client'

import { motion } from 'framer-motion'

import { CabecalhoSecao } from '@/components/bu1lder/plataforma/CabecalhoSecao'
import { IconeLucide } from '@/lib/icones'
import type { BlocoEtapasPlataforma } from '@/payload-types'

// Porte de HowItWorksSection (Sections.tsx): linha do tempo horizontal no
// desktop e vertical no celular.
export function EtapasPlataformaBloco({ bloco }: { bloco: BlocoEtapasPlataforma }) {
  const etapas = bloco.etapas ?? []
  const rotulo = bloco.rotuloEtapa ?? ''
  return (
    <section id={bloco.ancora || undefined} className="relative section-pad">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-violet/5 to-transparent" />
      <div className="relative container-editorial">
        <CabecalhoSecao cabecalho={bloco.cabecalho} />

        <div className="hidden lg:block relative">
          <div className="absolute top-[34px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent" />
          <div
            className="relative grid gap-4"
            style={{ gridTemplateColumns: `repeat(${Math.max(etapas.length, 1)}, minmax(0, 1fr))` }}
          >
            {etapas.map((s, i) => (
              <motion.div
                key={s.id ?? i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center min-w-0"
              >
                <div className="absolute -top-2 text-[88px] font-display font-bold leading-none text-brand-cyan/5 select-none pointer-events-none">
                  {i + 1}
                </div>
                <div className="relative z-10 size-[18px] rounded-full bg-brand-cyan ring-[6px] ring-background shadow-[0_0_0_1px_oklch(0.82_0.14_210/0.4),0_0_20px_oklch(0.82_0.14_210/0.5)]" />
                <div className="relative mt-6 size-11 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 grid place-items-center">
                  <IconeLucide nome={s.icone} className="size-5 text-brand-cyan" />
                </div>
                <div className="relative mt-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {rotulo} {i + 1}
                </div>
                <div className="relative mt-1.5 font-display font-semibold text-base">{s.titulo}</div>
                {s.texto && (
                  <p className="relative mt-2 text-xs text-muted-foreground leading-relaxed max-w-full px-1">{s.texto}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:hidden relative">
          <div className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-brand-cyan/40 to-transparent" />
          <div className="space-y-5">
            {etapas.map((s, i) => (
              <motion.div
                key={s.id ?? i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative flex gap-4"
              >
                <div className="relative shrink-0">
                  <div className="size-9 rounded-lg bg-brand-cyan/15 border border-brand-cyan/30 grid place-items-center">
                    <IconeLucide nome={s.icone} className="size-4 text-brand-cyan" />
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {rotulo} {i + 1}
                  </div>
                  <div className="font-display font-semibold">{s.titulo}</div>
                  {s.texto && <p className="mt-1 text-sm text-muted-foreground">{s.texto}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {bloco.fraseFinal && (
          <div className="mt-12 text-center">
            <p className="inline-block text-lg md:text-xl font-display font-medium text-foreground/80">{bloco.fraseFinal}</p>
          </div>
        )}
      </div>
    </section>
  )
}
