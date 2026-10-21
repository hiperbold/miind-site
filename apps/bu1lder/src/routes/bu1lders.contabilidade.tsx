import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  FileText,
  CalendarClock,
  CreditCard,
  ClipboardCheck,
  MessageCircle,
  Building2,
  TrendingDown,
  Clock,
  Sparkles,
  Quote,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BuildersHeader } from "@/components/bu1lders/BuildersHeader";
import { SegmentNav } from "@/components/bu1lders/SegmentNav";
import { ModuleCard } from "@/components/bu1lders/ModuleCard";
import { EarningsSimulator } from "@/components/bu1lders/EarningsSimulator";
import { EaseBadges } from "@/components/bu1lders/EaseBadges";
import { LeadForm } from "@/components/bu1lders/LeadForm";
import { PhoneMockup } from "@/components/bu1lders/PhoneMockup";
import { StatBand } from "@/components/bu1lders/StatBand";
import { Timeline } from "@/components/bu1lders/Timeline";
import { BeforeAfter } from "@/components/bu1lders/BeforeAfter";
import { Reveal } from "@/components/bu1lders/useInView";
import { getNicheBySlug, getPlanByKey, niches } from "@/data/niches";

const SLUG = "contabilidade";
const TITLE =
  "Bu1lder para Contabilidade — soluções de IA para vender | MIIND";
const DESC =
  "A IA cobra os documentos de cada cliente automaticamente e reduz a inadimplência dos honorários.";

export const Route = createFileRoute("/bu1lders/contabilidade")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `/bu1lders/${SLUG}` },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: `/bu1lders/${SLUG}` }],
  }),
  component: ContabilidadePage,
});

const faqs = [
  {
    q: "Preciso saber programar?",
    a: "Não. A plataforma é 100% no-code: você liga módulos prontos e entrega a solução ao escritório de contabilidade sem escrever uma linha de código.",
  },
  {
    q: "Em quanto tempo entrego?",
    a: "Em poucos dias. Os módulos para contabilidade já vêm prontos; a implementação típica leva de 3 a 7 dias úteis.",
  },
  {
    q: "Como recebo?",
    a: "Você tem relação comercial direta com o seu cliente. A Bu1lder cobra de você apenas a parte da plataforma por produto ativo — o restante é seu, todo mês.",
  },
  {
    q: "Posso atender outros mercados?",
    a: "Sim. Você pode montar uma carteira misturando segmentos — odonto, beleza, saúde, oficinas, pet, restaurantes, imobiliárias, academias — tudo na mesma plataforma Bu1lder.",
  },
];

const modules = [
  {
    name: "Coletor de Documentos IA",
    benefit: "cobra notas todo mês automaticamente",
    icon: FileText,
    example:
      "Oi! Faltam só as notas de saída de novembro 📄 Pode mandar por aqui até sexta?",
  },
  {
    name: "Lembrete de Obrigações",
    benefit: "avisa DAS, guias e vencimentos",
    icon: CalendarClock,
    example:
      "DAS de outubro vence amanhã 📅 Guia: R$ 412,30. Posso te enviar o PDF agora?",
  },
  {
    name: "Cobrança de Honorários",
    benefit: "régua automática reduz inadimplência",
    icon: CreditCard,
    example:
      "Honorário de R$ 890 vence amanhã 💼 Pix da Contábil: chave@contabil. Tudo certo?",
  },
  {
    name: "Onboarding de Cliente",
    benefit: "coleta documentação inicial sem retrabalho",
    icon: ClipboardCheck,
    example:
      "Pra abrir sua empresa preciso de 4 documentos ✅ Te mando a lista por aqui e você anexa cada um.",
  },
  {
    name: "Atendimento de Dúvidas",
    benefit: "IA responde perguntas repetitivas",
    icon: MessageCircle,
    example:
      "Pró-labore mínimo no Simples é R$ 1.518 (salário mínimo). Quer que eu te mostre como lançar?",
  },
];

