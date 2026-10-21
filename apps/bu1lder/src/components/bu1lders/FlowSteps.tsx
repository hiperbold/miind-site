import { ArrowRight, Search, Cog, Wallet } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Você descobre a dor",
    text: "Use sua rede e sua escuta. A pessoa do mercado é você — chega no dono, ouve o problema, propõe a solução.",
  },
  {
    icon: Cog,
    title: "A Bu1lder constrói a tecnologia",
    text: "IA, WhatsApp, integrações, infraestrutura. Você liga os módulos no no-code; a plataforma opera tudo nos bastidores.",
  },
  {
    icon: Wallet,
    title: "Você recebe a recorrência",
    text: "O cliente paga R$ 2.000 a R$ 5.000/mês. Você recebe sua fatia todo mês — e pode cobrar acima do piso, ficando com 100% do excedente.",
  },
];

export function FlowSteps() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {steps.map((s, i) => (
        <div key={s.title} className="relative">
          <div className="surface-card h-full p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan">
                <s.icon className="size-5" />
              </span>
              <span className="text-xs font-semibold text-brand-cyan tabular-nums tracking-[0.18em]">
                Passo 0{i + 1}
              </span>
            </div>
            <h3 className="text-foreground font-semibold text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
          </div>
          {i < steps.length - 1 && (
            <ArrowRight
              aria-hidden
              className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-brand-violet/60 size-5"
            />
          )}
        </div>
      ))}
    </div>
  );
}
