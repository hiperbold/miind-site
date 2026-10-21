'use client'

import { useState } from 'react'

import { EarningsSimulator, type SimulatorPlan } from './EarningsSimulator'

type Props = Omit<React.ComponentProps<typeof EarningsSimulator>, 'plan' | 'headerLabel'> & {
  plans: SimulatorPlan[]
  initialKey: string
  allowChoice: boolean
  // "{plano}" vira o nome do plano escolhido
  headerTemplate: string
  selectId: string
}

// Simulador com seletor de plano opcional (porte do AgencyEarningsSimulator).
export function SimuladorPlanos({ plans, initialKey, allowChoice, headerTemplate, selectId, ...rest }: Props) {
  const [key, setKey] = useState(initialKey)
  const plan = plans.find((p) => p.key === key) ?? plans[0]
  if (!plan) return null
  return (
    <>
      {allowChoice && plans.length > 1 && (
        <div className="mb-6 max-w-sm">
          <label className="grid gap-2 text-sm font-medium" htmlFor={selectId}>
            Plano para simular
            <select
              id={selectId}
              value={plan.key}
              onChange={(event) => setKey(event.target.value)}
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
      )}
      <EarningsSimulator {...rest} plan={plan} headerLabel={headerTemplate.replaceAll('{plano}', plan.key)} />
    </>
  )
}
