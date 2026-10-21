import SectionHeader from './SectionHeader';
import Reveal from '../effects/Reveal';
import BorderBeam from '../effects/BorderBeam';
import { motion } from 'framer-motion';
import { Calendar, Search, Code, Shield, Rocket } from 'lucide-react';
import { useT } from '@/i18n/useT';

const stepDefs = [
  { d: 'D0', k: 'briefing', icon: Calendar },
  { d: 'D7', k: 'discovery', icon: Search },
  { d: 'D14', k: 'alpha', icon: Code },
  { d: 'D21', k: 'beta', icon: Shield },
  { d: 'D30', k: 'mvp', icon: Rocket },
];

const MethodologySection = () => {
  const { t } = useT();
  return (
    <section id="methodology" className="relative py-8 sm:py-12 px-0">
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
            index="02"
            label={t('meth.label') as string}
            title={t('meth.title')}
            lead={t('meth.lead')}
          />

          <div className="relative mt-12">
            <div className="hidden lg:block absolute top-[68px] left-[10%] right-[10%] h-px bg-border/60 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'left' }}
                className="absolute inset-0 bg-gradient-to-r from-brand-cyan/70 via-brand-blue/70 to-brand-violet/70"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-stretch">
              {stepDefs.map((s, i) => (
                <Reveal key={s.d} delay={i * 0.08} className="h-full">
                  <div className="relative h-full rounded-xl border border-border bg-surface-1/40 backdrop-blur-sm p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {s.d} // {t('meth.day')}
                      </span>
                      <span className="w-10 h-10 rounded-lg border border-border bg-surface-0/60 flex items-center justify-center">
                        <s.icon aria-hidden="true" className="w-4 h-4 text-brand-cyan" />
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight">{t(`meth.s.${s.k}.t`)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(`meth.s.${s.k}.d`)}</p>
                    <div className="mt-auto pt-5 flex items-center gap-2">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{t('meth.step')}</span>
                      <span className="font-mono text-[10px] tabular-nums text-brand-cyan">
                        {String(i + 1).padStart(2, '0')} / {String(stepDefs.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
