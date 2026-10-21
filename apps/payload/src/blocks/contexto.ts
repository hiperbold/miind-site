import type { FaqPlataforma, Formulario, Plano } from '@/payload-types'

// Dados da página e globais que os blocos precisam além do próprio conteúdo.
export type ContextoBloco = {
  slug: string
  comNavegacaoSegmentos: boolean
  planos: Plano
  faqPlataforma: FaqPlataforma
  formulario: Formulario
}
