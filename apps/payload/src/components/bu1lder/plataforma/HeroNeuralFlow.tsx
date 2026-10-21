'use client'

// Porte de apps/bu1lder/src/components/site/HeroNeuralFlow.tsx (animação do topo).
/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MessageCircle,
  Mail,
  Database,
  Cable,
  ShieldCheck,
  Zap,
  Cloud,
  Webhook,
} from "lucide-react";

type ThemeMode = "dark" | "light";

type NodeDef = {
  id: string;
  label: string;
  // normalized 0..1 position relative to canvas
  nx: number;
  ny: number;
  Icon: typeof MessageCircle;
};

const ALL_NODES: NodeDef[] = [
  { id: "wa", label: "WhatsApp", nx: 0.08, ny: 0.22, Icon: MessageCircle },
  { id: "mail", label: "E-mail", nx: 0.12, ny: 0.58, Icon: Mail },
  { id: "crm", label: "CRM", nx: 0.5, ny: 0.08, Icon: Database },
  { id: "erp", label: "ERP", nx: 0.92, ny: 0.28, Icon: Cable },
  { id: "api", label: "APIs", nx: 0.86, ny: 0.62, Icon: Zap },
  { id: "wh", label: "Webhooks", nx: 0.62, ny: 0.88, Icon: Webhook },
  { id: "cloud", label: "Cloud", nx: 0.22, ny: 0.86, Icon: Cloud },
  { id: "gov", label: "Governança", nx: 0.36, ny: 0.4, Icon: ShieldCheck },
];

type Conn = {
  fromIdx: number; // -1 means core
  toIdx: number;
  life: number; // 0..1 alive, then fades
  age: number; // ms
  duration: number; // draw duration ms
  seed: number;
  nextParticleAt: number;
};

type Particle = {
  connIdx: number;
  t: number; // 0..1
  speed: number; // per ms
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function bezierPoint(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  cx: number,
  cy: number,
  t: number,
) {
  const u = 1 - t;
  return {
    x: u * u * ax + 2 * u * t * cx + t * t * bx,
    y: u * u * ay + 2 * u * t * cy + t * t * by,
  };
}

function controlPoint(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  seed: number,
  time: number,
) {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  // perpendicular unit
  const px = -dy / len;
  const py = dx / len;
  const breathe = Math.sin(time * 0.0006 + seed) * 0.18 + 0.32;
  const offset = len * breathe * (seed % 2 === 0 ? 1 : -1);
  return { x: mx + px * offset, y: my + py * offset };
}

function useThemeMode(): ThemeMode {
  const [mode, setMode] = useState<ThemeMode>("dark");
  useEffect(() => {
    if (typeof document !== "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMode(
        document.documentElement.classList.contains("light") ? "light" : "dark",
      );
    }
    const onChange = (e: Event) => {
      const t = (e as CustomEvent<ThemeMode>).detail;
      if (t === "light" || t === "dark") setMode(t);
    };
    window.addEventListener("themechange", onChange);
    return () => window.removeEventListener("themechange", onChange);
  }, []);
  return mode;
}

