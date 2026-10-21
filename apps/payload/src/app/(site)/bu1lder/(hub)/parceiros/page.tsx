import type { Metadata } from 'next'

import { RenderPlataforma } from '@/blocks/RenderPlataforma'
import { AnoAtual } from '@/components/bu1lder/AnoAtual'
import { BuildersHeader } from '@/components/bu1lder/BuildersHeader'
import { PaginaWrapper } from '@/components/bu1lder/Pagina'
import { RodapeParceiros } from '@/components/bu1lder/plataforma/Paginas'
import { metadadosPlataforma } from '@/lib/metadados-plataforma'
import { buscarGlobais, buscarNichosHub, buscarParceiros, lerOuAdiarNoBuild } from '@/lib/paginas'

export async function generateMetadata(): Promise<Metadata> {
  const hub = await lerOuAdiarNoBuild(buscarParceiros)
  return metadadosPlataforma(hub.seo, '/bu1lder/parceiros')
}

export default async function ParceirosBu1lder() {
  const [hub, globais, nichos] = await lerOuAdiarNoBuild(() =>
    Promise.all([buscarParceiros(), buscarGlobais(), buscarNichosHub()]),
  )
  const cab = hub.cabecalho
  return (
    <PaginaWrapper>
      <BuildersHeader
        showBackLink={false}
        ctaText={cab?.textoBotao || undefined}
        ctaShortText={cab?.textoBotaoCurto || undefined}
        ctaUrl={cab?.urlBotao || undefined}
      />
      <RenderPlataforma
        blocos={hub.layout}
        contexto={{
          faqPlataforma: globais.faqPlataforma,
          formulario: globais.formulario,
          nichos: nichos.nichos,
          segmentos: nichos.segmentos,
        }}
      />
      <RodapeParceiros
        texto={hub.rodape?.texto}
        textoLink={hub.rodape?.textoLink}
        urlLink={hub.rodape?.urlLink}
        ano={<AnoAtual anoDoServidor={new Date().getFullYear()} />}
      />
    </PaginaWrapper>
  )
}
