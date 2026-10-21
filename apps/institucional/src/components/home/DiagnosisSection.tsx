import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import SectionHeader from './SectionHeader';
import Reveal from '../effects/Reveal';

type Row = { text: string; metric: string; tag: string };

const problems: Row[] = [
  { text: 'Projetos que demoram 9–18 meses para chegar ao usuário.', metric: '9–18m', tag: 'STALLED' },
  { text: 'Fábricas de software vendendo headcount, não outcome.', metric: '−42%', tag: 'OUTPUT' },
  { text: 'Consultorias de IA que entregam slides, não sistemas.', metric: '0 prod', tag: 'SLIDES' },
  { text: 'Times internos travados em legado e governança.', metric: '3.2×', tag: 'BLOCKED' },
  { text: 'Iniciativas de IA que morrem no piloto.', metric: '< 8%', tag: 'PILOT' },
];

const responses: Row[] = [
  { text: 'MVPs reais em 30 dias, com loops de release semanais.', metric: '30d', tag: 'SHIPPED' },
  { text: 'Squads sênior multidisciplinares com ownership ponta a ponta.', metric: '100%', tag: 'OWNED' },
  { text: 'IA generativa e agentes embarcados no core do produto.', metric: '12+ ag', tag: 'LIVE' },
  { text: 'Plataforma proprietária Bu1lder para acelerar 5–10× a entrega.', metric: '5–10×', tag: 'BU1LDER' },
  { text: 'Governança enterprise: LGPD, SOC 2-ready, observabilidade.', metric: 'SOC 2', tag: 'READY' },
];

const DiagRow = ({ i, row, variant }: { i: number; row: Row; variant: 'weak' | 'live' }) => {
  const isLive = variant === 'live';
  const accent = isLive ? 'text-brand-cyan' : 'text-brand-warn';
  const indexColor = isLive ? 'text-brand-cyan/80' : 'text-brand-warn/80';

  return (
    <li
      className="grid items-center gap-4 py-5"
      style={{ gridTemplateColumns: '2rem 1fr 5.5rem 4.5rem' }}
    >
      <span className={`font-mono text-[10px] tracking-widest ${indexColor}`}>
        0{i + 1}{isLive ? '+' : '−'}
      </span>
      <p className="text-[0.92rem] leading-snug text-foreground/85 min-w-0">{row.text}</p>
      <span className="justify-self-start font-mono text-[9px] uppercase tracking-widest px-2 py-1 rounded border border-border/60 text-muted-foreground">
        {row.tag}
      </span>
      <span className={`justify-self-end font-mono text-xs font-medium tabular-nums ${accent}`}>
        {row.metric}
      </span>
    </li>
  );
};

const Column = ({
  index,
  label,
  title,
  items,
  variant,
}: {
  index: string;
  label: string;
  title: string;
  items: Row[];
  variant: 'weak' | 'live';
}) => {
  const isLive = variant === 'live';
  const Icon = isLive ? CheckCircle2 : AlertTriangle;
  const accent = isLive ? 'text-brand-cyan' : 'text-brand-warn';
  const dot = isLive ? 'bg-brand-cyan' : 'bg-brand-warn';

  return (
    <div className="relative p-8 lg:p-10 h-full rounded-xl border border-border/60 bg-surface-1/40 flex flex-col">
      {/* Chrome */}
      <div className="flex items-center justify-between mb-8">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {index} // {label}
        </span>
        <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest ${accent}/85`}>
          <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
          signal · {isLive ? 'live' : 'weak'}
        </span>
      </div>

      {/* Title */}
      <div className="flex items-start gap-3 mb-10 min-h-[3.5rem]">
        <Icon aria-hidden="true" className={`w-5 h-5 mt-1 shrink-0 ${accent}`} />
        <h3 className="text-2xl font-semibold text-foreground leading-tight">{title}</h3>
      </div>

      {/* Rows */}
      <ul className="divide-y divide-border/40">
        {items.map((it, i) => (
          <DiagRow key={it.text} i={i} row={it} variant={variant} />
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-auto pt-8 flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">status</span>
        <span className={`font-mono text-[10px] uppercase tracking-widest ${accent}`}>
          {isLive ? 'shipping · weekly' : 'stalled · quarterly'}
        </span>
      </div>
    </div>
  );
};

const DiagnosisSection = () => {
  return (
    <section id="diagnosis" className="section-pad relative">
      <div className="container-editorial relative z-10">
        <SectionHeader
          index="02"
          label="DIAGNOSIS"
          title={<>O ciclo de inovação corporativa <span className="text-aurora">quebrou.</span></>}
          lead="O que CEOs e CTOs vivem hoje — e como a MIIND responde."
        />

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch mt-12">
          <Reveal className="h-full">
            <Column
              index="01"
              label="ESTADO ATUAL"
              title="O que CEOs e CTOs vivem hoje"
              items={problems}
              variant="weak"
            />
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <Column
              index="02"
              label="MIIND · RESPOSTA"
              title="Como a MIIND responde"
              items={responses}
              variant="live"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default DiagnosisSection;