export default function HeroNeuralFlow() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mode = useThemeMode();
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(max-width: 768px)");
    const r = window.matchMedia("(prefers-reduced-motion: reduce)");
    const upd = () => {
      setIsMobile(m.matches);
      setReduced(r.matches);
    };
    upd();
    m.addEventListener("change", upd);
    r.addEventListener("change", upd);
    return () => {
      m.removeEventListener("change", upd);
      r.removeEventListener("change", upd);
    };
  }, []);

  const nodes = useMemo(() => (isMobile ? ALL_NODES.slice(0, 5) : ALL_NODES), [isMobile]);
  const maxParticles = isMobile ? 8 : 16;
  const maxConns = isMobile ? 5 : 8;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const palette =
      mode === "light"
        ? {
            line1: "rgba(59, 130, 246, 0.55)",
            line2: "rgba(139, 92, 246, 0.55)",
            node: "#3b82f6",
            nodeGlow: "rgba(59, 130, 246, 0.35)",
            core1: "#06b6d4",
            core2: "#8b5cf6",
            particle: "#0ea5e9",
            particleGlow: "rgba(14, 165, 233, 0.7)",
            nodeFill: "rgba(255, 255, 255, 0.85)",
            nodeStroke: "rgba(30, 58, 138, 0.25)",
            label: "rgba(30, 41, 59, 0.7)",
            dot: "rgba(30, 58, 138, 0.06)",
          }
        : {
            line1: "rgba(34, 211, 238, 0.55)",
            line2: "rgba(139, 92, 246, 0.55)",
            node: "#22d3ee",
            nodeGlow: "rgba(34, 211, 238, 0.45)",
            core1: "#22d3ee",
            core2: "#8b5cf6",
            particle: "#ffffff",
            particleGlow: "rgba(34, 211, 238, 0.85)",
            nodeFill: "rgba(255, 255, 255, 0.06)",
            nodeStroke: "rgba(255, 255, 255, 0.18)",
            label: "rgba(226, 232, 240, 0.7)",
            dot: "rgba(148, 163, 184, 0.08)",
          };

    function resize() {
      const rect = wrap!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // Core position (center)
    const core = () => ({ x: width * 0.5, y: height * 0.5 });
    const nodePos = (i: number) => ({
      x: nodes[i].nx * width,
      y: nodes[i].ny * height,
    });
    const pointOf = (idx: number) => (idx === -1 ? core() : nodePos(idx));

    // State
    const conns: Conn[] = [];
    const particles: Particle[] = [];
    const nodeGlow: number[] = nodes.map(() => 0);
    let coreGlow = 0;
    // (rotating ring removed — logo is rendered as HTML overlay)
    let lastSpawn = 0;
    let last = performance.now();
    let running = true;
    let raf = 0;

    function start() {
      if (!running || raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }
    function stop() {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }

    function spawnConn(now: number) {
      if (conns.filter((c) => c.life > 0).length >= maxConns) return;
      // 70% chance: node -> core; 30%: node -> node
      const useCore = Math.random() < 0.7;
      const fromIdx = Math.floor(Math.random() * nodes.length);
      let toIdx: number;
      if (useCore) {
        toIdx = -1;
      } else {
        toIdx = Math.floor(Math.random() * nodes.length);
        if (toIdx === fromIdx) toIdx = (toIdx + 1) % nodes.length;
      }
      conns.push({
        fromIdx,
        toIdx,
        life: 0.001,
        age: 0,
        duration: 1800 + Math.random() * 1200,
        seed: Math.floor(Math.random() * 1000),
        nextParticleAt: now + 200 + Math.random() * 400,
      });
    }

    function drawDotGrid() {
      ctx!.fillStyle = palette.dot;
      const step = 28;
      for (let x = step / 2; x < width; x += step) {
        for (let y = step / 2; y < height; y += step) {
          ctx!.beginPath();
          ctx!.arc(x, y, 0.9, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    function drawConn(c: Conn, now: number) {
      const a = pointOf(c.fromIdx);
      const b = pointOf(c.toIdx);
      const cp = controlPoint(a.x, a.y, b.x, b.y, c.seed, now);

      const drawT = Math.min(1, c.age / c.duration);
      const fadeOut = c.life < 0.3 ? c.life / 0.3 : 1;

      // sample points along bezier from 0 to drawT
      const steps = 24;
      ctx!.lineCap = "round";
      ctx!.lineWidth = 1.1;

      const grad = ctx!.createLinearGradient(a.x, a.y, b.x, b.y);
      grad.addColorStop(0, palette.line1);
      grad.addColorStop(1, palette.line2);
      ctx!.strokeStyle = grad;
      ctx!.globalAlpha = 0.85 * fadeOut;

      ctx!.beginPath();
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * drawT;
        const p = bezierPoint(a.x, a.y, b.x, b.y, cp.x, cp.y, t);
        if (i === 0) ctx!.moveTo(p.x, p.y);
        else ctx!.lineTo(p.x, p.y);
      }
      ctx!.stroke();
      ctx!.globalAlpha = 1;
    }

    function drawParticle(p: Particle, now: number) {
      const c = conns[p.connIdx];
      if (!c) return;
      const a = pointOf(c.fromIdx);
      const b = pointOf(c.toIdx);
      const cp = controlPoint(a.x, a.y, b.x, b.y, c.seed, now);
      const pt = bezierPoint(a.x, a.y, b.x, b.y, cp.x, cp.y, p.t);

      // glow
      const r = 8;
      const g = ctx!.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, r);
      g.addColorStop(0, palette.particleGlow);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.arc(pt.x, pt.y, r, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.fillStyle = palette.particle;
      ctx!.beginPath();
      ctx!.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2);
      ctx!.fill();
    }

    function drawNode(i: number, now: number) {
      const p = nodePos(i);
      const breathe = 1 + Math.sin(now * 0.0015 + i) * 0.04;
      const glow = nodeGlow[i];
      const baseR = 6 * breathe;

      // glow halo
      if (glow > 0.02) {
        const r = 28 * glow;
        const g = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, palette.nodeGlow);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // dot
      ctx!.fillStyle = palette.nodeFill;
      ctx!.strokeStyle = palette.nodeStroke;
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, baseR, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.stroke();

      ctx!.fillStyle = palette.node;
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
      ctx!.fill();
    }

    function drawCore(now: number) {
      const c = core();
      // outer halo only (the logo is rendered in HTML overlay)
      const haloR = 90 + coreGlow * 40;
      const g = ctx!.createRadialGradient(c.x, c.y, 0, c.x, c.y, haloR);
      g.addColorStop(0, mode === "light" ? "rgba(59,130,246,0.32)" : "rgba(34,211,238,0.38)");
      g.addColorStop(0.5, mode === "light" ? "rgba(139,92,246,0.14)" : "rgba(139,92,246,0.2)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.arc(c.x, c.y, haloR, 0, Math.PI * 2);
      ctx!.fill();
    }

    function tick(now: number) {
      if (!running) return;
      const dt = Math.min(48, now - last);
      last = now;


      // spawn connections
      if (now - lastSpawn > 350 + Math.random() * 250) {
        spawnConn(now);
        lastSpawn = now;
      }

      // update connections
      for (let i = conns.length - 1; i >= 0; i--) {
        const c = conns[i];
        c.age += dt;
        if (c.age < c.duration) {
          c.life = 1;
        } else {
          c.life -= dt / 900;
        }
        if (c.life <= 0) {
          conns.splice(i, 1);
          // shift particle conn indexes
          for (let j = particles.length - 1; j >= 0; j--) {
            if (particles[j].connIdx === i) particles.splice(j, 1);
            else if (particles[j].connIdx > i) particles[j].connIdx--;
          }
        }
      }

      // spawn particles per connection
      for (let i = 0; i < conns.length; i++) {
        const c = conns[i];
        if (c.life >= 0.9 && now >= c.nextParticleAt && particles.length < maxParticles) {
          particles.push({ connIdx: i, t: 0, speed: 1 / (900 + Math.random() * 700) });
          c.nextParticleAt = now + 600 + Math.random() * 900;
        }
      }

      // update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.t += p.speed * dt;
        if (p.t >= 1) {
          // pulse target node / core
          const c = conns[p.connIdx];
          if (c) {
            if (c.toIdx === -1) coreGlow = 1;
            else nodeGlow[c.toIdx] = 1;
          }
          particles.splice(i, 1);
        }
      }

      // decay glows
      for (let i = 0; i < nodeGlow.length; i++) nodeGlow[i] *= 0.94;
      coreGlow *= 0.94;

      // render
      ctx!.clearRect(0, 0, width, height);
      drawDotGrid();
      for (const c of conns) drawConn(c, now);
      for (const p of particles) drawParticle(p, now);
      for (let i = 0; i < nodes.length; i++) drawNode(i, now);
      drawCore(now);

      raf = requestAnimationFrame(tick);
    }

    // reduced motion: draw static frame
    if (reduced) {
      // pre-seed connections from each node to core, fully drawn
      for (let i = 0; i < nodes.length; i++) {
        conns.push({
          fromIdx: i,
          toIdx: -1,
          life: 1,
          age: 2000,
          duration: 1,
          seed: i * 7,
          nextParticleAt: Infinity,
        });
      }
      ctx!.clearRect(0, 0, width, height);
      drawDotGrid();
      const now = performance.now();
      for (const c of conns) drawConn(c, now);
      for (let i = 0; i < nodes.length; i++) drawNode(i, now);
      drawCore(now);
    } else {
      // start handled by IntersectionObserver below
    }

    let inView = false;
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        if (reduced) return;
        if (inView && !document.hidden) start();
        else stop();
      },
      { threshold: 0, rootMargin: "100px" },
    );
    io.observe(wrap);

    const onVis = () => {
      if (reduced) return;
      if (document.hidden) stop();
      else if (inView) start();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [mode, isMobile, reduced, nodes, maxConns, maxParticles]);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Node labels overlay (HTML for crisp text + icons) */}
      <div className="absolute inset-0 pointer-events-none">
        {nodes.map((n) => (
          <div
            key={n.id}
            className="absolute -translate-x-1/2 flex items-center gap-1.5"
            style={{
              left: `${n.nx * 100}%`,
              top: `calc(${n.ny * 100}% + 14px)`,
            }}
          >
            <div className="px-2 py-1 rounded-md glass text-[10px] font-medium text-foreground/80 flex items-center gap-1.5 whitespace-nowrap shadow-[0_4px_14px_-6px_oklch(0.13_0.025_265/0.5)]">
              <n.Icon className="size-3 text-brand-cyan" strokeWidth={2} />
              {n.label}
            </div>
          </div>
        ))}

        {/* Core: Bu1lder logo + label */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5">
          <div className="relative animate-[pulse_3s_ease-in-out_infinite]">
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-violet opacity-50 blur-xl" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-violet grid place-items-center shadow-[0_8px_40px_-8px_oklch(0.5_0.2_220/0.7)]">
              <img src={"/bu1lder/marca/miind-mark.svg"} alt="" aria-hidden="true" className="w-full h-full object-contain p-2" />
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-md bg-background/80 backdrop-blur-md border border-brand-cyan/30 text-[10px] font-semibold tracking-wide text-foreground whitespace-nowrap shadow-[0_8px_24px_-8px_oklch(0.5_0.2_220/0.5)]">
            Bu<span className="bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-violet bg-clip-text text-transparent">1</span>lder.com
          </div>
        </div>
      </div>
    </div>
  );
}
