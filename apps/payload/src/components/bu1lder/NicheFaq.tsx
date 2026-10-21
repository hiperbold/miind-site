import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export type FaqEntry = { q: string; a: string }

// Porte de NicheFaq. As perguntas comuns da plataforma (global) entram primeiro,
// quando a página pede; as da página que repetem uma comum são ignoradas.
export function NicheFaq({
  items = [],
  platformItems = [],
  eyebrow = 'FAQ',
  title = 'Perguntas frequentes',
  highlighted = true,
  anchor,
}: {
  items?: FaqEntry[]
  platformItems?: FaqEntry[]
  eyebrow?: string | null
  title?: string | null
  highlighted?: boolean
  anchor?: string | null
}) {
  const questions = [
    ...platformItems,
    ...items.filter((item) => !platformItems.some((common) => common.q === item.q)),
  ]
  if (questions.length === 0) return null
  const titleId = anchor ? `${anchor}-titulo` : 'niche-faq-title'
  return (
    <section
      id={anchor || undefined}
      className={highlighted ? 'border-y border-border bg-foreground/[0.015]' : undefined}
      aria-labelledby={titleId}
    >
      <div className="container-editorial section-pad">
        <div className="max-w-3xl mx-auto">
          {eyebrow && <p className="eyebrow text-brand-cyan">{eyebrow}</p>}
          <h2 id={titleId} className="display-m mt-4">
            {title || 'Perguntas frequentes'}
          </h2>
          <Accordion type="single" collapsible className="mt-8 space-y-3">
            {questions.map((item, i) => (
              <AccordionItem value={`faq-${i}`} key={`${i}-${item.q}`} className="rounded-xl glass border-0 px-5">
                <AccordionTrigger className="text-left hover:no-underline py-5 font-medium">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
