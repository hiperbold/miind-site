import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { niches } from "@/data/niches";

export function SegmentNav({ activeSlug }: { activeSlug?: string }) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const activeRef = useRef<HTMLLIElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateAffordance = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateAffordance();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateAffordance, { passive: true });
    window.addEventListener("resize", updateAffordance);
    // Center active pill on mount
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ inline: "center", block: "nearest" });
    }
    return () => {
      el.removeEventListener("scroll", updateAffordance);
      window.removeEventListener("resize", updateAffordance);
    };
  }, [updateAffordance, activeSlug]);

  const scrollBy = (delta: number) => {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Segmentos Bu1lder"
      className="sticky top-14 z-30 backdrop-blur-xl bg-background/75 border-b border-border/80"
    >
      <div className="container-editorial relative">
        {/* Edge fades */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 left-0 w-12 z-10 bg-gradient-to-r from-background to-transparent transition-opacity duration-300 ${
            canLeft ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 right-0 w-12 z-10 bg-gradient-to-l from-background to-transparent transition-opacity duration-300 ${
            canRight ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Chevrons (desktop) */}
        <button
          type="button"
          aria-label="Rolar segmentos para a esquerda"
          onClick={() => scrollBy(-280)}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden md:grid place-items-center h-8 w-8 rounded-full bg-background/90 border border-border text-foreground/80 hover:text-foreground hover:border-brand-cyan/50 shadow-md transition-all ${
            canLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Rolar segmentos para a direita"
          onClick={() => scrollBy(280)}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:grid place-items-center h-8 w-8 rounded-full bg-background/90 border border-border text-foreground/80 hover:text-foreground hover:border-brand-cyan/50 shadow-md transition-all ${
            canRight ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronRight className="size-4" />
        </button>

        <ul
          ref={scrollerRef}
          className="flex gap-2 overflow-x-auto py-3 scrollbar-none scroll-smooth snap-x"
          style={{ scrollPaddingInline: "2rem" }}
        >
          {niches.map((n) => {
            const active = n.slug === activeSlug;
            return (
              <li
                key={n.slug}
                ref={active ? activeRef : undefined}
                className="shrink-0 snap-start"
              >
                <Link
                  to="/bu1lders/$slug"
                  params={{ slug: n.slug }}
                  className={`inline-flex items-center rounded-full text-[11px] sm:text-sm px-3 sm:px-4 h-8 sm:h-9 whitespace-nowrap transition-all ${
                    active
                      ? "bg-gradient-to-r from-brand-cyan/25 via-brand-blue/20 to-brand-violet/25 text-foreground border border-brand-cyan/40 shadow-[0_6px_22px_-8px_oklch(0.65_0.22_295/0.55)]"
                      : "glass text-muted-foreground hover:text-foreground hover:border-brand-cyan/30"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {shortName(n.name)}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

function shortName(name: string) {
  return name.split(/[,·]| e /)[0].trim();
}
