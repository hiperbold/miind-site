import { NicheFooter } from "@/components/bu1lders/NicheFooter";
import { NicheFaq } from "@/components/bu1lders/NicheFaq";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Zap,
  ClipboardCheck,
  Repeat,
  Home,
  BarChart3,
  Users,
  Trophy,
  Sparkles,
  Quote,
} from "lucide-react";
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
import { getNicheBySlug, getPlanByKey } from "@/data/niches";

const SLUG = "imobiliarias";
const TITLE =
  "Bu1lder para Imobiliárias — soluções de IA para vender | MIIND";
const DESC =
  "A IA atende, qualifica e agenda visita com cada lead em segundos, antes do concorrente.";

export const Route = createFileRoute("/bu1lders/imobiliarias")({
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
  component: ImobiliariasPage,
});

const faqs = [
  {
    q: "Preciso saber programar?",
    a: "Não. A plataforma é 100% no-code: você liga módulos prontos e entrega a solução à imobiliária sem escrever uma linha de código.",
  },
  {
    q: "Em quanto tempo entrego?",
    a: "Em poucos dias. Os módulos para imobiliárias já vêm prontos; a implementação típica leva de 3 a 7 dias úteis.",
  },
  {
    q: "Como recebo?",
    a: "Você tem relação comercial direta com o seu cliente. A Bu1lder cobra de você apenas a parte da plataforma por produto ativo — o restante é seu, todo mês.",
  },
  {
    q: "Posso atender outros mercados?",
    a: "Sim. Você pode montar uma carteira misturando segmentos — odonto, beleza, saúde, oficinas, pet, restaurantes — tudo na mesma plataforma Bu1lder.",
  },
];

const modules = [
  {
    name: "Resposta Imediata de Lead",
    benefit: "atende em segundos, 24h por dia",
    icon: Zap,
    example:
      "Oi! Vi seu interesse no apto de 2 dorm. em Moema 🏢 Pode me contar pra quando você precisa?",
  },
  {
    name: "Qualificador de Cliente",
    benefit: "orçamento, região e urgência",
    icon: ClipboardCheck,
    example:
      "Pra te indicar certo: orçamento até R$ 750 mil, bairros Moema e V. Mariana, mudança em 60 dias. Tá certo?",
  },
  {
    name: "Follow-up Automático",
    benefit: "cadência até o cliente responder",
    icon: Repeat,
    example:
      "Oi João, separei 3 opções novas em Moema na sua faixa. Posso te mandar agora?",
  },
  {
    name: "Match de Imóveis",
    benefit: "envia compatíveis com o perfil",
    icon: Home,
    example:
      "Achei 3 que batem com tudo que você pediu 🏡 R$ 690k, 720k e 745k. Quer agendar visita amanhã?",
  },
  {
    name: "Painel de Funil",
    benefit: "leads, conversões e produtividade do time",
    icon: BarChart3,
    example:
      "Mês: 214 leads, 96 qualificados, 41 visitas, 7 propostas. Top corretor: Ana com 12 visitas.",
  },
];

const stats = [
  {
    icon: Building2,
    value: "28.370",
    label: "imobiliárias ativas no Brasil",
    tone: "cyan" as const,
  },
  {
    icon: Users,
    value: "≈ 580 mil",
    label: "corretores de imóveis registrados",
    tone: "violet" as const,
  },
  {
    icon: Trophy,
    value: "1 venda",
    label: "paga anos de mensalidade do produto",
    tone: "mint" as const,
  },
];

const timeline = [
  { day: "Dia 1", title: "Briefing com o dono", desc: "Funil atual, fontes de lead e tempo de resposta." },
  { day: "Dia 2", title: "WhatsApp + carteira de imóveis", desc: "Número oficial e base de imóveis com características." },
  { day: "Dia 3", title: "IA treinada", desc: "Aprende regiões, faixas de preço e perguntas de qualificação." },
  { day: "Dia 4", title: "Teste com corretores", desc: "Validação dos atendimentos e regras de agendamento." },
  { day: "Dia 5", title: "Vai ao ar", desc: "Cada lead novo é respondido em segundos, 24h por dia." },
];

