import { Reveal } from "./useInView";

export type TimelineStep = {
  day: string;
  title: string;
  desc?: string;
};

export function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="relative">
      {/* gradient connector — desktop */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet opacity-60 md:block"
      />
      <ol className="grid gap-6 md:grid-cols-5 md:gap-3">
        {steps.map((s, i) => (
          <Reveal key={s.day} delay={i * 90}>
            <li className="relative flex gap-4 md:block">
              <div className="relative shrink-0">
                <div className="grid h-12 w-12 place-items-center rounded-full border border-brand-cyan/30 bg-background text-sm font-bold tabular-nums text-brand-cyan shadow-[0_0_24px_-6px_oklch(0.82_0.14_210/0.6)]">
                  {i + 1}
                </div>
              </div>
              <div className="min-w-0 md:mt-4">
                <p className="eyebrow text-brand-violet">{s.day}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{s.title}</p>
                {s.desc && (
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                )}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
