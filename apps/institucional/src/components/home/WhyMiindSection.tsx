import SectionHeader from './SectionHeader';
import Reveal from '../effects/Reveal';
import MagicCard from '../effects/MagicCard';
import BorderBeam from '../effects/BorderBeam';
import { useT } from '@/i18n/useT';

const reasonDefs = [
  { n: '01', k: 'r1', span: true },
  { n: '02', k: 'r2' },
  { n: '03', k: 'r3' },
  { n: '04', k: 'r4' },
  { n: '05', k: 'r5' },
  { n: '06', k: 'r6' },
  { n: '07', k: 'r7', span: true },
];

const WhyMiindSection = () => {
  const { t } = useT();
  return (
    <section id="why" className="relative py-8 sm:py-12 px-0">
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
            index="05"
            label={t('why.label') as string}
            title={t('why.title')}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {reasonDefs.map((r, i) => (
              <Reveal key={r.n} delay={i * 0.06} className={r.span ? 'md:col-span-2 lg:col-span-2' : ''}>
                <MagicCard className="signal-card p-6 sm:p-7 h-full min-h-[220px] min-w-0 relative overflow-hidden">
                  <span aria-hidden="true" className="chapter-numeral hidden sm:block absolute -top-2 -right-1 pointer-events-none select-none leading-none">{r.n}</span>
                  <div className="relative pr-0 sm:pr-16 lg:pr-20">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan/80 mb-3">{r.n} // {t('why.reason')}</div>
                    <h3 className="font-display text-lg sm:text-xl font-semibold mb-3 leading-snug">{t(`why.${r.k}.t`)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{t(`why.${r.k}.d`)}</p>
                  </div>
                </MagicCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMiindSection;
