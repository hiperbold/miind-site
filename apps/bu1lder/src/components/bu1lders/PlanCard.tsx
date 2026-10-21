import { Check } from "lucide-react";
import { SHOW_PLATFORM_SHARE, type Plan } from "@/data/niches";

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function PlanCard({ plan }: { plan: Plan }) {
  const best = plan.best;
  return (
    <div
      className={`surface-card relative flex flex-col h-full p-6 ${
        best ? "surface-card-feature -translate-y-1" : ""
      }`}
    >
      {best && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full money-gradient text-background text-[10px] tracking-[0.18em] uppercase font-semibold px-3 h-6 shadow-[0_8px_24px_-8px_oklch(0.82_0.16_165/0.6)]">
          Mais vendido
        </span>
      )}
      <h3 className="font-semibold text-lg text-foreground">{plan.key}</h3>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-foreground tabular-nums">{brl(plan.price)}</span>
        <span className="text-muted-foreground text-sm">/mês</span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">Setup incluso · cliente paga</p>

      <p className="mt-5 text-sm flex items-start gap-2 text-muted-foreground">
        <Check className="size-4 mt-0.5 text-brand-mint" />
        {plan.includes}
      </p>

      <div className="mt-6 rounded-xl bg-brand-mint/10 border border-brand-mint/20 p-4">
        <p className="text-[10px] tracking-[0.22em] uppercase font-semibold text-brand-mint">
          Você recebe
        </p>
        <p className="mt-1 text-3xl font-bold text-money tabular-nums">
          {brl(plan.builderEarns)}
          <span className="text-base font-medium opacity-80">/mês</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          por cliente · A Bu1lder cuida da operação
        </p>
        {SHOW_PLATFORM_SHARE && (
          <p className="mt-2 text-xs text-muted-foreground">
            Plataforma: {brl(plan.platform)}/mês
          </p>
        )}
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Cobre acima do piso e fique com 100% do excedente.
      </p>
    </div>
  );
}
