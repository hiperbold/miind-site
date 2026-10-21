import { RefObject, useEffect, useState } from 'react';

/** Returns whether `ref` is intersecting the viewport. */
export function useInViewport<T extends Element>(ref: RefObject<T>, rootMargin = '200px'): boolean {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(e.isIntersecting)),
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, rootMargin]);
  return visible;
}
