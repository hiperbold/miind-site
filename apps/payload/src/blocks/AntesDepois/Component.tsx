import { BeforeAfter } from '@/components/bu1lder/BeforeAfter'
import { Secao } from '@/components/bu1lder/Secao'
import { SectionHeader } from '@/components/bu1lder/SectionHeader'
import type { BlocoAntesDepois } from '@/payload-types'

export function AntesDepoisBloco({ bloco }: { bloco: BlocoAntesDepois }) {
  const itens = (lista: { rotulo: string; valor?: string | null }[] | null | undefined) =>
    (lista ?? []).map((i) => ({ label: i.rotulo, value: i.valor }))
  return (
    <Secao ancora={bloco.ancora} destaque={bloco.destaque}>
      <SectionHeader eyebrow={bloco.etiqueta} title={bloco.titulo} subtitle={bloco.subtitulo} />
      <div className="mt-10">
        <BeforeAfter
          before={{ headline: bloco.antes?.titulo, items: itens(bloco.antes?.itens) }}
          after={{ headline: bloco.depois?.titulo, items: itens(bloco.depois?.itens) }}
          delta={bloco.delta}
          quote={bloco.citacao}
          author={bloco.autor}
        />
      </div>
    </Secao>
  )
}
