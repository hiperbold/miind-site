import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  UtensilsCrossed,
  MessageCircle,
  BadgePercent,
  UserPlus,
  Users,
  BarChart3,
  Wallet,
  TrendingDown,
  PiggyBank,
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

const SLUG = "restaurantes";
const TITLE =
  "Bu1lder para Restaurantes & Food — soluções de IA para vender | MIIND";
const DESC =
  "Receba pedidos e reservas direto no WhatsApp e pare de doar 25% de cada venda para o marketplace.";

export const Route = createFileRoute("/bu1lders/restaurantes")({
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
  component: RestaurantesPage,
});

const faqs = [
  {
    q: "Preciso saber programar?",
    a: "Não. A plataforma é 100% no-code: você liga módulos prontos e entrega a solução ao restaurante sem escrever uma linha de código.",
  },
  {
    q: "Em quanto tempo entrego?",
    a: "Em poucos dias. Os módulos para restaurantes & food já vêm prontos; a implementação típica leva de 3 a 7 dias úteis.",
  },
  {
    q: "Como recebo?",
    a: "Você tem relação comercial direta com o seu cliente. A Bu1lder cobra de você apenas a parte da plataforma por produto ativo — o restante é seu, todo mês.",
  },
  {
    q: "Posso atender outros mercados?",
    a: "Sim. Você pode montar uma carteira misturando segmentos — odonto, beleza, saúde, oficinas, pet — tudo na mesma plataforma Bu1lder.",
  },
];

const modules = [
  {
    name: "Pedido / Reserva Direto",
    benefit: "sem comissão de marketplace",
    icon: MessageCircle,
    example:
      "Boa noite! 🍕 Quer fazer seu pedido por aqui? Pizza grande margherita sai R$ 59,90. Posso confirmar?",
  },
  {
    name: "Clube de Fidelidade",
    benefit: "ofertas para dias fracos",
    icon: BadgePercent,
    example:
      "Terça é dia de cliente VIP 🎉 20% off no rodízio só hoje. Reserva mesa pra 2?",
  },
  {
    name: "Recuperador de Cliente",
    benefit: "reativa quem não volta há tempos",
    icon: UserPlus,
    example:
      "Faz 45 dias que você não vem 😢 Tá com saudade do nosso fettuccine? Te garanto sobremesa por conta da casa.",
  },
  {
    name: "Recrutamento & Onboarding",
    benefit: "triagem e integração de equipe",
    icon: Users,
    example:
      "Triagem do garçom feita ✅ João passou nas 5 perguntas. Posso agendar a entrevista com o gerente?",
  },
  {
    name: "Painel de Vendas",
    benefit: "itens mais vendidos e horários de pico",
    icon: BarChart3,
    example:
      "Sex 20h–22h é seu pico: 38% do faturamento. Top item: parmegiana. Sugiro reforçar a equipe.",
  },
];

const stats = [
  {
    icon: Wallet,
    value: "R$ 495 bi",
    label: "faturamento do setor food service em 2025",
    tone: "cyan" as const,
  },
  {
    icon: TrendingDown,
    value: "~25%",
    label: "de comissão evitada por pedido direto",
    tone: "violet" as const,
  },
  {
    icon: PiggyBank,
    value: "~R$ 2.000",
    label: "economizados por mês saindo do marketplace",
    tone: "mint" as const,
  },
];

const timeline = [
  { day: "Dia 1", title: "Briefing com o dono", desc: "Cardápio, ticket médio e dor com marketplaces." },
  { day: "Dia 2", title: "WhatsApp + cardápio", desc: "Número oficial e cardápio completo com preços." },
  { day: "Dia 3", title: "IA treinada", desc: "Aprende itens, combos, horários e regras de entrega." },
  { day: "Dia 4", title: "Teste com a equipe", desc: "Validação dos pedidos, reservas e mensagens." },
  { day: "Dia 5", title: "Vai ao ar", desc: "O restaurante começa a receber pedido direto, sem comissão." },
];

