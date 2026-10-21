import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { platformFaqs, type FaqEntry } from "@/data/platform-faq";

export function NicheFaq({ items = [] }: { items?: FaqEntry[] }) {
  const questions = [
    ...platformFaqs,
    ...items.filter((item) => !platformFaqs.some((common) => common.q === item.q)),
  ];
  return (
    <section
      className="border-y border-border bg-foreground/[0.015]"
      aria-labelledby="niche-faq-title"
    >
      <div className="container-editorial section-pad">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow text-brand-cyan">FAQ</p>
          <h2 id="niche-faq-title" className="display-m mt-4">
            Perguntas frequentes
          </h2>
          <Accordion type="single" collapsible className="mt-8 space-y-3">
            {questions.map((item, i) => (
              <AccordionItem
                value={`faq-${i}`}
                key={item.q}
                className="rounded-xl glass border-0 px-5"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 font-medium">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
