import type { Access, FieldAccess } from 'payload'

// Papéis: admin (tudo, inclusive usuários e scripts) e editor (conteúdo).
type ComPapel = { role?: string | null; collection?: string } | null | undefined

export const ehAdmin = (user: ComPapel) => user?.collection !== 'users' ? false : user?.role === 'admin'

export const logado: Access = ({ req: { user } }) => Boolean(user)

export const soAdmin: Access = ({ req: { user } }) => ehAdmin(user as ComPapel)

// Acesso por campo: só admin grava (scripts, embeds, exposição de contato).
export const campoSoAdmin: FieldAccess = ({ req: { user } }) => ehAdmin(user as ComPapel)

export const publico: Access = () => true

// Visitante só lê o que está publicado; quem está logado lê rascunhos também.
export const publicadoOuLogado: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}
