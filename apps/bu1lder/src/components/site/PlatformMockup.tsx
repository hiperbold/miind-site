import { useEffect, useState } from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import {
  LayoutDashboard,
  Bot,
  Workflow,
  Cable,
  BookOpen,
  Activity,
  ShieldCheck,
  ScrollText,
  Sparkles,
  TrendingUp,
  MousePointer2,
  Play,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const modules = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Workflow, label: "Fluxos" },
  { icon: Bot, label: "Agentes" },
  { icon: Cable, label: "Integrações" },
  { icon: BookOpen, label: "Bases" },
  { icon: Activity, label: "Monitoramento" },
  { icon: ShieldCheck, label: "Governança" },
  { icon: ScrollText, label: "Logs" },
];

type ViewId = "fluxo" | "agente" | "observabilidade";

const views: {
  id: ViewId;
  label: string;
  moduleIdx: number;
  breadcrumb: string;
  side: { eyebrow: string; title: string; body: string };
}[] = [
  {
    id: "fluxo",
    label: "Fluxo",
    moduleIdx: 1,
    breadcrumb: "bu1lder.miind.app / fluxos / atendimento-cx",
    side: {
      eyebrow: "Desenhe",
      title: "Canvas visual de orquestração",
      body: "Conecte canais, agentes, RAG e integrações arrastando nós. Versionado, com aprovação opcional antes do deploy.",
    },
  },
  {
    id: "agente",
    label: "Agente",
    moduleIdx: 2,
    breadcrumb: "bu1lder.miind.app / agentes / cx-n1",
    side: {
      eyebrow: "Configure",
      title: "Editor de agente com guardrails",
      body: "Prompt, modelo, base de conhecimento e regras de handoff em um único lugar — com simulação ao vivo de cada resposta.",
    },
  },
  {
    id: "observabilidade",
    label: "Observabilidade",
    moduleIdx: 5,
    breadcrumb: "bu1lder.miind.app / monitoramento / execucoes",
    side: {
      eyebrow: "Audite",
      title: "Cada execução, rastreável",
      body: "Métricas em tempo real, trilha completa por interação e alertas — pronto para auditoria enterprise.",
    },
  },
];

export function PlatformMockup() {
  const [active, setActive] = useState<ViewId>("fluxo");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((cur) => {
        const i = views.findIndex((v) => v.id === cur);
        return views[(i + 1) % views.length].id;
      });
    }, 6000);
    return () => clearInterval(id);
  }, [paused]);

  const current = views.find((v) => v.id === active)!;

  return (
    <section id="plataforma" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-blue/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-brand-cyan mb-3">
            A plataforma
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Um ambiente único para criar, orquestrar e governar IA.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Três superfícies, uma plataforma. Desenhe o fluxo, configure o
            agente, audite a operação.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {views.map((v) => (
            <button
              key={v.id}
              onClick={() => {
                setActive(v.id);
                setPaused(true);
              }}
              className={`relative px-4 py-2 rounded-full text-xs uppercase tracking-[0.18em] font-medium transition-colors ${
                active === v.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === v.id && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-cyan/15 to-brand-violet/15 border border-brand-cyan/30"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{v.label}</span>
            </button>
          ))}
        </div>

        <div
          className="grid lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-start"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 rounded-2xl glass overflow-hidden glow-cyan"
          >
            {/* Window chrome */}
            <div className="flex items-center justify-between px-4 h-10 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-brand-violet/70" />
                <span className="size-2.5 rounded-full bg-brand-cyan/70" />
                <span className="size-2.5 rounded-full bg-brand-mint/70" />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.breadcrumb}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.25 }}
                  className="text-[11px] text-muted-foreground truncate max-w-[55%]"
                >
                  {current.breadcrumb}
                </motion.div>
              </AnimatePresence>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-brand-mint animate-pulse" />
                produção
              </div>
            </div>

            <div className="grid grid-cols-12 min-h-[520px]">
              {/* Sidebar */}
              <aside className="col-span-12 md:col-span-2 border-r border-white/5 p-3 hidden md:block">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 mb-2">
                  Módulos
                </div>
                <nav className="flex flex-col gap-0.5">
                  {modules.map((m, i) => {
                    const isActive = i === current.moduleIdx;
                    return (
                      <div
                        key={m.label}
                        className={`relative flex items-center gap-2 px-2 py-2 rounded-md text-xs transition-colors ${
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="module-active"
                            className="absolute inset-0 rounded-md bg-brand-cyan/15 border border-brand-cyan/30"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 32,
                            }}
                          />
                        )}
                        <m.icon className="relative size-3.5" />
                        <span className="relative truncate">{m.label}</span>
                      </div>
                    );
                  })}
                </nav>
              </aside>

              {/* Main panel */}
              <div className="col-span-12 md:col-span-10 lg:col-span-7 p-5 border-r border-white/5 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {active === "fluxo" && (
                    <ViewPanel key="fluxo">
                      <PanelHeader
                        title="Fluxo: Atendimento CX — WhatsApp"
                        sub="v 2.4 · revisado há 2h · aprovado"
                        chips={["Fluxos", "Agentes", "Governança"]}
                      />
                      <FlowCanvas />
                    </ViewPanel>
                  )}
                  {active === "agente" && (
                    <ViewPanel key="agente">
                      <PanelHeader
                        title="Agente: Atendimento N1"
                        sub="modelo: gpt-4.1 · simulação ao vivo"
                        chips={["Prompt", "Conhecimento", "Guardrails"]}
                      />
                      <AgentEditor />
                    </ViewPanel>
                  )}
                  {active === "observabilidade" && (
                    <ViewPanel key="observabilidade">
                      <PanelHeader
                        title="Execuções — últimas 24h"
                        sub="128.4k interações · SLA 99.2%"
                        chips={["Métricas", "Logs", "Alertas"]}
                      />
                      <ObservabilityPanel />
                    </ViewPanel>
                  )}
                </AnimatePresence>

                {/* Fake cursor */}
                <AnimatePresence mode="wait">
                  <FakeCursor key={active} view={active} />
                </AnimatePresence>
              </div>

              {/* Right panel */}
              <aside className="col-span-12 lg:col-span-3 p-4 space-y-4 hidden lg:block">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {active === "fluxo" && <FlowSidePanel />}
                    {active === "agente" && <AgentSidePanel />}
                    {active === "observabilidade" && <ObsSidePanel />}
                  </motion.div>
                </AnimatePresence>
              </aside>
            </div>
          </motion.div>

          {/* Contextual narration */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.side.title}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:sticky lg:top-24"
            >
              <div className="text-[11px] uppercase tracking-[0.28em] text-brand-cyan mb-3">
                {current.side.eyebrow}
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold leading-tight tracking-tight">
                {current.side.title}
              </h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {current.side.body}
              </p>
              <div className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {views.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setActive(v.id);
                      setPaused(true);
                    }}
                    aria-label={`Ver ${v.label}`}
                    className="flex items-center gap-1.5"
                  >
                    <span
                      className={`h-px transition-all ${
                        v.id === active
                          ? "w-10 bg-gradient-to-r from-brand-cyan to-brand-violet"
                          : "w-5 bg-foreground/20"
                      }`}
                    />
                    <span
                      className={
                        v.id === active ? "text-foreground" : ""
                      }
                    >
                      0{i + 1}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ============ helpers ============ */

