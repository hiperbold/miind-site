import SectionHeader from './SectionHeader';
import Reveal from '../effects/Reveal';
import MagicCard from '../effects/MagicCard';
import NumberTicker from '../effects/NumberTicker';
import BorderBeam from '../effects/BorderBeam';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart, ShoppingBag, Factory, Wallet } from 'lucide-react';
import { useT } from '@/i18n/useT';

const caseDefs = [
  { idx: '01', k: '1', icon: Heart,       metric: 68, suf: '%', dir: '−', before: 100, after: 32 },
  { idx: '02', k: '2', icon: ShoppingBag, metric: 42, suf: '%', dir: '−', before: 100, after: 58 },
  { idx: '03', k: '3', icon: Factory,     metric: 11, suf: '%', dir: '+', before: 72,  after: 83 },
  { idx: '04', k: '4', icon: Wallet,      metric: 30, suf: 'd', dir: '',  before: 100, after: 22 },
];

const CasesSection = () => {
  const { t } = useT();
  return (
    <section id="cases" className="relative py-8 sm:py-12 px-0">
      <div className="section-frame">
        <BorderBeam size={420} duration={12} colorFrom="oklch(0.84 0.16 220)" colorTo="oklch(0.62 0.22 295)" />

        <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] rounded-full bg-brand-cyan/12 blur-3xl aurora-drift" />
          <div className="absolute bottom-0 -right-32 w-[26rem] h-[26rem] rounded-full bg-brand-violet/15 blur-3xl aurora-drift" style={{ animationDelay: '-22s' }} />
        </div>
        <div aria-hidden="true" className="absolute inset-0 noise opacity-30 pointer-events-none" />

        <div className="relative z-10 px-5 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-14 lg:py-16">
          <SectionHeader
            index="04"
            label={t('cases.label') as string}
            title={t('cases.title')}
            lead={t('cases.lead')}
          />

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {caseDefs.map((c, i) => {
              const tag = t(`cases.${c.k}.tag`) as string;
              const sector = t(`cases.${c.k}.sector`) as string;
              return (
                <Reveal key={c.idx} delay={i * 0.08}>
                  <MagicCard className="bento-card p-8 h-full rounded-[14px]">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-2">
                        <c.icon className="w-3.5 h-3.5 text-brand-cyan" />
                        {c.idx} // {tag}
                      </span>
                      <span className="blue-chip">case · {sector.split('·')[0].trim()}</span>
                    </div>

                    <div className="flex items-baseline gap-2 mb-3">
                      <span className={`font-display text-6xl md:text-7xl font-semibold metric-glow ${c.dir === '+' ? 'text-aurora' : 'text-foreground'}`}>
                        {c.dir}
                        <NumberTicker value={c.metric} suffix={c.suf} />
                      </span>
                    </div>
                    <p className="font-display text-lg text-foreground mb-4">{t(`cases.${c.k}.head`)}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t(`cases.${c.k}.desc`)}</p>

                    <div className="space-y-2.5 mb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground w-14">{t('cases.before')}</span>
                        <div className="flex-1 h-1.5 bg-surface-2 rounded-full overflow-hidden">
                          <div className="h-full progress-track-fill rounded-full bg-foreground/30" style={{ width: `${c.before}%`, transition: 'width 1.2s 0.3s cubic-bezier(0.16,1,0.3,1)' }} />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan/80 w-14">{t('cases.after')}</span>
                        <div className="flex-1 h-1.5 bg-surface-2 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-brand-cyan to-brand-violet rounded-full shadow-[0_0_12px_oklch(0.84_0.16_220/0.5)]" style={{ width: `${c.after}%`, transition: 'width 1.4s 0.5s cubic-bezier(0.16,1,0.3,1)' }} />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border text-xs font-mono uppercase tracking-widest text-muted-foreground">
                      {sector}
                    </div>
                  </MagicCard>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-12 flex justify-center">
              <Link to="/portfolio" className="ink-link inline-flex items-center gap-2 text-foreground/85 hover:text-foreground font-medium">
                {t('cases.viewAll')}
                <ArrowUpRight className="w-4 h-4 text-brand-cyan" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
