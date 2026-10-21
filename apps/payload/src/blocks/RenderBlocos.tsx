import React from 'react'

import type { Pagina } from '@/payload-types'

import { AntesDepoisBloco } from './AntesDepois/Component'
import { ArgumentoBloco } from './Argumento/Component'
import { CartoesBloco } from './Cartoes/Component'
import { CartoesSegmentoBloco } from './CartoesSegmento/Component'
import { ChamadaCadastroBloco } from './ChamadaCadastro/Component'
import { ChecklistBloco } from './Checklist/Component'
import type { ContextoBloco } from './contexto'
import { DestaqueBloco } from './Destaque/Component'
import { FaixaNumerosBloco } from './FaixaNumeros/Component'
import { FaqBloco } from './Faq/Component'
import { HeroCelularBloco } from './HeroCelular/Component'
import { HeroFluxoBloco } from './HeroFluxo/Component'
import { LinhaDoTempoBloco } from './LinhaDoTempo/Component'
import { ModulosBloco } from './Modulos/Component'
import { NotasFacilidadeBloco } from './NotasFacilidade/Component'
import { SimuladorBloco } from './Simulador/Component'
import { TextoListaBloco } from './TextoLista/Component'

type Bloco = NonNullable<Pagina['layout']>[number]

function renderBloco(bloco: Bloco, contexto: ContextoBloco) {
  switch (bloco.blockType) {
    case 'heroCelular':
      return <HeroCelularBloco bloco={bloco} contexto={contexto} />
    case 'heroFluxo':
      return <HeroFluxoBloco bloco={bloco} />
    case 'cartoes':
      return <CartoesBloco bloco={bloco} />
    case 'destaque':
      return <DestaqueBloco bloco={bloco} />
    case 'checklist':
      return <ChecklistBloco bloco={bloco} />
    case 'faixaNumeros':
      return <FaixaNumerosBloco bloco={bloco} />
    case 'linhaDoTempo':
      return <LinhaDoTempoBloco bloco={bloco} />
    case 'modulos':
      return <ModulosBloco bloco={bloco} />
    case 'cartoesSegmento':
      return <CartoesSegmentoBloco bloco={bloco} />
    case 'textoLista':
      return <TextoListaBloco bloco={bloco} />
    case 'simulador':
      return <SimuladorBloco bloco={bloco} contexto={contexto} />
    case 'notasFacilidade':
      return <NotasFacilidadeBloco bloco={bloco} />
    case 'antesDepois':
      return <AntesDepoisBloco bloco={bloco} />
    case 'argumento':
      return <ArgumentoBloco bloco={bloco} />
    case 'faq':
      return <FaqBloco bloco={bloco} contexto={contexto} />
    case 'chamadaCadastro':
      return <ChamadaCadastroBloco bloco={bloco} contexto={contexto} />
    default:
      return null
  }
}

export function RenderBlocos({ blocos, contexto }: { blocos: Pagina['layout']; contexto: ContextoBloco }) {
  return (
    <>
      {(blocos ?? []).map((bloco, i) => (
        <React.Fragment key={bloco.id ?? i}>{renderBloco(bloco, contexto)}</React.Fragment>
      ))}
    </>
  )
}
