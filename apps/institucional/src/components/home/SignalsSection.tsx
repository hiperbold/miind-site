import { Timer, Zap, TrendingUp, ArrowRight, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import DigitRoll from '../effects/DigitRoll';
import CircularProgress from '../effects/CircularProgress';
import Reveal from '../effects/Reveal';
import BorderBeam from '../effects/BorderBeam';
import MiindBuildAnimation from '../MiindBuildAnimation';
import { useT } from '@/i18n/useT';


/* ============================================================
   MINI GRÁFICOS
   ============================================================ */
const Bars = ({ data, color = 'cyan' }: { data: number[]; color?: 'cyan' | 'violet' }) => {
  const max = Math.max(...data);
  const from = color === 'cyan' ? 'from-brand-cyan' : 'from-brand-violet';
  const to = color === 'cyan' ? 'to-brand-violet' : 'to-brand-cyan';
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((v, i) => (
        <motion.span
          key={i}
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: `${(v / max) * 100}%`, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className={`flex-1 bg-gradient-to-t ${from} ${to} rounded-sm`}
        />
      ))}
    </div>
  );
};

const LineMini = ({ data, color = 'cyan', height = 64 }: { data: number[]; color?: 'cyan' | 'violet'; height?: number }) => {
  const w = 200, h = height;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const stepX = w / (data.length - 1);
  const points = data.map((v, i) => ({ x: i * stepX, y: h - ((v - min) / range) * (h - 8) - 4 }));
  const path = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
  const stroke = color === 'cyan' ? 'oklch(0.84 0.16 220)' : 'oklch(0.62 0.22 295)';
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      <motion.path
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
        style={{ filter: `drop-shadow(0 0 6px ${stroke})` }}
      />
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="2"
          fill={stroke}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.5 + i * 0.06 }}
        />
      ))}
    </svg>
  );
};

/* Barra horizontal animada (label + valor + barra) */
const HBar = ({ label, value, max = 100, color = 'cyan', delay = 0 }: { label: string; value: number; max?: number; color?: 'cyan' | 'violet'; delay?: number }) => {
  const from = color === 'cyan' ? 'from-brand-cyan' : 'from-brand-violet';
  const to = color === 'cyan' ? 'to-brand-violet' : 'to-brand-cyan';
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
        <span>{label}</span>
        <span className="text-foreground tabular-nums">{value}</span>
      </div>
      <div className="h-1.5 rounded-full progress-track overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${from} ${to} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
};

