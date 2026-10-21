import { assetUrl } from '@/asset-url';
// MiindBuildAnimation.tsx
// Self-contained, dependency-free React component.
// Cinematic 24s looping animation: "Você descreve. Os agentes constroem seu software."
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import miindWordmark from "@/assets/miind-wordmark-white.svg.asset.json";

/** Renderiza o wordmark oficial (SVG) recortando o padding do viewBox 1440x810. */
function Wordmark({ height, style }: { height: number; style?: CSSProperties }) {
  const s = height / 226;
  return (
    <div style={{ position: "relative", height, width: 1393 * s, overflow: "hidden", display: "inline-block", ...style }}>
      <img
        src={assetUrl(miindWordmark.url)}
        alt="miind"
        style={{ position: "absolute", top: -290 * s, left: -47 * s, width: 1440 * s, height: 810 * s, maxWidth: "none" }}
      />
    </div>
  );
}

const SORA = "'Sora', sans-serif";
const MONO = "'JetBrains Mono', monospace";
const MANROPE = "'Manrope', sans-serif";

const C = {
  bg: "#070B16",
  ink: "#EAF0FA",
  mut: "#8A93A8",
  cyan: "#5BCCFF",
  cyan2: "#9FE8FF",
  blue: "#1E7CFF",
  purple: "#7C4DFF",
  green: "#3DD68C",
  hair: "rgba(255,255,255,.10)",
  spine: "linear-gradient(103deg,#1E7CFF,#5B2CF0 62%,#7C4DFF)",
};
const K = { kw: "#C4A6FF", fn: "#5BCCFF", str: "#7BE3AE", ink: "#EAF0FA", mut: "#6B7488" };

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const E = {
  easeInOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInCubic: (t: number) => t * t * t,
  easeOutBack: (t: number) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeInOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
};
const seg = (lt: number, a: number, b: number) => clamp((lt - a) / (b - a), 0, 1);
const rev = (lt: number, start: number, cps: number) => Math.max(0, Math.floor((lt - start) * cps));

const Ico = {
  spark: (s = 26, w = 1.7) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinejoin="round">
      <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
    </svg>
  ),
  layers: (s = 24, w = 1.7) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinejoin="round" strokeLinecap="round">
      <path d="M12 3l9 5-9 5-9-5z" /><path d="M3 12l9 5 9-5" /><path d="M3 16l9 5 9-5" />
    </svg>
  ),
  code: (s = 24, w = 1.7) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
    </svg>
  ),
  plug: (s = 24, w = 1.7) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="12" r="2" />
      <path d="M8 6h4a2 2 0 0 1 2 2v2M8 18h4a2 2 0 0 0 2-2v0" />
    </svg>
  ),
  shield: (s = 24, w = 1.7) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" /><path d="M9 12l2 2 4-4" />
    </svg>
  ),
  check: (s = 24, w = 2) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  ),
};

function Backdrop({ t }: { t: number }) {
  const shift = (t * 5) % 46;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: -60, backgroundImage: "radial-gradient(rgba(255,255,255,.05) 1px, transparent 1.7px)", backgroundSize: "46px 46px", transform: `translate(${-shift}px, ${-shift}px)` }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(80% 80% at 50% 118%, rgba(91,44,240,.16), transparent 60%), radial-gradient(60% 60% at 12% -10%, rgba(30,124,255,.12), transparent 55%)" }} />
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 300px 80px rgba(0,0,0,.62)" }} />
    </div>
  );
}

function Caption({ text, lt, appear = 0.6 }: { text: string; lt: number; appear?: number }) {
  const o = E.easeOutCubic(seg(lt, appear, appear + 0.6));
  const y = (1 - o) * 14;
  return (
    <div style={{ position: "absolute", bottom: 66, left: 0, right: 0, textAlign: "center", opacity: o, transform: `translateY(${y}px)` }}>
      <div style={{ fontFamily: SORA, fontWeight: 600, fontSize: 30, letterSpacing: "-0.02em", color: C.ink }}>{text}</div>
    </div>
  );
}

