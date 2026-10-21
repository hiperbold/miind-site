import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import BorderBeam from '../effects/BorderBeam';
import heroAvif from '@/assets/hero-cinematic.jpg?w=640;1024;1600;1920&format=avif&as=srcset';
import heroWebp from '@/assets/hero-cinematic.jpg?w=640;1024;1600;1920&format=webp&as=srcset';
import heroJpg from '@/assets/hero-cinematic.jpg?w=1600&format=jpg';
import heroLqip from '@/assets/hero-cinematic.jpg?w=24&format=webp&blur=20';
import { useT } from '@/i18n/useT';

const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const reduced = useReducedMotion();
  const { t } = useT();
  const eyebrowLines = [t('hero.eyebrow.1'), t('hero.eyebrow.2'), t('hero.eyebrow.3')] as string[];

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-stretch overflow-hidden pt-20 sm:pt-24 lg:pt-32 pb-12 px-0"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -translate-y-1/2 -left-32 w-[36rem] h-[36rem] rounded-full bg-brand-violet/12 blur-3xl aurora-drift" />
        <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] rounded-full bg-brand-cyan/10 blur-3xl aurora-drift" style={{ animationDelay: '-20s' }} />
      </div>

      <div
        className="section-frame"
        style={{
          backgroundImage: `url(${heroLqip})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <picture>
          <source type="image/avif" srcSet={heroAvif} sizes="100vw" />
          <source type="image/webp" srcSet={heroWebp} sizes="100vw" />
          <motion.img
            src={heroJpg}
            alt="AI professional interacting with data flowing between phone and laptop"
            width={1920}
            height={1280}
            fetchPriority="high"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            initial={reduced ? undefined : { scale: 1.02, opacity: 0 }}
            animate={reduced ? undefined : { scale: 1, opacity: imgLoaded ? 1 : 0 }}
            transition={{ opacity: { duration: 0.8, ease: 'easeOut' }, scale: { duration: 4, ease: [0.16, 1, 0.3, 1] } }}
            className="absolute inset-0 w-full h-full object-cover object-[68%_28%] sm:object-[70%_center] md:object-[65%_30%] lg:object-[55%_25%] xl:object-[50%_25%]"
          />
        </picture>


        <div aria-hidden="true" className="hero-overlay-left" />
        <div aria-hidden="true" className="hero-overlay-vert" />
        <div aria-hidden="true" className="absolute inset-0 noise opacity-40 pointer-events-none" />

        <motion.div
          aria-hidden="true"
          className="absolute top-1/3 left-[5%] w-[22rem] h-[22rem] rounded-full bg-brand-violet/10 blur-3xl pointer-events-none"
          animate={reduced ? undefined : { opacity: [0.18, 0.28, 0.18], scale: [1, 1.03, 1] }}
          transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
        />

        <BorderBeam size={420} duration={12} colorFrom="oklch(0.84 0.16 220)" colorTo="oklch(0.62 0.22 295)" />

        <div className="relative z-10 h-full min-h-[calc(100vh-11rem)] flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 py-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex items-start gap-4 mb-10"
            >
              <span aria-hidden="true" className="block w-px h-20 bg-gradient-to-b from-brand-cyan via-brand-violet to-transparent mt-1" />
              <div className="flex flex-col gap-2">
                {eyebrowLines.map((line, i) => (
                  <motion.span
                    key={line + i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
                    className="font-mono text-[11px] uppercase tracking-[0.32em] text-foreground/80"
                  >
                    {line}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-semibold tracking-tight leading-[1.06] break-words text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl mb-6 sm:mb-8"
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mb-10"
            >
              {t('hero.lead')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-7 sm:items-center"
            >
              <a
                href="#next-step"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('next-step')?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="hero-cta group"
              >
                <span>{t('hero.cta.primary')}</span>
                <span className="hero-cta-icon">
                  <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
                {hover && <BorderBeam size={180} duration={4} />}
              </a>
              <Link to="/portfolio" className="hero-cta group">
                <span>{t('hero.cta.secondary')}</span>
                <span className="hero-cta-icon">
                  <Sparkles aria-hidden="true" className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.4 }}
              className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] sm:tracking-[0.22em] text-muted-foreground mt-8 sm:mt-10 flex flex-wrap items-center gap-2 sm:gap-3"
            >
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-signal" />
                {t('hero.trust.uptime')}
              </span>
              <span aria-hidden="true" className="text-muted-foreground/60">·</span>
              <span>{t('hero.trust.deploy')}</span>
              <span aria-hidden="true" className="text-muted-foreground/60">·</span>
              <span>{t('hero.trust.sectors')}</span>
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="hidden md:block absolute bottom-10 right-10 lg:bottom-14 lg:right-14 z-10 max-w-[280px]"
        >
          <div className="hero-caption">
            <span aria-hidden="true" className="absolute -top-1 -left-1 inline-flex w-2.5 h-2.5">
              <span className="absolute inset-0 rounded-full bg-brand-cyan animate-ping-ring" />
              <span className="relative w-2.5 h-2.5 rounded-full bg-brand-cyan" />
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-right leading-relaxed">
              {t('hero.caption')}
            </p>
          </div>
        </motion.div>

        <div aria-hidden="true" className="hidden md:flex absolute bottom-10 left-10 lg:bottom-14 lg:left-14 pointer-events-none flex-col items-center gap-2 z-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground/70 [writing-mode:vertical-rl] rotate-180">{t('hero.scroll')}</span>
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-brand-cyan/50 to-transparent animate-chevron-bounce" />
        </div>
      </div>

      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
    </section>
  );
};

export default HeroSection;
