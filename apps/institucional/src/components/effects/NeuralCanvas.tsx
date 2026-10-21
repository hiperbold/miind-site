import { motion, useReducedMotion } from 'framer-motion';

type Node = { id: string; x: number; y: number; r?: number };
type Edge = [string, string];

const nodes: Node[] = [
  { id: 'a', x: 14, y: 50, r: 3 },
  { id: 'b', x: 32, y: 22 },
  { id: 'c', x: 32, y: 78 },
  { id: 'd', x: 52, y: 50, r: 4.5 }, // core
  { id: 'e', x: 72, y: 22 },
  { id: 'f', x: 72, y: 78 },
  { id: 'g', x: 90, y: 50, r: 3 },
];

const edges: Edge[] = [
  ['a', 'b'], ['a', 'c'], ['b', 'd'], ['c', 'd'],
  ['d', 'e'], ['d', 'f'], ['e', 'g'], ['f', 'g'],
  ['b', 'e'], ['c', 'f'],
];

const nById = (id: string) => nodes.find((n) => n.id === id)!;

/**
 * NeuralCanvas — animated SVG graph + scanline used in the hero panel.
 * Decorative only; respects prefers-reduced-motion.
 */
const NeuralCanvas = ({ height = 132 }: { height?: number }) => {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden rounded-lg border border-border bg-surface-0/60"
      style={{ height }}
    >
      {/* Radial backdrop */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 80% at 52% 50%, oklch(0.84 0.16 220 / 0.10), transparent 70%), radial-gradient(40% 60% at 80% 30%, oklch(0.62 0.22 295 / 0.08), transparent 70%)',
        }}
      />

      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.18]" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="nc-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.15" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#nc-grid)" className="text-foreground" />
      </svg>

      {/* Graph */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="nc-edge" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="oklch(0.84 0.16 220)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="oklch(0.62 0.22 295)" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="nc-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.84 0.16 220)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.84 0.16 220)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {edges.map(([a, b], i) => {
          const A = nById(a);
          const B = nById(b);
          return (
            <g key={`${a}-${b}`}>
              <line
                x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                stroke="url(#nc-edge)" strokeWidth="0.35" vectorEffect="non-scaling-stroke"
              />
              {!reduced && (
                <line
                  x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                  stroke="oklch(0.84 0.16 220)" strokeWidth="0.6"
                  strokeDasharray="3 22" strokeDashoffset="0"
                  vectorEffect="non-scaling-stroke"
                  className="animate-neural-flow"
                  style={{ animationDelay: `${(i % 5) * 0.45}s` }}
                />
              )}
            </g>
          );
        })}

        {/* Core halo */}
        <circle cx={52} cy={50} r="14" fill="url(#nc-core)" className={reduced ? '' : 'animate-neural-pulse'} />

        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={n.id}>
            <circle
              cx={n.x} cy={n.y} r={(n.r ?? 2.4) + 1.4}
              fill="oklch(0.84 0.16 220 / 0.18)"
            />
            <motion.circle
              cx={n.x} cy={n.y} r={n.r ?? 2.4}
              fill={n.id === 'd' ? 'oklch(0.96 0.12 220)' : 'oklch(0.84 0.16 220)'}
              initial={reduced ? false : { opacity: 0.6 }}
              animate={reduced ? undefined : { opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
            />
          </g>
        ))}
      </svg>

      {/* Scanline */}
      {!reduced && (
        <div className="pointer-events-none absolute left-0 right-0 h-px animate-scanline-y"
          style={{
            background:
              'linear-gradient(90deg, transparent, oklch(0.84 0.16 220 / 0.85), transparent)',
            boxShadow: '0 0 12px oklch(0.84 0.16 220 / 0.6)',
          }}
        />
      )}

      {/* Corner brackets */}
      {(['tl','tr','bl','br'] as const).map((c) => (
        <span key={c} aria-hidden className={`absolute w-2.5 h-2.5 border-brand-cyan/60 ${
          c==='tl' ? 'top-1.5 left-1.5 border-l border-t' :
          c==='tr' ? 'top-1.5 right-1.5 border-r border-t' :
          c==='bl' ? 'bottom-1.5 left-1.5 border-l border-b' :
                     'bottom-1.5 right-1.5 border-r border-b'
        }`} />
      ))}
    </div>
  );
};

export default NeuralCanvas;
