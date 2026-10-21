import type { LucideIcon } from "lucide-react";
import { Reveal } from "./useInView";

export type StatItem = {
  icon: LucideIcon;
  value: string;
  label: string;
  tone?: "cyan" | "mint" | "violet";
};

const TONES = {
  cyan: "from-brand-cyan/20 to-brand-cyan/5 text-brand-cyan border-brand-cyan/25",
  mint: "from-brand-mint/20 to-brand-mint/5 text-brand-mint border-brand-mint/25",
  violet: "from-brand-violet/20 to-brand-violet/5 text-brand-violet border-brand-violet/25",
} as const;

export function StatBand({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map((s, i) => {
        const Icon = s.icon;
        const tone = TONES[s.tone ?? "cyan"];
        return (
          <Reveal key={s.label} delay={i * 90}>
            <div className="surface-card flex items-center gap-4 p-5">
              <div
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border bg-gradient-to-br ${tone}`}
              >
                <Icon className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold tabular-nums text-foreground leading-tight">
                  {s.value}
                </p>
                <p className="text-xs text-muted-foreground leading-snug mt-0.5">{s.label}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
