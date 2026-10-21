import { useId } from 'react';

interface Props {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
  strokeWidth?: number;
}

const Sparkline = ({ data, width = 240, height = 64, className = '', strokeWidth = 1.6 }: Props) => {
  const id = useId();
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const points = data.map((v, i) => `${i * stepX},${height - ((v - min) / range) * (height - 8) - 4}`);
  const path = `M ${points.join(' L ')}`;
  const area = `${path} L ${width},${height} L 0,${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.84 0.16 220)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="oklch(0.84 0.16 220)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`stroke-${id}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="oklch(0.84 0.16 220)" />
          <stop offset="100%" stopColor="oklch(0.58 0.22 285)" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#grad-${id})`} />
      <path
        d={path}
        fill="none"
        stroke={`url(#stroke-${id})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="600"
        strokeDashoffset="600"
        style={{ animation: 'draw-line 2.4s 0.2s cubic-bezier(0.16,1,0.3,1) forwards' }}
      />
    </svg>
  );
};

export default Sparkline;
