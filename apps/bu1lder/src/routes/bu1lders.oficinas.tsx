import { NicheFooter } from "@/components/bu1lders/NicheFooter";
import { NicheFaq } from "@/components/bu1lders/NicheFaq";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Wrench,
  BellRing,
  FileCheck,
  CarFront,
  CalendarCheck,
  BarChart3,
  Building2,
  Car,
  Wallet,
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

const SLUG = "oficinas";
const TITLE =
  "Bu1lder para Oficinas & Autocenter — soluções de IA para vender | MIIND";
const DESC =
  "A IA chama o cliente para a revisão no momento certo e aprova orçamentos pelo WhatsApp.";

export const Route = createFileRoute("/bu1lders/oficinas")({
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
  component: OficinasPage,
});

const faqs = [
  {
    q: "Preciso saber programar?",
    a: "Não. A plataforma é 100% no-code: você liga módulos prontos e entrega a solução à oficina sem escrever uma linha de código.",
  },
  {
    q: "Em quanto tempo entrego?",
    a: "Em poucos dias. Os módulos para oficinas já vêm prontos; a implementação típica leva de 3 a 7 dias úteis.",
  },
  {
    q: "Como recebo?",
    a: "Você tem relação comercial direta com o seu cliente. A Bu1lder cobra de você apenas a parte da plataforma por produto ativo — o restante é seu, todo mês.",
  },
  {
    q: "Posso atender outros mercados?",
    a: "Sim. Você pode montar uma carteira misturando segmentos — beleza, odonto, saúde, pet, restaurantes — tudo na mesma plataforma Bu1lder.",
  },
];

const modules = [
  {
    name: "Lembrete de Revisão",
    benefit: "reconvoca no km/tempo certo",
    icon: BellRing,
    example:
      "Seu Civic já fez 10 mil km, Seu João — hora da revisão. Posso reservar terça 9h? 🔧",
  },
  {
    name: "Orçamento no WhatsApp",
    benefit: "cliente aprova pelo celular",
    icon: FileCheck,
    example:
      "Orçamento: pastilha + óleo R$ 480. Aprova? Responde SIM e a gente segue.",
  },
  {
    name: "Status do Serviço",
    benefit: "avisa 'carro pronto' e 'aguardando peça'",
    icon: CarFront,
    example:
      "Carro pronto! Pode buscar até 18h. Pagamento Pix ou cartão na retirada.",
  },
  {
    name: "Agendamento de Box",
    benefit: "organiza a fila de serviços",
    icon: CalendarCheck,
    example:
      "Box 2 livre quarta 14h. Posso encaixar sua troca de óleo nesse horário?",
  },
  {
    name: "Painel da Oficina",
    benefit: "ticket médio, retorno e lucro por serviço",
    icon: BarChart3,
    example:
      "Mês: 142 serviços, ticket médio R$ 620. Retorno de cliente: 48%. Top: revisão.",
  },
];

const stats = [
  {
    icon: Building2,
    value: "76.429",
    label: "oficinas mecânicas no Brasil",
    tone: "cyan" as const,
  },
  {
    icon: Car,
    value: "41,7 mi",
    label: "veículos na frota brasileira",
    tone: "violet" as const,
  },
  {
    icon: Wallet,
    value: "+R$ 5 mil",
    label: "recuperados por mês com lembrete de revisão",
    tone: "mint" as const,
  },
];

const timeline = [
  { day: "Dia 1", title: "Briefing com o dono", desc: "Serviços, ticket e perfil dos clientes." },
  { day: "Dia 2", title: "WhatsApp + base de clientes", desc: "Número oficial e histórico de veículos." },
  { day: "Dia 3", title: "IA treinada", desc: "Aprende serviços, peças e gatilhos de km/tempo." },
  { day: "Dia 4", title: "Teste com o time", desc: "Validação dos orçamentos e mensagens." },
  { day: "Dia 5", title: "Vai ao ar", desc: "A oficina começa a chamar o carro de volta sozinha." },
];

