import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import type { Niche } from "@/data/niches";

export function NicheCard({ niche }: { niche: Niche }) {
  const Icon = ((Icons as unknown as Record<string, LucideIcon>)[niche.icon] ??
    Icons.Sparkles) as LucideIcon;
  return (
    <Link
      to="/bu1lders/$slug"
      params={{ slug: niche.slug }}
      className="surface-card group relative flex flex-col h-full p-4 sm:p-5"
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
        <span className="grid place-items-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan shrink-0">
          <Icon className="size-5" />
        </span>
        <span className="hidden sm:inline text-[10px] tracking-[0.2em] uppercase text-muted-foreground tabular-nums truncate">
          {niche.marketStat}
        </span>
      </div>
      <h3 className="text-foreground font-semibold text-sm sm:text-base leading-tight mb-1.5 sm:mb-2">
        {shortName(niche.name)}
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
        {niche.argument}
      </p>
      <span className="mt-3 sm:mt-4 inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-brand-cyan group-hover:gap-2 transition-all">
        <span className="hidden sm:inline">Ver soluções</span>
        <span className="sm:hidden">Ver</span>
        <ArrowRight className="size-4" />
      </span>
    </Link>
  );
}

function shortName(name: string) {
  return name.split(/,/)[0].trim();
}
