import { useEffect, useState } from 'react';

const Meteors = ({ number = 20 }: { number?: number }) => {
  const [styles, setStyles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const arr = Array.from({ length: number }, () => ({
      top: '-5%',
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${4 + Math.random() * 6}s`,
    }));
    setStyles(arr);
  }, [number]);

  return (
    <>
      {styles.map((s, i) => (
        <span
          key={i}
          className="pointer-events-none absolute h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-full bg-brand-cyan shadow-[0_0_0_1px_oklch(0.84_0.16_220_/_0.1)]"
          style={s}
        >
          <span className="pointer-events-none absolute top-1/2 -z-10 h-px w-[60px] -translate-y-1/2 bg-gradient-to-r from-brand-cyan to-transparent" />
        </span>
      ))}
      <style>{`
        @keyframes meteor {
          0% { transform: rotate(215deg) translateX(0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: rotate(215deg) translateX(-700px); opacity: 0; }
        }
        .animate-meteor { animation: meteor linear infinite; }
        @media (prefers-reduced-motion: reduce) { .animate-meteor { animation: none; opacity: 0; } }
      `}</style>
    </>
  );
};

export default Meteors;