const heroMessages = [
  { from: "negocio" as const, text: "Seu Civic já fez 10 mil km, Seu João — hora da revisão 🔧", time: "10:08" },
  { from: "cliente" as const, text: "Verdade, esqueci 😅 Pode marcar terça 9h", time: "10:10" },
  { from: "negocio" as const, text: "Box reservado pra terça 9h ✅ Te aviso quando o carro estiver pronto.", time: "10:10" },
];

function OficinasPage() {
  const plan = getPlanByKey("Crescimento");
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
                  <Wrench className="size-6" />
                </span>
                <p className="eyebrow text-brand-violet">
                  Programa Bu1lder · Oficinas & Autocenter
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-[-0.04em] leading-[1.02] text-gradient">
                Traga o carro do seu cliente de volta — automaticamente.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 lead max-w-xl">
                A IA chama o cliente para a revisão no momento certo e aprova
                orçamentos pelo WhatsApp.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <p className="mt-5 text-sm text-brand-violet max-w-2xl">
                Dono da oficina (perfil mão na massa) · Venda por demonstração.
              </p>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
                <a
                  href="#cadastro"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-background font-semibold px-5 sm:px-6 h-12 w-full sm:w-auto shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-shadow"
                >
                  Quero atender oficinas & autocenter <ArrowRight className="size-4" />
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
              title="Auto Center Sul"
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
            title="Em 5 dias a oficina começa a operar com IA"
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
            title="O que você entrega para uma oficina"
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
            title="Como oficinas & autocenter se comportam na hora de vender"
            subtitle="Nota de 1 a 10 para cada etapa do processo comercial."
          />
          <div className="mt-10">
            <EaseBadges ease={{ achar: 9, explicar: 8, roi: 8, fechar: 7 }} />
          </div>
        </div>
      </section>

      {/* CASO REAL */}
      <section className="border-y border-foreground/5 bg-foreground/[0.015]">
        <div className="container-editorial section-pad">
          <SectionHeader
            eyebrow="Caso real (hipotético)"
            title="Como fica na prática"
            subtitle="Oficina de bairro com 4 boxes — 30 dias depois de ligar a IA."
          />
          <div className="mt-10">
            <BeforeAfter
              before={{
                headline: "Cliente sumia depois da troca de óleo e só voltava quando dava problema.",
                items: [
                  { label: "Follow-up de revisão", value: "—" },
                  { label: "Retorno em 6 meses", value: "~25%" },
                  { label: "Aprovação de orçamento", value: "Lenta" },
                ],
              }}
              after={{
                headline: "Lembrete por km/tempo e orçamento aprovado pelo celular.",
                items: [
                  { label: "Clientes recuperados/mês", value: "+15" },
                  { label: "Faturamento extra", value: "+R$ 5 mil" },
                  { label: "Aprovação de orçamento", value: "Minutos" },
                ],
              }}
              delta="ROI acima de 10x"
              quote="Apareceu cliente que eu não via há 8 meses voltando pra trocar óleo."
              author="Seu Roberto, oficina em Canoas"
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
              "A IA chama o cliente para a revisão no momento certo e aprova
              orçamentos pelo WhatsApp."
            </p>
            <footer className="relative mt-4 eyebrow text-brand-violet">
              — Argumento de venda Bu1lder · Oficinas & Autocenter
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
              Pronto para montar sua carteira de clientes de oficinas & autocenter?
            </h2>
            <p className="mt-6 lead max-w-lg">
              Seu cadastro já vem com Oficinas & Autocenter selecionado. Nossa
              equipe te chama em até 1 dia útil para o onboarding.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Sem programar — você liga módulos prontos",
                "Onboarding completo em 3 a 7 dias",
                "Lembrete automático por km e por tempo",
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
                "Mostrei o lembrete de revisão pro dono — ele fechou na hora."
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
