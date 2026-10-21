import { AnimatePresence, m as motion } from "framer-motion";
import { lazy, Suspense } from "react";
import {
  AlertTriangle,
  Cable,
  Code2,
  ShieldAlert,
  TrendingDown,
  GaugeCircle,
  MessageSquare,
  Workflow,
  Sparkles,
  LayoutDashboard,
  Bot,
  Boxes,
  Layers,
  ScrollText,
  Lock,
  Eye,
  GitBranch,
  CheckCircle2,
  ArrowRight,
  Search,
  PenLine,
  Hammer,
  Plug,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Code-split: ContactForm carrega react-hook-form + zod só quando a seção CTA
// é montada (final da página). Reduz o JS inicial do chunk below-fold.
const ContactForm = lazy(() =>
  import("./ContactForm").then((m) => ({ default: m.ContactForm }))
);

function ContactFormFallback() {
  return (
    <div
      className="rounded-2xl glass p-8 min-h-[520px] animate-pulse"
      aria-hidden="true"
    />
  );
}


const FOOTER_YEAR = new Date().getFullYear();

/* ============ shared ============ */

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  eyebrowVariant = "rule",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  eyebrowVariant?: "rule" | "pill";
}) {
  return (
    <div
      className={`max-w-3xl mb-14 ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && eyebrowVariant === "pill" && (
        <div className={`flex mb-5 ${align === "center" ? "justify-center" : ""}`}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-medium tracking-wide">
            <span className="size-1.5 rounded-full bg-brand-cyan" />
            {eyebrow}
          </span>
        </div>
      )}
      {eyebrow && eyebrowVariant === "rule" && (
        <div
          className={`flex items-center gap-3 mb-5 ${align === "center" ? "justify-center" : ""}`}
        >
          <span className="brand-divider !w-10" />
          <span className="eyebrow text-brand-cyan/90">{eyebrow}</span>
          <span className="brand-divider !w-10" />
        </div>
      )}
      <h2 className="display-l">{title}</h2>
      {description && (
        <p className="mt-5 lead">{description}</p>
      )}
    </div>
  );
}

const cardBase =
  "group relative rounded-xl glass p-5 transition-all duration-300 hover:border-brand-cyan/30 hover:-translate-y-0.5";

const cardMarco =
  "group relative card-marco p-5 md:p-6 hover:-translate-y-1 hover:border-brand-cyan/50";

/* ============ Problem ============ */

const pains = [
  { icon: Workflow, t: "Processos manuais e lentos" },
  { icon: Cable, t: "Canais desconectados" },
  { icon: Code2, t: "Dependência excessiva de desenvolvimento tradicional" },
  { icon: ShieldAlert, t: "Falta de governança em iniciativas de IA" },
  { icon: TrendingDown, t: "Dificuldade para escalar automações" },
  { icon: GaugeCircle, t: "Pouca visibilidade sobre indicadores e performance" },
];

export function ProblemSection() {
  return (
    <section className="relative section-pad">
      <div className="container-editorial">
        <SectionHeader
          eyebrow="O cenário"
          eyebrowVariant="pill"
          title={
            <>
              Empresas não precisam de mais ferramentas. Precisam transformar
              processos em{" "}
              <span className="text-gradient animate-gradient-x bg-[length:200%_auto]">
                software vivo
              </span>
              .
            </>
          }
          description="Planilhas, fluxos manuais, integrações frágeis, times sobrecarregados e soluções desconectadas convivem com áreas de negócio que precisam testar ideias, automatizar jornadas e criar experiências digitais com velocidade — sem abrir mão de segurança e compliance."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pains.map((p, i) => (
            <motion.div
              key={p.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:border-brand-violet/40 hover:bg-white/[0.05] hover:-translate-y-0.5"
            >
              <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70 font-semibold tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="size-9 rounded-lg bg-brand-violet/10 grid place-items-center border border-brand-violet/25">
                <p.icon className="size-4 text-brand-violet" />
              </div>
              <p className="mt-4 text-sm font-medium text-foreground/85 leading-snug">
                {p.t}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Solution Architecture ============ */

const layers = [
  {
    icon: MessageSquare,
    title: "Canais",
    color: "from-brand-cyan/30 to-transparent",
    chips: ["WhatsApp", "E-mail", "Webchat", "Telefonia", "Microsoft Teams", "APIs"],
  },
  {
    icon: Workflow,
    title: "Builder Visual",
    color: "from-brand-blue/30 to-transparent",
    chips: ["Fluxos", "Regras", "Prompts", "Agentes", "Orquestração", "Aprovações"],
  },
  {
    icon: Sparkles,
    title: "Inteligência",
    color: "from-brand-violet/30 to-transparent",
    chips: ["LLMs", "RAG", "Bases de conhecimento", "Classificação de intenção", "Análise de sentimento", "Extração de dados"],
  },
  {
    icon: ShieldAlert,
    title: "Governança",
    color: "from-brand-mint/30 to-transparent",
    chips: ["RBAC", "Logs", "Auditoria", "Versionamento", "Aprovação", "Monitoramento", "LGPD"],
  },
  {
    icon: LayoutDashboard,
    title: "Resultados",
    color: "from-brand-cyan/30 to-transparent",
    chips: ["Automação operacional", "Redução de custos", "Aumento de conversão", "Melhor experiência", "Dashboards", "Escalabilidade"],
  },
];

export function SolutionSection() {
  return (
    <section id="solucoes" className="relative section-pad">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 via-transparent to-transparent" />
      <div className="relative container-editorial">
        <SectionHeader
          eyebrow="A solução"
          eyebrowVariant="pill"
          title={
            <>
              Bu1lder: a camada de{" "}
              <span className="text-gradient animate-gradient-x bg-[length:200%_auto]">
                criação, orquestração e governança
              </span>{" "}
              de IA da sua empresa.
            </>
          }
          description="Com o Bu1lder, a Miind combina IA generativa, automação visual, integrações, agentes especializados e governança para criar soluções digitais em ciclos curtos. A plataforma permite que empresas criem jornadas inteligentes, conectem sistemas, monitorem interações e evoluam produtos com segurança."
        />

        {/* Stack tower — z-depth */}
        <div className="relative group/stack space-y-3 md:space-y-2.5">
          {layers.map((l, i) => {
            const offsets = ["md:-translate-x-2", "md:-translate-x-1", "md:translate-x-0", "md:translate-x-1", "md:translate-x-2"];
            return (
              <motion.div
                key={l.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden transform-gpu transition-all duration-500 ${offsets[i] ?? ""} hover:!translate-x-0 hover:-translate-y-1 hover:border-brand-cyan/40 hover:z-10 md:group-hover/stack:opacity-60 md:hover:!opacity-100`}
                style={{
                  boxShadow: `0 ${8 + i * 4}px ${24 + i * 6}px -${14 - i}px oklch(0.13 0.025 265 / 0.${35 + i * 5})`,
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${l.color} opacity-50`} />
                <span className="absolute top-3 right-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70 font-semibold tabular-nums z-10">
                  Camada {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-3 md:w-56 shrink-0">
                    <div className="size-10 rounded-lg border border-brand-cyan/25 bg-brand-cyan/10 grid place-items-center">
                      <l.icon className="size-5 text-brand-cyan" />
                    </div>
                    <div className="font-display font-semibold">{l.title}</div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {l.chips.map((c) => (
                      <span
                        key={c}
                        className="text-xs px-2.5 py-1 rounded-md bg-brand-cyan/[0.06] border border-brand-cyan/15 text-foreground/75 hover:border-brand-cyan/30 hover:text-foreground transition-colors"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

/* ============ What you build ============ */

const builds = [
  { icon: Bot, t: "Agentes de IA Generativa", d: "Crie agentes especializados para atendimento, vendas, suporte, RH, financeiro, jurídico, operações e relacionamento com clientes." },
  { icon: Workflow, t: "Fluxos de automação", d: "Desenhe jornadas com regras, condições, integrações, aprovações e ações automatizadas." },
  { icon: MessageSquare, t: "Experiências conversacionais", d: "Construa canais inteligentes em WhatsApp, webchat, e-mail, Teams e outros pontos de contato." },
  { icon: Boxes, t: "Aplicações internas", d: "Transforme planilhas e processos manuais em sistemas internos, dashboards e ferramentas operacionais." },
  { icon: LayoutDashboard, t: "Dashboards e analytics", d: "Monitore interações, intenções, SLA, sentimento, conversão, produtividade e performance." },
  { icon: Layers, t: "Esteiras de IA corporativa", d: "Padronize, monitore e escale iniciativas de IA com governança, segurança e controle." },
];

export function WhatYouBuildSection() {
  return (
    <section className="relative section-pad">
      <div className="container-editorial">
        <SectionHeader
          eyebrow="O que você pode construir"
          eyebrowVariant="pill"
          title={
            <>
              De agentes a aplicações completas — {" "}
              <span className="text-gradient animate-gradient-x bg-[length:200%_auto]">
                o que o negócio precisa
              </span>
              .
            </>
          }
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {builds.map((b, i) => (
            <motion.div
              key={b.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative rounded-xl border border-white/10 bg-white/[0.03] p-5 md:p-6 backdrop-blur-sm transition-all duration-300 hover:border-brand-cyan/40 hover:bg-white/[0.05] hover:-translate-y-1"
            >
              <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70 font-semibold tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="size-10 rounded-lg bg-gradient-to-br from-brand-cyan/25 to-brand-violet/25 grid place-items-center border border-brand-cyan/20 mb-4 group-hover:scale-105 transition-transform">
                <b.icon className="size-5 text-brand-cyan" />
              </div>
              <h3 className="font-display font-semibold text-lg">{b.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ How it works ============ */

const steps = [
  { icon: Search, t: "Diagnóstico", d: "Mapeamos a dor, o processo, os canais, os sistemas e os indicadores de sucesso." },
  { icon: PenLine, t: "Desenho da solução", d: "Transformamos a demanda em fluxos, agentes, regras, integrações e telas." },
  { icon: Hammer, t: "Construção no Bu1lder", d: "Criamos automações, agentes e experiências digitais em ciclos rápidos, com validação contínua." },
  { icon: Plug, t: "Integração e governança", d: "Conectamos sistemas, configuramos permissões, logs, auditoria, segurança e monitoramento." },
  { icon: Activity, t: "Operação e evolução", d: "Medimos resultados, ajustamos fluxos, melhoramos prompts, criamos novas versões e escalamos." },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="relative section-pad">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-violet/5 to-transparent" />
      <div className="relative container-editorial">
        <SectionHeader
          eyebrow="Como funciona"
          title={<>Da demanda à operação em 5 etapas.</>}
        />

        {/* Desktop (lg+): horizontal 5-column timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div className="absolute top-[34px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent" />
          <div className="relative grid grid-cols-5 gap-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center min-w-0"
              >
                {/* Step number background */}
                <div className="absolute -top-2 text-[88px] font-display font-bold leading-none text-brand-cyan/5 select-none pointer-events-none">
                  {i + 1}
                </div>
                {/* Dot on the line */}
                <div className="relative z-10 size-[18px] rounded-full bg-brand-cyan ring-[6px] ring-background shadow-[0_0_0_1px_oklch(0.82_0.14_210/0.4),0_0_20px_oklch(0.82_0.14_210/0.5)]" />
                {/* Icon */}
                <div className="relative mt-6 size-11 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 grid place-items-center">
                  <s.icon className="size-5 text-brand-cyan" />
                </div>
                {/* Label */}
                <div className="relative mt-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Etapa {i + 1}
                </div>
                <div className="relative mt-1.5 font-display font-semibold text-base">
                  {s.t}
                </div>
                <p className="relative mt-2 text-xs text-muted-foreground leading-relaxed max-w-full px-1">
                  {s.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile + tablet: compact vertical */}
        <div className="lg:hidden relative">
          <div className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-brand-cyan/40 to-transparent" />
          <div className="space-y-5">
            {steps.map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative flex gap-4"
              >
                <div className="relative shrink-0">
                  <div className="size-9 rounded-lg bg-brand-cyan/15 border border-brand-cyan/30 grid place-items-center">
                    <s.icon className="size-4 text-brand-cyan" />
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Etapa {i + 1}
                  </div>
                  <div className="font-display font-semibold">{s.t}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        <div className="mt-12 text-center">
          <p className="inline-block text-lg md:text-xl font-display font-medium text-foreground/80">
            Não é apenas criar rápido. É criar rápido com controle.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============ Use Cases ============ */

const useCases = {
  "Atendimento e CX": [
    "Atendimento inteligente via WhatsApp",
    "Triagem automática",
    "Resolução de dúvidas",
    "Encaminhamento humano assistido",
    "Análise de sentimento",
  ],
  Vendas: [
    "Captação e qualificação de leads",
    "Pré-vendas automatizado",
    "Follow-up inteligente",
    "Recomendação de produtos",
    "Conversão assistida",
  ],
  Financeiro: [
    "Leitura de documentos",
    "Conferência de dados",
    "Entrada de notas e recibos",
    "Automação de aprovações",
    "Integração com ERP",
  ],
  RH: [
    "Atendimento interno",
    "Onboarding",
    "FAQ corporativo",
    "Triagem de solicitações",
    "Pesquisas e análise de clima",
  ],
  "Jurídico e Compliance": [
    "Consulta a políticas",
    "Análise documental",
    "Classificação de demandas",
    "Registro de evidências",
    "Auditoria de interações",
  ],
  Operações: [
    "Abertura de chamados",
    "Distribuição de tarefas",
    "Monitoramento de processos",
    "Alertas automáticos",
    "Dashboards gerenciais",
  ],
};

export function UseCasesSection() {
  const keys = Object.keys(useCases);
  return (
    <section id="casos" className="relative section-pad">
      <div className="container-editorial">
        <SectionHeader
          eyebrow="Casos de uso"
          title={<>Onde o Bu1lder já faz diferença.</>}
        />

        <Tabs defaultValue={keys[0]} className="w-full">
          <div className="relative -mx-6 px-6 overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] sm:mask-none mb-8">
            <TabsList className="inline-flex sm:flex sm:flex-wrap h-auto bg-transparent gap-2 sm:justify-center w-max sm:w-full">
              {keys.map((k) => (
                <TabsTrigger
                  key={k}
                  value={k}
                  className="data-[state=active]:bg-brand-cyan/15 data-[state=active]:text-foreground data-[state=active]:border-brand-cyan/30 border border-foreground/10 rounded-full px-4 py-1.5 text-sm whitespace-nowrap"
                >
                  {k}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {keys.map((k) => (
            <TabsContent key={k} value={k}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={k}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
                >
                  {useCases[k as keyof typeof useCases].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="rounded-xl glass p-4 flex items-start gap-3"
                    >
                      <CheckCircle2 className="size-4 text-brand-mint mt-0.5 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

/* ============ Differentials ============ */

const diffs = [
  { t: "Builder visual corporativo", d: "Fluxos, agentes, regras e integrações em um ambiente visual, controlado e escalável." },
  { t: "Governança desde o primeiro dia", d: "Permissões, trilhas de auditoria, versionamento, logs e aprovações." },
  { t: "Segurança e LGPD", d: "Arquitetura pensada para ambientes corporativos, com segregação de acessos e rastreabilidade." },
  { t: "Integração com sistemas reais", d: "Conecte ERP, CRM, APIs, bancos de dados, mensageria e canais digitais." },
  { t: "Observabilidade", d: "Monitore performance, gargalos, comportamento, qualidade e resultados." },
  { t: "Evolução contínua", d: "Cada agente e fluxo pode ser medido, ajustado, versionado e melhorado." },
  { t: "Metodologia Miind", d: "Discovery, ideação, desenho, construção, implantação e evolução com time especialista." },
  { t: "Velocidade com responsabilidade", d: "Ciclos rápidos sem abrir mão de arquitetura, segurança e controle." },
];

export function DifferentialsSection() {
  return (
    <section className="relative section-pad">
      <div className="container-editorial">
        <SectionHeader
          eyebrow="Diferenciais"
          title={<>O diferencial não está só na IA. Está em como ela entra na operação.</>}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {diffs.map((d, i) => (
            <motion.div
              key={d.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className={cardBase}
            >
              <div className="text-[10px] uppercase tracking-[0.18em] text-brand-cyan/80 mb-2">
                {String(i + 1).padStart(2, "0")} · Diferencial
              </div>

              <h3 className="font-display font-semibold">{d.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Governance ============ */

const govItems = [
  { icon: Lock, t: "RBAC: controle de acesso por perfil" },
  { icon: ScrollText, t: "Logs de interação" },
  { icon: Eye, t: "Auditoria de alterações" },
  { icon: GitBranch, t: "Versionamento de fluxos e prompts" },
  { icon: CheckCircle2, t: "Aprovação antes de publicação" },
  { icon: Layers, t: "Segregação de ambientes" },
  { icon: GaugeCircle, t: "Monitoramento de custos e consumo" },
  { icon: Cable, t: "Conectores seguros" },
  { icon: ScrollText, t: "Políticas de retenção" },
  { icon: ShieldAlert, t: "Conformidade com LGPD" },
  { icon: Activity, t: "Observabilidade operacional" },
  { icon: Bot, t: "Human-in-the-loop quando necessário" },
];

export function GovernanceSection() {
  return (
    <section id="seguranca" className="relative section-pad">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-mint/5 via-transparent to-transparent" />
      <div className="relative container-editorial">
        <SectionHeader
          eyebrow="Segurança e governança"
          title={<>IA generativa com controle — para quem não pode operar no improviso.</>}
          description="O Bu1lder foi pensado para empresas que precisam inovar com IA sem perder o controle sobre dados, acessos, decisões, versões e resultados. Cada automação, agente e interação é rastreável, monitorável e evolutiva."
        />

        <div className="relative rounded-2xl glass p-6 md:p-8 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse,black,transparent_70%)]" />
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {govItems.map((g, i) => (
              <motion.div
                key={g.t}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="flex items-center gap-3 rounded-lg border border-foreground/10 bg-foreground/[0.03] px-4 py-3 min-w-0"
              >
                <div className="size-8 rounded-md bg-brand-mint/10 border border-brand-mint/20 grid place-items-center shrink-0">
                  <g.icon className="size-4 text-brand-mint" />
                </div>
                <span className="text-sm min-w-0 break-words">{g.t}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Methodology ============ */

const riser = [
  { l: "1", n: "Descoberta", d: "Entendimento profundo da dor, da operação, dos usuários, sistemas e indicadores." },
  { l: "2", n: "Ideação", d: "Criação rápida de hipóteses, fluxos, jornadas e protótipos testáveis." },
  { l: "3", n: "Desenho", d: "Arquitetura, integrações, regras, agentes e modelo de governança." },
  { l: "4", n: "Construção", d: "Configuração, integrações, testes e implantação no ambiente real." },
  { l: "5", n: "Evolução", d: "Monitoramento, melhoria contínua, novas versões e escala." },
];

export function MethodologySection() {
  return (
    <section className="relative section-pad">
      <div className="container-editorial">
        <SectionHeader
          eyebrow="Metodologia"
          title={<>Uma plataforma poderosa. Uma metodologia para tirar do papel.</>}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {riser.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`${cardBase} flex flex-col`}
            >
              <div className="text-5xl font-display font-bold text-brand-cyan/80 leading-none">
                {r.l}
              </div>
              <div className="mt-4 font-display font-semibold">{r.n}</div>
              <p className="mt-2 text-sm text-muted-foreground">{r.d}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-10 text-center text-lg font-display text-muted-foreground">
          O Bu1lder acelera a tecnologia.{" "}
          <span className="text-foreground">
            A Miind garante que ela resolva o problema certo.
          </span>
        </p>
      </div>
    </section>
  );
}

/* ============ Benefits ============ */

const benefits = [
  { t: "Ciclos mais curtos", d: "De meses para semanas: do diagnóstico ao agente em operação." },
  { t: "Menos dependência de TI", d: "Áreas de negócio constroem fluxos com governança e suporte do time técnico." },
  { t: "Padronização real", d: "Agentes, prompts e integrações versionados e reutilizáveis entre áreas." },
  { t: "Integração com seus sistemas", d: "ERP, CRM, APIs, mensageria e bancos conectados ao mesmo builder." },
  { t: "Controle ponta a ponta", d: "Permissões, logs, auditoria e aprovação antes de publicar." },
  { t: "Escala com responsabilidade", d: "Cresça em casos de uso sem perder visibilidade nem segurança." },
];

export function BenefitsSection() {
  return (
    <section className="relative section-pad">
      <div className="container-editorial">
        <SectionHeader
          eyebrow="Benefícios"
          title={<>O que muda quando sua empresa constrói com o Bu1lder.</>}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.t}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={cardBase}
            >
              <div className="size-9 rounded-lg bg-brand-cyan/10 border border-brand-cyan/25 grid place-items-center mb-3">
                <ArrowRight className="size-4 text-brand-cyan" />
              </div>
              <h3 className="font-display font-semibold">{b.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Audience ============ */

const audiences = [
  "Grandes empresas",
  "Médias empresas em transformação digital",
  "Áreas de atendimento",
  "Áreas comerciais",
  "Operações",
  "Backoffice",
  "RH",
  "Jurídico",
  "Financeiro",
  "Times de inovação",
  "Agências e consultorias",
];

export function AudienceSection() {
  return (
    <section className="relative section-pad">
      <div className="container-editorial max-w-5xl! text-center">
        <SectionHeader
          eyebrow="Para quem é"
          title={<>Para empresas que querem sair do piloto e escalar IA com responsabilidade.</>}
          description="Se sua empresa já testou IA em iniciativas isoladas, o Bu1lder ajuda a transformar experimentos em produtos operacionais — com governança, integração e evolução contínua."
        />
        <div className="flex flex-wrap justify-center gap-2">
          {audiences.map((a, i) => (
            <motion.span
              key={a}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="px-4 py-2 rounded-full glass text-sm text-muted-foreground hover:text-foreground hover:border-brand-cyan/30 transition-colors"
            >
              {a}
            </motion.span>
          ))}
        </div>

        {/* Trust strip — placeholder até clientes serem listados */}
        <div className="mt-14 pt-10 border-t border-border">
          <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Confiado por times de operação, atendimento, vendas e tecnologia
          </div>
          <div className="flex flex-wrap justify-center gap-6 opacity-70">
            {["Indústria · 5k+ colaboradores", "Varejo · 200 lojas", "Saúde · multi-unidade", "Serviços B2B"].map((p) => (
              <span key={p} className="text-xs md:text-sm text-foreground/70 font-medium">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ CTA Banner — cinematic beat ============ */

export function CTABanner() {
  return (
    <section className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-brand-blue/15 blur-[160px] aurora-drift" />
        <div
          className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[600px] h-[500px] rounded-full bg-brand-cyan/15 blur-[160px] aurora-drift"
          style={{ animationDelay: "-7s" }}
        />
      </div>
      <div className="container-editorial max-w-5xl! text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-medium tracking-wide">
              <span className="size-1.5 rounded-full bg-brand-cyan" />
              Convite
            </span>
          </div>
          <h2 className="display-l">
            Vamos transformar sua operação em{" "}
            <span className="text-gradient animate-gradient-x bg-[length:200%_auto]">
              software vivo
            </span>
            .
          </h2>
          <p className="mt-6 lead max-w-2xl mx-auto">
            Conte sua dor. Mostramos, em uma sessão de 30 minutos, como o
            Bu1lder se encaixa — com governança, integrações e ciclos curtos.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-brand-cyan to-brand-blue text-background hover:opacity-90 shadow-[0_18px_50px_-14px_oklch(0.82_0.14_210/0.6)]"
            >
              <a href="#contato">
                Agendar demo <ArrowRight className="ml-1 size-4" />
              </a>
            </Button>
            <a
              href="#contato"
              className="ink-link text-sm text-muted-foreground hover:text-foreground transition-colors px-2"
            >
              Ou fale com um especialista
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


/* ============ FAQ ============ */

const faqs = [
  {
    q: "O Bu1lder é apenas um construtor de chatbot?",
    a: "Não. O Bu1lder permite criar agentes, fluxos, automações, integrações, dashboards e experiências digitais — chat é só um dos canais possíveis.",
  },
  {
    q: "A plataforma se integra aos sistemas da empresa?",
    a: "Sim, de forma nativa. Conectamos APIs, CRMs, ERPs, bancos de dados, mensageria e ferramentas corporativas via conectores e webhooks.",
  },
  {
    q: "É possível ter aprovação antes de publicar um fluxo?",
    a: "Toda alteração entra como uma versão. Você define quem aprova, e nada vai para produção sem o ok do responsável.",
  },
  {
    q: "O Bu1lder usa IA generativa?",
    a: "Sim. Orquestramos modelos de linguagem, bases de conhecimento (RAG), prompts versionados, regras de negócio e agentes especializados num mesmo builder.",
  },
  {
    q: "Serve para grandes empresas?",
    a: "Foi desenhado para esse cenário: segurança, governança, rastreabilidade, segregação de ambientes e escala estão na base do produto.",
  },
  {
    q: "A Miind também ajuda na implantação?",
    a: "O time da Miind atua como parceiro estratégico — do discovery à evolução contínua — pela metodologia descrita acima.",
  },
  {
    q: "Posso começar por um caso de uso específico?",
    a: "É o caminho recomendado. Comece por uma dor clara, valide resultados em semanas e depois escale para novos fluxos, áreas e agentes.",
  },
];

export function FAQSection() {
  return (
    <section className="relative section-pad">
      <div className="container-editorial max-w-3xl!">
        <SectionHeader eyebrow="FAQ" title="Perguntas frequentes" />
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-xl glass border-0 px-5"
            >
              <AccordionTrigger className="text-left hover:no-underline py-5 font-display font-medium">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ============ Final + Footer ============ */

export function FinalSection({ formId }: { formId: string }) {
  return (
    <section id={formId} className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[700px] h-[500px] rounded-full bg-brand-blue/12 blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] rounded-full bg-brand-violet/10 blur-[140px] aurora-drift" />
      </div>
      <div className="relative container-editorial">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-16 lg:gap-24 items-start">
          <div>
            <div className="inline-flex items-center gap-3 eyebrow text-brand-cyan/90 mb-6">
              <span className="brand-divider !w-10" />
              Início de conversa
            </div>
            <h2 className="display-l">
              Comece com{" "}
              <em className="italic font-normal text-gradient">uma dor real</em>.
              Saímos com um plano.
            </h2>
            <p className="mt-6 lead max-w-md">
              Em 30 minutos, mapeamos seu caso e mostramos como o Bu1lder
              encaixa governança, integrações e IA na sua operação.
            </p>

            <div className="mt-10 space-y-4">
              {[
                ["Diagnóstico em 30 min", "Sem compromisso, com especialista sênior."],
                ["Plano de implantação", "Caminho claro do piloto à operação."],
                ["Demo viva", "Vemos o Bu1lder rodando em um caso real."],
              ].map(([t, d]) => (
                <div key={t} className="flex items-start gap-4 border-t border-foreground/10 pt-4">
                  <span className="size-1.5 rounded-full bg-brand-cyan mt-2 shrink-0 shadow-[0_0_12px_oklch(0.82_0.14_210/0.7)]" />
                  <div>
                    <div className="font-semibold text-foreground">{t}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-foreground/10">
              <p className="display-m italic font-normal text-foreground/85 max-w-md">
                "O Bu1lder mudou o ritmo da nossa transformação."
              </p>
              <p className="mt-3 eyebrow !text-[10px] text-muted-foreground">
                Mariana Resende · Banco Vértice
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <Suspense fallback={<ContactFormFallback />}>
              <ContactForm />
            </Suspense>
          </div>

        </div>
      </div>
    </section>
  );
}



export function Footer() {
  return (
    <footer className="relative border-t border-border mt-10 overflow-hidden">
      {/* aurora wash */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-brand-blue/8 blur-[160px]" />
      </div>

      {/* Editorial farewell */}
      <div className="container-editorial pt-20 pb-14">
        <div className="max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-medium tracking-wide mb-6">
            <span className="size-1.5 rounded-full bg-brand-cyan" />
            Miind
          </span>
          <p className="display-m text-foreground/90">
            Tecnologia para humanos{" "}
            <span className="text-gradient animate-gradient-x bg-[length:200%_auto]">
              criativos
            </span>
            .
          </p>
          <p className="mt-4 lead max-w-xl">
            Bu1lder é a plataforma da Miind para transformar demandas de
            negócio em software, automações e agentes — com governança
            enterprise.
          </p>
        </div>
      </div>

      <div className="container-editorial pb-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm border-t border-foreground/8 pt-12">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-violet grid place-items-center">
              <span className="font-bold text-sm text-background">B</span>
            </div>
            <span className="font-display font-semibold text-base tracking-tight">
              Bu<span className="text-brand-cyan">1</span>lder
              <span className="text-muted-foreground font-normal"> by Miind</span>
            </span>
          </div>
          <p className="mt-4 text-muted-foreground text-xs leading-relaxed max-w-[260px]">
            Construa, governe e evolua agentes, fluxos e produtos digitais
            num só ambiente.
          </p>
        </div>
        <FooterCol
          title="Plataforma"
          links={[
            ["Solução", "#solucoes"],
            ["Como funciona", "#como-funciona"],
            ["Casos de uso", "#casos"],
            ["Governança", "#seguranca"],
          ]}
        />
        <FooterCol
          title="Empresa"
          links={[
            ["Contato", "#contato"],
            ["LinkedIn", "https://www.linkedin.com"],
            ["comercial@miind.ai", "mailto:comercial@miind.ai"],
          ]}
        />
        <FooterCol
          title="Legal"
          links={[
            ["Política de privacidade", "#"],
            ["LGPD", "#"],
          ]}
        />
      </div>
      <div className="border-t border-foreground/8">
        <div className="container-editorial py-5 flex flex-col md:flex-row justify-between gap-2 eyebrow !text-[10px]">
          <div>© {FOOTER_YEAR} Miind. Todos os direitos reservados.</div>
          <div className="flex items-center gap-2">
            Bu1lder
            <span className="size-1 rounded-full bg-brand-cyan/60" />
            Software vivo
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="eyebrow mb-4 text-brand-cyan/80">{title}</div>
      <ul className="space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              className="ink-link text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
