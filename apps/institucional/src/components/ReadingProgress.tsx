import { useEffect, useState } from 'react';

/** 1px reading-progress bar pinned to the top of the viewport. */
const ReadingProgress = () => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.min(1, scrolled / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-px pointer-events-none"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet transition-[transform] duration-150 ease-out"
        style={{ transform: `scaleX(${pct})` }}
      />
    </div>
  );
};

export default ReadingProgress;
