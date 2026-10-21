import type { BlocoFaixaEstatisticas } from '@/payload-types'

// Porte da faixa de números de bu1lders.index.tsx.
export function FaixaEstatisticasBloco({ bloco }: { bloco: BlocoFaixaEstatisticas }) {
  const itens = bloco.itens ?? []
  if (itens.length === 0) return null
  return (
    <section className="border-y border-foreground/5 bg-foreground/[0.015]">
      <div className="container-editorial py-10">
        <div
          className="grid gap-3 sm:gap-6 text-center"
          style={{ gridTemplateColumns: `repeat(${itens.length}, minmax(0, 1fr))` }}
        >
          {itens.map((s, i) => (
            <div key={s.id ?? i}>
              <p className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gradient bg-[length:200%_auto] tabular-nums">
                {s.valor}
              </p>
              <p className="mt-1 text-[9px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] text-muted-foreground font-semibold leading-tight">
                {s.rotulo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
