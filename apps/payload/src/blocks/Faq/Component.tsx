import { NicheFaq } from '@/components/bu1lder/NicheFaq'
import type { BlocoFaq } from '@/payload-types'

import type { ContextoBloco } from '../contexto'

export function FaqBloco({ bloco, contexto }: { bloco: BlocoFaq; contexto: ContextoBloco }) {
  const comuns =
    bloco.incluirPerguntasPlataforma === false
      ? []
      : (contexto.faqPlataforma.perguntas ?? []).map((p) => ({ q: p.pergunta, a: p.resposta }))
  return (
    <NicheFaq
      platformItems={comuns}
      items={(bloco.itens ?? []).map((p) => ({ q: p.pergunta, a: p.resposta }))}
      eyebrow={bloco.etiqueta}
      title={bloco.titulo}
      highlighted={bloco.destaque ?? true}
      anchor={bloco.ancora}
    />
  )
}
