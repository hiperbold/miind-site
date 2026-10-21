import { EaseBadges } from '@/components/bu1lder/EaseBadges'
import { Secao } from '@/components/bu1lder/Secao'
import { SectionHeader } from '@/components/bu1lder/SectionHeader'
import type { BlocoNotasFacilidade } from '@/payload-types'

export function NotasFacilidadeBloco({ bloco }: { bloco: BlocoNotasFacilidade }) {
  return (
    <Secao ancora={bloco.ancora} destaque={bloco.destaque}>
      <SectionHeader eyebrow={bloco.etiqueta} title={bloco.titulo} subtitle={bloco.subtitulo} />
      <div className="mt-10">
        <EaseBadges ease={{ achar: bloco.achar, explicar: bloco.explicar, roi: bloco.roi, fechar: bloco.fechar }} />
      </div>
    </Secao>
  )
}
