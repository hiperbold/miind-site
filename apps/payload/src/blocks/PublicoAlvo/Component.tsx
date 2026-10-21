'use client'

import { motion } from 'framer-motion'

import { CabecalhoSecao } from '@/components/bu1lder/plataforma/CabecalhoSecao'
import type { BlocoPublicoAlvo } from '@/payload-types'

// Porte de AudienceSection (Sections.tsx).
export function PublicoAlvoBloco({ bloco }: { bloco: BlocoPublicoAlvo }) {
  const faixa = bloco.faixa?.titulo || (bloco.faixa?.itens ?? []).length ? bloco.faixa : null
  return (
    <section id={bloco.ancora || undefined} className="relative section-pad">
      <div className="container-editorial max-w-5xl! text-center">
        <CabecalhoSecao cabecalho={bloco.cabecalho} />
        <div className="flex flex-wrap justify-center gap-2">
          {(bloco.itens ?? []).map((a, i) => (
            <motion.span
              key={a}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="px-4 py-2 rounded-full glass text-sm text-muted-foreground hover:text-foreground hover:border-brand-cyan/30 transition-colors"
            >
              {a}
            </motion.span>
          ))}
        </div>
        {faixa && (
          <div className="mt-14 pt-10 border-t border-border">
            {faixa.titulo && (
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-4">{faixa.titulo}</div>
            )}
            <div className="flex flex-wrap justify-center gap-6 opacity-70">
              {(faixa.itens ?? []).map((p) => (
                <span key={p} className="text-xs md:text-sm text-foreground/70 font-medium">
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
