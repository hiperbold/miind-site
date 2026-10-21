import SectionHeader from './SectionHeader';
import Reveal from '../effects/Reveal';
import Tilt from '../effects/Tilt';
import BorderBeam from '../effects/BorderBeam';
import { useT } from '@/i18n/useT';

const voiceDefs = [
  { k: '1', i: 'DT' },
  { k: '2', i: 'CE' },
  { k: '3', i: 'CI' },
];

const VoicesSection = () => {
  const { t } = useT();
  return (
    <section id="voices" className="relative py-8 sm:py-12 px-0">
      <div className="section-frame">
        <BorderBeam size={420} duration={12} colorFrom="oklch(0.84 0.16 220)" colorTo="oklch(0.62 0.22 295)" />

        <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] rounded-full bg-brand-cyan/12 blur-3xl aurora-drift" />
          <div className="absolute bottom-0 -right-32 w-[26rem] h-[26rem] rounded-full bg-brand-violet/15 blur-3xl aurora-drift" style={{ animationDelay: '-22s' }} />
        </div>
        <div aria-hidden="true" className="absolute inset-0 noise opacity-30 pointer-events-none" />

        <div className="relative z-10 px-5 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-14 lg:py-16">
          <SectionHeader
            index="06"
            label={t('voices.label') as string}
            title={t('voices.title')}
          />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {voiceDefs.map((v, i) => (
              <Reveal key={v.k} delay={i * 0.1}>
                <Tilt>
                  <div className="glass rounded-2xl p-8 h-full relative overflow-hidden">
                    <span className="absolute left-0 top-8 bottom-8 w-px bg-gradient-to-b from-brand-cyan via-brand-blue to-brand-violet" />
                    <div className="font-display text-6xl leading-none text-brand-cyan/60 mb-3">"</div>
                    <p className="text-[0.95rem] leading-relaxed text-foreground/90 mb-8">{t(`voices.${v.k}.q`)}</p>
                    <div className="pt-5 border-t border-border flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full glass flex items-center justify-center font-mono text-xs font-semibold text-brand-cyan border border-brand-cyan/40">
                        {v.i}
                      </div>
                      <div>
                        <div className="font-display text-base font-semibold">{t(`voices.${v.k}.a`)}</div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">{t(`voices.${v.k}.o`)}</div>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
            {t('voices.footer')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default VoicesSection;