const stats = [
  {
    icon: Building2,
    value: "101.228",
    label: "empresas contábeis no Brasil",
    tone: "cyan" as const,
  },
  {
    icon: TrendingDown,
    value: "−60%",
    label: "de atrasos na entrega de documentos",
    tone: "violet" as const,
  },
  {
    icon: Clock,
    value: "~3 dias",
    label: "por mês liberados na equipe",
    tone: "mint" as const,
  },
];

const timeline = [
  { day: "Dia 1", title: "Briefing com o sócio", desc: "Carteira, regimes e calendário de obrigações." },
  { day: "Dia 2", title: "WhatsApp + base de clientes", desc: "Número oficial e lista de documentos por cliente." },
  { day: "Dia 3", title: "IA treinada", desc: "Aprende regimes, prazos e regras de cobrança do escritório." },
  { day: "Dia 4", title: "Teste com a equipe", desc: "Validação das mensagens e do fluxo de coleta." },
  { day: "Dia 5", title: "Vai ao ar", desc: "O escritório começa a cobrar documentos sozinho." },
];

const heroMessages = [
  { from: "negocio" as const, text: "Oi! Faltam só as notas de saída de novembro 📄 Pode mandar até sexta?", time: "08:32" },
  { from: "cliente" as const, text: "Verdade, esqueci. Mando hoje à tarde", time: "08:40" },
  { from: "negocio" as const, text: "Combinado ✅ Aproveito e te lembro: DAS vence dia 20, R$ 412,30.", time: "08:40" },
];