type Cam = (lt: number, d: number) => CSSProperties;
function SceneWrap({ t, start, end, cam, render }: { t: number; start: number; end: number; cam?: Cam; render: (lt: number) => ReactNode }) {
  if (t < start || t > end) return null;
  const localTime = t - start;
  const duration = end - start;
  const fi = 0.5, fo = 0.5;
  let op = 1;
  if (localTime < fi) op = E.easeOutCubic(clamp(localTime / fi, 0, 1));
  else if (localTime > duration - fo) op = 1 - E.easeInCubic(clamp((localTime - (duration - fo)) / fo, 0, 1));
  const c = cam ? cam(localTime, duration) : {};
  return <div style={{ position: "absolute", inset: 0, opacity: op, willChange: "transform, opacity", ...c }}>{render(localTime)}</div>;
}

const camZoom = (from: number, to: number, origin = "50% 50%"): Cam => (lt, d) => ({
  transform: `scale(${from + (to - from) * E.easeInOutSine(clamp(lt / d, 0, 1))})`,
  transformOrigin: origin,
});
const camPush = (fromS: number, toS: number, fromX: number, toX: number, origin = "50% 50%"): Cam => (lt, d) => {
  const p = E.easeInOutSine(clamp(lt / d, 0, 1));
  return { transform: `translateX(${fromX + (toX - fromX) * p}px) scale(${fromS + (toS - fromS) * p})`, transformOrigin: origin };
};

function Node({ x, y, w = 250, title, label, icon, color = C.cyan, hero, lt, appear = 0, dur = 0.65 }: {
  x: number; y: number; w?: number; title: string; label: string; icon: ReactNode; color?: string; hero?: boolean; lt: number; appear?: number; dur?: number;
}) {
  const p = E.easeOutBack(clamp((lt - appear) / dur, 0, 1));
  const op = clamp((lt - appear) / (dur * 0.5), 0, 1);
  const s = (hero ? 0.72 : 0.62) + (hero ? 0.28 : 0.38) * p;
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: w,
      transform: `translate(-50%,-50%) scale(${s})`, opacity: op,
      padding: "20px 22px", borderRadius: 20,
      background: hero ? "radial-gradient(130% 150% at 30% 0%, rgba(30,124,255,.30), rgba(9,14,28,.96))" : "rgba(255,255,255,.04)",
      border: hero ? "1px solid rgba(124,77,255,.6)" : `1px solid ${C.hair}`,
      boxShadow: hero ? "0 0 0 1px rgba(124,77,255,.25), 0 40px 90px -28px rgba(91,44,240,.95)" : "0 26px 60px -34px rgba(0,0,0,.85)",
      backdropFilter: "blur(3px)", overflow: "hidden",
    }}>
      {hero && <div style={{ position: "absolute", top: 0, left: 0, width: "32%", height: "100%", background: "linear-gradient(90deg,transparent,rgba(159,232,255,.22),transparent)", transform: `translateX(${(((lt * 0.5) % 1) * 420) - 60}px) skewX(-12deg)` }} />}
      <div style={{ position: "relative" }}>
        <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".16em", color: hero ? C.cyan2 : C.mut, marginBottom: 13 }}>{label}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
          <span style={{ color: hero ? "#fff" : color, display: "flex" }}>{icon}</span>
          <span style={{ fontFamily: MANROPE, fontSize: hero ? 22 : 19, fontWeight: hero ? 700 : 600, color: C.ink }}>{title}</span>
        </div>
        {hero && (
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 15 }}>
            <span style={{ width: 7, height: 7, borderRadius: 7, background: C.cyan, opacity: 0.4 + 0.6 * Math.abs(Math.sin(lt * 2.5)) }} />
            <span style={{ fontFamily: MONO, fontSize: 13, color: C.mut }}>coordenando o squad…</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Win({ x, y, w, h, title, tabs, children, op = 1, glow }: {
  x: number; y: number; w: number; h: number; title?: string; tabs?: string[]; children: ReactNode; op?: number; glow?: boolean;
}) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: w, height: h, opacity: op,
      borderRadius: 22, background: "linear-gradient(180deg, rgba(20,28,48,.92), rgba(9,14,28,.94))",
      border: `1px solid ${C.hair}`, boxShadow: `0 50px 120px -40px rgba(0,0,0,.9)${glow ? ", 0 0 0 1px rgba(124,77,255,.25), 0 40px 120px -30px rgba(91,44,240,.7)" : ""}`,
      overflow: "hidden", backdropFilter: "blur(3px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "15px 20px", borderBottom: `1px solid ${C.hair}` }}>
        <span style={{ width: 11, height: 11, borderRadius: 11, background: "rgba(255,255,255,.16)" }} />
        <span style={{ width: 11, height: 11, borderRadius: 11, background: "rgba(255,255,255,.16)" }} />
        <span style={{ width: 11, height: 11, borderRadius: 11, background: "rgba(255,255,255,.16)" }} />
        {tabs ? (
          <div style={{ display: "flex", gap: 6, marginLeft: 14 }}>
            {tabs.map((tb, i) => (
              <span key={i} style={{ fontFamily: MONO, fontSize: 13, padding: "5px 12px", borderRadius: 8, color: i === 0 ? C.ink : C.mut, background: i === 0 ? "rgba(255,255,255,.06)" : "transparent", border: i === 0 ? `1px solid ${C.hair}` : "1px solid transparent" }}>{tb}</span>
            ))}
          </div>
        ) : (
          <span style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".08em", color: C.mut, marginLeft: 10 }}>{title}</span>
        )}
      </div>
      <div style={{ position: "relative", height: "calc(100% - 52px)" }}>{children}</div>
    </div>
  );
}

