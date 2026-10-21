import { Reveal } from '@/components/bu1lder/Reveal'
import { Secao } from '@/components/bu1lder/Secao'
import { SectionHeader } from '@/components/bu1lder/SectionHeader'
import { IconeLucide } from '@/lib/icones'
import type { BlocoCartoesSegmento } from '@/payload-types'

// Cartões informativos por segmento, sem link (páginas de campanha não têm saída).
export function CartoesSegmentoBloco({ bloco }: { bloco: BlocoCartoesSegmento }) {
  return (
    <Secao ancora={bloco.ancora} destaque={bloco.destaque}>
      <SectionHeader eyebrow={bloco.etiqueta} title={bloco.titulo} subtitle={bloco.subtitulo} />
      <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(bloco.cartoes ?? []).map((c, i) => {
          return (
            <li key={c.id ?? `${i}-${c.titulo}`}>
              <Reveal delay={(i % 3) * 70} className="h-full">
                <div className="surface-card h-full p-5 flex items-start gap-4">
                  <span className="grid place-items-center w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-brand-cyan/15 to-brand-violet/10 border border-brand-cyan/25 text-brand-cyan">
                    <IconeLucide nome={c.icone} padrao="Store" className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-foreground font-semibold text-base">{c.titulo}</h3>
                    {c.texto && <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{c.texto}</p>}
                  </div>
                </div>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Secao>
  )
}
