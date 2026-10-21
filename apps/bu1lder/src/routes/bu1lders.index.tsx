import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Wallet, Zap, ShieldCheck, Layers } from "lucide-react";
import { BuildersHeader } from "@/components/bu1lders/BuildersHeader";
import { FlowSteps } from "@/components/bu1lders/FlowSteps";
import { NicheCard } from "@/components/bu1lders/NicheCard";
import { FaqAccordion } from "@/components/bu1lders/FaqAccordion";
import { LeadForm } from "@/components/bu1lders/LeadForm";
import { niches } from "@/data/niches";

export const Route = createFileRoute("/bu1lders/")({
  head: () => ({
    meta: [
      { title: "Seja um Bu1lder — cadastre-se e construa IA com renda recorrente | MIIND" },
      {
        name: "description",
        content:
          "Cadastre-se no programa Bu1lder by MIIND e comece a montar sua carteira de pequenas e médias empresas com soluções de IA no WhatsApp. Sem programar.",
      },
      { property: "og:title", content: "Seja um Bu1lder — cadastro aberto | MIIND" },
      {
        property: "og:description",
        content:
          "Preencha o cadastro e nossa equipe entra em contato em até 1 dia útil. Renda recorrente com IA, sem programar.",
      },
      { property: "og:url", content: "/bu1lders" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/bu1lders" }],
  }),
  component: BuildersLanding,
});

const heroBullets = [
  { icon: Wallet, text: "Renda recorrente todo mês, enquanto o cliente estiver ativo." },
  { icon: Layers, text: "Plataforma com IA, WhatsApp e integrações prontas — sem código." },
  { icon: Zap, text: "Implementação típica de 3 a 7 dias úteis." },
  { icon: ShieldCheck, text: "Soluções para 10 segmentos de mercado." },
];

const stats = [
  { value: "10", label: "segmentos prontos" },
  { value: "R$ 1,2k+", label: "ticket médio / cliente" },
  { value: "70%", label: "da recorrência fica com você" },
];

function BuildersLanding() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <BuildersHeader />

      {/* HERO + FORM */}
      <section className="relative overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -z-20 top-[10%] -left-32 w-[600px] h-[600px] rounded-full bg-brand-violet/30 [.light_&]:bg-brand-violet/15 blur-[140px] aurora-drift"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -z-20 top-[20%] -right-32 w-[600px] h-[600px] rounded-full bg-brand-blue/30 [.light_&]:bg-brand-blue/15 blur-[140px] aurora-drift"
          style={{ animationDelay: "-8s" }}
        />
        <div className="absolute -z-10 inset-x-0 bottom-0 h-[60%] [perspective:800px] pointer-events-none">
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

        <div className="container-editorial relative grid lg:grid-cols-[1.05fr_1fr] gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-brand-violet text-xs font-medium tracking-wide">
              <span className="size-1.5 rounded-full bg-brand-violet animate-pulse" />
              Programa Bu1lders · Cadastro aberto
            </div>

            <h1 className="mt-7 text-[2rem] sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] sm:leading-[1.05]">
              Vire um Bu1lder e ganhe{" "}
              <span className="text-gradient animate-gradient-x bg-[length:200%_auto]">
                renda recorrente
              </span>{" "}
              com IA.
            </h1>

            <p className="mt-6 lead max-w-xl">
              Você descobre a dor, a MIIND constrói a tecnologia, e você fica com sua parte da
              recorrência — todo mês, sem precisar programar.
            </p>

            <ul className="mt-7 space-y-2.5 sm:space-y-3 max-w-xl">
              {heroBullets.map((b) => (
                <li key={b.text} className="flex items-start gap-3">
                  <span className="mt-0.5 grid place-items-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan shrink-0">
                    <b.icon className="size-4" />
                  </span>
                  <span className="text-sm text-foreground/85 leading-relaxed">{b.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-2">
              {["Sem programar", "Setup incluso", "Sem mensalidade", "Suporte completo"].map(
                (p) => (
                  <span
                    key={p}
                    className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-white/10 bg-white/5 text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-muted-foreground"
                  >
                    {p}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <div className="surface-card surface-card-feature p-5 sm:p-7">
              <p className="eyebrow text-brand-violet">Comece em 1 minuto</p>
              <h2 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-semibold tracking-[-0.02em] leading-tight">
                Cadastre-se agora
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Nossa equipe entra em contato em até 1 dia útil. Sem custo de adesão.
              </p>
              <div className="mt-5 sm:mt-6">
                <LeadForm origem="hub-hero" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-foreground/5 bg-foreground/[0.015]">
        <div className="container-editorial py-10">
          <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gradient bg-[length:200%_auto] tabular-nums">
                  {s.value}
                </p>
                <p className="mt-1 text-[9px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] text-muted-foreground font-semibold leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="container-editorial section-pad">
        <SectionHeader eyebrow="Como funciona" title="Três passos para sua primeira recorrência" />
        <div className="mt-10">
          <FlowSteps />
        </div>
      </section>

      <section className="container-editorial section-pad">
        <SectionHeader
          eyebrow="Para quem já atende empresas"
          title="Sua carteira pode ser o ponto de partida"
          subtitle="Conheça a abordagem do programa para o seu perfil de negócio."
        />
        <div className="agency-grid mt-8">
          {[
            {
              slug: "contabilidade",
              title: "Escritórios de contabilidade",
              copy: "Comece pelas rotinas do escritório e identifique oportunidades na sua carteira.",
            },
            {
              slug: "agencia-marketing",
              title: "Agências de marketing",
              copy: "Conecte a captação ao atendimento e ofereça soluções de IA aos negócios que você já atende.",
            },
          ].map((item) => (
            <Link
              key={item.slug}
              to="/bu1lders/$slug"
              params={{ slug: item.slug }}
              className="surface-card p-8"
            >
              <p className="eyebrow text-brand-cyan">Programa de parceiros</p>
              <h3 className="mt-4 text-2xl">{item.title}</h3>
              <p className="mt-3 text-muted-foreground">{item.copy}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-brand-cyan text-sm">
                Conhecer a proposta <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* SEGMENTOS */}
      <section id="segmentos" className="border-y border-foreground/5 bg-foreground/[0.015]">
        <div className="container-editorial section-pad">
          <SectionHeader
            eyebrow="Escolha seu segmento"
            title="Em qual mercado você já tem trânsito?"
            subtitle="Cada segmento tem sua própria página de cadastro, já com o foco certo."
          />
          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {niches.map((n) => (
              <NicheCard key={n.slug} niche={n} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-editorial section-pad max-w-3xl">
        <SectionHeader eyebrow="Perguntas frequentes" title="Antes de cadastrar" />
        <div className="mt-8">
          <FaqAccordion />
        </div>
      </section>

      {/* CTA FINAL + FORM */}
      <section className="relative overflow-hidden border-t border-foreground/5">
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 top-0 -right-32 w-[500px] h-[500px] rounded-full bg-brand-violet/20 blur-3xl aurora-drift"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 bottom-0 -left-32 w-[500px] h-[500px] rounded-full bg-brand-cyan/15 blur-3xl aurora-drift"
          style={{ animationDelay: "-6s" }}
        />
        <div className="container-editorial section-pad grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="eyebrow text-brand-violet">Pronto para começar?</p>
            <h2 className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.1]">
              Cadastre-se e monte sua carteira de clientes
            </h2>
            <p className="mt-6 lead max-w-lg">
              Preencha o formulário e nossa equipe te chama em até 1 dia útil. Sem compromisso, sem
              custo de adesão.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span>✓ Cadastro gratuito</span>
              <span>✓ Sem mensalidade</span>
              <span>✓ Suporte completo</span>
            </div>
            <a
              href="#cadastro"
              className="mt-8 inline-flex items-center gap-2 rounded-xl glass text-foreground font-medium px-6 h-12 hover:border-brand-cyan/30 transition-colors lg:hidden"
            >
              Ir para o cadastro <ArrowRight className="size-4" />
            </a>
          </div>
          <LeadForm origem="hub-bottom" formId="cadastro-final" />
        </div>
      </section>

      <footer className="border-t border-foreground/10 text-muted-foreground text-sm">
        <div className="container-editorial py-8 flex flex-wrap items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} MIIND · Programa Bu1lder</span>
          <Link to="/" className="hover:text-foreground transition-colors">
            ← Voltar ao site institucional
          </Link>
        </div>
      </footer>
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
    <div className="max-w-2xl">
      <p className="eyebrow text-brand-violet">{eyebrow}</p>
      <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.03em] leading-[1.1] text-foreground">
        {title}
      </h2>
      {subtitle && <p className="mt-4 lead">{subtitle}</p>}
    </div>
  );
}
