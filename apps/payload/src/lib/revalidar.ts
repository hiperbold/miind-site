import { revalidatePath } from 'next/cache'
import { after } from 'next/server'

// Revalida todas as páginas em /bu1lder/[slug] (layout incluso). A navegação de
// segmentos, os globais e as imagens aparecem em todas as LPs, então qualquer
// mudança em página, global ou mídia invalida o conjunto inteiro.
//
// - O padrão precisa do grupo de rotas "(site)": sem ele o Next aceita a
//   chamada mas não limpa o cache.
// - Os hooks do Payload rodam dentro da transação (inclusive afterOperation,
//   que vem antes do commit). Por isso a revalidação vai para `after()`, que o
//   Next executa depois que a resposta da API foi enviada, ou seja, depois do
//   commit. Assim uma visita no meio não regenera a página com o dado antigo.
// - Fora de uma requisição do Next (seed, migrate) não há cache para limpar:
//   `after` lança erro e a função não faz nada.
const PADRAO = '/(site)/bu1lder/[slug]'

export function revalidarAgora() {
  revalidatePath(PADRAO, 'layout')
}

export function revalidarPaginas(motivo?: { context?: Record<string, unknown> }) {
  if (motivo?.context?.semRevalidar) return
  try {
    after(() => {
      try {
        revalidarAgora()
      } catch (err) {
        console.error('[revalidar] falhou ao revalidar /bu1lder/[slug]', err)
      }
    })
  } catch {
    // fora do Next: nada a fazer
  }
}