const heroMessages = [
  { from: "cliente" as const, text: "Oi, vi o apto de 2 dorm. em Moema. Ainda tá disponível?", time: "23:47" },
  { from: "negocio" as const, text: "Tá sim! 🏢 Pra te indicar o melhor: orçamento até quanto e pra quando você precisa?", time: "23:47" },
  { from: "cliente" as const, text: "Até 750k, mudança em uns 60 dias", time: "23:49" },
  { from: "negocio" as const, text: "Achei 3 opções que batem ✅ Posso agendar visita amanhã às 14h com o corretor Marcos?", time: "23:49" },
];

function ImobiliariasPage() {
  const plan = getPlanByKey("Performance");
  const niche = getNicheBySlug(SLUG)!;

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
                  <Building2 className="size-6" />
                </span>
                <p className="eyebrow text-brand-violet">
                  Programa Bu1lder · Imobiliárias
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-[-0.04em] leading-[1.02] text-gradient">
                Seja sempre o primeiro a responder cada lead.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 lead max-w-xl">
                A IA atende, qualifica e agenda visita com cada lead em
                segundos, antes do concorrente.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <p className="mt-5 text-sm text-brand-violet max-w-2xl">
                Dono da imobiliária ou corretor de alta produção · Quem responde primeiro fecha.
              </p>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
                <a
                  href="#cadastro"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-background font-semibold px-5 sm:px-6 h-12 w-full sm:w-auto shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-shadow"
                >
                  Quero atender imobiliárias <ArrowRight className="size-4" />
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
              title="Imobiliária Capital"
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
            title="Em 5 dias a imobiliária começa a operar com IA"
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
            title="O que você entrega para uma imobiliária"
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
            title="Como imobiliárias se comportam na hora de vender"
            subtitle="Nota de 1 a 10 para cada etapa do processo comercial."
          />
          <div className="mt-10">
            <EaseBadges ease={{ achar: 8, explicar: 8, roi: 9, fechar: 7 }} />
          </div>
        </div>
      </section>

      {/* CASO REAL */}
      <section className="border-y border-foreground/5 bg-foreground/[0.015]">
        <div className="container-editorial section-pad">
          <SectionHeader
            eyebrow="Caso real (hipotético)"
            title="Como fica na prática"
            subtitle="Imobiliária de médio porte com 200 leads/mês — 30 dias depois de ligar a IA."
          />
          <div className="mt-10">
            <BeforeAfter
              before={{
                headline: "Metade dos leads esfriava antes de qualquer corretor responder.",
                items: [
                  { label: "Tempo médio de resposta", value: "horas" },
                  { label: "Leads perdidos", value: "~50%" },
                  { label: "Visitas agendadas/mês", value: "~25" },
                ],
              }}
              after={{
                headline: "Resposta imediata e qualificação automática, 24h por dia.",
                items: [
                  { label: "Tempo médio de resposta", value: "segundos" },
                  { label: "Visitas agendadas/mês", value: "~50" },
                  { label: "Conversão lead → visita", value: "2x" },
                ],
              }}
              delta="Uma única venda paga anos de mensalidade"
              quote="Lead que entrava de madrugada já vinha qualificado e com visita marcada pra de manhã."
              author="Renata, imobiliária em Curitiba"
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
              "A IA atende, qualifica e agenda visita com cada lead em
              segundos, antes do concorrente."
            </p>
            <footer className="relative mt-4 eyebrow text-brand-violet">
              — Argumento de venda Bu1lder · Imobiliárias
            </footer>
          </blockquote>
        </Reveal>
      </section>

      <NicheFaq items={faqs} />

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
              Pronto para montar sua carteira de clientes de imobiliárias?
            </h2>
            <p className="mt-6 lead max-w-lg">
              Seu cadastro já vem com Imobiliárias selecionado. Nossa equipe
              te chama em até 1 dia útil para o onboarding.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Sem programar — você liga módulos prontos",
                "Onboarding completo em 3 a 7 dias",
                "Resposta em segundos a cada lead, 24h por dia",
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
                "Mostrei a resposta de madrugada pro dono — fechou no mesmo café."
              </p>
              <p className="mt-2 eyebrow text-brand-violet">— Bu1lder em atividade</p>
            </div>
          </div>
          <LeadForm origem={SLUG} defaultSegmento={SLUG} formId={`cadastro-${SLUG}`} />
        </div>
      </section>

      <NicheFooter />

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
