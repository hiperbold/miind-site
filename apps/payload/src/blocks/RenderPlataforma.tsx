import React from 'react'

import type { Homepage } from '@/payload-types'

import { CamadasBloco } from './Camadas/Component'
import { CartoesLinkBloco } from './CartoesLink/Component'
import { CasosUsoBloco } from './CasosUso/Component'
import { ChamadaFinalCadastroBloco } from './ChamadaFinalCadastro/Component'
import { ContatoBloco } from './Contato/Component'
import type { ContextoPlataforma } from './contexto-plataforma'
import { ConviteBloco } from './Convite/Component'
import { DepoimentoDestaqueBloco } from './DepoimentoDestaque/Component'
import { EtapasPlataformaBloco } from './EtapasPlataforma/Component'
import { FaixaEstatisticasBloco } from './FaixaEstatisticas/Component'
import { FaixaNomesBloco } from './FaixaNomes/Component'
import { FaqSecaoBloco } from './FaqSecao/Component'
import { GradeCartoesBloco } from './GradeCartoes/Component'
import { GradeNichosBloco } from './GradeNichos/Component'
import { HeroCadastroBloco } from './HeroCadastro/Component'
import { HeroPlataformaBloco } from './HeroPlataforma/Component'
import { ManifestoBloco } from './Manifesto/Component'
import { MetricasBloco } from './Metricas/Component'
import { PassosHubBloco } from './PassosHub/Component'
import { PublicoAlvoBloco } from './PublicoAlvo/Component'

// Os dois globais usam a mesma lista de blocos, então o tipo do layout é o mesmo.
export type BlocoPlataforma = NonNullable<Homepage['layout']>[number]

function renderBloco(bloco: BlocoPlataforma, contexto: ContextoPlataforma) {
  switch (bloco.blockType) {
    case 'heroPlataforma':
      return <HeroPlataformaBloco bloco={bloco} />
    case 'heroCadastro':
      return <HeroCadastroBloco bloco={bloco} contexto={contexto} />
    case 'faixaNomes':
      return <FaixaNomesBloco bloco={bloco} />
    case 'faixaEstatisticas':
      return <FaixaEstatisticasBloco bloco={bloco} />
    case 'gradeCartoes':
      return <GradeCartoesBloco bloco={bloco} />
    case 'camadas':
      return <CamadasBloco bloco={bloco} />
    case 'publicoAlvo':
      return <PublicoAlvoBloco bloco={bloco} />
    case 'etapasPlataforma':
      return <EtapasPlataformaBloco bloco={bloco} />
    case 'passosHub':
      return <PassosHubBloco bloco={bloco} />
    case 'casosUso':
      return <CasosUsoBloco bloco={bloco} />
    case 'metricas':
      return <MetricasBloco bloco={bloco} />
    case 'depoimentoDestaque':
      return <DepoimentoDestaqueBloco bloco={bloco} />
    case 'manifesto':
      return <ManifestoBloco bloco={bloco} />
    case 'cartoesLink':
      return <CartoesLinkBloco bloco={bloco} />
    case 'gradeNichos':
      return <GradeNichosBloco bloco={bloco} contexto={contexto} />
    case 'faqSecao':
      return <FaqSecaoBloco bloco={bloco} contexto={contexto} />
    case 'convite':
      return <ConviteBloco bloco={bloco} />
    case 'contato':
      return <ContatoBloco bloco={bloco} contexto={contexto} />
    case 'chamadaFinalCadastro':
      return <ChamadaFinalCadastroBloco bloco={bloco} contexto={contexto} />
    default:
      return null
  }
}

export function RenderPlataforma({
  blocos,
  contexto,
}: {
  blocos: BlocoPlataforma[] | null | undefined
  contexto: ContextoPlataforma
}) {
  return (
    <>
      {(blocos ?? []).map((bloco, i) => (
        <React.Fragment key={bloco.id ?? i}>{renderBloco(bloco, contexto)}</React.Fragment>
      ))}
    </>
  )
}
