import type { BlocoFaixaNomes } from '@/payload-types'

// Porte de ClientLogosSection (NarrativeSections.tsx): faixa com nomes de empresas.
export function FaixaNomesBloco({ bloco }: { bloco: BlocoFaixaNomes }) {
  const nomes = bloco.nomes ?? []
  if (nomes.length === 0) return null
  return (
    <section className="relative section-pad-tight border-y border-foreground/5">
      <div className="container-editorial">
        {bloco.etiqueta && <div className="eyebrow text-center mb-8">{bloco.etiqueta}</div>}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6 items-center justify-items-center opacity-70">
          {nomes.map((c) => (
            <div
              key={c}
              className="font-semibold text-base md:text-lg tracking-[-0.02em] text-foreground/70 hover:text-foreground transition-colors"
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