function S1({ lt }: { lt: number }) {
  const full = "Construir um portal de pedidos com IA";
  const n = clamp(rev(lt, 0.7, 25), 0, full.length);
  const typed = full.slice(0, n);
  const caretOn = Math.sin(lt * 6) > 0;
  const eyeO = E.easeOutCubic(seg(lt, 0.2, 0.8));
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ opacity: eyeO, fontFamily: MONO, fontSize: 16, letterSpacing: ".34em", color: C.purple, textTransform: "uppercase", marginBottom: 34 }}>Você descreve o produto</div>
      <div style={{ width: 1180, background: "rgba(255,255,255,.04)", border: `1px solid ${C.hair}`, borderRadius: 20, padding: "30px 34px", boxShadow: "0 40px 100px -40px rgba(0,0,0,.85)", backdropFilter: "blur(3px)" }}>
        <div style={{ fontFamily: MONO, fontSize: 14, letterSpacing: ".14em", color: C.mut, marginBottom: 20 }}>BRIEFING</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <span style={{ fontFamily: MONO, fontSize: 40, color: C.cyan }}>›</span>
          <span style={{ fontFamily: SORA, fontWeight: 600, fontSize: 44, letterSpacing: "-0.02em", color: C.ink, lineHeight: 1.15 }}>
            {typed}<span style={{ display: "inline-block", width: 4, height: 44, marginLeft: 6, background: C.cyan, transform: "translateY(6px)", opacity: caretOn ? 1 : 0.15 }} />
          </span>
        </div>
        <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 11, opacity: E.easeOutCubic(seg(lt, 2.9, 3.5)) }}>
          <span style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${C.purple}`, borderTopColor: "transparent", display: "inline-block", transform: `rotate(${lt * 360}deg)` }} />
          <span style={{ fontFamily: MONO, fontSize: 15, color: C.mut }}>planejando a arquitetura…</span>
        </div>
      </div>
    </div>
  );
}

function Edge({ x1, y1, x2, y2, lt, delay, dur = 0.6, color = "rgba(255,255,255,.20)" }: {
  x1: number; y1: number; x2: number; y2: number; lt: number; delay: number; dur?: number; color?: string;
}) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const p = E.easeInOutCubic(clamp((lt - delay) / dur, 0, 1));
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" strokeLinecap="round" style={{ strokeDasharray: len, strokeDashoffset: len * (1 - p) }} />;
}
function Pulse({ x1, y1, x2, y2, lt, delay, period = 1.5, color = C.cyan }: {
  x1: number; y1: number; x2: number; y2: number; lt: number; delay: number; period?: number; color?: string;
}) {
  if (lt < delay) return null;
  const ph = ((lt - delay) % period) / period;
  const x = x1 + (x2 - x1) * ph, y = y1 + (y2 - y1) * ph;
  return <circle cx={x} cy={y} r="5" fill={color} style={{ opacity: Math.sin(ph * Math.PI), filter: `drop-shadow(0 0 7px ${color})` }} />;
}
function S2({ lt }: { lt: number }) {
  const cx = 960, cy = 512;
  const subs = [
    { x: 470, y: 300, t: "Arquitetura", ic: Ico.layers(24), col: C.cyan, ap: 1.0 },
    { x: 1450, y: 300, t: "Código", ic: Ico.code(24), col: C.purple, ap: 1.5 },
    { x: 470, y: 760, t: "Integrações", ic: Ico.plug(24), col: C.cyan, ap: 2.0 },
    { x: 1450, y: 760, t: "QA & Testes", ic: Ico.shield(24), col: C.green, ap: 2.5 },
  ];
  const rings = [0, 0.75, 1.5].map((o) => {
    const ph = ((lt + o) % 2.2) / 2.2;
    return { r: 70 + ph * 140, op: (1 - ph) * 0.5 };
  });
  return (
    <>
      <svg width="1920" height="1024" style={{ position: "absolute", inset: 0 }}>
        {subs.map((s, i) => <Edge key={i} x1={cx} y1={cy} x2={s.x} y2={s.y} lt={lt} delay={s.ap - 0.15} />)}
        {rings.map((r, i) => <circle key={"r" + i} cx={cx} cy={cy} r={r.r} fill="none" stroke={i % 2 ? C.purple : C.cyan} strokeWidth="1.5" style={{ opacity: r.op }} />)}
        {subs.map((s, i) => <Pulse key={"p" + i} x1={cx} y1={cy} x2={s.x} y2={s.y} lt={lt} delay={s.ap + 0.55} color={s.col} />)}
      </svg>
      <Node x={cx} y={cy} w={300} hero title="Bu1lder IA" label="ORQUESTRADOR" icon={Ico.spark(30)} lt={lt} appear={0.1} dur={0.7} />
      {subs.map((s, i) => <Node key={i} x={s.x} y={s.y} w={252} title={s.t} label="AGENTE" icon={s.ic} color={s.col} lt={lt} appear={s.ap} />)}
      <Caption text="Um squad de agentes constrói o software" lt={lt} appear={1.1} />
    </>
  );
}

type Seg = { t: string; c: string };
function CodeLine({ segs, i, start, per, cps, lt }: { segs: Seg[]; i: number; start: number; per: number; cps: number; lt: number }) {
  const s = start + i * per;
  if (lt < s) return <div style={{ height: 33 }} />;
  const total = segs.reduce((a, x) => a + x.t.length, 0);
  const n = rev(lt, s, cps);
  const active = n < total;
  let rem = n;
  const spans = segs.map((sg, j) => {
    const take = clamp(rem, 0, sg.t.length);
    const txt = sg.t.slice(0, take);
    rem -= sg.t.length;
    return <span key={j} style={{ color: sg.c }}>{txt}</span>;
  });
  return (
    <div style={{ whiteSpace: "pre", height: 33 }}>
      <span style={{ color: "rgba(255,255,255,.2)", marginRight: 16 }}>{String(i + 1).padStart(2, "0")}</span>
      {spans}{active && <span style={{ color: C.cyan }}>▍</span>}
    </div>
  );
}
function S3({ lt }: { lt: number }) {
  const lines: Seg[][] = [
    [{ t: "// agente · gerando o produto", c: K.mut }],
    [{ t: "export ", c: K.kw }, { t: "const ", c: K.kw }, { t: "app", c: K.ink }, { t: " = ", c: K.ink }, { t: "miind", c: K.fn }, { t: ".build({", c: K.ink }],
    [{ t: "  ui: ", c: K.ink }, { t: "dashboard", c: K.fn }, { t: "({ theme: ", c: K.ink }, { t: "'dark'", c: K.str }, { t: " }),", c: K.ink }],
    [{ t: "  data: ", c: K.ink }, { t: "connect", c: K.fn }, { t: "([", c: K.ink }, { t: "'postgres'", c: K.str }, { t: ", ", c: K.ink }, { t: "'stripe'", c: K.str }, { t: "]),", c: K.ink }],
    [{ t: "  agents: [ ", c: K.ink }, { t: "triagem", c: K.fn }, { t: ", ", c: K.ink }, { t: "resolver", c: K.fn }, { t: ", ", c: K.ink }, { t: "relatorio", c: K.fn }, { t: " ],", c: K.ink }],
    [{ t: "})", c: K.ink }],
    [{ t: "deploy", c: K.fn }, { t: "(app) ", c: K.ink }, { t: "// produção", c: K.mut }],
  ];
  const start = 0.7, per = 0.5, cps = 54;
  const winO = E.easeOutCubic(seg(lt, 0, 0.5));
  const b = (a: number) => E.easeOutCubic(seg(lt, a, a + 0.55));
  const term = [
    { t: "✓ 214 componentes gerados", c: C.green },
    { t: "✓ testes  128 / 128", c: C.green },
    { t: "✓ bundle · 1.2s", c: C.green },
    { t: "→ deploy em produção", c: C.cyan2 },
  ];
  const chart = "M20,150 L86,132 L152,140 L218,104 L284,116 L350,72 L416,84 L482,44 L540,22";
  const chartLen = 640;
  const chartP = E.easeOutCubic(seg(lt, 3.4, 4.9));
  return (
    <>
      <Win x={140} y={196} w={800} h={648} tabs={["app.ts", "workflow.ts"]} op={winO}>
        <div style={{ height: "68%", padding: "22px 26px", fontFamily: MONO, fontSize: 20, lineHeight: 1.65, borderBottom: `1px solid ${C.hair}` }}>
          {lines.map((ln, i) => <CodeLine key={i} segs={ln} i={i} start={start} per={per} cps={cps} lt={lt} />)}
        </div>
        <div style={{ height: "32%", padding: "16px 26px", fontFamily: MONO, fontSize: 15, lineHeight: 1.75, background: "rgba(0,0,0,.25)" }}>
          <div style={{ color: C.mut, opacity: b(3.0) }}><span style={{ color: C.cyan }}>$</span> miind build --prod</div>
          {term.map((tl, i) => <div key={i} style={{ color: tl.c, opacity: b(3.5 + i * 0.4) }}>{tl.t}</div>)}
        </div>
      </Win>
      <Win x={980} y={196} w={800} h={648} title="app.miind.com.br" op={winO} glow>
        <div style={{ position: "absolute", inset: 0, padding: 26 }}>
          <div style={{ opacity: b(1.0), transform: `translateY(${(1 - b(1.0)) * 12}px)`, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 24, color: "#fff" }}>Pedidos</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(61,214,140,.14)", border: "1px solid rgba(61,214,140,.4)", padding: "6px 12px", borderRadius: 999 }}>
              <span style={{ width: 7, height: 7, borderRadius: 7, background: C.green }} /><span style={{ fontFamily: MONO, fontSize: 12, color: "#8EEBBF", letterSpacing: ".1em" }}>ONLINE</span>
            </div>
          </div>
          <div style={{ opacity: b(1.6), transform: `translateY(${(1 - b(1.6)) * 12}px)`, display: "flex", gap: 14, marginBottom: 18 }}>
            {[["PEDIDOS", "1.284"], ["RECEITA", "R$ 82k"], ["CONVERSÃO", "4.7%"]].map(([k, v], i) => (
              <div key={i} style={{ flex: 1, background: "rgba(255,255,255,.04)", border: `1px solid ${C.hair}`, borderRadius: 14, padding: "14px 16px" }}>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".1em", color: C.mut }}>{k}</div>
                <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 26, color: "#fff", marginTop: 4 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ opacity: b(2.3), background: "rgba(255,255,255,.03)", border: `1px solid ${C.hair}`, borderRadius: 14, padding: 16, marginBottom: 16 }}>
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".1em", color: C.mut, marginBottom: 6 }}>RECEITA · 30D</div>
            <svg width="100%" height="120" viewBox="0 0 560 150">
              <defs><linearGradient id="s3g" x1="0" x2="1"><stop offset="0" stopColor={C.blue} /><stop offset="1" stopColor={C.purple} /></linearGradient></defs>
              <path d={chart} fill="none" stroke="url(#s3g)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: chartLen, strokeDashoffset: chartLen * (1 - chartP) }} />
            </svg>
          </div>
          <div style={{ opacity: b(3.0), display: "flex", flexDirection: "column", gap: 9 }}>
            {([["#1042", "Ana Souza", "Pago", C.green], ["#1041", "Léo Martins", "Processando", C.cyan]] as const).map(([id, nm, st, cl], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.03)" }}>
                <span style={{ fontFamily: MONO, fontSize: 14, color: C.mut, width: 54 }}>{id}</span>
                <span style={{ fontFamily: MANROPE, fontSize: 15, color: C.ink, flex: 1 }}>{nm}</span>
                <span style={{ fontFamily: MONO, fontSize: 12, color: cl, background: "rgba(255,255,255,.05)", border: `1px solid ${C.hair}`, padding: "4px 10px", borderRadius: 999 }}>{st}</span>
              </div>
            ))}
          </div>
        </div>
      </Win>
      <Caption text="Arquiteta, escreve o código e conecta os dados" lt={lt} appear={0.8} />
    </>
  );
}

function Metric({ k, sub, target, lt, start, dp = 0, suffix = "", prefix = "", fmt }: {
  k: string; sub: string; target: number; lt: number; start: number; dp?: number; suffix?: string; prefix?: string; fmt?: "k";
}) {
  const p = E.easeOutCubic(seg(lt, start, start + 1.3));
  const v = target * p;
  let val: string;
  if (fmt === "k") val = (v / 1000).toFixed(1) + "k";
  else if (dp) val = v.toFixed(dp);
  else val = Math.round(v).toLocaleString("pt-BR");
  return (
    <div style={{ flex: 1, background: "rgba(255,255,255,.04)", border: `1px solid ${C.hair}`, borderRadius: 16, padding: "20px 22px" }}>
      <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".12em", color: C.mut }}>{k}</div>
      <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 44, letterSpacing: "-0.02em", color: "#fff", marginTop: 6 }}>{prefix}{val}{suffix}</div>
      <div style={{ fontFamily: MANROPE, fontSize: 14, color: C.mut, marginTop: 2 }}>{sub}</div>
    </div>
  );
}
function S4({ lt }: { lt: number }) {
  const winO = E.easeOutCubic(seg(lt, 0, 0.5));
  const bars = [0.42, 0.55, 0.5, 0.68, 0.62, 0.8, 0.74, 0.9, 0.85, 0.97];
  const barsP = E.easeOutCubic(seg(lt, 1.2, 2.6));
  const services = [
    { n: "API Gateway", s: "operacional", c: C.green, at: 2.2 },
    { n: "Pagamentos · Stripe", s: "operacional", c: C.green, at: 2.55 },
    { n: "Agentes de IA", s: "operacional", c: C.green, at: 2.9 },
    { n: "Deploy #418", s: "em produção", c: C.cyan, at: 3.25 },
  ];
  return (
    <>
      <Win x={300} y={144} w={1320} h={732} title="miind · software em produção" op={winO} glow>
        <div style={{ position: "absolute", inset: 0, padding: 34, display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 30, color: "#fff" }}>Portal de pedidos · produção</div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, background: "rgba(91,204,255,.12)", border: "1px solid rgba(91,204,255,.34)", padding: "8px 15px", borderRadius: 999 }}>
              <span style={{ width: 8, height: 8, borderRadius: 8, background: C.cyan, boxShadow: `0 0 12px ${C.cyan}`, opacity: 0.5 + 0.5 * Math.sin(lt * 4) }} />
              <span style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".2em", color: C.cyan2 }}>LIVE</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 18 }}>
            <Metric k="UPTIME" sub="últimos 90 dias" target={99.9} dp={1} suffix="%" lt={lt} start={0.8} />
            <Metric k="LATÊNCIA p95" sub="resposta da API" target={82} suffix=" ms" lt={lt} start={1.1} />
            <Metric k="USUÁRIOS ATIVOS" sub="em tempo real" target={12400} fmt="k" lt={lt} start={1.4} />
          </div>
          <div style={{ flex: 1, display: "flex", gap: 18 }}>
            <div style={{ flex: 1.4, background: "rgba(255,255,255,.03)", border: `1px solid ${C.hair}`, borderRadius: 16, padding: 22, display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".12em", color: C.mut, marginBottom: 4 }}>REQUESTS · 24H</div>
              <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 12, paddingTop: 16 }}>
                {bars.map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h * barsP * 100}%`, minHeight: 4, borderRadius: 6, background: i % 3 === 2 ? "linear-gradient(#7C4DFF,#5B2CF0)" : "linear-gradient(#5BCCFF,#1E7CFF)" }} />
                ))}
              </div>
            </div>
            <div style={{ flex: 1, background: "rgba(255,255,255,.03)", border: `1px solid ${C.hair}`, borderRadius: 16, padding: 22, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".12em", color: C.mut }}>SERVIÇOS · SAÚDE</div>
              {services.map((sv, i) => {
                const on = lt > sv.at;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 15px", borderRadius: 12, background: on ? (sv.c === C.green ? "rgba(61,214,140,.12)" : "rgba(91,204,255,.12)") : "rgba(255,255,255,.03)" }}>
                    <span style={{ fontFamily: MANROPE, fontSize: 15, color: C.ink }}>{sv.n}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: MONO, fontSize: 12, color: on ? sv.c : C.mut }}>
                      <span style={{ width: 7, height: 7, borderRadius: 7, background: on ? sv.c : C.mut }} />{on ? sv.s : "…"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Win>
      <Caption text="No ar — em produção, escalando sozinho" lt={lt} appear={0.9} />
    </>
  );
}