function ViewPanel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

function PanelHeader({
  title,
  sub,
  chips,
}: {
  title: string;
  sub: string;
  chips: string[];
}) {
  return (
    <div className="flex items-start justify-between mb-4 gap-3">
      <div className="min-w-0">
        <div className="text-sm font-medium truncate">{title}</div>
        <div className="text-[11px] text-muted-foreground truncate">{sub}</div>
      </div>
      <div className="flex gap-1 text-[10px] shrink-0">
        {chips.map((t, i) => (
          <span
            key={t}
            className={`px-2 py-1 rounded ${
              i === 0
                ? "bg-white/10 text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============ Flow view ============ */

function FlowCanvas() {
  const nodes = [
    { x: 40, y: 60, label: "WhatsApp", sub: "Canal", color: "#22d3ee" },
    { x: 220, y: 60, label: "Triagem", sub: "Classifica intenção", color: "#22d3ee" },
    { x: 220, y: 200, label: "RAG", sub: "Base de conhecimento", color: "#8b5cf6" },
    { x: 400, y: 60, label: "Agente CX", sub: "LLM + regras", color: "#22d3ee" },
    { x: 400, y: 200, label: "CRM", sub: "Integração", color: "#10e0a0" },
    { x: 560, y: 130, label: "Resposta", sub: "Aprovação opcional", color: "#22d3ee" },
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 5],
  ];

  return (
    <div className="relative rounded-xl border border-white/5 bg-[radial-gradient(circle_at_1px_1px,oklch(1_0_0/0.06)_1px,transparent_0)] [background-size:18px_18px] aspect-[5/3] overflow-hidden">
      <svg viewBox="0 0 600 360" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="edge" x1="0" x2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        {edges.map(([a, b], i) => {
          const A = nodes[a];
          const B = nodes[b];
          const mx = (A.x + B.x) / 2;
          return (
            <motion.path
              key={i}
              d={`M ${A.x + 60} ${A.y + 20} C ${mx} ${A.y + 20}, ${mx} ${B.y + 20}, ${B.x} ${B.y + 20}`}
              stroke="url(#edge)"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.1 * i }}
            />
          );
        })}
      </svg>

      {nodes.map((n, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * i }}
          className="absolute rounded-lg glass px-3 py-2 min-w-[120px]"
          style={{
            left: `${(n.x / 600) * 100}%`,
            top: `${(n.y / 360) * 100}%`,
          }}
        >
          <div className="flex items-center gap-1.5">
            <span
              className="size-1.5 rounded-full"
              style={{ background: n.color, boxShadow: `0 0 8px ${n.color}` }}
            />
            <span className="text-[11px] font-medium">{n.label}</span>
          </div>
          <div className="text-[9px] text-muted-foreground mt-0.5">{n.sub}</div>
        </motion.div>
      ))}
    </div>
  );
}

function FlowSidePanel() {
  const metrics = [
    { label: "Interações", value: "128.4k" },
    { label: "Resposta média", value: "1.2s" },
    { label: "Resolução", value: "87%" },
    { label: "Sentimento", value: "92%" },
  ];
  return (
    <>
      <div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
          Configuração do agente
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-[11px] text-muted-foreground font-mono leading-relaxed">
          <div><span className="text-brand-cyan">role:</span> "Atendimento N1"</div>
          <div><span className="text-brand-cyan">model:</span> "gpt-4.1"</div>
          <div><span className="text-brand-cyan">rag:</span> base_cx</div>
          <div><span className="text-brand-cyan">handoff:</span> conf &lt; 0.7</div>
        </div>
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
          <TrendingUp className="size-3" /> Tempo real
        </div>
        <div className="grid grid-cols-2 gap-2">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-lg border border-white/5 bg-white/[0.02] p-2"
            >
              <div className="text-base font-semibold">{m.value}</div>
              <div className="text-[10px] text-muted-foreground leading-tight">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-brand-mint/20 bg-brand-mint/5 p-3 text-[11px] flex items-start gap-2">
        <Sparkles className="size-3.5 text-brand-mint mt-0.5" />
        <div>
          <div className="text-foreground font-medium">Economia estimada</div>
          <div className="text-muted-foreground">R$ 184k / mês</div>
        </div>
      </div>
    </>
  );
}

/* ============ Agent view ============ */

function AgentEditor() {
  return (
    <div className="grid md:grid-cols-2 gap-4 aspect-[5/3]">
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 overflow-hidden">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
          Prompt do sistema
        </div>
        <div className="font-mono text-[11px] leading-relaxed text-muted-foreground space-y-1">
          <div>Você é um atendente <span className="text-brand-cyan">N1</span> do Banco Vértice.</div>
          <div>—</div>
          <div>Use a <span className="text-brand-violet">base_cx</span> antes de responder.</div>
          <div>Se a confiança &lt; 0.7, faça <span className="text-brand-mint">handoff</span>.</div>
          <div>Nunca confirme operações financeiras sem 2FA.</div>
          <motion.div
            className="inline-block w-1.5 h-3 bg-brand-cyan ml-0.5 align-middle"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </div>
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 flex flex-col">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
          Simulação ao vivo
        </div>
        <div className="space-y-2 flex-1 overflow-hidden">
          <ChatBubble role="user" delay={0.2}>
            Preciso da minha fatura de novembro
          </ChatBubble>
          <ChatBubble role="agent" delay={0.8}>
            Encontrei sua fatura de novembro: R$ 1.842,90, vencimento 15/12.
            Quer que eu envie o boleto por aqui?
          </ChatBubble>
          <ChatBubble role="user" delay={1.6}>
            Pode enviar
          </ChatBubble>
          <ChatBubble role="agent" delay={2.2}>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-3 text-brand-mint" /> Boleto enviado.
            </span>
          </ChatBubble>
        </div>
        <div className="mt-3 rounded-md border border-white/5 bg-white/[0.02] px-3 py-2 text-[11px] text-muted-foreground flex items-center justify-between">
          <span>confiança 0.94 · 1.1s · 312 tokens</span>
          <Play className="size-3 text-brand-cyan" />
        </div>
      </div>
    </div>
  );
}

function ChatBubble({
  role,
  delay,
  children,
}: {
  role: "user" | "agent";
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] text-[11px] leading-relaxed px-3 py-2 rounded-lg ${
          role === "user"
            ? "bg-brand-cyan/15 border border-brand-cyan/25 text-foreground"
            : "bg-white/[0.04] border border-white/5 text-muted-foreground"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}

function AgentSidePanel() {
  return (
    <>
      <div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
          Guardrails
        </div>
        <div className="space-y-1.5">
          {[
            "Bloqueio de PII em logs",
            "Filtros de toxicidade",
            "Handoff humano automático",
            "Auditoria por interação",
          ].map((g) => (
            <div
              key={g}
              className="flex items-center gap-2 text-[11px] text-muted-foreground"
            >
              <ShieldCheck className="size-3 text-brand-mint" />
              {g}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
          Conhecimento
        </div>
        <div className="space-y-1.5">
          {[
            { n: "base_cx", c: "12.4k docs" },
            { n: "produtos_v3", c: "892 SKUs" },
            { n: "politicas", c: "240 docs" },
          ].map((b) => (
            <div
              key={b.n}
              className="flex items-center justify-between text-[11px] rounded-md border border-white/5 bg-white/[0.02] px-2 py-1.5"
            >
              <span className="font-mono text-brand-cyan">{b.n}</span>
              <span className="text-muted-foreground">{b.c}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ============ Observability view ============ */

function ObservabilityPanel() {
  const bars = [4, 6, 5, 8, 7, 10, 9, 12, 11, 14, 13, 16, 15, 18, 16, 14, 17, 19, 18, 22, 20, 19, 23, 21];
  const max = Math.max(...bars);
  const logs = [
    { t: "12:04:21", s: "ok", m: "agent.cx · resposta entregue · 0.9s", c: "text-brand-mint" },
    { t: "12:04:18", s: "ok", m: "rag.base_cx · 4 chunks recuperados", c: "text-brand-cyan" },
    { t: "12:04:12", s: "warn", m: "handoff humano · confiança 0.62", c: "text-brand-violet" },
    { t: "12:04:08", s: "ok", m: "fluxo.atendimento · iniciado via WhatsApp", c: "text-brand-mint" },
    { t: "12:03:55", s: "ok", m: "agent.cx · resposta entregue · 1.1s", c: "text-brand-mint" },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Execuções / hora
          </div>
          <div className="text-[10px] text-brand-mint flex items-center gap-1">
            <Activity className="size-3" /> +18% vs ontem
          </div>
        </div>
        <div className="flex items-end gap-1 h-24">
          {bars.map((b, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${(b / max) * 100}%` }}
              transition={{ delay: i * 0.02, duration: 0.4 }}
              className="flex-1 rounded-sm bg-gradient-to-t from-brand-cyan/40 to-brand-violet/60"
            />
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
          Stream de logs
        </div>
        <div className="space-y-1 font-mono text-[10.5px]">
          {logs.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="flex items-center gap-2"
            >
              <span className="text-muted-foreground/60">{l.t}</span>
              {l.s === "warn" ? (
                <AlertCircle className={`size-3 ${l.c}`} />
              ) : (
                <CheckCircle2 className={`size-3 ${l.c}`} />
              )}
              <span className="text-muted-foreground truncate">{l.m}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ObsSidePanel() {
  const kpis = [
    { v: "99.2%", l: "SLA mensal" },
    { v: "1.2s", l: "p50 resposta" },
    { v: "3.4s", l: "p95 resposta" },
    { v: "0", l: "incidentes" },
  ];
  return (
    <>
      <div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
          KPIs operação
        </div>
        <div className="grid grid-cols-2 gap-2">
          {kpis.map((k) => (
            <div
              key={k.l}
              className="rounded-lg border border-white/5 bg-white/[0.02] p-2"
            >
              <div className="text-base font-semibold">{k.v}</div>
              <div className="text-[10px] text-muted-foreground leading-tight">
                {k.l}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-brand-cyan/20 bg-brand-cyan/5 p-3 text-[11px] flex items-start gap-2">
        <ShieldCheck className="size-3.5 text-brand-cyan mt-0.5" />
        <div>
          <div className="text-foreground font-medium">Trilha de auditoria</div>
          <div className="text-muted-foreground">100% das execuções rastreáveis · exportável</div>
        </div>
      </div>
    </>
  );
}

/* ============ Fake cursor — gives the "alive" feeling ============ */

function FakeCursor({ view }: { view: ViewId }) {
  // path keyframes per view, as percentages of the panel
  const paths: Record<ViewId, { x: string[]; y: string[] }> = {
    fluxo: {
      x: ["20%", "45%", "70%", "70%"],
      y: ["30%", "30%", "50%", "50%"],
    },
    agente: {
      x: ["20%", "30%", "70%", "70%"],
      y: ["35%", "55%", "70%", "70%"],
    },
    observabilidade: {
      x: ["30%", "60%", "85%", "85%"],
      y: ["35%", "30%", "60%", "60%"],
    },
  };
  const p = paths[view];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 1, 0],
        x: p.x,
        y: p.y,
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 5.5,
        times: [0, 0.1, 0.5, 0.85, 1],
        ease: "easeInOut",
      }}
      className="pointer-events-none absolute top-0 left-0 z-20 -translate-x-1/2 -translate-y-1/2"
    >
      <MousePointer2
        className="size-4 text-brand-cyan drop-shadow-[0_0_8px_oklch(0.82_0.14_210/0.7)]"
        fill="currentColor"
      />
    </motion.div>
  );
}
