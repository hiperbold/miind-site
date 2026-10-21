import { ArrowRight } from 'lucide-react'

import { CabecalhoHub } from '@/components/bu1lder/plataforma/CabecalhoHub'
import type { BlocoCartoesLink } from '@/payload-types'

// Porte dos cartões "Para quem já atende empresas" de bu1lders.index.tsx.
export function CartoesLinkBloco({ bloco }: { bloco: BlocoCartoesLink }) {
  const cartoes = bloco.cartoes ?? []
  return (
    <section id={bloco.ancora || undefined} className="container-editorial section-pad">
      <CabecalhoHub cabecalho={bloco.cabecalho} />
      <div className="agency-grid mt-8">
        {cartoes.map((item, i) => (
          <a key={item.id ?? i} href={item.url} className="surface-card p-8">
            {item.etiqueta && <p className="eyebrow text-brand-cyan">{item.etiqueta}</p>}
            <h3 className="mt-4 text-2xl">{item.titulo}</h3>
            {item.texto && <p className="mt-3 text-muted-foreground">{item.texto}</p>}
            {item.textoLink && (
              <span className="mt-6 inline-flex items-center gap-2 text-brand-cyan text-sm">
                {item.textoLink} <ArrowRight className="size-4" />
              </span>
            )}
          </a>
        ))}
      </div>
    </section>
  )
}
