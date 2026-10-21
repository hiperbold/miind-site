"use client";

import { useEffect, useReducer, useRef, useSyncExternalStore } from "react";
import { CheckCheck, Mic, Plus, Signal, Wifi, BatteryMedium } from "lucide-react";

export type ChatMessage = {
  from: "cliente" | "negocio";
  text: string;
  time?: string;
};

export function PhoneMockup({
  title = "Salão Bella",
  subtitle = "online · IA Bu1lder",
  messages,
}: {
  title?: string;
  subtitle?: string;
  messages: ChatMessage[];
}) {
  return (
    <div
      className="relative mx-auto w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px]"
      aria-label="Demonstração de conversa no WhatsApp"
    >
      {/* Ambient glow — two layered auroras */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 -z-10 rounded-[3rem] bg-gradient-to-br from-brand-cyan/30 via-brand-blue/20 to-brand-violet/30 blur-3xl opacity-80 aurora-drift"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-tr from-brand-violet/25 via-transparent to-brand-cyan/25 blur-2xl opacity-70 aurora-drift"
        style={{ animationDelay: "-6s" }}
      />

      {/* Side buttons */}
      <span
        aria-hidden
        className="absolute -left-[3px] top-[18%] h-10 w-[3px] rounded-l-md bg-gradient-to-b from-foreground/30 via-foreground/15 to-foreground/30"
      />
      <span
        aria-hidden
        className="absolute -left-[3px] top-[30%] h-16 w-[3px] rounded-l-md bg-gradient-to-b from-foreground/30 via-foreground/15 to-foreground/30"
      />
      <span
        aria-hidden
        className="absolute -right-[3px] top-[25%] h-20 w-[3px] rounded-r-md bg-gradient-to-b from-foreground/30 via-foreground/15 to-foreground/30"
      />

      {/* Bezel */}
      <div className="relative rounded-[2.6rem] border border-foreground/15 bg-gradient-to-b from-foreground/[0.12] via-foreground/[0.04] to-foreground/[0.12] p-[10px] shadow-[0_50px_100px_-30px_oklch(0.13_0.025_265/0.9),inset_0_1px_0_oklch(1_0_0/0.1)] backdrop-blur-xl">
        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2rem] bg-background">
          {/* Specular reflection */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-30 mix-blend-overlay opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(135deg, oklch(1 0 0 / 0.18) 0%, transparent 32%, transparent 68%, oklch(1 0 0 / 0.08) 100%)",
            }}
          />

          {/* Status bar */}
          <div className="relative z-10 flex items-center justify-between bg-gradient-to-r from-brand-cyan/15 via-brand-blue/10 to-brand-violet/15 px-5 pt-2 pb-1 text-[10px] font-semibold text-foreground/70">
            <span className="tabular-nums">9:41</span>
            <div className="absolute left-1/2 top-1 h-5 w-24 -translate-x-1/2 rounded-full bg-background/95" />
            <div className="flex items-center gap-1">
              <Signal className="size-2.5" />
              <Wifi className="size-2.5" />
              <BatteryMedium className="size-3" />
            </div>
          </div>

          {/* Chat header */}
          <ChatHeader title={title} subtitle={subtitle} />

          {/* Chat body */}
          <AnimatedChat messages={messages} />

          {/* Input */}
          <div className="relative z-10 flex items-center gap-2 border-t border-foreground/10 bg-foreground/[0.03] px-3 py-2.5">
            <button
              type="button"
              tabIndex={-1}
              aria-hidden
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground"
            >
              <Plus className="size-4" />
            </button>
            <div className="flex h-9 flex-1 items-center rounded-full bg-foreground/[0.06] px-3 text-[11px] text-muted-foreground/60">
              Mensagem
            </div>
            <button
              type="button"
              tabIndex={-1}
              aria-hidden
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-cyan to-brand-blue text-background shadow-[0_8px_20px_-6px_oklch(0.82_0.14_210/0.6)]"
            >
              <Mic className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatHeader({
  title,
  subtitle,
  typing,
}: {
  title: string;
  subtitle: string;
  typing?: boolean;
}) {
  return (
    <div className="relative z-10 flex items-center gap-3 border-b border-foreground/10 bg-gradient-to-r from-brand-cyan/12 via-brand-blue/8 to-brand-violet/12 px-4 py-3">
      <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-violet text-[12px] font-bold text-background shadow-[0_8px_20px_-6px_oklch(0.65_0.22_295/0.6)]">
        {title.slice(0, 2).toUpperCase()}
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-brand-mint" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{title}</p>
        <p className="truncate text-[11px] text-brand-mint">
          {typing ? "digitando…" : subtitle}
        </p>
      </div>
    </div>
  );
}

type AnimState = {
  visible: number; // number of bubbles shown
  typingFrom: "cliente" | "negocio" | null;
};

function reducer(state: AnimState, action: { type: "type"; from: "cliente" | "negocio" } | { type: "show" } | { type: "reset" }): AnimState {
  switch (action.type) {
    case "type":
      return { ...state, typingFrom: action.from };
    case "show":
      return { visible: state.visible + 1, typingFrom: null };
    case "reset":
      return { visible: 0, typingFrom: null };
  }
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener?.("change", onChange);
  return () => mq.removeEventListener?.("change", onChange);
}

// No servidor e na hidratação vale false, como no estado inicial do original.
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

function AnimatedChat({ messages }: { messages: ChatMessage[] }) {
  const [state, dispatch] = useReducer(reducer, { visible: 0, typingFrom: null });
  const reduced = usePrefersReducedMotion();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduced) return;
    const timers: number[] = [];
    let cancelled = false;

    function schedule(step: number) {
      if (cancelled) return;
      if (step >= messages.length) {
        // restart after a pause
        timers.push(
          window.setTimeout(() => {
            if (cancelled) return;
            dispatch({ type: "reset" });
            schedule(0);
          }, 3200),
        );
        return;
      }
      const msg = messages[step];
      const typingDelay = msg.from === "negocio" ? 950 : 700;
      dispatch({ type: "type", from: msg.from });
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          dispatch({ type: "show" });
          timers.push(
            window.setTimeout(() => {
              schedule(step + 1);
            }, 750),
          );
        }, typingDelay),
      );
    }

    const start = window.setTimeout(() => schedule(0), 400);
    timers.push(start);

    return () => {
      cancelled = true;
      timers.forEach((t) => clearTimeout(t));
    };
  }, [messages, reduced]);

  // Auto-scroll to bottom on new bubble
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [state.visible, state.typingFrom]);

  const shown = reduced ? messages : messages.slice(0, state.visible);

  return (
    <div
      ref={scrollRef}
      className="relative h-[260px] sm:h-[320px] overflow-hidden px-3 py-3 space-y-2"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 0%, oklch(0.65 0.22 295 / 0.08), transparent 55%), radial-gradient(circle at 80% 100%, oklch(0.82 0.14 210 / 0.06), transparent 55%)",
      }}
    >
      {shown.map((m, i) => (
        <Bubble key={`${i}-${m.text.slice(0, 6)}`} {...m} />
      ))}
      {!reduced && state.typingFrom && (
        <TypingBubble from={state.typingFrom} />
      )}
    </div>
  );
}

