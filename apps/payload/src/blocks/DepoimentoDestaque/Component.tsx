'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

import { TextoMarcado } from '@/components/bu1lder/plataforma/TextoMarcado'
import type { BlocoDepoimentoDestaque } from '@/payload-types'

// Porte de TestimonialSection (NarrativeSections.tsx).
export function DepoimentoDestaqueBloco({ bloco }: { bloco: BlocoDepoimentoDestaque }) {
  return (
    <section id={bloco.ancora || undefined} className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-cyan/10 blur-[140px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-violet/10 blur-[140px] aurora-drift" />
      </div>

      <div className="container-editorial max-w-5xl!">
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <Quote className="absolute -top-4 -left-2 size-16 md:size-24 text-brand-cyan/15" strokeWidth={1.5} />
          <blockquote className="relative display-m italic font-normal text-foreground/95">
            <span className="text-brand-cyan/60 not-italic">&quot;</span>
            <TextoMarcado texto={bloco.texto} destaque="text-gradient" />
            <span className="text-brand-cyan/60 not-italic">&quot;</span>
          </blockquote>

          {(bloco.autor || bloco.cargo) && (
            <figcaption className="mt-10 flex items-center gap-4">
              {bloco.iniciais && (
                <div className="size-12 rounded-full bg-gradient-to-br from-brand-cyan to-brand-violet grid place-items-center font-semibold text-background">
                  {bloco.iniciais}
                </div>
              )}
              <div>
                {bloco.autor && <div className="font-semibold text-foreground">{bloco.autor}</div>}
                {bloco.cargo && (
                  <div className="eyebrow !tracking-[0.18em] !normal-case text-sm text-muted-foreground">{bloco.cargo}</div>
                )}
              </div>
            </figcaption>
          )}
        </motion.figure>
      </div>
    </section>
  )
}
