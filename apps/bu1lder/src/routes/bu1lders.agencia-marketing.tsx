import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowDown,
  Megaphone,
  MessageCircle,
  CalendarCheck,
  BarChart3,
  Workflow,
  ShieldCheck,
  Layers,
  Users,
  Check,
} from "lucide-react";
import { BuildersHeader } from "@/components/bu1lders/BuildersHeader";
import { SegmentNav } from "@/components/bu1lders/SegmentNav";
import { LeadForm } from "@/components/bu1lders/LeadForm";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/bu1lders/agencia-marketing")({
  head: () => ({
    meta: [
      { title: "Bu1lder para agências de marketing | MIIND" },
      {
        name: "description",
        content:
          "Amplie a atuação da sua agência com soluções de software personalizado com IA. Conheça o programa de consultores Bu1lder da MIIND.",
      },
    ],
  }),
  component: AgencyPage,
});

const opportunities = [
  {
    icon: MessageCircle,
    title: "O lead chegou. E agora?",
    copy: "Organize a primeira resposta, identifique a necessidade e encaminhe o contato para a pessoa certa. A oportunidade continua depois do clique.",
  },
  {
    icon: CalendarCheck,
    title: "Da conversa à reunião",
    copy: "Conecte qualificação, agenda e lembretes para reduzir os pontos de abandono entre o interesse e o atendimento comercial.",
  },
  {
    icon: Workflow,
    title: "Follow-up com contexto",
    copy: "Estruture uma rotina de acompanhamento de propostas e oportunidades, com regras de contato e passagem para a equipe humana.",
  },
  {
    icon: BarChart3,
    title: "Visibilidade sobre o funil",
    copy: "Conecte as informações da captação e do atendimento para enxergar onde os contatos avançam e onde o processo precisa melhorar.",
  },
];
const steps = [
  {
    number: "01",
    title: "Encontre a dor",
    copy: "Use a proximidade com seus clientes para identificar um problema frequente, com impacto no negócio e resultado que possa ser acompanhado.",
  },
  {
    number: "02",
    title: "Desenhe a solução com a MIIND",
    copy: "Leve o contexto para a equipe. Escopo, integrações, responsabilidades e condições comerciais precisam estar definidos antes de qualquer promessa ao cliente.",
  },
  {
    number: "03",
    title: "Acompanhe a entrega e o uso",
    copy: "A MIIND cuida da construção e da operação técnica. Você conecta a solução à realidade do cliente e acompanha a evolução do relacionamento.",
  },
];
const faqs = [
  {
    q: "Já faço automações na minha agência. Onde o Bu1lder entra?",
    a: "O programa pode complementar o que você já faz quando o projeto exige software personalizado, integrações e operação contínua. A conversa com a MIIND serve para entender o que sua agência entrega hoje e onde a parceria faz sentido.",
  },
  {
    q: "Preciso contratar desenvolvedores para participar?",
    a: "A proposta é que a MIIND cuide da construção e da operação técnica. O consultor contribui com o diagnóstico, o contexto do negócio e o relacionamento com o cliente. O escopo de cada entrega precisa ser combinado com a equipe.",
  },
  {
    q: "O programa inclui certificação?",
    a: "O Bu1lder é apresentado como uma certificação para consultores em soluções de software personalizado com IA, com a chancela MIIND. Na conversa inicial, a equipe explica a formação, os critérios e os próximos passos.",
  },
  {
    q: "Posso oferecer as soluções com a marca da minha agência?",
    a: "As condições de marca, apresentação ao cliente e eventual white label devem ser confirmadas diretamente com a MIIND antes de você estruturar a oferta.",
  },
  {
    q: "Como funcionam os valores e a remuneração?",
    a: "A equipe apresenta as condições comerciais do programa e de cada solução. Avalie escopo, responsabilidades, custos e remuneração antes de enviar uma proposta ao seu cliente.",
  },
];

function AgencyPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <BuildersHeader />
      <SegmentNav activeSlug="agencia-marketing" />
      <main>
        <section className="agency-hero">
          <div className="container-editorial agency-split">
            <div className="agency-copy">
              <p className="eyebrow text-brand-cyan">Bu1lder para agências e gestores de tráfego</p>
              <h1 className="mt-6">
                Seu trabalho pode ir <span className="text-gradient">além do lead.</span>
              </h1>
              <p className="lead">
                Você já leva oportunidades para os seus clientes. Agora, pode ajudá-los a
                transformar o atendimento e as rotinas comerciais com soluções de IA.
              </p>
              <p className="text-muted-foreground">
                Torne-se um consultor Bu1lder, com a chancela MIIND. Você identifica a necessidade e
                conduz o relacionamento. A MIIND constrói e opera a tecnologia.
              </p>
              <div className="agency-links">
                <a href="#cadastro" className="ds-button">
                  Quero ser um Bu1lder <ArrowRight size={18} />
                </a>
                <a href="#como-funciona" className="ds-button ds-button-secondary">
                  Entender a parceria
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                Para quem já atende empresas e quer ampliar sua oferta.
              </p>
            </div>
            <div className="agency-flow" aria-label="Exemplo de jornada do clique à conversão">
              <p className="eyebrow text-brand-cyan mb-7">Do clique à conversão</p>
              {[
                { icon: Megaphone, title: "Captação", text: "Sua agência gera a oportunidade." },
                {
                  icon: MessageCircle,
                  title: "Qualificação e atendimento",
                  text: "A solução organiza a próxima conversa.",
                },
                {
                  icon: CalendarCheck,
                  title: "Reunião e acompanhamento",
                  text: "O comercial recebe contexto para avançar.",
                },
              ].map((stage, i) => (
                <div key={stage.title}>
                  {i > 0 && <ArrowDown className="agency-connector" size={20} />}
                  <div className="agency-stage">
                    <stage.icon size={26} />
                    <div>
                      <h3 className="text-base">{stage.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{stage.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              <p className="mt-6 text-xs text-muted-foreground">
                Jornada ilustrativa. O fluxo e as integrações dependem do escopo de cada cliente.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border">
          <div className="container-editorial section-pad">
            <p className="eyebrow text-brand-cyan">Uma oportunidade na sua carteira</p>
            <h2 className="display-m mt-4 max-w-3xl">
              O anúncio pode funcionar.
              <br />O processo seguinte também precisa.
            </h2>
            <p className="lead mt-6 max-w-2xl">
              Se o contato fica sem resposta, não chega ao vendedor ou se perde depois da proposta,
              existe um problema para investigar junto com o cliente.
            </p>
            <div className="agency-grid mt-10">
              {opportunities.map((item) => (
                <article key={item.title} className="surface-card agency-step">
                  <item.icon size={28} />
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="como-funciona" className="container-editorial section-pad">
          <p className="eyebrow text-brand-cyan">Como funciona a parceria</p>
          <h2 className="display-m mt-4 max-w-3xl">
            Você conhece o cliente.
            <br />A MIIND entra com a tecnologia.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {steps.map((step) => (
              <article key={step.number} className="surface-card agency-step">
                <span className="font-mono text-brand-cyan text-sm">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container-editorial pb-12">
          <div className="ds-callout agency-split">
            <div>
              <p className="eyebrow text-brand-cyan">Para quem já sabe fazer automação</p>
              <h2 className="display-m mt-4">Amplie sua capacidade de entrega.</h2>
              <p className="lead mt-6">
                Sua agência não precisa partir do zero. A parceria conecta o que você já domina à
                construção de soluções personalizadas e à operação técnica da MIIND.
              </p>
            </div>
            <ul className="grid gap-6">
              {[
                {
                  icon: Layers,
                  title: "Software personalizado com IA",
                  text: "Uma solução desenhada a partir da necessidade do negócio.",
                },
                {
                  icon: ShieldCheck,
                  title: "Infraestrutura e suporte",
                  text: "Operação técnica com responsabilidades definidas no projeto.",
                },
                {
                  icon: MessageCircle,
                  title: "WhatsApp oficial e integrações",
                  text: "Conexões avaliadas conforme os sistemas e requisitos do cliente.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4">
                  <item.icon className="text-brand-cyan shrink-0" size={24} />
                  <div>
                    <h3 className="text-base">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="container-editorial section-pad agency-split">
          <div>
            <p className="eyebrow text-brand-cyan">Seu ponto de partida</p>
            <h2 className="display-m mt-4">Quem já confia na sua agência?</h2>
            <p className="lead mt-6">
              Comece com um cliente que tenha volume de contatos, um processo manual relevante e
              alguém disponível para construir a solução junto.
            </p>
          </div>
          <div className="surface-card agency-step">
            <Users className="text-brand-cyan" size={28} />
            <h3>Reconheça o perfil na sua carteira</h3>
            <ul className="grid gap-4 mt-6 text-sm text-muted-foreground">
              {[
                "O cliente recebe contatos pelo WhatsApp todos os dias.",
                "A equipe repete tarefas ou perde informações entre ferramentas.",
                "O dono ou gestor participa das decisões.",
                "Existe uma melhoria concreta para medir depois da entrega.",
              ].map((text) => (
                <li key={text} className="flex gap-3">
                  <Check size={18} className="text-brand-cyan shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-y border-border">
          <div className="container-editorial section-pad max-w-3xl">
            <p className="eyebrow text-brand-cyan">Perguntas frequentes</p>
            <h2 className="display-m mt-4">Antes de dar o próximo passo</h2>
            <Accordion type="single" collapsible className="mt-8">
              {faqs.map((faq, i) => (
                <AccordionItem value={String(i)} key={faq.q}>
                  <AccordionTrigger className="text-left py-6">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="container-editorial section-pad agency-split items-start">
          <div className="agency-copy">
            <p className="eyebrow text-brand-cyan">Faça parte do programa</p>
            <h2 className="display-m mt-4">Vamos entender o que sua agência pode construir.</h2>
            <p className="lead">
              Conheça a certificação Bu1lder e converse com a MIIND sobre as oportunidades que já
              existem na sua carteira.
            </p>
            <div className="agency-links">
              <a
                className="ds-button"
                href="https://www.miind.com.br/typ-agendar"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar uma conversa <ArrowRight size={18} />
              </a>
            </div>
          </div>
          <LeadForm
            origem="agencia-marketing"
            defaultSegmento="agencia-marketing"
            profileOptions={[
              "Dono de agência de marketing",
              "Gestor de tráfego",
              "Profissional de marketing autônomo",
              "Outro",
            ]}
          />
        </section>
      </main>
      <footer className="border-t border-border">
        <div className="container-editorial py-8 flex flex-wrap gap-6 justify-between text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} MIIND · Programa Bu1lder</span>
          <Link to="/bu1lders">
            Conhecer o programa de parceiros <ArrowRight className="inline ml-2" size={16} />
          </Link>
        </div>
      </footer>
    </div>
  );
}
