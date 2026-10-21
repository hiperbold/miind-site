type Ease = { achar: number; explicar: number; roi: number; fechar: number };

const items: { key: keyof Ease; label: string }[] = [
  { key: "achar", label: "Achar clientes" },
  { key: "explicar", label: "Explicar" },
  { key: "roi", label: "Provar ROI" },
  { key: "fechar", label: "Fechar" },
];

function tone(n: number) {
  if (n >= 9) return "bg-brand-mint/10 text-brand-mint border-brand-mint/30";
  if (n >= 7) return "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/30";
  return "bg-brand-violet/10 text-brand-violet border-brand-violet/30";
}

export function EaseBadges({ ease }: { ease: Ease }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((it) => {
        const n = ease[it.key];
        return (
          <div
            key={it.key}
            className={`rounded-xl border p-4 backdrop-blur-sm ${tone(n)}`}
            aria-label={`${it.label}: nota ${n} de 10`}
          >
            <p className="text-[10px] tracking-[0.18em] uppercase font-semibold opacity-80">
              {it.label}
            </p>
            <p className="mt-1 text-2xl font-bold tabular-nums">
              {n}
              <span className="text-sm opacity-60">/10</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
