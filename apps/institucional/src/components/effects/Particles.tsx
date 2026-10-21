import { useEffect, useRef } from 'react';

interface Props {
  quantity?: number;
  className?: string;
  /** Optional override. Defaults to brand cyan via oklch. */
  color?: string;
}

/**
 * Lightweight particle canvas. Pauses rAF when offscreen or when the user
 * prefers reduced motion. Color follows the brand token by default.
 */
const Particles = ({ quantity = 60, className = '', color }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let raf = 0;
    let running = false;
    let particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      particles = Array.from({ length: quantity }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.5 + 0.2,
      }));
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        // Use brand cyan via oklch — supported in modern canvas (Chromium 111+, Safari 16.4+, Firefox 113+).
        // Falls back gracefully because invalid styles are ignored.
        ctx.fillStyle = color ?? `oklch(0.84 0.16 220 / ${p.alpha.toFixed(3)})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? start() : stop())),
      { rootMargin: '100px' }
    );
    io.observe(canvas);

    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [quantity, color]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`absolute inset-0 h-full w-full ${className}`} />;
};

export default Particles;
