import { Sparkles } from 'lucide-react'

import { Reveal } from '@/components/bu1lder/Reveal'
import { Secao } from '@/components/bu1lder/Secao'
import type { BlocoTextoLista } from '@/payload-types'

export function TextoListaBloco({ bloco }: { bloco: BlocoTextoLista }) {
  const lista = bloco.lista ?? []
  return (
    <Secao ancora={bloco.ancora} destaque={bloco.destaque}>
      <Reveal>
        <div className="max-w-2xl">
          {bloco.titulo && (
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] leading-[1.1] text-foreground">
              {bloco.titulo}
            </h2>
          )}
          {bloco.texto && <p className="mt-4 lead">{bloco.texto}</p>}
          {lista.length > 0 && (
            <ul className="mt-8 space-y-3">
              {lista.map((l, i) => (
                <li key={l.id ?? `${i}-${l.item}`} className="flex items-start gap-3 text-sm text-foreground/90">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-mint to-brand-cyan text-background">
                    <Sparkles className="size-3" />
                  </span>
                  {l.item}
                </li>
              ))}
            </ul>
          )}
          {bloco.nota && <p className="mt-6 text-xs text-muted-foreground">{bloco.nota}</p>}
        </div>
      </Reveal>
    </Secao>
  )
}
