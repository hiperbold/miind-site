import { ModuleCard } from '@/components/bu1lder/ModuleCard'
import { Reveal } from '@/components/bu1lder/Reveal'
import { Secao } from '@/components/bu1lder/Secao'
import { SectionHeader } from '@/components/bu1lder/SectionHeader'
import type { BlocoModulos } from '@/payload-types'

export function ModulosBloco({ bloco }: { bloco: BlocoModulos }) {
  return (
    <Secao ancora={bloco.ancora} destaque={bloco.destaque}>
      <SectionHeader eyebrow={bloco.etiqueta} title={bloco.titulo} subtitle={bloco.subtitulo} />
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(bloco.itens ?? []).map((m, i) => (
          <Reveal key={m.id ?? `${i}-${m.nome}`} delay={i * 70}>
            <ModuleCard
              index={i}
              name={m.nome}
              benefit={m.beneficio}
              icon={m.icone}
              example={m.exemplo}
              deliveryNote={bloco.textoEntrega}
            />
          </Reveal>
        ))}
      </div>
    </Secao>
  )
}
