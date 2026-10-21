import type { PaginaSeed } from '../tipos'
import { academias } from './academias'
import { agenciaMarketing } from './agencia-marketing'
import { beleza } from './beleza'
import { contabilidade } from './contabilidade'
import { imobiliarias } from './imobiliarias'
import { odontologia } from './odontologia'
import { oficinas } from './oficinas'
import { pet } from './pet'
import { restaurantes } from './restaurantes'
import { saude } from './saude'
import { varejo } from './varejo'

// Mesma ordem da navegação de segmentos da prévia (agência primeiro, depois data/niches.ts).
export const paginasSeed: PaginaSeed[] = [
  agenciaMarketing,
  beleza,
  odontologia,
  saude,
  oficinas,
  pet,
  restaurantes,
  imobiliarias,
  academias,
  contabilidade,
  varejo,
]
