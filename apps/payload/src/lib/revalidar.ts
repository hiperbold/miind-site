import { revalidatePath } from 'next/cache'

// Revalida todas as páginas em /bu1lder/[slug] (layout incluso). A navegação de
// segmentos e os globais aparecem em todas as LPs, então qualquer mudança em
// página ou global invalida o conjunto inteiro. O padrão precisa do grupo de
// rotas "(site)": sem ele o Next aceita a chamada mas não limpa o cache.
// Fora do servidor Next (seed, migrate) revalidatePath lança erro: aí não há
// cache para limpar.
export function revalidarPaginas(motivo?: { context?: Record<string, unknown> }) {
  if (motivo?.context?.semRevalidar) return
  try {
    revalidatePath('/(site)/bu1lder/[slug]', 'layout')
  } catch {
    // fora do Next: nada a fazer
  }
}
