import { projection } from "@/data/niches";

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function ProjectionBars() {
  const max = Math.max(...projection.map((p) => p.monthly));
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {projection.map((p) => {
        const pct = (p.monthly / max) * 100;
        return (
          <div key={p.label} className="surface-card p-6 flex flex-col">
            <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-brand-violet">
              {p.label}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{p.clients} clientes ativos</p>
            <p className="mt-4 text-3xl font-bold text-money tabular-nums">
              {brl(p.monthly)}
              <span className="text-base font-medium text-muted-foreground">/mês</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground tabular-nums">
              {brl(p.yearly)} por ano
            </p>
            <div
              className="mt-5 h-2 rounded-full bg-foreground/10 overflow-hidden"
              aria-hidden
            >
              <div className="h-full money-gradient" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