function S5({ lt }: { lt: number }) {
  const checkP = E.easeOutBack(seg(lt, 0.1, 0.9));
  const ringP = seg(lt, 0.2, 1.4);
  const stats = [
    { v: "5–10×", s: "na entrega de produtos digitais", ap: 1.0 },
    { v: "6 sem", s: "do briefing à produção", ap: 1.35 },
    { v: "94%", s: "eval score dos agentes", ap: 1.7 },
  ];
  const endO = E.easeOutCubic(seg(lt, 2.9, 3.7));
  const statsFade = 1 - E.easeInCubic(seg(lt, 2.9, 3.6));
  const statsY = -E.easeInCubic(seg(lt, 2.9, 3.7)) * 40;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: statsFade, transform: `translateY(${statsY}px)` }}>
        <div style={{ position: "relative", width: 130, height: 130, marginBottom: 46 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `2px solid ${C.green}`, transform: `scale(${1 + ringP * 1.4})`, opacity: (1 - ringP) * 0.7 }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(61,214,140,.16)", border: `2px solid ${C.green}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${clamp(checkP, 0, 1.15)})`, color: C.green }}>
            {Ico.check(64, 3)}
          </div>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 15, letterSpacing: ".28em", color: C.mut, textTransform: "uppercase", marginBottom: 30, opacity: E.easeOutCubic(seg(lt, 0.6, 1.1)) }}>Enviado para produção</div>
        <div style={{ display: "flex", gap: 60 }}>
          {stats.map((st, i) => {
            const o = E.easeOutBack(seg(lt, st.ap, st.ap + 0.6));
            return (
              <div key={i} style={{ textAlign: "center", opacity: clamp(o, 0, 1), transform: `translateY(${(1 - clamp(o, 0, 1)) * 18}px)` }}>
                <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 82, letterSpacing: "-0.03em", background: C.spine, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{st.v}</div>
                <div style={{ fontFamily: MANROPE, fontSize: 18, color: C.mut, marginTop: 6, maxWidth: 230 }}>{st.s}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: endO, transform: `scale(${0.98 + 0.02 * endO})` }}>
        <Wordmark height={96} />
        <div style={{ fontFamily: SORA, fontWeight: 600, fontSize: 32, letterSpacing: "-0.02em", color: C.ink, marginTop: 18 }}>Você descreve. Os agentes constroem seu software.</div>
        <div style={{ marginTop: 26, width: 220, height: 3, borderRadius: 3, background: C.spine }} />
      </div>
    </>
  );
}

