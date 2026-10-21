import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { BlocoFaqSecao } from '@/payload-types'

import type { ContextoPlataforma } from '../contexto-plataforma'

export type PerguntaFaq = { pergunta: string; resposta: string }

// Perguntas do bloco: as do global (quando pedido) e depois as da seção.
export function perguntasDoBloco(bloco: BlocoFaqSecao, contexto: Pick<ContextoPlataforma, 'faqPlataforma'>): PerguntaFaq[] {
  const comuns = bloco.incluirPerguntasPlataforma ? (contexto.faqPlataforma.perguntas ?? []) : []
  return [...comuns, ...(bloco.itens ?? [])].map((p) => ({ pergunta: p.pergunta, resposta: p.resposta }))
}

// Porte de FAQSection (Sections.tsx, homepage) e da FAQ do programa
// (bu1lders.index.tsx + FaqAccordion.tsx).
export function FaqSecaoBloco({ bloco, contexto }: { bloco: BlocoFaqSecao; contexto: Pick<ContextoPlataforma, 'faqPlataforma'> }) {
  const perguntas = perguntasDoBloco(bloco, contexto)
  if (perguntas.length === 0) return null

  if (bloco.variante === 'programa') {
    return (
      <section id={bloco.ancora || undefined} className="container-editorial section-pad max-w-3xl">
        <div className="max-w-2xl">
          {bloco.etiqueta && <p className="eyebrow text-brand-violet">{bloco.etiqueta}</p>}
          {bloco.titulo && (
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.03em] leading-[1.1] text-foreground">
              {bloco.titulo}
            </h2>
          )}
        </div>
        <div className="mt-8">
          <Accordion type="single" collapsible className="w-full">
            {perguntas.map((f, i) => (
              <AccordionItem value={`item-${i}`} key={`${i}-${f.pergunta}`} className="border-b border-foreground/10">
                <AccordionTrigger className="text-foreground hover:no-underline text-left py-5">{f.pergunta}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{f.resposta}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    )
  }

  return (
    <section id={bloco.ancora || undefined} className="relative section-pad">
      <div className="container-editorial max-w-3xl!">
        <div className="max-w-3xl mb-14 mx-auto text-center">
          {bloco.etiqueta && (
            <div className="flex items-center gap-3 mb-5 justify-center">
              <span className="brand-divider !w-10" />
              <span className="eyebrow text-brand-cyan/90">{bloco.etiqueta}</span>
              <span className="brand-divider !w-10" />
            </div>
          )}
          {bloco.titulo && <h2 className="display-l">{bloco.titulo}</h2>}
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {perguntas.map((f, i) => (
            <AccordionItem key={`${i}-${f.pergunta}`} value={`item-${i}`} className="rounded-xl glass border-0 px-5">
              <AccordionTrigger className="text-left hover:no-underline py-5 font-display font-medium">
                {f.pergunta}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">{f.resposta}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
