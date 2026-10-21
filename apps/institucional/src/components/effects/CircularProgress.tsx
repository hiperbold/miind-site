import { useId, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface Props {
  value: number; // 0..100
  size?: number;
  stroke?: number;
  className?: string;
  label?: string;
}

const CircularProgress = ({ value, size = 88, stroke = 6, className = '', label }: Props) => {
  const id = useId();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const offset = c * (1 - pct / 100);

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg ref={ref} width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={`cp-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.84 0.16 220)" />
            <stop offset="100%" stopColor="oklch(0.62 0.22 295)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="oklch(1 0 0 / 0.06)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#cp-${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: reduced ? offset : inView ? offset : c }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ filter: 'drop-shadow(0 0 6px oklch(0.84 0.16 220 / 0.45))' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-lg font-semibold text-foreground tabular-nums">{pct}%</span>
        {label && (
          <span className="text-[8px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

export default CircularProgress;
