import { useEffect, useState } from 'react';

/**
 * IntersectionObserver scroll-spy. Returns the id of the section currently
 * dominating the viewport (closest to the top half).
 */
export function useActiveSection(ids: string[], offset = 0.35): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !ids.length) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const visibility = new Map<string, number>();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          visibility.set(e.target.id, e.intersectionRatio);
        });
        let best: { id: string; ratio: number } | null = null;
        visibility.forEach((ratio, id) => {
          if (!best || ratio > best.ratio) best = { id, ratio };
        });
        if (best && best.ratio > 0.01) setActive(best.id);
      },
      {
        rootMargin: `-${Math.round(offset * 100)}% 0px -${Math.round((1 - offset - 0.15) * 100)}% 0px`,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids.join(','), offset]);

  return active;
}
