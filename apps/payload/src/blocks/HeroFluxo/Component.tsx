import { ArrowDown, ArrowRight } from 'lucide-react'

import { IconeLucide } from '@/lib/icones'
import type { BlocoHeroFluxo } from '@/payload-types'

// Porte do topo da página de agência (classes .agency-* de miind-ds.css).
export function HeroFluxoBloco({ bloco }: { bloco: BlocoHeroFluxo }) {
  const etapas = bloco.fluxo?.etapas ?? []
  const principal = bloco.botaoPrincipal
  const secundario = bloco.botaoSecundario
  return (
    <section className="agency-hero">
      <div className="container-editorial agency-split">
        <div className="agency-copy">
          {bloco.etiqueta && <p className="eyebrow text-brand-cyan">{bloco.etiqueta}</p>}
          <h1 className="mt-6">
            {bloco.titulo}
            {bloco.tituloDestaque && (
              <>
                {' '}
                <span className="text-gradient">{bloco.tituloDestaque}</span>
              </>
            )}
          </h1>
          {bloco.texto && <p className="lead">{bloco.texto}</p>}
          {bloco.textoSecundario && <p className="text-muted-foreground">{bloco.textoSecundario}</p>}
          {(principal?.texto || secundario?.texto) && (
            <div className="agency-links">
              {principal?.texto && (
                <a href={principal.url || '#cadastro'} className="ds-button">
                  {principal.texto} <ArrowRight size={18} />
                </a>
              )}
              {secundario?.texto && (
                <a href={secundario.url || '#como-funciona'} className="ds-button ds-button-secondary">
                  {secundario.texto}
                </a>
              )}
            </div>
          )}
          {bloco.nota && <p className="text-sm text-muted-foreground">{bloco.nota}</p>}
        </div>
        {etapas.length > 0 && (
          <div className="agency-flow" aria-label={bloco.fluxo?.etiqueta || 'Etapas'}>
            {bloco.fluxo?.etiqueta && <p className="eyebrow text-brand-cyan mb-7">{bloco.fluxo.etiqueta}</p>}
            {etapas.map((etapa, i) => (
              <div key={etapa.id ?? i}>
                {i > 0 && <ArrowDown className="agency-connector" size={20} />}
                <div className="agency-stage">
                  <IconeLucide nome={etapa.icone} padrao="Sparkles" className="size-[26px]" />
                  <div>
                    <h3 className="text-base">{etapa.titulo}</h3>
                    {etapa.texto && <p className="text-sm text-muted-foreground mt-1">{etapa.texto}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
