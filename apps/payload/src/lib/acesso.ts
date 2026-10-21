import type { Access } from 'payload'

export const logado: Access = ({ req: { user } }) => Boolean(user)

export const publico: Access = () => true

// Visitante só lê o que está publicado; quem está logado lê rascunhos também.
export const publicadoOuLogado: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}
