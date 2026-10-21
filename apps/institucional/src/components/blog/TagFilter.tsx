interface Props { tags: string[]; active: string; onChange: (t: string) => void; allLabel?: string; }

const TagFilter: React.FC<Props> = ({ tags, active, onChange, allLabel = 'Todos' }) => {
  const opts = [allLabel, ...tags];
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {opts.map((t) => {
        const isActive = active === t;
        return (
          <button key={t} onClick={() => onChange(t)} aria-pressed={isActive}
            className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-mono font-medium tracking-[0.16em] uppercase transition-all border ${
              isActive
                ? 'bg-foreground text-background border-foreground shadow-[0_8px_28px_-8px_oklch(0.84_0.16_220/0.55)]'
                : 'glass text-foreground/75 border-border hover:text-foreground hover:border-brand-cyan/40'
            }`}>
            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-signal" />}
            {t}
          </button>
        );
      })}
    </div>
  );
};

export default TagFilter;
