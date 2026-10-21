'use client'

import { useState } from 'react'

import { Slider } from '@/components/ui/slider'

export type SimulatorPlan = {
  key: string
  price: number
  builderEarns: number
  platform?: number | null
}

const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

// Degraus da escada abaixo do slider. Com a faixa original (1 a 50) mantém os
// degraus da prévia (5, 10, 20, 50); com outra faixa, quatro degraus até o máximo.
function ladderSteps(min: number, max: number): number[] {
  if (min <= 5 && max === 50) return [5, 10, 20, 50]
  const steps = [0.25, 0.5, 0.75, 1].map((f) => Math.max(min, Math.round(max * f)))
  return Array.from(new Set(steps))
}

export function EarningsSimulator({
  plan,
  valueLabel = 'Sua renda mensal',
  minClients = 1,
  maxClients = 50,
  initialClients = 10,
  showYearly = true,
  showPortfolio = true,
  showPlatformShare = false,
  headerLabel,
  setupNote = 'Setup incluso',
  operationNote = 'A Bu1lder cuida da operação',
}: {
  plan: SimulatorPlan
  valueLabel?: string
  minClients?: number
  maxClients?: number
  initialClients?: number
  showYearly?: boolean
  showPortfolio?: boolean
  showPlatformShare?: boolean
  headerLabel?: string
  setupNote?: string | null
  operationNote?: string | null
}) {
  const min = Math.max(1, Math.floor(minClients))
  const max = Math.max(min + 1, Math.floor(maxClients))
  const [clients, setClients] = useState(Math.min(max, Math.max(min, Math.floor(initialClients))))
  const monthly = plan.builderEarns * clients
  const yearly = monthly * 12
  const clientPays = plan.price * clients
  const metrics = [
    { label: valueLabel, value: brl(monthly), accent: true },
    ...(showYearly ? [{ label: 'Sua renda anual', value: brl(yearly), accent: true }] : []),
    ...(showPortfolio ? [{ label: 'Total no seu portfólio', value: brl(clientPays) + '/mês', accent: false }] : []),
  ]
  const metricCols = metrics.length === 3 ? 'sm:grid-cols-3' : metrics.length === 2 ? 'sm:grid-cols-2' : ''

  return (
    <div className="surface-card surface-card-feature relative overflow-hidden p-6 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-violet/30 blur-3xl aurora-drift"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-brand-cyan/20 blur-3xl aurora-drift"
        style={{ animationDelay: '-8s' }}
      />

      <div className="relative">
        <p className="eyebrow">{headerLabel ?? `Quanto você ganha · Plano ${plan.key}`}</p>
        <div className="mt-2 grid sm:grid-cols-2 gap-6 items-end">
          <div>
            <p className="text-muted-foreground text-sm">Cliente paga</p>
            <p className="text-2xl font-bold text-foreground tabular-nums">
              {brl(plan.price)}
              <span className="text-base font-medium text-muted-foreground">/mês</span>
            </p>
            {setupNote && <p className="text-xs text-muted-foreground mt-1">{setupNote}</p>}
          </div>
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase font-semibold text-brand-mint">
              Você recebe por cliente
            </p>
            <p className="text-3xl font-bold text-money tabular-nums">
              {brl(plan.builderEarns)}
              <span className="text-base font-medium opacity-80">/mês</span>
            </p>
            {operationNote && <p className="text-xs text-muted-foreground mt-1">{operationNote}</p>}
            {showPlatformShare && plan.platform != null && (
              <p className="text-xs text-muted-foreground">Plataforma: {brl(plan.platform)}/mês</p>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-foreground/10">
          <div className="flex items-center justify-between mb-3">
            <label htmlFor="clientsSlider" className="text-sm text-muted-foreground">
              Quantos clientes você quer atender?
            </label>
            <span className="text-xl font-bold text-foreground tabular-nums" data-testid="simulador-clientes">
              {clients}
            </span>
          </div>
          <Slider
            id="clientsSlider"
            value={[clients]}
            min={min}
            max={max}
            step={1}
            onValueChange={(v) => setClients(v[0])}
            aria-label="Número de clientes"
          />

          <div className="mt-6 space-y-2.5">
            {ladderSteps(min, max).map((n) => {
              const pct = Math.min(100, (Math.min(clients, n) / max) * 100 + 8)
              const isActive = clients >= n
              const earn = plan.builderEarns * n
              return (
                <div key={n} className="flex items-center gap-3">
                  <span className="w-12 text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground tabular-nums">
                    {n} cli
                  </span>
                  <div className="relative flex-1 h-2.5 rounded-full bg-foreground/[0.06] overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 rounded-full transition-[width,opacity] duration-700 ease-out ${
                        isActive
                          ? 'bg-gradient-to-r from-brand-mint via-brand-cyan to-brand-blue opacity-100'
                          : 'bg-foreground/15 opacity-60'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span
                    className={`w-28 text-right text-xs font-semibold tabular-nums ${
                      isActive ? 'text-money' : 'text-muted-foreground'
                    }`}
                  >
                    {brl(earn)}/mês
                  </span>
                </div>
              )
            })}
          </div>

          <div className={`mt-6 grid ${metricCols} gap-3`}>
            {metrics.map((m) => (
              <Metric key={m.label} label={m.label} value={m.value} accent={m.accent} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="glass rounded-xl p-4">
      <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">{label}</p>
      <p
        className={`mt-1 text-xl font-bold tabular-nums ${accent ? 'text-money' : 'text-foreground'}`}
        data-testid="simulador-valor"
      >
        {value}
      </p>
    </div>
  )
}
