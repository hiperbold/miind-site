import type { FaqPlataforma, Formulario } from '@/payload-types'

export type NichoHub = {
  slug: string
  nome: string
  icone?: string | null
  estatistica?: string | null
  texto?: string | null
}

// Dados que os blocos da homepage e do programa precisam além do próprio conteúdo.
export type ContextoPlataforma = {
  faqPlataforma: FaqPlataforma
  formulario: Formulario
  // páginas de nicho publicadas que aparecem na grade do programa
  nichos: NichoHub[]
  // opções do seletor de segmento (todas as páginas de nicho publicadas)
  segmentos: { value: string; label: string }[]
}