function ContabilidadePage() {
  const plan = getPlanByKey("Performance");
  const niche = getNicheBySlug(SLUG)!;
  const idx = niches.findIndex((n) => n.slug === SLUG);
  const prev = idx > 0 ? niches[idx - 1] : niches[niches.length - 1];
  const next = idx < niches.length - 1 ? niches[idx + 1] : niches[0];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <BuildersHeader />
      <SegmentNav activeSlug={SLUG} />

      {/* HERO SPLIT */}
      <section className="relative overflow-hidden pt-14 pb-16 lg:pt-20 lg:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -z-20 top-[10%] -right-32 w-[560px] h-[560px] rounded-full bg-brand-violet/25 [.light_&]:bg-brand-violet/12 blur-[150px] aurora-drift"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -z-20 top-[20%] -left-32 w-[480px] h-[480px] rounded-full bg-brand-cyan/20 [.light_&]:bg-brand-cyan/10 blur-[140px] aurora-drift"
          style={{ animationDelay: "-7s" }}
        />
        <div className="absolute -z-10 inset-x-0 bottom-0 h-[55%] [perspective:800px] pointer-events-none">
          <div
            className="absolute inset-0 grid-bg origin-top"
            style={{
              transform: "rotateX(60deg) translateY(20%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
            }}
          />
        </div>

        <div className="container-editorial relative grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div>
            <Reveal>
              <div className="flex items-center gap-4 mb-7">
                <span className="grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-violet text-background shadow-[0_14px_30px_-10px_oklch(0.65_0.22_295/0.5)]">
                  <Calculator className="size-6" />
                </span>
                <p className="eyebrow text-brand-violet">
                  Programa Bu1lder · Contabilidade
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-[-0.04em] leading-[1.02] text-gradient">
                Acabe com a correria do fim do mês.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 lead max-w-xl">
                A IA cobra os documentos de cada cliente automaticamente e
                reduz a inadimplência dos honorários.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <p className="mt-5 text-sm text-brand-violet max-w-2xl">
                Contador-sócio · Foco em reduzir o vai-e-vem de documentos e a inadimplência.
              </p>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
                <a
                  href="#cadastro"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-background font-semibold px-5 sm:px-6 h-12 w-full sm:w-auto shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-shadow"
                >
                  Quero atender contabilidade <ArrowRight className="size-4" />
                </a>
                <a
                  href="#solucoes"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-foreground/15 hover:border-brand-cyan/40 text-foreground font-medium px-5 h-12 w-full sm:w-auto transition-colors"
                >
                  Ver o que você entrega
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:sticky lg:top-24">
            <PhoneMockup
              title="Contábil Vértice"
              subtitle="online · IA Bu1lder"
              messages={heroMessages}
            />
          </Reveal>
        </div>
      </section>

      {/* STAT BAND */}
      <section className="container-editorial pb-12 lg:pb-16">
        <StatBand stats={stats} />
      </section>

      {/* TIMELINE */}
      <section className="border-y border-foreground/5 bg-foreground/[0.015]">
        <div className="container-editorial section-pad">
          <SectionHeader
            eyebrow="Como funciona"
            title="Em 5 dias o escritório começa a operar com IA"
            subtitle="Você não programa nada. A Bu1lder cuida da operação enquanto você cuida da relação com o sócio."
          />
          <div className="mt-10">
            <Timeline steps={timeline} />
          </div>
        </div>
      </section>

      {/* MÓDULOS */}
      <section id="solucoes">
        <div className="container-editorial section-pad">
          <SectionHeader
            eyebrow="5 soluções que você pode construir"
            title="O que você entrega para um escritório de contabilidade"
            subtitle="Cinco módulos que você liga no cliente como blocos. A IA, o WhatsApp e a infraestrutura ficam por conta da Bu1lder."
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((m, i) => (
              <Reveal key={m.name} delay={i * 70}>
                <ModuleCard
                  index={i}
                  name={m.name}
                  benefit={m.benefit}
                  icon={m.icon}
                  example={m.example}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GANHO + SIMULADOR */}
      <section className="border-y border-foreground/5 bg-foreground/[0.015]">
        <div className="container-editorial section-pad">
          <SectionHeader
            eyebrow="Quanto você ganha"
            title="Plano recomendado: Performance"
            subtitle="Cliente paga R$ 5.000/mês (setup incluso). Você recebe R$ 2.000/mês por cliente. Pode cobrar acima do piso e ficar com 100% do excedente."
          />
          <div className="mt-10">
            <EarningsSimulator plan={plan} />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Você pode cobrar acima do piso e aumentar esse número.
          </p>
        </div>
      </section>

      {/* FACILIDADE */}
      <section>
        <div className="container-editorial section-pad">
          <SectionHeader
            eyebrow="Facilidade de venda"
            title="Como contabilidade se comporta na hora de vender"
            subtitle="Nota de 1 a 10 para cada etapa do processo comercial."
          />
          <div className="mt-10">
            <EaseBadges ease={{ achar: 7, explicar: 8, roi: 8, fechar: 7 }} />
          </div>
        </div>
      </section>

      {/* CASO REAL */}
      <section className="border-y border-foreground/5 bg-foreground/[0.015]">
        <div className="container-editorial section-pad">
          <SectionHeader
            eyebrow="Caso real (hipotético)"
            title="Como fica na prática"
            subtitle="Escritório com 120 clientes — 30 dias depois de ligar a IA."
          />
          <div className="mt-10">
            <BeforeAfter
              before={{
                headline: "A equipe gastava ~3 dias por mês só cobrando notas e documentos.",
                items: [
                  { label: "Dias/mês cobrando docs", value: "~3" },
                  { label: "Atrasos de entrega", value: "Alto" },
                  { label: "Inadimplência honorários", value: "Crônica" },
                ],
              }}
              after={{
                headline: "A IA cobra todo cliente automaticamente, todo mês.",
                items: [
                  { label: "Atrasos de entrega", value: "−60%" },
                  { label: "Equipe liberada", value: "~3 dias/mês" },
                  { label: "Honorários em dia", value: "Sobe" },
                ],
              }}
              delta="Paga-se em horas economizadas"
              quote="Acabou o tour pelo WhatsApp atrás de nota. A IA cobra e a equipe processa."
              author="Patrícia, escritório em Florianópolis"
            />
          </div>
        </div>
      </section>

      {/* ARGUMENTO */}
      <section className="container-editorial pt-12 sm:pt-16 pb-12 sm:pb-16">
        <Reveal>
          <blockquote className="surface-card surface-card-feature p-8 sm:p-10 relative overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-brand-violet/25 blur-3xl"
            />
            <Quote className="relative size-7 text-brand-cyan/80 mb-4" />
            <p className="relative text-xl sm:text-2xl font-medium text-foreground leading-snug">
              "A IA cobra os documentos de cada cliente automaticamente e
              reduz a inadimplência dos honorários."
            </p>
            <footer className="relative mt-4 eyebrow text-brand-violet">
              — Argumento de venda Bu1lder · Contabilidade
            </footer>
          </blockquote>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="border-y border-foreground/5 bg-foreground/[0.015]">
        <div className="container-editorial section-pad">
          <SectionHeader
            eyebrow="Perguntas frequentes"
            title="Tudo o que você precisa saber"
          />
          <div className="mt-8 max-w-3xl">
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
          </div>
        </div>
      </section>

      {/* CTA + FORM */}
      <section id="cadastro" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 top-0 -right-32 w-[500px] h-[500px] rounded-full bg-brand-violet/25 blur-3xl aurora-drift"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 bottom-0 -left-32 w-[460px] h-[460px] rounded-full bg-brand-cyan/15 blur-3xl aurora-drift"
          style={{ animationDelay: "-9s" }}
        />
        <div className="container-editorial section-pad grid lg:grid-cols-[1fr_1.05fr] gap-12 items-start">
          <div>
            <p className="eyebrow text-brand-violet">Vamos começar</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-[-0.03em] leading-[1.1]">
              Pronto para montar sua carteira de clientes de contabilidade?
            </h2>
            <p className="mt-6 lead max-w-lg">
              Seu cadastro já vem com Contabilidade selecionado. Nossa equipe
              te chama em até 1 dia útil para o onboarding.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Sem programar — você liga módulos prontos",
                "Onboarding completo em 3 a 7 dias",
                "Cobrança automática de notas e documentos",
                "Suporte humano + IA durante toda a jornada",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-foreground/90">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-mint to-brand-cyan text-background">
                    <Sparkles className="size-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 surface-card p-5">
              <Quote className="size-5 text-brand-cyan/80 mb-2" />
              <p className="text-sm text-foreground/90 leading-relaxed italic">
                "Mostrei o coletor de docs pro sócio — ele fechou pensando nos 3 dias que ia recuperar todo mês."
              </p>
              <p className="mt-2 eyebrow text-brand-violet">— Bu1lder em atividade</p>
            </div>
          </div>
          <LeadForm origem={SLUG} defaultSegmento={SLUG} />
        </div>
      </section>

      {/* PREV/NEXT */}
      <nav className="container-editorial py-10 grid sm:grid-cols-2 gap-3">
        <Link
          to="/bu1lders/$slug"
          params={{ slug: prev.slug }}
          className="surface-card group p-5"
        >
          <span className="inline-flex items-center gap-2 eyebrow">
            <ArrowLeft className="size-3.5" /> Segmento anterior
          </span>
          <p className="mt-2 text-foreground font-semibold">{shortName(prev.name)}</p>
        </Link>
        <Link
          to="/bu1lders/$slug"
          params={{ slug: next.slug }}
          className="surface-card group p-5 sm:text-right"
        >
          <span className="inline-flex items-center gap-2 eyebrow sm:justify-end sm:w-full">
            Próximo segmento <ArrowRight className="size-3.5" />
          </span>
          <p className="mt-2 text-foreground font-semibold">{shortName(next.name)}</p>
        </Link>
      </nav>

      <footer className="border-t border-foreground/10 text-muted-foreground text-sm">
        <div className="container-editorial py-8 flex flex-wrap items-center justify-between gap-4">
          <span>Bu1lder by MIIND · Porto Alegre · Brasil</span>
          <Link to="/bu1lders" className="hover:text-foreground transition-colors">
            ← Voltar ao hub
          </Link>
        </div>
      </footer>

      <span hidden aria-hidden>{niche.slug}</span>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal>
      <div className="max-w-2xl">
        <p className="eyebrow text-brand-violet">{eyebrow}</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-[-0.03em] leading-[1.1] text-foreground">
          {title}
        </h2>
        {subtitle && <p className="mt-4 lead">{subtitle}</p>}
      </div>
    </Reveal>
  );
}

function shortName(name: string) {
  return name.split(/,/)[0].trim();
}
