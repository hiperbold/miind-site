'use client'

import { Check } from 'lucide-react'
import { useState } from 'react'

import { IconeLucide } from '@/lib/icones'

export function ModuleCard({
  index,
  name,
  benefit,
  icon,
  example,
  deliveryNote,
}: {
  index: number
  name: string
  benefit: string
  icon?: string | null
  example?: string | null
  deliveryNote?: string | null
}) {
  const [open, setOpen] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      aria-expanded={open}
      className="surface-card group text-left p-5 flex flex-col relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-brand-cyan/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      <div className="relative flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-brand-cyan tabular-nums tracking-[0.18em]">0{index + 1}</span>
        <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-cyan/15 to-brand-violet/10 border border-brand-cyan/25 text-brand-cyan group-hover:from-brand-cyan group-hover:to-brand-blue group-hover:text-background group-hover:border-transparent transition-all">
          <IconeLucide nome={icon} padrao="Plug" className="size-4" />
        </span>
      </div>
      <h3 className="relative text-foreground font-semibold text-base mb-1.5">{name}</h3>
      <p className="relative text-sm text-muted-foreground leading-relaxed">{benefit}</p>

      <div
        className={`relative grid transition-all duration-300 ${
          open ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden space-y-3">
          {example && (
            <div className="rounded-xl rounded-bl-md bg-gradient-to-br from-brand-cyan/15 to-brand-blue/10 border border-brand-cyan/20 px-3 py-2 text-[12px] leading-snug text-foreground/90 italic">
              &quot;{example}&quot;
            </div>
          )}
          {deliveryNote && (
            <p className="text-xs text-brand-mint inline-flex items-center gap-1.5 font-medium">
              <Check className="size-3.5" />
              {deliveryNote}
            </p>
          )}
        </div>
      </div>
    </button>
  )
}
