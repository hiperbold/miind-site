import Reveal from '../effects/Reveal';

import BorderBeam from '../effects/BorderBeam';
import { ArrowRight, Calendar, Check } from 'lucide-react';
import { useT } from '@/i18n/useT';
import { buildWhatsAppUrl } from '@/lib/contact';

const NextStepSection = () => {
  const { t } = useT();
  return (
    <section id="next-step" className="relative py-8 sm:py-12 px-0">
      <div className="section-frame">
        <BorderBeam size={420} duration={12} colorFrom="oklch(0.84 0.16 220)" colorTo="oklch(0.62 0.22 295)" />

        <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] rounded-full bg-brand-violet/15 blur-3xl aurora-drift" />
          <div className="absolute bottom-0 -right-32 w-[26rem] h-[26rem] rounded-full bg-brand-cyan/12 blur-3xl aurora-drift" style={{ animationDelay: '-22s' }} />
        </div>
        
        <div aria-hidden="true" className="absolute inset-0 noise opacity-30 pointer-events-none" />

        <div className="relative z-10 px-5 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-14 lg:py-16">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
            <div>
              <Reveal>
                <div className="eyebrow mb-6">
                  <span>09 // {t('next.label')}</span>
                  <span className="ml-2 inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-signal" />
                    <span className="text-brand-cyan/80">{t('next.open')}</span>
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="display-l mb-7">{t('next.title')}</h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="lead max-w-xl mb-8">{t('next.lead')}</p>
              </Reveal>
              <Reveal delay={0.3}>
                <ul className="space-y-2 text-sm font-mono uppercase tracking-widest text-muted-foreground">
                  {['next.b1', 'next.b2', 'next.b3'].map((k) => (
                    <li key={k} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-brand-cyan" /> {t(k)}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="relative glass rounded-2xl p-8 overflow-hidden">
                <BorderBeam size={280} duration={8} />
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{t('next.window')}</span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-brand-cyan/80 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-signal" />
                    {t('next.open')}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl glass flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-brand-cyan" />
                  </div>
                  <div>
                    <div className="font-display text-3xl font-semibold">{t('next.duration')}</div>
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{t('next.duration.sub')}</div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-7">
                  {t('next.card.lead')}
                </p>

                <a
                  href={buildWhatsAppUrl(t('next.whatsapp.msg') as string)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="command-button w-full justify-center"
                >
                  {t('next.cta')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextStepSection;
