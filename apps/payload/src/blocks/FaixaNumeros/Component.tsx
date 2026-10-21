import { StatBand } from '@/components/bu1lder/StatBand'
import type { BlocoFaixaNumeros } from '@/payload-types'

export function FaixaNumerosBloco({ bloco }: { bloco: BlocoFaixaNumeros }) {
  const itens = bloco.itens ?? []
  if (itens.length === 0) return null
  return (
    <section className="container-editorial pb-12 lg:pb-16">
      <StatBand stats={itens.map((i) => ({ icon: i.icone, value: i.valor, label: i.rotulo, tone: i.tom }))} />
    </section>
  )
}