const heroMessages = [
  { from: "cliente" as const, text: "Boa noite! Vocês entregam até a Vila Mariana?", time: "19:42" },
  { from: "negocio" as const, text: "Entregamos sim 🍕 Quer pedir por aqui mesmo? Pizza grande margherita R$ 59,90.", time: "19:42" },
  { from: "cliente" as const, text: "Fechado! Pago no Pix", time: "19:44" },
  { from: "negocio" as const, text: "Pedido confirmado ✅ 35 min. Sem taxa de marketplace 💪", time: "19:44" },
];

function RestaurantesPage() {
  const plan = getPlanByKey("Crescimento");
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
                  <UtensilsCrossed className="size-6" />
                </span>
                <p className="eyebrow text-brand-violet">
                  Programa Bu1lder · Restaurantes & Food
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-[-0.04em] leading-[1.02] text-gradient">
                Receba pedidos direto no WhatsApp e pare de doar comissão.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 lead max-w-xl">
                Receba pedidos e reservas direto no WhatsApp e pare de doar 25%
                de cada venda para o marketplace.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <p className="mt-5 text-sm text-brand-violet max-w-2xl">
                Dono ou gerente · Foco em vender direto sem comissão de marketplace.
              </p>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
                <a
                  href="#cadastro"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-background font-semibold px-5 sm:px-6 h-12 w-full sm:w-auto shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-shadow"
                >
                  Quero atender restaurantes & food <ArrowRight className="size-4" />
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
              title="Cantina da Esquina"
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
            title="Em 5 dias o restaurante começa a operar com IA"
            subtitle="Você não programa nada. A Bu1lder cuida da operação enquanto você cuida da relação com o dono."
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
            title="O que você entrega para um restaurante ou bar"
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
            title="Plano recomendado: Crescimento"
            subtitle="Cliente paga R$ 3.500/mês (setup incluso). Você recebe R$ 1.400/mês por cliente. Pode cobrar acima do piso e ficar com 100% do excedente."
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
            title="Como restaurantes & food se comportam na hora de vender"
            subtitle="Nota de 1 a 10 para cada etapa do processo comercial."
          />
          <div className="mt-10">
            <EaseBadges ease={{ achar: 8, explicar: 7, roi: 8, fechar: 6 }} />
          </div>
        </div>
      </section>

      {/* CASO REAL */}
      <section className="border-y border-foreground/5 bg-foreground/[0.015]">
        <div className="container-editorial section-pad">
          <SectionHeader
            eyebrow="Caso real (hipotético)"
            title="Como fica na prática"
            subtitle="Restaurante de bairro 100% dependente de marketplace — 30 dias depois de ligar a IA."
          />
          <div className="mt-10">
            <BeforeAfter
              before={{
                headline: "Quase todo pedido vinha do marketplace, comendo 25% de comissão.",
                items: [
                  { label: "Pedidos diretos", value: "~0%" },
                  { label: "Comissão por mês", value: "−R$ 2.000+" },
                  { label: "Relação com cliente", value: "Nula" },
                ],
              }}
              after={{
                headline: "Pedido e reserva direto no WhatsApp, com o número da casa.",
                items: [
                  { label: "Pedidos diretos", value: "~20%" },
                  { label: "Economia/mês", value: "+R$ 2.000" },
                  { label: "Base de clientes própria", value: "Sim" },
                ],
              }}
              delta="ROI acima de 3x só em comissão"
              quote="Cada pedido direto é dinheiro que não vai mais embora pro app."
              author="Marcos, restaurante em São Paulo"
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
              "Receba pedidos e reservas direto no WhatsApp e pare de doar 25%
              de cada venda para o marketplace."
            </p>
            <footer className="relative mt-4 eyebrow text-brand-violet">
              — Argumento de venda Bu1lder · Restaurantes & Food
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
              Pronto para montar sua carteira de clientes de restaurantes & food?
            </h2>
            <p className="mt-6 lead max-w-lg">
              Seu cadastro já vem com Restaurantes & Food selecionado. Nossa
              equipe te chama em até 1 dia útil para o onboarding.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Sem programar — você liga módulos prontos",
                "Onboarding completo em 3 a 7 dias",
                "Pedido e reserva direto no WhatsApp, sem comissão",
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
                "Mostrei o pedido direto no WhatsApp pro dono — fechou na hora pra fugir da comissão."
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
