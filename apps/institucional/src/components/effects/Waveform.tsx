import { motion, useReducedMotion } from 'framer-motion';

/**
 * Waveform — 16 thin bars with organic, staggered scaleY animation.
 * Decorative; respects prefers-reduced-motion.
 */
const Waveform = ({ bars = 28 }: { bars?: number }) => {
  const reduced = useReducedMotion();
  const seq = Array.from({ length: bars }, (_, i) => i);

  return (
    <div aria-hidden="true" className="flex items-center justify-between gap-[3px] h-7 w-full">
      {seq.map((i) => {
        const isViolet = i % 3 === 0;
        const base = 0.18 + ((i * 37) % 100) / 220; // pseudo-random rest height
        return (
          <motion.span
            key={i}
            className="flex-1 rounded-full origin-center"
            style={{
              background: isViolet
                ? 'oklch(0.62 0.22 295 / 0.7)'
                : 'oklch(0.84 0.16 220 / 0.75)',
              height: '100%',
            }}
            initial={{ scaleY: base }}
            animate={reduced ? { scaleY: base } : { scaleY: [base, 0.95, base * 1.3, 0.55, base] }}
            transition={
              reduced
                ? undefined
                : {
                    duration: 1.6 + (i % 5) * 0.18,
                    repeat: Infinity,
                    delay: (i % 8) * 0.07,
                    ease: 'easeInOut',
                  }
            }
          />
        );
      })}
    </div>
  );
};

export default Waveform;
