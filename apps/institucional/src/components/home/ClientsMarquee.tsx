import { assetUrl } from '@/asset-url';
import Reveal from '../effects/Reveal';
import BorderBeam from '../effects/BorderBeam';
import { useT } from '@/i18n/useT';

import renault from '@/assets/clients/renault.svg.asset.json';
import unimed from '@/assets/clients/unimed.svg.asset.json';
import generali from '@/assets/clients/generali.svg.asset.json';
import ey from '@/assets/clients/ey.svg.asset.json';
import eurofarma from '@/assets/clients/eurofarma.svg.asset.json';
import temSaude from '@/assets/clients/tem-saude.svg.asset.json';
import vertem from '@/assets/clients/vertem.svg.asset.json';
import runtalent from '@/assets/clients/runtalent.png.asset.json';

type Client = { name: string; src: string; h?: string };

const clients: Client[] = [
  { name: 'Renault',        src: assetUrl(renault.url),    h: 'h-9 md:h-10' },
  { name: 'Seguros Unimed', src: assetUrl(unimed.url),     h: 'h-7 md:h-8' },
  { name: 'Generali',       src: assetUrl(generali.url),   h: 'h-5 md:h-6' },
  { name: 'Eurofarma',      src: assetUrl(eurofarma.url),  h: 'h-6 md:h-7' },
  { name: 'EY',             src: assetUrl(ey.url),         h: 'h-9 md:h-10' },
  { name: 'TEM Saúde',      src: assetUrl(temSaude.url),   h: 'h-5 md:h-6' },
  { name: 'Vertem',         src: assetUrl(vertem.url),     h: 'h-9 md:h-10' },
  { name: 'Runtalent',      src: assetUrl(runtalent.url),  h: 'h-7 md:h-8' },
];

const Row = ({ reverse = false }: { reverse?: boolean }) => (
  <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_20%,#000_80%,transparent)]">
    <div
      className={`flex w-max items-center gap-14 md:gap-20 py-5 ${
        reverse
          ? 'animate-marquee [animation-direction:reverse] [animation-duration:80s]'
          : 'animate-marquee [animation-duration:80s]'
      }`}
    >
      {[...clients, ...clients, ...clients].map((c, i) => (
        <div
          key={`${c.name}-${i}`}
          title={c.name}
          aria-label={c.name}
          className="shrink-0 inline-flex items-center justify-center px-2"
        >
          <img
            src={c.src}
            alt={c.name}
            loading="lazy"
            decoding="async"
            className={`${c.h ?? 'h-7 md:h-8'} w-auto object-contain client-logo select-none pointer-events-none`}
            draggable={false}
          />
        </div>
      ))}
    </div>
  </div>
);

const ClientsMarquee = () => {
  const { t } = useT();
  return (
    <section className="relative py-8 sm:py-12 px-0">
      <div className="section-frame">
        <BorderBeam size={420} duration={12} colorFrom="oklch(0.84 0.16 220)" colorTo="oklch(0.62 0.22 295)" />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 -translate-y-1/2 -left-32 w-[26rem] h-[26rem] rounded-full bg-brand-cyan/10 blur-3xl aurora-drift" />
          <div className="absolute top-1/2 -translate-y-1/2 -right-32 w-[24rem] h-[24rem] rounded-full bg-brand-violet/12 blur-3xl aurora-drift" style={{ animationDelay: '-18s' }} />
        </div>
        <div aria-hidden="true" className="absolute inset-0 noise opacity-25 pointer-events-none" />

        <div className="relative z-10 px-5 sm:px-10 lg:px-14 xl:px-16 py-8 sm:py-10 lg:py-12">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="eyebrow">
                <span>00 // {t('clients.label')}</span>
                <span className="ml-2 inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-signal" />
                  <span className="text-brand-cyan/80">live</span>
                </span>
              </div>
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                {t('clients.tagline')}
              </p>
            </div>
          </Reveal>
          <Row />
        </div>
      </div>
    </section>
  );
};

export default ClientsMarquee;
