import { CheckCircle2, Quote, XCircle } from 'lucide-react'

import { Reveal } from './Reveal'

// Porte de BeforeAfter. Números, citação, autor e delta passaram a ser opcionais:
// item sem valor mostra só o rótulo; sem citação e sem delta, o cartão de baixo some.
export type BAItem = { label: string; value?: string | null }

function Items({ items, after }: { items: BAItem[]; after?: boolean }) {
  return (
    <ul className={`${after ? 'relative ' : ''}mt-4 space-y-2`}>
      {items.map((it, i) =>
        it.value ? (
          <li key={`${i}-${it.label}`} className="flex items-baseline justify-between gap-4 text-sm">
            <span className="text-muted-foreground">{it.label}</span>
            <span className={`font-semibold tabular-nums ${after ? 'text-money' : 'text-foreground/70'}`}>
              {it.value}
            </span>
          </li>
        ) : (
          <li key={`${i}-${it.label}`} className="flex items-baseline gap-3 text-sm">
            <span
              aria-hidden
              className={`mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full ${after ? 'bg-brand-mint' : 'bg-muted-foreground/50'}`}
            />
            <span className={after ? 'text-foreground/90' : 'text-muted-foreground'}>{it.label}</span>
          </li>
        ),
      )}
    </ul>
  )
}

export function BeforeAfter({
  before,
  after,
  delta,
  quote,
  author,
}: {
  before: { headline?: string | null; items: BAItem[] }
  after: { headline?: string | null; items: BAItem[] }
  delta?: string | null
  quote?: string | null
  author?: string | null
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Reveal>
          <div className="surface-card p-6 h-full">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-muted/40 text-muted-foreground border border-foreground/10">
                <XCircle className="size-5" />
              </span>
              <p className="text-sm font-semibold text-muted-foreground">Antes</p>
            </div>
            {before.headline && (
              <p className="mt-4 text-lg font-semibold text-foreground/90 leading-snug">{before.headline}</p>
            )}
            <Items items={before.items} />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="surface-card surface-card-feature p-6 h-full relative overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-brand-mint/25 blur-3xl"
            />
            <div className="relative flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-mint/30 to-brand-cyan/20 text-brand-mint border border-brand-mint/30">
                <CheckCircle2 className="size-5" />
              </span>
              <p className="text-sm font-semibold text-brand-mint">Depois</p>
            </div>
            {after.headline && (
              <p className="relative mt-4 text-lg font-semibold text-foreground leading-snug">{after.headline}</p>
            )}
            <Items items={after.items} after />
          </div>
        </Reveal>
      </div>

      {(quote || delta) && (
        <Reveal delay={200}>
          <div className="surface-card p-6 sm:p-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-cyan to-brand-blue text-background">
                <Quote className="size-5" />
              </span>
              {quote && (
                <div className="min-w-0">
                  <p className="text-sm sm:text-base text-foreground/90 leading-relaxed italic">&quot;{quote}&quot;</p>
                  {author && <p className="mt-1 text-xs eyebrow text-brand-violet">{author}</p>}
                </div>
              )}
            </div>
            {delta && (
              <div className="shrink-0 rounded-xl border border-brand-mint/30 bg-brand-mint/10 px-4 py-3 text-center">
                <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-brand-mint">Delta</p>
                <p className="text-xl font-bold text-money tabular-nums">{delta}</p>
              </div>
            )}
          </div>
        </Reveal>
      )}
    </div>
  )
}
