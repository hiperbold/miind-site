import { Check } from 'lucide-react'

import { IconeLucide } from '@/lib/icones'
import type { BlocoChecklist } from '@/payload-types'

// Texto à esquerda e cartão com checklist à direita (estilo da página de agência).
export function ChecklistBloco({ bloco }: { bloco: BlocoChecklist }) {
  const itens = bloco.cartao?.itens ?? []
  return (
    <section id={bloco.ancora || undefined} className="container-editorial section-pad agency-split">
      <div>
        {bloco.etiqueta && <p className="eyebrow text-brand-cyan">{bloco.etiqueta}</p>}
        {bloco.titulo && <h2 className="display-m mt-4">{bloco.titulo}</h2>}
        {bloco.texto && <p className="lead mt-6">{bloco.texto}</p>}
      </div>
      <div className="surface-card agency-step">
        {bloco.cartao?.icone && <IconeLucide nome={bloco.cartao.icone} className="text-brand-cyan size-7" />}
        {bloco.cartao?.titulo && <h3>{bloco.cartao.titulo}</h3>}
        {itens.length > 0 && (
          <ul className="grid gap-4 mt-6 text-sm text-muted-foreground">
            {itens.map((item, i) => (
              <li key={item.id ?? i} className="flex gap-3">
                <Check size={18} className="text-brand-cyan shrink-0" />
                {item.texto}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
