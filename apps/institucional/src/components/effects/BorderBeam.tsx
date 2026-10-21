import React from 'react';

interface Props {
  size?: number;
  duration?: number;
  delay?: number;
  className?: string;
  colorFrom?: string;
  colorTo?: string;
}

/**
 * Hairline luminous trace that orbits the parent's rounded border.
 * Parent must be `position: relative; overflow: hidden` with `border-radius`.
 * Rendered above content via z-20 so it shows over images/overlays inside the frame.
 */
const BorderBeam = ({
  size = 220,
  duration = 8,
  delay = 0,
  className = '',
  colorFrom = 'oklch(0.84 0.16 220)',
  colorTo = 'oklch(0.58 0.22 285)',
}: Props) => {
  const id = React.useId().replace(/[:]/g, '');
  const animName = `bb-${id}`;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit] ${className}`}
      style={{ opacity: 0.28, mixBlendMode: 'screen' }}
    >
      <span
        className="absolute top-0 left-0 block"
        style={{
          width: `${size}px`,
          height: '1px',
          background: `linear-gradient(90deg, transparent 0%, ${colorTo} 50%, ${colorFrom} 60%, transparent 100%)`,
          offsetPath: `rect(0 100% 100% 0 round 1px)`,
          offsetDistance: '0%',
          offsetRotate: 'auto',
          animation: `${animName} ${duration}s linear infinite`,
          animationDelay: `-${delay}s`,
        }}
      />
      <style>{`
        @keyframes ${animName} { to { offset-distance: 100%; } }
        @media (prefers-reduced-motion: reduce) {
          [style*="${animName}"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default BorderBeam;
