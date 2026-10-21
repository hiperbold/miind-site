import type { Block } from 'payload'

import { AntesDepois } from './AntesDepois/config'
import { Argumento } from './Argumento/config'
import { CartoesSegmento } from './CartoesSegmento/config'
import { ChamadaCadastro } from './ChamadaCadastro/config'
import { FaixaNumeros } from './FaixaNumeros/config'
import { Faq } from './Faq/config'
import { HeroCelular } from './HeroCelular/config'
import { LinhaDoTempo } from './LinhaDoTempo/config'
import { Modulos } from './Modulos/config'
import { NotasFacilidade } from './NotasFacilidade/config'
import { Simulador } from './Simulador/config'
import { TextoLista } from './TextoLista/config'

export const blocosPagina: Block[] = [
  HeroCelular,
  FaixaNumeros,
  LinhaDoTempo,
  Modulos,
  CartoesSegmento,
  TextoLista,
  Simulador,
  NotasFacilidade,
  AntesDepois,
  Argumento,
  Faq,
  ChamadaCadastro,
]
