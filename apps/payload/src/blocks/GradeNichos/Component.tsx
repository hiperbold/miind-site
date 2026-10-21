import { ArrowRight } from 'lucide-react'

import { CabecalhoHub } from '@/components/bu1lder/plataforma/CabecalhoHub'
import { IconeLucide } from '@/lib/icones'
import type { BlocoGradeNichos } from '@/payload-types'

import type { ContextoPlataforma } from '../contexto-plataforma'

// Porte da grade de segmentos de bu1lders.index.tsx + NicheCard.tsx. Os cartões
// são as páginas de nicho publicadas marcadas para a grade (grupo "Cartão no
// programa de parceiros" da página).
export function GradeNichosBloco({ bloco, contexto }: { bloco: BlocoGradeNichos; contexto: ContextoPlataforma }) {
  return (
    <section id={bloco.ancora || undefined} className="border-y border-foreground/5 bg-foreground/[0.015]">
      <div className="container-editorial section-pad">
        <CabecalhoHub cabecalho={bloco.cabecalho} />
        <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {contexto.nichos.map((n) => (
            <a key={n.slug} href={`/bu1lder/${n.slug}`} className="surface-card group relative flex flex-col h-full p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                <span className="grid place-items-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan shrink-0">
                  <IconeLucide nome={n.icone} padrao="Sparkles" className="size-5" />
                </span>
                {n.estatistica && (
                  <span className="hidden sm:inline text-[10px] tracking-[0.2em] uppercase text-muted-foreground tabular-nums truncate">
                    {n.estatistica}
                  </span>
                )}
              </div>
              <h3 className="text-foreground font-semibold text-sm sm:text-base leading-tight mb-1.5 sm:mb-2">{n.nome}</h3>
              {n.texto && (
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">{n.texto}</p>
              )}
              <span className="mt-3 sm:mt-4 inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-brand-cyan group-hover:gap-2 transition-all">
                {bloco.textoLink && <span className="hidden sm:inline">{bloco.textoLink}</span>}
                {bloco.textoLinkCurto && <span className="sm:hidden">{bloco.textoLinkCurto}</span>}
                <ArrowRight className="size-4" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
