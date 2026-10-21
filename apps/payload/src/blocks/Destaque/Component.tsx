import { IconeLucide } from '@/lib/icones'
import type { BlocoDestaque } from '@/payload-types'

// Quadro em destaque (.ds-callout) com texto à esquerda e itens à direita.
export function DestaqueBloco({ bloco }: { bloco: BlocoDestaque }) {
  return (
    <section id={bloco.ancora || undefined} className="container-editorial py-12">
      <div className="ds-callout agency-split">
        <div>
          {bloco.etiqueta && <p className="eyebrow text-brand-cyan">{bloco.etiqueta}</p>}
          {bloco.titulo && <h2 className="display-m mt-4">{bloco.titulo}</h2>}
          {bloco.texto && <p className="lead mt-6">{bloco.texto}</p>}
        </div>
        <ul className="grid gap-6">
          {(bloco.itens ?? []).map((item, i) => (
            <li key={item.id ?? i} className="flex gap-4">
              <IconeLucide nome={item.icone} padrao="Sparkles" className="text-brand-cyan shrink-0 size-6" />
              <div>
                <h3 className="text-base">{item.titulo}</h3>
                {item.texto && <p className="text-sm text-muted-foreground mt-1">{item.texto}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
