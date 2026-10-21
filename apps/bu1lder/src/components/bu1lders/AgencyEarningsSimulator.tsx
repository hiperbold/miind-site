import { useState } from "react";
import { EarningsSimulator } from "./EarningsSimulator";
import { plans } from "@/data/niches";

export function AgencyEarningsSimulator() {
  const [planKey, setPlanKey] = useState("Performance");
  const plan = plans.find((item) => item.key === planKey)!;
  return (
    <section id="quanto-voce-ganha" className="border-y border-border bg-foreground/[0.015]">
      <div className="container-editorial section-pad">
        <div className="max-w-3xl">
          <p className="eyebrow text-brand-cyan">Quanto você ganha</p>
          <h2 className="display-m mt-4">Sua carteira pode gerar uma nova receita recorrente.</h2>
          <p className="lead mt-6">
            Simule a oferta de soluções de IA para os negócios que sua agência já atende. Escolha um
            plano de referência e ajuste a quantidade de clientes.
          </p>
        </div>
        <div className="mt-8 mb-6 max-w-sm">
          <label className="grid gap-2 text-sm font-medium" htmlFor="agency-plan">
            Plano para simular
            <select
              id="agency-plan"
              value={planKey}
              onChange={(event) => setPlanKey(event.target.value)}
              className="w-full rounded-xl border border-input bg-card text-foreground px-4 h-12"
            >
              {plans.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.key}
                </option>
              ))}
            </select>
          </label>
        </div>
        <EarningsSimulator plan={plan} />
        <p className="mt-5 text-xs text-muted-foreground max-w-3xl">
          Projeção com os valores de referência dos planos do programa, antes de impostos e
          despesas. O total anual considera a mesma carteira ativa por 12 meses. As condições
          comerciais e o escopo de cada cliente devem ser confirmados com a MIIND.
        </p>
        <a href="#cadastro" className="ds-button mt-8">
          Quero ser um Bu1lder
        </a>
      </div>
    </section>
  );
}
