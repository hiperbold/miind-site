import { Secao } from '@/components/bu1lder/Secao'
import { SectionHeader } from '@/components/bu1lder/SectionHeader'
import { Timeline } from '@/components/bu1lder/Timeline'
import type { BlocoLinhaDoTempo } from '@/payload-types'

export function LinhaDoTempoBloco({ bloco }: { bloco: BlocoLinhaDoTempo }) {
  return (
    <Secao ancora={bloco.ancora} destaque={bloco.destaque}>
      <SectionHeader eyebrow={bloco.etiqueta} title={bloco.titulo} subtitle={bloco.subtitulo} />
      <div className="mt-10">
        <Timeline steps={(bloco.passos ?? []).map((p) => ({ day: p.dia, title: p.titulo, desc: p.descricao }))} />
      </div>
    </Secao>
  )
}
