import type { Block } from 'payload'

import { Camadas } from './Camadas/config'
import { CartoesLink } from './CartoesLink/config'
import { CasosUso } from './CasosUso/config'
import { ChamadaFinalCadastro } from './ChamadaFinalCadastro/config'
import { Contato } from './Contato/config'
import { Convite } from './Convite/config'
import { DepoimentoDestaque } from './DepoimentoDestaque/config'
import { EtapasPlataforma } from './EtapasPlataforma/config'
import { FaixaEstatisticas } from './FaixaEstatisticas/config'
import { FaixaNomes } from './FaixaNomes/config'
import { FaqSecao } from './FaqSecao/config'
import { GradeCartoes } from './GradeCartoes/config'
import { GradeNichos } from './GradeNichos/config'
import { HeroCadastro } from './HeroCadastro/config'
import { HeroPlataforma } from './HeroPlataforma/config'
import { Manifesto } from './Manifesto/config'
import { Metricas } from './Metricas/config'
import { PassosHub } from './PassosHub/config'
import { PublicoAlvo } from './PublicoAlvo/config'

// Blocos da homepage (global "homepage") e do programa de parceiros (global
// "parceiros"). Os dois globais aceitam todos: um bloco desenhado para uma
// página pode ser usado na outra.
export const blocosPlataforma: Block[] = [
  HeroPlataforma,
  HeroCadastro,
  FaixaNomes,
  FaixaEstatisticas,
  GradeCartoes,
  Camadas,
  PublicoAlvo,
  EtapasPlataforma,
  PassosHub,
  CasosUso,
  Metricas,
  DepoimentoDestaque,
  Manifesto,
  CartoesLink,
  GradeNichos,
  FaqSecao,
  Convite,
  Contato,
  ChamadaFinalCadastro,
]
