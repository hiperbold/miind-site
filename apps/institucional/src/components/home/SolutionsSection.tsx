import SectionHeader from './SectionHeader';
import Reveal from '../effects/Reveal';
import MagicCard from '../effects/MagicCard';
import BorderBeam from '../effects/BorderBeam';
import { Boxes, Cpu, Rocket, GraduationCap, ArrowUpRight } from 'lucide-react';
import { useT } from '@/i18n/useT';

const pillars = [
  {
    idx: '01',
    k: 'builder',
    icon: Boxes,
    items: ['sol.builder.i.1', 'sol.builder.i.2', 'sol.builder.i.3', 'sol.builder.i.4'],
  },
  {
    idx: '02',
    k: 'dev',
    icon: Cpu,
    items: ['sol.dev.i.1', 'sol.dev.i.2', 'sol.dev.i.3', 'sol.dev.i.4'],
  },
  {
    idx: '03',
    k: 'sprints',
    icon: Rocket,
    items: ['sol.sprints.i.1', 'sol.sprints.i.2', 'sol.sprints.i.3', 'sol.sprints.i.4'],
  },
  {
    idx: '04',
    k: 'academy',
    icon: GraduationCap,
    items: ['sol.academy.i.1', 'sol.academy.i.2', 'sol.academy.i.3', 'sol.academy.i.4'],
  },
];


const SolutionsSection = () => {
  const { t } = useT();
  const scrollToCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('next-step')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="solutions" className="relative py-8 sm:py-12 px-0">
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
            index="03"
            label={t('sol.label') as string}
            title={t('sol.title')}
            lead={t('sol.lead')}
          />

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.idx} delay={i * 0.08}>
                  <MagicCard className="bento-card p-8 h-full rounded-[14px]">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-brand-cyan" />
                        {p.idx} // {t(`sol.${p.k}.tag`)}
                      </span>
                      <span className="blue-chip">pilar</span>
                    </div>

                    <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3 leading-tight">
                      {t(`sol.${p.k}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {t(`sol.${p.k}.desc`)}
                    </p>

                    <p className="text-xs italic text-brand-cyan/85 leading-relaxed mb-5">
                      {t(`sol.${p.k}.outcome`)}
                    </p>

                    {p.items.length > 0 && (
                      <ul className="space-y-2.5 pt-5 border-t border-border">
                        {p.items.map((key) => (
                          <li key={key} className="flex items-start gap-2.5 text-sm text-foreground/85 leading-relaxed">
                            <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-brand-cyan to-brand-violet shrink-0" />
                            <span>{t(key)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </MagicCard>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-col items-center gap-5">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl text-center">
                {t('sol.footer')}
              </p>
              <a
                href="#next-step"
                onClick={scrollToCta}
                className="ink-link inline-flex items-center gap-2 text-foreground/85 hover:text-foreground font-medium"
              >
                {t('sol.cta')}
                <ArrowUpRight className="w-4 h-4 text-brand-cyan" />
              </a>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
