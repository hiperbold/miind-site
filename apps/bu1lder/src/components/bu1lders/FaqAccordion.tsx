import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Preciso saber programar?",
    a: "Não. A plataforma é 100% no-code: você liga módulos prontos como um construtor de soluções, sem escrever uma linha de código.",
  },
  {
    q: "Quanto custa para começar?",
    a: "O cadastro no programa é gratuito. Após aprovação, você passa por um onboarding rápido e já pode oferecer soluções aos seus clientes.",
  },
  {
    q: "Como eu recebo?",
    a: "Você tem a relação comercial direta com seu cliente. A Bu1lder cobra de você a parte da plataforma por produto ativo — o restante é seu, todo mês.",
  },
  {
    q: "Em quanto tempo entrego a primeira solução?",
    a: "Em poucos dias. A plataforma já vem com os módulos prontos para cada segmento; o trabalho de implementação leva de 3 a 7 dias úteis.",
  },
  {
    q: "Posso atender mais de um segmento?",
    a: "Sim. Você pode montar uma carteira misturando nichos — clínicas, oficinas, salões, lojas — todos rodando na mesma plataforma.",
  },
];

export function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((f, i) => (
        <AccordionItem
          value={`item-${i}`}
          key={f.q}
          className="border-b border-foreground/10"
        >
          <AccordionTrigger className="text-foreground hover:no-underline text-left py-5">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