/* Barra empilhada horizontal (NPS) */
const StackedBar = ({ segments }: { segments: { label: string; value: number; color: 'cyan' | 'violet' | 'muted' }[] }) => {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const colorMap = {
    cyan: 'bg-brand-cyan',
    violet: 'bg-brand-violet',
    muted: 'bg-foreground/20',
  };
  return (
    <div className="space-y-2">
      <div className="h-2 rounded-full overflow-hidden flex progress-track">
        {segments.map((s, i) => (
          <motion.div
            key={i}
            className={`${colorMap[s.color]} h-full`}
            initial={{ width: 0 }}
            whileInView={{ width: `${(s.value / total) * 100}%` }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between gap-2 text-[8px] font-mono uppercase tracking-widest text-muted-foreground">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${colorMap[s.color]}`} />
            <span>{s.label} {s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* Grade de dots pulsando (Agentes ativos) */
const DotGrid = ({ rows = 3, cols = 4, color = 'violet' }: { rows?: number; cols?: number; color?: 'cyan' | 'violet' }) => {
  const dotColor = color === 'cyan' ? 'bg-brand-cyan' : 'bg-brand-violet';
  return (
    <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: [0.4, 1, 0.6], scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.8,
            delay: (i % cols) * 0.08 + Math.floor(i / cols) * 0.12,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className={`h-2 rounded-sm ${dotColor} shadow-[0_0_8px_currentColor]`}
        />
      ))}
    </div>
  );
};

/* Linha de 3 micro-métricas no rodapé */
const MiniMetricsRow = ({ items, color = 'cyan' }: { items: { k: string; v: string | number; pct?: number }[]; color?: 'cyan' | 'violet' }) => {
  const from = color === 'cyan' ? 'from-brand-cyan' : 'from-brand-violet';
  const to = color === 'cyan' ? 'to-brand-violet' : 'to-brand-cyan';
  return (
    <div className="mt-auto pt-3 border-t border-border/40 grid grid-cols-3 gap-3">
      {items.map((m, idx) => (
        <div key={m.k}>
          <div className="text-[8px] font-mono uppercase tracking-widest text-muted-foreground mb-0.5">{m.k}</div>
          <div className="text-sm font-display font-semibold text-foreground tabular-nums mb-1">{m.v}</div>
          <div className="flex items-end gap-[1.5px] h-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className={`flex-1 bg-gradient-to-t ${from} ${to} rounded-[1px] animate-eq-bar`}
                style={{
                  height: `${30 + ((i * 13 + idx * 7) % 70)}%`,
                  animationDelay: `${(i * 90 + idx * 200) % 1100}ms`,
                  animationDuration: `${1000 + (i % 5) * 120}ms`,
                  opacity: i < ((m.pct ?? 80) / 100) * 10 ? 1 : 0.18,
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ============================================================
   CARD CHROME
   ============================================================ */
const CardChrome = ({ idx, label }: { idx: string; label: string }) => (
  <div className="flex items-center justify-between mb-3">
    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
      {idx} // {label}
    </span>
    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-brand-cyan/80 uppercase tracking-widest">
      <span className="relative inline-flex w-1.5 h-1.5">
        <span className="absolute inset-0 rounded-full bg-brand-cyan animate-ping-ring" />
        <span className="relative w-1.5 h-1.5 rounded-full bg-brand-cyan" />
      </span>
      live
    </span>
  </div>
);

/* Selo (chip) padronizado */
const Chip = ({ children, color = 'cyan', icon: Icon }: { children: React.ReactNode; color?: 'cyan' | 'violet'; icon?: any }) => {
  const cls = color === 'cyan'
    ? 'border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan'
    : 'border-brand-violet/30 bg-brand-violet/10 text-brand-violet';
  return (
    <span className={`inline-flex items-center gap-1.5 self-start px-2 py-1 rounded-full border ${cls} text-[9px] font-mono uppercase tracking-widest mb-3`}>
      {Icon && <Icon className="w-2.5 h-2.5" />}
      {children}
    </span>
  );
};

/* ============================================================
   SCREEN FRAME
   ============================================================ */
const ScreenFrame = ({
  children,
  className = '',
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`signal-card relative rounded-2xl overflow-hidden group transition-all duration-500 hover:-translate-y-0.5 ${className}`}
  >
    <BorderBeam size={220} duration={10} colorFrom="oklch(0.84 0.16 220)" colorTo="oklch(0.62 0.22 295)" />
    <div className="absolute inset-0">
      {children}
    </div>
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand-cyan/0 via-transparent to-brand-violet/15" />
  </div>
);

/* ============================================================
   SEÇÃO
   ============================================================ */
const SignalsSection = () => {
  const { t } = useT();
  return (

  <section id="signals" className="relative py-8 sm:py-12 px-0">
    <div className="section-frame">
      <BorderBeam size={420} duration={12} colorFrom="oklch(0.84 0.16 220)" colorTo="oklch(0.62 0.22 295)" />

      <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] rounded-full bg-brand-cyan/12 blur-3xl aurora-drift" />
        <div className="absolute bottom-0 -right-32 w-[26rem] h-[26rem] rounded-full bg-brand-violet/15 blur-3xl aurora-drift" style={{ animationDelay: '-22s' }} />
      </div>
      <div aria-hidden="true" className="absolute inset-0 noise opacity-30 pointer-events-none" />

      <div className="relative z-10 px-4 sm:px-8 lg:px-12 xl:px-14 py-8 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6 lg:gap-10 items-stretch">

          {/* ============ COLUNA ESQUERDA ============ */}
          <div className="flex flex-col gap-6">
            <div>
              <Reveal>
                <h2 className="font-display font-semibold tracking-tight leading-[1.02] text-4xl sm:text-5xl lg:text-5xl xl:text-6xl">
                  {t('signals.title')}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mt-4">
                  {t('signals.lead')}
                </p>
              </Reveal>

            </div>

            {/* Grid 3 indicadores — alinha a base com a base da imagem */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">

              {/* 01 — GROWTH */}
              <Reveal>
                <div className="signal-card p-4 lg:p-5 relative overflow-hidden flex flex-col h-full">
                  <CardChrome idx="01" label={t('signals.cards.growth.label') as string} />
                  <TrendingUp className="w-4 h-4 text-brand-cyan/80 mb-2" />
                  <div className="text-3xl lg:text-4xl font-display font-semibold text-foreground metric-glow leading-none mb-2">
                    <DigitRoll value={50} suffix="+" duration={1400} />
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug mb-2">
                    {t('signals.cards.growth.desc')}
                  </p>

                  <Chip color="cyan" icon={TrendingUp}>+248% YoY</Chip>
                  <div className="flex items-center gap-3 mb-3 h-16">
                    <CircularProgress value={98} size={60} stroke={5} label="UPTIME" />
                    <div className="flex-1 min-w-0">
                      <LineMini data={[3, 4, 6, 5, 8, 9, 11, 14, 18, 24, 32, 42]} height={56} />
                    </div>
                  </div>
                  <MiniMetricsRow
                    color="cyan"
                    items={[
                      { k: 'CORE', v: '98%', pct: 98 },
                      { k: 'SQUADS', v: '86%', pct: 86 },
                      { k: 'DEPLOYS', v: '72%', pct: 72 },
                    ]}
                  />
                </div>
              </Reveal>

              {/* 03 — LEAD-TIME */}
              <Reveal delay={0.08}>
                <div className="signal-card p-4 lg:p-5 relative overflow-hidden flex flex-col h-full">
                  <CardChrome idx="02" label={t('signals.cards.leadtime.label') as string} />
                  <Timer className="w-4 h-4 text-brand-cyan/80 mb-2" />
                  <div className="text-3xl lg:text-4xl font-display font-semibold text-foreground metric-glow leading-none mb-2">
                    <DigitRoll value={2} suffix={t('signals.cards.leadtime.suffix') as string} duration={1100} />
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug mb-2">
                    {t('signals.cards.leadtime.desc')}
                  </p>
                  <Chip color="cyan">{t('signals.cards.leadtime.chip')}</Chip>

                  <div className="mb-3 h-16">
                    <div className="text-[9px] font-mono uppercase tracking-widest text-brand-cyan/70 mb-1">▸ AVG_LEAD</div>
                    <LineMini data={[8, 7, 6, 5, 4, 3, 3, 2]} color="cyan" height={48} />
                  </div>
                  <MiniMetricsRow
                    color="cyan"
                    items={[
                      { k: 'DISCOVERY', v: '3d', pct: 30 },
                      { k: 'BUILD', v: '7d', pct: 70 },
                      { k: 'SHIP', v: '4d', pct: 40 },
                    ]}
                  />
                </div>
              </Reveal>

              {/* 04 — VELOCIDADE */}
              <Reveal delay={0.16}>
                <div className="signal-card p-4 lg:p-5 relative overflow-hidden flex flex-col h-full">
                  <CardChrome idx="03" label={t('signals.cards.velocity.label') as string} />
                  <Zap className="w-4 h-4 text-brand-violet/80 mb-2" />
                  <div className="text-3xl lg:text-4xl font-display font-semibold text-foreground metric-glow leading-none mb-2">
                    <DigitRoll value={10} suffix="×" duration={1100} />
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug mb-2">
                    {t('signals.cards.velocity.desc')}
                  </p>
                  <Chip color="violet">{t('signals.cards.velocity.chip')}</Chip>

                  <div className="mb-3 h-16 flex flex-col justify-center gap-2">
                    <HBar label="MIIND" value={100} color="violet" delay={0.1} />
                    <HBar label="TRAD." value={12} color="violet" delay={0.3} />
                  </div>
                  <MiniMetricsRow
                    color="violet"
                    items={[
                      { k: 'DEPLOY/S', v: '4×', pct: 80 },
                      { k: 'PR/DIA', v: 18, pct: 90 },
                      { k: 'MTTR', v: '12m', pct: 88 },
                    ]}
                  />
                </div>
              </Reveal>
            </div>
          </div>

          {/* ============ COLUNA DIREITA ============ */}
          <Reveal delay={0.1} className="flex">
            {/* Filme cinematográfico de 24s: briefing → squad de agentes → build → produção → payoff */}
            <ScreenFrame className="w-full aspect-video self-start">
              <MiindBuildAnimation />
            </ScreenFrame>
          </Reveal>
        </div>

        {/* Rodapé full-width: CTA */}
        <Reveal delay={0.2}>
          <div className="relative mt-6 lg:mt-10 surface-soft p-4 lg:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-brand-cyan/30 bg-brand-cyan/5 shrink-0">
                <BarChart3 className="w-4 h-4 text-brand-cyan" />
              </span>
              <div className="min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/90">
                  {t('signals.footer.title')}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground mt-0.5">
                  {t('signals.footer.subtitle')}
                </div>
              </div>
            </div>
            <a
              href="#next-step"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('next-step')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hero-cta group shrink-0 !px-5 !py-3 !text-[10px] !gap-4"
            >
              <span>{t('signals.footer.cta')}</span>

              <span className="hero-cta-icon !w-6 !h-6">
                <ArrowRight aria-hidden="true" className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </div>

    <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
  </section>
  );
};


export default SignalsSection;

