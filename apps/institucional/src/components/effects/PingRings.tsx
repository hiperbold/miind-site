interface Props {
  className?: string;
  count?: number;
}

const PingRings = ({ className = '', count = 3 }: Props) => (
  <div className={`pointer-events-none absolute inset-0 flex items-center justify-center ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <span
        key={i}
        className="absolute inset-0 rounded-full border border-brand-cyan/35 animate-ping-ring"
        style={{ animationDelay: `${i * 1.1}s` }}
      />
    ))}
  </div>
);

export default PingRings;
