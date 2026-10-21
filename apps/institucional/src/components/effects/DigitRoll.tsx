import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number; // total animation time in ms
  className?: string;
}

/**
 * Tech-style number reveal: scrambles digits like a terminal/odometer,
 * then settles on the final value digit-by-digit from left to right.
 */
const DigitRoll = ({ value, prefix = '', suffix = '', duration = 1200, className = '' }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();
  const target = String(value);
  const [display, setDisplay] = useState(() => '0'.repeat(target.length));

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(target);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic for reveal progress
      const eased = 1 - Math.pow(1 - t, 3);
      const revealCount = Math.floor(eased * target.length + 0.0001);
      let out = '';
      for (let i = 0; i < target.length; i++) {
        if (i < revealCount) {
          out += target[i];
        } else {
          // scramble: bias toward eventual digit as t grows so the snap feels smooth
          const ch = target[i];
          if (/\d/.test(ch)) {
            out += Math.floor(Math.random() * 10).toString();
          } else {
            out += ch;
          }
        }
      }
      setDisplay(out);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduced]);

  return (
    <span ref={ref} className={`tabular-nums inline-flex items-baseline ${className}`}>
      {prefix && <span className="opacity-70 mr-0.5">{prefix}</span>}
      <span className="inline-flex">
        {display.split('').map((ch, i) => (
          <span
            key={i}
            className="inline-block text-center"
            style={{ minWidth: /\d/.test(ch) ? '0.62em' : undefined }}
          >
            {ch}
          </span>
        ))}
      </span>
      {suffix && <span className="ml-0.5 text-brand-cyan/90">{suffix}</span>}
    </span>
  );
};

export default DigitRoll;
