import { assetUrl } from '@/asset-url';
import { useEffect, useRef, useState } from "react";
import { m as motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Activity,
  TrendingUp,
  ChevronDown,
  MessageSquare,
  Cloud,
  Database,
  Briefcase,
  Headphones,
  Mail,
  Phone,
  CreditCard,
  Slack,
  Plug,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { HeroVideoModal } from "./HeroVideoModal";
import HeroNeuralFlow from "./HeroNeuralFlow";
import ambientVideo from "@/assets/hero/ambient.mp4.asset.json";
import ambientPoster from "@/assets/hero/ambient-poster.jpg.asset.json";

const badges = [
  "IA Generativa",
  "Builder Visual",
  "Agentes Inteligentes",
  "Governança",
  "Integrações",
  "Enterprise Ready",
];



function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const fn = () => setReduced(m.matches);
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, []);
  return reduced;
}


export function Hero() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reduced) return;
    const section = ref.current;
    const video = videoRef.current;
    if (!section || !video) return;
    let inView = false;
    const tryPlay = () => {
      if (inView && !document.hidden) video.play().catch(() => {});
      else video.pause();
    };
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        tryPlay();
      },
      { threshold: 0, rootMargin: "100px" },
    );
    io.observe(section);
    const onVis = () => tryPlay();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  function onMove(e: React.MouseEvent) {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  }


  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={onMove}
      className="relative min-h-[100svh] pt-28 pb-20 lg:pt-32 lg:pb-28 overflow-hidden"
    >
      {/* Layer 1 — Ambient video */}
      <div className="absolute inset-0 -z-30">
        <video
          ref={videoRef}
          src={undefined}
          poster={assetUrl(ambientPoster.url)}
          muted
          loop
          playsInline
          preload={isMobile ? "none" : "metadata"}
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          tabIndex={-1}
          className="w-full h-full object-cover opacity-50 dark:opacity-50 [.light_&]:opacity-25 [.light_&]:mix-blend-luminosity"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_85%)]" />
      </div>

      {/* Layer 2 — Aurora blobs */}
      <motion.div
        aria-hidden
        style={{ x: useTransform(sx, (v) => v * 30), y: useTransform(sy, (v) => v * 20) }}
        className="absolute -z-20 top-[10%] -left-32 w-[600px] h-[600px] rounded-full"
      >
        <div className="w-full h-full rounded-full bg-brand-blue/40 [.light_&]:bg-brand-blue/20 blur-[140px] aurora-drift" />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x: useTransform(sx, (v) => v * -30), y: useTransform(sy, (v) => v * -20) }}
        className="absolute -z-20 top-[20%] -right-32 w-[600px] h-[600px] rounded-full"
      >
        <div className="w-full h-full rounded-full bg-brand-violet/40 [.light_&]:bg-brand-violet/20 blur-[140px] aurora-drift" style={{ animationDelay: "-8s" }} />
      </motion.div>

      {/* Layer 3 — Perspective grid */}
      <div className="absolute -z-10 inset-x-0 bottom-0 h-[60%] [perspective:800px] pointer-events-none">
        <div
          className="absolute inset-0 grid-bg origin-top"
          style={{
            transform: "rotateX(60deg) translateY(20%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative container-editorial">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
          {/* LEFT */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-medium tracking-wide"
            >
              <span className="size-1.5 rounded-full bg-brand-cyan animate-pulse" />
              Plataforma enterprise · IA generativa
            </motion.div>

            <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block overflow-hidden"
              >
                <span className="block">Agentes, automações e produtos digitais com</span>
              </motion.span>
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="block overflow-hidden"
              >
                <span className="block text-gradient animate-gradient-x bg-[length:200%_auto]">
                  IA generativa.
                </span>
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              A plataforma para tirar a Inteligência Artificial do piloto
              automático e colocar em operação, conectada aos seus sistemas e
              clientes, com governança e segurança.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="mt-8 flex flex-wrap gap-4 items-center"
            >
              <Button
                size="lg"
                asChild
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-background hover:opacity-95 border-0 font-semibold shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-shadow"
              >
                <a href="#contato">
                  Agendar demo <ArrowRight className="ml-1 size-4" />
                </a>
              </Button>
              <HeroVideoModal />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-10 flex flex-wrap gap-2 opacity-70"
            >
              {badges.map((b) => (
                <span
                  key={b}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground"
                >
                  {b}
                </span>
              ))}
            </motion.div>

          </div>

          {/* RIGHT — Neural Flow scene with minimal HUD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square max-w-[580px] mx-auto w-full"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            <motion.div
              style={{
                x: useTransform(sx, (v) => v * 12),
                y: useTransform(sy, (v) => v * 12),
              }}
              className="absolute inset-0"
            >
              <HeroNeuralFlow />
            </motion.div>

            {/* Minimal HUD — performance + economia (exemplos ilustrativos) */}
            <HudCard pos="-top-6 -left-16 lg:-left-20 rotate-[2deg]" delay={0.9} sx={sx} sy={sy} factor={8}>
              <Activity className="size-3.5 text-brand-cyan" />
              <div className="flex flex-col gap-0.5">
                <span className="text-foreground/90">Performance em tempo real</span>
                <Sparkline />
              </div>
            </HudCard>

            <HudCard pos="-bottom-8 -right-14 lg:-right-20 rotate-[-1deg]" delay={1.02} sx={sx} sy={sy} factor={-12}>
              <div className="flex flex-col gap-1.5 min-w-[180px]">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Economia com I.A.</span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-brand-mint/10 text-brand-mint whitespace-nowrap">90 dias</span>
                </div>
                <div className="flex items-end justify-between gap-2">
                  <MoneyCounter target={1248320} />
                  <MiniBars />
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="size-3 text-brand-mint" />
                  <span className="text-[10px] font-semibold text-brand-mint whitespace-nowrap">+32% vs. trimestre anterior</span>
                </div>
              </div>
            </HudCard>


          </motion.div>
        </div>


        {/* Integrations marquee — ecosystem chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 lg:mt-20 relative z-10 border-t border-foreground/10 pt-8"
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium text-center mb-5">
            Integrado aos sistemas que sua operação já usa
          </div>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex gap-3 animate-marquee whitespace-nowrap py-2">
              {[...Array(2)].flatMap((_, k) =>
                [
                  { n: "WhatsApp", I: MessageSquare },
                  { n: "Salesforce", I: Cloud },
                  { n: "SAP", I: Database },
                  { n: "HubSpot", I: Briefcase },
                  { n: "Zendesk", I: Headphones },
                  { n: "Microsoft 365", I: Mail },
                  { n: "Google Workspace", I: Mail },
                  { n: "Slack", I: Slack },
                  { n: "Stripe", I: CreditCard },
                  { n: "Twilio", I: Phone },
                  { n: "APIs internas", I: Plug },
                ].map(({ n, I }) => (
                  <span
                    key={`${k}-${n}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-foreground/80 hover:text-foreground hover:border-brand-cyan/30 transition-colors"
                  >
                    <I className="size-3.5 text-brand-cyan/80" />
                    {n}
                  </span>
                ))
              )}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground text-[10px] uppercase tracking-[0.2em]"
      >
        <span>Scroll</span>
        <ChevronDown className="w-4 h-4 text-brand-cyan animate-chevron-bounce" strokeWidth={2.5} />

      </motion.div>
    </section>
  );
}

function HudCard({
  pos,
  delay,
  sx,
  sy,
  factor,
  children,
}: {
  pos: string;
  delay: number;
  sx: any;
  sy: any;
  factor: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      style={{
        x: useTransform(sx, (v: number) => v * factor),
        y: useTransform(sy, (v: number) => v * factor),
      }}
      className={`absolute ${pos} z-20 pointer-events-none hidden lg:block`}

    >
      <div className="glass rounded-xl px-3 py-2 flex items-center gap-2 text-[11px] whitespace-nowrap shadow-[0_8px_30px_-10px_oklch(0.13_0.025_265/0.6)]">
        {children}
      </div>
    </motion.div>
  );
}

function Sparkline() {
  return (
    <svg width="90" height="14" viewBox="0 0 90 14" className="overflow-visible">
      <defs>
        <linearGradient id="spark" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--brand-cyan)" />
          <stop offset="100%" stopColor="var(--brand-violet)" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 10 L10 7 L20 9 L30 5 L40 6 L50 3 L60 6 L70 2 L80 4 L90 1"
        fill="none"
        stroke="url(#spark)"
        strokeWidth="1.4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.4 }}
      />
    </svg>
  );
}

function TrendBar() {
  return (
    <div className="h-1 w-full rounded-full bg-foreground/10 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "78%" }}
        transition={{ duration: 1.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-full bg-gradient-to-r from-brand-mint/40 to-brand-mint"
      />
    </div>
  );
}

function MoneyCounter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    let started = false;
    const run = () => {
      const start = performance.now();
      const duration = 2000;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(target * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target]);

  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

  return (
    <span
      ref={ref}
      className="text-xl font-bold leading-none tabular-nums bg-gradient-to-r from-foreground to-brand-mint bg-clip-text text-transparent"
    >
      {formatted}
    </span>
  );
}

function MiniBars() {
  const heights = [40, 60, 75, 100];
  return (
    <div className="flex items-end gap-0.5 h-6">
      {heights.map((h, i) => (
        <motion.span
          key={i}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 0.8 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: `${h}%`, transformOrigin: "bottom" }}
          className="w-1 rounded-sm bg-gradient-to-t from-brand-mint/40 to-brand-mint"
        />
      ))}
    </div>
  );
}


