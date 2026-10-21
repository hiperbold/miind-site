import SectionHeader from './SectionHeader';
import Reveal from '../effects/Reveal';
import BorderBeam from '../effects/BorderBeam';
import NumberTicker from '../effects/NumberTicker';
import { motion } from 'framer-motion';
import { Bot, Workflow, Plug, Zap } from 'lucide-react';
import { useT } from '@/i18n/useT';

const capDefs = [
  { icon: Bot, k: 'agents' },
  { icon: Workflow, k: 'auto' },
  { icon: Plug, k: 'int' },
  { icon: Zap, k: 'accel' },
];

const Bu1lderSection = () => {
  const { t } = useT();
  return (
    <section id="bu1lder" className="relative py-8 sm:py-12 px-0">
      <div className="section-frame">
        <BorderBeam size={420} duration={12} colorFrom="oklch(0.84 0.16 220)" colorTo="oklch(0.62 0.22 295)" />

        <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] rounded-full bg-brand-violet/15 blur-3xl aurora-drift" />
          <div className="absolute bottom-0 -right-32 w-[26rem] h-[26rem] rounded-full bg-brand-cyan/12 blur-3xl aurora-drift" style={{ animationDelay: '-22s' }} />
        </div>
        <div aria-hidden="true" className="absolute inset-0 noise opacity-30 pointer-events-none" />

        <div className="relative z-10 px-5 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-14 lg:py-16">
          <SectionHeader
            index="03"
            label={t('bu1.label') as string}
            title={t('bu1.title')}
            lead={t('bu1.lead')}
          />

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 mt-12">
            <div className="grid sm:grid-cols-2 gap-5">
              {capDefs.map((c, i) => (
                <Reveal key={c.k} delay={i * 0.07}>
                  <div className="signal-card p-6 h-full group relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-brand-cyan/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl glass mb-4 group-hover:border-brand-cyan/60 transition-colors">
                        <c.icon className="w-5 h-5 text-brand-cyan" />
                      </div>
                      <h3 className="font-display text-lg font-semibold mb-2">{t(`bu1.caps.${c.k}.t`)}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t(`bu1.caps.${c.k}.d`)}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="relative glass rounded-2xl p-8 h-full overflow-hidden">
                <BorderBeam size={260} duration={9} />
                <div className="eyebrow mb-5"><span>{t('bu1.metric.eyebrow')}</span></div>
                <div className="display-xl text-aurora leading-none">
                  <NumberTicker value={10} suffix="×" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {t('bu1.metric.desc')}
                </p>

                <div className="mt-7 space-y-3">
                  <div>
                    <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest mb-1.5">
                      <span className="text-muted-foreground">{t('bu1.metric.trad')}</span>
                      <span className="text-foreground/60">1×</span>
                    </div>
                    <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '10%' }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full progress-track-fill rounded-full bg-foreground/25"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest mb-1.5">
                      <span className="text-brand-cyan/80">{t('bu1.metric.mb')}</span>
                      <span className="text-brand-cyan">10×</span>
                    </div>
                    <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet rounded-full shadow-[0_0_16px_oklch(0.84_0.16_220/0.6)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-4 pt-6 border-t border-border">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">{t('bu1.metric.briefing')}</div>
                    <div className="font-display text-2xl font-semibold"><NumberTicker value={30} suffix="d" /></div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">{t('bu1.metric.eval')}</div>
                    <div className="font-display text-2xl font-semibold"><NumberTicker value={94.2} decimals={1} suffix="%" /></div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bu1lderSection;
