import SectionHeader from './SectionHeader';
import Reveal from '../effects/Reveal';
import BorderBeam from '../effects/BorderBeam';
import PingRings from '../effects/PingRings';
import { Layers, Brain, Factory, Workflow, Target, type LucideIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

type Node = {
  code: string;
  label: string;
  icon: LucideIcon;
  desc: string;
  stats: [string, string, string];
  tags: string[];
  load: number; // 0-100 footer bar
  beamDelay: number;
};

const nodes: Node[] = [
  {
    code: '01 // CORE',
    label: 'Venture Studio',
    icon: Layers,
    desc: 'Co-construímos novos negócios — da tese ao MVP ao GTM. Operamos como sócios em venture corporativo.',
    stats: ['48 teses', '12 spin-offs', '6 sócios'],
    tags: ['Thesis', 'MVP', 'GTM'],
    load: 82,
    beamDelay: 0,
  },
  {
    code: '02 // R&D',
    label: 'AI Lab',
    icon: Brain,
    desc: 'Pesquisa aplicada em agentes, RAG, orquestração multi-modelo e evals com guard-rails.',
    stats: ['4 modelos', '18 evals', 'RAG-ready'],
    tags: ['Agents', 'RAG', 'Evals'],
    load: 74,
    beamDelay: 3,
  },
  {
    code: '03 // FACTORY',
    label: 'Software Factory',
    icon: Factory,
    desc: 'Squads sênior multidisciplinares entregando produto de ponta a ponta em loops semanais.',
    stats: ['7d sprint', '99.9% SLA', '5 squads'],
    tags: ['Squads', 'CI/CD', 'QA'],
    load: 91,
    beamDelay: 1.5,
  },
  {
    code: '04 // PLATFORM',
    label: 'Bu1lder',
    icon: Workflow,
    desc: 'Plataforma proprietária que acelera entregas em 5–10×: agentes, automações e integrações.',
    stats: ['120+ blocos', '30+ integ', '5–10×'],
    tags: ['Blocks', 'Integ', 'Auto'],
    load: 88,
    beamDelay: 4.5,
  },
];

const NodeCard = ({ n, align }: { n: Node; align: 'left' | 'right' }) => {
  const Icon = n.icon;
  return (
    <div className="signal-card relative p-6 rounded-[14px] h-full overflow-hidden group">
      <BorderBeam size={240} duration={12} delay={n.beamDelay} />
      {/* scan line */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/60 to-transparent animate-scan-x" />

      {/* chrome */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{n.code}</span>
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-cyan" />
          </span>
          <span className="text-[9px] font-mono uppercase tracking-widest text-brand-cyan/80">signal · live</span>
        </div>
      </div>

      {/* head */}
      <div className={`flex items-start gap-4 mb-3 ${align === 'right' ? 'flex-row-reverse text-right' : ''}`}>
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-xl bg-brand-cyan/20 blur-lg" />
          <div className="relative w-11 h-11 rounded-xl border border-brand-cyan/30 bg-brand-cyan/5 flex items-center justify-center">
            <Icon className="w-5 h-5 text-brand-cyan" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-2xl font-semibold leading-tight">{n.label}</h3>
        </div>
      </div>

      <p className={`text-sm text-muted-foreground leading-relaxed mb-4 ${align === 'right' ? 'text-right' : ''}`}>{n.desc}</p>

      {/* tags */}
      <div className={`flex flex-wrap gap-1.5 mb-4 ${align === 'right' ? 'justify-end' : ''}`}>
        {n.tags.map((t, i) => (
          <span
            key={t}
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${
              i % 2 === 0
                ? 'border-brand-cyan/30 text-brand-cyan/90 bg-brand-cyan/5'
                : 'border-brand-violet/30 text-brand-violet/90 bg-brand-violet/5'
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      {/* micro stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {n.stats.map((s) => (
          <div key={s} className="text-center px-1 py-2 rounded-md border border-border/40 bg-background/30">
            <div className="text-[11px] font-mono text-foreground/90 truncate">{s}</div>
          </div>
        ))}
      </div>

      {/* footer load + eq */}
      <div className="mt-auto flex items-center gap-3">
        <div className="flex-1">
          <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
            <span>load index</span>
            <span className="text-brand-cyan">{n.load}</span>
          </div>
          <div className="h-1 rounded-full bg-border/40 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${n.load}%` }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-brand-cyan to-brand-violet"
            />
          </div>
        </div>
        <div className="flex items-end gap-0.5 h-5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-0.5 bg-brand-cyan/70 animate-eq-bar"
              style={{ height: `${40 + i * 12}%`, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Connectors = () => {
  const reduce = useReducedMotion();
  // Paths from each corner toward center (viewBox 1000x600, hub at 500,300)
  const paths = [
    { d: 'M 40 90 C 240 90, 380 220, 500 300', delay: 0 },
    { d: 'M 40 510 C 240 510, 380 380, 500 300', delay: 0.4 },
    { d: 'M 960 90 C 760 90, 620 220, 500 300', delay: 0.8 },
    { d: 'M 960 510 C 760 510, 620 380, 500 300', delay: 1.2 },
  ];
  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
    >
      <defs>
        <linearGradient id="eco-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.84 0.16 220)" stopOpacity="0.05" />
          <stop offset="50%" stopColor="oklch(0.84 0.16 220)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="oklch(0.58 0.22 285)" stopOpacity="0.8" />
        </linearGradient>
        <radialGradient id="eco-hub-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="oklch(0.58 0.22 285)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="oklch(0.58 0.22 285)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="500" cy="300" rx="220" ry="140" fill="url(#eco-hub-glow)" />
      {paths.map((p, i) => (
        <g key={i}>
          <path d={p.d} stroke="url(#eco-line)" strokeWidth="1.2" fill="none" strokeDasharray="4 6">
            {!reduce && (
              <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="3s" repeatCount="indefinite" />
            )}
          </path>
          {!reduce && (
            <circle r="2.5" fill="oklch(0.84 0.16 220)" style={{ filter: 'drop-shadow(0 0 6px oklch(0.84 0.16 220))' }}>
              <animateMotion dur="4s" repeatCount="indefinite" begin={`${p.delay}s`} path={p.d} />
            </circle>
          )}
        </g>
      ))}
    </svg>
  );
};

const EcosystemSection = () => (
  <section id="ecosystem" className="section-pad relative overflow-hidden">
    <div className="absolute inset-0 system-grid opacity-50 pointer-events-none" />
    <div className="container-editorial relative z-10">
      <SectionHeader
        index="03"
        label="ECOSYSTEM"
        title={<>Quatro frentes, um ponto de chegada: <span className="text-aurora">produto vivo.</span></>}
        lead="A MIIND opera como um venture studio com fábrica própria, laboratório de IA e plataforma para escalar entregas."
      />

      <div className="relative grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
        {/* Mobile vertical connector */}
        <div
          aria-hidden
          className="lg:hidden absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-cyan/0 via-brand-cyan/40 to-brand-violet/0 pointer-events-none"
        />

        {/* Desktop animated connectors behind cards */}
        <Connectors />

        {/* Left column */}
        <div className="grid gap-6 relative z-10">
          {nodes.slice(0, 2).map((n, i) => (
            <Reveal key={n.label} delay={i * 0.08}>
              <NodeCard n={n} align="left" />
            </Reveal>
          ))}
        </div>

        {/* Central hub */}
        <Reveal delay={0.2}>
          <div className="flex items-center justify-center lg:px-4 py-6 lg:py-0 relative z-10">
            <div className="relative w-56 h-56 flex items-center justify-center">
              {/* violet halo */}
              <div aria-hidden className="absolute inset-0 rounded-full bg-brand-violet/20 blur-3xl" />
              <PingRings />
              {/* orbiting particles */}
              <div className="absolute inset-0 rounded-full animate-orbit">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-[0_0_18px_oklch(0.84_0.16_220/0.9)]" />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-violet shadow-[0_0_18px_oklch(0.58_0.22_285/0.9)]" />
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-cyan/80 shadow-[0_0_14px_oklch(0.84_0.16_220/0.7)]" />
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-violet/80 shadow-[0_0_14px_oklch(0.58_0.22_285/0.7)]" />
              </div>

              <div className="relative w-44 h-44 rounded-full glass flex flex-col items-center justify-center text-center px-3 z-10 border border-brand-cyan/20">
                <Target className="w-7 h-7 text-brand-cyan mb-2" />
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">destino</div>
                <div className="font-display text-base font-semibold text-foreground mb-2">Produto vivo</div>
                <div className="flex items-center gap-1.5 text-[8px] font-mono uppercase tracking-widest">
                  <span className="px-1.5 py-0.5 rounded border border-brand-cyan/30 text-brand-cyan/90 bg-brand-cyan/5">live</span>
                  <span className="px-1.5 py-0.5 rounded border border-brand-violet/30 text-brand-violet/90 bg-brand-violet/5">99.98%</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right column */}
        <div className="grid gap-6 relative z-10">
          {nodes.slice(2).map((n, i) => (
            <Reveal key={n.label} delay={(i + 2) * 0.08}>
              <NodeCard n={n} align="right" />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default EcosystemSection;
