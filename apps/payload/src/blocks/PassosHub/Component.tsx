import { ArrowRight } from 'lucide-react'

import { CabecalhoHub } from '@/components/bu1lder/plataforma/CabecalhoHub'
import { IconeLucide } from '@/lib/icones'
import type { BlocoPassosHub } from '@/payload-types'

// Porte de "Como funciona" do programa (bu1lders.index.tsx + FlowSteps.tsx).
export function PassosHubBloco({ bloco }: { bloco: BlocoPassosHub }) {
  const passos = bloco.passos ?? []
  return (
    <section id={bloco.ancora || undefined} className="container-editorial section-pad">
      <CabecalhoHub cabecalho={bloco.cabecalho} />
      <div className="mt-10">
        <div className="grid md:grid-cols-3 gap-4">
          {passos.map((s, i) => (
            <div key={s.id ?? i} className="relative">
              <div className="surface-card h-full p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan">
                    <IconeLucide nome={s.icone} className="size-5" />
                  </span>
                  <span className="text-xs font-semibold text-brand-cyan tabular-nums tracking-[0.18em]">
                    {bloco.rotuloPasso ? `${bloco.rotuloPasso} ` : ''}
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-foreground font-semibold text-lg mb-2">{s.titulo}</h3>
                {s.texto && <p className="text-sm text-muted-foreground leading-relaxed">{s.texto}</p>}
              </div>
              {i < passos.length - 1 && (
                <ArrowRight
                  aria-hidden
                  className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-brand-violet/60 size-5"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