export default function MiindBuildAnimation({ className, style }: { className?: string; style?: CSSProperties }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 1920, h: 1080 });
  const [t, setT] = useState(0);
  const DUR = 24;

  useEffect(() => {
    let raf = 0;
    let start = 0;
    const loop = (now: number) => {
      if (!start) start = now;
      setT(((now - start) / 1000) % DUR);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const STAGE_W = 1920;
  const STAGE_H = 1080;
  const scale = Math.min(size.w / STAGE_W, size.h / STAGE_H) || 1;
  const offsetX = (size.w - STAGE_W * scale) / 2;
  const offsetY = (size.h - STAGE_H * scale) / 2;

  return (
    <div ref={wrapRef} className={className} style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: 16, background: C.bg, ...style }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: STAGE_W, height: STAGE_H, transformOrigin: "top left", transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})` }}>
        <Backdrop t={t} />
        <SceneWrap t={t} start={0} end={4.6} cam={camZoom(1.05, 1.0)} render={(lt) => <S1 lt={lt} />} />
        <SceneWrap t={t} start={4.2} end={9.4} cam={camZoom(1.2, 1.0)} render={(lt) => <S2 lt={lt} />} />
        <SceneWrap t={t} start={9.0} end={15.0} cam={camPush(1.0, 1.045, -22, 0)} render={(lt) => <S3 lt={lt} />} />
        <SceneWrap t={t} start={14.6} end={19.4} cam={camZoom(1.02, 1.08)} render={(lt) => <S4 lt={lt} />} />
        <SceneWrap t={t} start={19.0} end={24.0} cam={camZoom(1.04, 1.0)} render={(lt) => <S5 lt={lt} />} />
      </div>
    </div>
  );
}
