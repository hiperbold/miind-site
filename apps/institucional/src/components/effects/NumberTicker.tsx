import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface Props {
  value: number;
  decimals?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const NumberTicker = ({ value, decimals = 0, className = '', prefix = '', suffix = '', duration = 1.6 }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const motion = useMotionValue(0);
  const spring = useSpring(motion, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (inView) motion.set(value);
  }, [inView, value, motion]);

  useEffect(() => {
    const unsub = spring.on('change', (latest) => {
      setDisplay(latest.toFixed(decimals));
    });
    return () => unsub();
  }, [spring, decimals]);

  return (
    <span ref={ref} className={`num tabular-nums ${className}`}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

export default NumberTicker;