function Bubble({ from, text, time }: ChatMessage) {
  const isClient = from === "cliente";
  return (
    <div
      className={`flex ${isClient ? "justify-start" : "justify-end"}`}
      style={{
        animation: `${isClient ? "bubble-in-left" : "bubble-in-right"} 0.42s cubic-bezier(0.22, 1, 0.36, 1) both`,
      }}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-[13px] leading-snug shadow-[0_2px_8px_-2px_oklch(0_0_0/0.15)] ${
          isClient
            ? "rounded-bl-md border border-foreground/8 bg-foreground/[0.07] text-foreground"
            : "rounded-br-md bg-gradient-to-br from-brand-cyan to-brand-blue text-background"
        }`}
      >
        <p>{text}</p>
        <p
          className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
            isClient ? "text-muted-foreground" : "text-background/85"
          }`}
        >
          {time ?? "agora"}
          {!isClient && <CheckCheck className="size-3" />}
        </p>
      </div>
    </div>
  );
}

function TypingBubble({ from }: { from: "cliente" | "negocio" }) {
  const isClient = from === "cliente";
  return (
    <div
      className={`flex ${isClient ? "justify-start" : "justify-end"}`}
      style={{
        animation: `${isClient ? "bubble-in-left" : "bubble-in-right"} 0.32s cubic-bezier(0.22, 1, 0.36, 1) both`,
      }}
    >
      <div
        className={`rounded-2xl px-3 py-2.5 ${
          isClient
            ? "rounded-bl-md border border-foreground/8 bg-foreground/[0.07]"
            : "rounded-br-md bg-gradient-to-br from-brand-cyan/90 to-brand-blue/90"
        }`}
      >
        <div className="flex gap-1">
          <Dot delay={0} dark={!isClient} />
          <Dot delay={160} dark={!isClient} />
          <Dot delay={320} dark={!isClient} />
        </div>
      </div>
    </div>
  );
}

function Dot({ delay, dark }: { delay: number; dark?: boolean }) {
  return (
    <span
      className={`block h-1.5 w-1.5 rounded-full ${dark ? "bg-background/80" : "bg-muted-foreground/70"}`}
      style={{
        animation: "float-y 1.1s ease-in-out infinite",
        animationDelay: `${delay}ms`,
      }}
    />
  );
}

