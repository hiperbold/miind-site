import type { Block } from 'payload'

import { AntesDepois } from './AntesDepois/config'
import { Argumento } from './Argumento/config'
import { Cartoes } from './Cartoes/config'
import { CartoesSegmento } from './CartoesSegmento/config'
import { ChamadaCadastro } from './ChamadaCadastro/config'
import { Checklist } from './Checklist/config'
import { Destaque } from './Destaque/config'
import { FaixaNumeros } from './FaixaNumeros/config'
import { Faq } from './Faq/config'
import { HeroCelular } from './HeroCelular/config'
import { HeroFluxo } from './HeroFluxo/config'
import { LinhaDoTempo } from './LinhaDoTempo/config'
import { Modulos } from './Modulos/config'
import { NotasFacilidade } from './NotasFacilidade/config'
import { Simulador } from './Simulador/config'
import { TextoLista } from './TextoLista/config'

export const blocosPagina: Block[] = [
  HeroCelular,
  HeroFluxo,
  FaixaNumeros,
  LinhaDoTempo,
  Modulos,
  Cartoes,
  CartoesSegmento,
  TextoLista,
  Destaque,
  Checklist,
  Simulador,
  NotasFacilidade,
  AntesDepois,
  Argumento,
  Faq,
  ChamadaCadastro,
]
