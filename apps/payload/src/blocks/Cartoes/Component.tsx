import { ComQuebras } from '@/components/bu1lder/ComQuebras'
import { IconeLucide } from '@/lib/icones'
import type { BlocoCartoes } from '@/payload-types'

// Cartões no estilo da página de agência (.agency-step), com ícone ou número.
export function CartoesBloco({ bloco }: { bloco: BlocoCartoes }) {
  const cartoes = bloco.cartoes ?? []
  const grade = bloco.colunas === '3' ? 'grid md:grid-cols-3 gap-6' : 'agency-grid'
  return (
    <section id={bloco.ancora || undefined} className={bloco.destaque ? 'border-y border-border' : undefined}>
      <div className="container-editorial section-pad">
        {bloco.etiqueta && <p className="eyebrow text-brand-cyan">{bloco.etiqueta}</p>}
        {bloco.titulo && (
          <h2 className="display-m mt-4 max-w-3xl">
            <ComQuebras texto={bloco.titulo} />
          </h2>
        )}
        {bloco.texto && <p className="lead mt-6 max-w-2xl">{bloco.texto}</p>}
        <div className={`${grade} mt-10`}>
          {cartoes.map((c, i) => (
            <article key={c.id ?? i} className="surface-card agency-step">
              {c.numero ? (
                <span className="font-mono text-brand-cyan text-sm">{c.numero}</span>
              ) : c.icone ? (
                <IconeLucide nome={c.icone} className="size-7" />
              ) : null}
              <h3>{c.titulo}</h3>
              {c.texto && <p>{c.texto}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
