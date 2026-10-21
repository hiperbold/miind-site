import { XCircle, CheckCircle2, Quote } from "lucide-react";
import { Reveal } from "./useInView";

export type BAItem = { label: string; value: string };

export function BeforeAfter({
  before,
  after,
  delta,
  quote,
  author,
}: {
  before: { headline: string; items: BAItem[] };
  after: { headline: string; items: BAItem[] };
  delta: string;
  quote?: string;
  author?: string;
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Reveal>
          <div className="surface-card p-6 h-full">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-muted/40 text-muted-foreground border border-foreground/10">
                <XCircle className="size-5" />
              </span>
              <p className="text-sm font-semibold text-muted-foreground">Antes</p>
            </div>
            <p className="mt-4 text-lg font-semibold text-foreground/90 leading-snug">
              {before.headline}
            </p>
            <ul className="mt-4 space-y-2">
              {before.items.map((it) => (
                <li key={it.label} className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">{it.label}</span>
                  <span className="font-semibold tabular-nums text-foreground/70">{it.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="surface-card surface-card-feature p-6 h-full relative overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-brand-mint/25 blur-3xl"
            />
            <div className="relative flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-mint/30 to-brand-cyan/20 text-brand-mint border border-brand-mint/30">
                <CheckCircle2 className="size-5" />
              </span>
              <p className="text-sm font-semibold text-brand-mint">Depois</p>
            </div>
            <p className="relative mt-4 text-lg font-semibold text-foreground leading-snug">
              {after.headline}
            </p>
            <ul className="relative mt-4 space-y-2">
              {after.items.map((it) => (
                <li key={it.label} className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">{it.label}</span>
                  <span className="font-semibold tabular-nums text-money">{it.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <div className="surface-card p-6 sm:p-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-cyan to-brand-blue text-background">
              <Quote className="size-5" />
            </span>
            {quote && (
              <div className="min-w-0">
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed italic">
                  "{quote}"
                </p>
                {author && (
                  <p className="mt-1 text-xs eyebrow text-brand-violet">— {author}</p>
                )}
              </div>
            )}
          </div>
          <div className="shrink-0 rounded-xl border border-brand-mint/30 bg-brand-mint/10 px-4 py-3 text-center">
            <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-brand-mint">
              Delta
            </p>
            <p className="text-xl font-bold text-money tabular-nums">{delta}</p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
