import type { Access, CollectionBeforeChangeHook, CollectionBeforeValidateHook, CollectionConfig } from 'payload'
import { APIError, ValidationError } from 'payload'

import { campoSoAdmin, ehAdmin, soAdmin } from '@/lib/acesso'

export const SENHA_MINIMA = 12
const emProducao = process.env.NODE_ENV === 'production'

// Admin lê todos; editor lê só o próprio usuário.
const lerUsuarios: Access = ({ req: { user } }) => {
  if (!user) return false
  if (ehAdmin(user)) return true
  return { id: { equals: user.id } }
}

// Senha com no mínimo 12 caracteres, em toda criação e troca de senha.
const conferirSenha: CollectionBeforeValidateHook = ({ data, req }) => {
  const senha = (data as { password?: unknown } | undefined)?.password
  if (typeof senha === 'string' && senha.length < SENHA_MINIMA) {
    throw new ValidationError(
      { collection: 'users', errors: [{ path: 'password', message: `A senha precisa ter pelo menos ${SENHA_MINIMA} caracteres.` }] },
      req.t,
    )
  }
  return data
}

// Em produção, usuário só nasce de quem já está logado (admin, pelo access) ou
// do próprio sistema (admin inicial do init, seed), marcado em context. Isso
// fecha o "criar primeiro usuário" (/api/users/first-register e a tela
// /admin/create-first-user), que o Payload executa sem usuário logado.
const bloquearCriacaoAnonima: CollectionBeforeChangeHook = ({ operation, req, context }) => {
  if (operation !== 'create' || req.user || context?.criacaoPeloSistema === true) return
  // lido na hora (e não no import) para os testes conseguirem simular produção
  if (process.env.NODE_ENV !== 'production') return
  req.payload.logger.error(
    'Criação de usuário sem login recusada em produção (first-register). Defina SEED_ADMIN_EMAIL e SEED_ADMIN_PASSWORD para o admin inicial.',
  )
  throw new APIError('Criação de usuário desativada. Peça acesso a um administrador.', 403)
}

// O primeiro usuário do banco é sempre admin (senão ninguém gerenciaria usuários).
const primeiroEhAdmin: CollectionBeforeChangeHook = async ({ operation, req, data }) => {
  if (operation !== 'create') return data
  const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true, req })
  return totalDocs === 0 ? { ...data, role: 'admin' } : data
}

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuário', plural: 'Usuários' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'updatedAt'],
    description:
      'Admin gerencia usuários e scripts. Editor edita conteúdo. Recuperar senha por e-mail exige um adaptador de e-mail, ainda não configurado.',
  },
  auth: {
    cookies: { secure: emProducao, sameSite: 'Lax' },
  },
  access: {
    read: lerUsuarios,
    create: soAdmin,
    delete: soAdmin,
    // editor troca a própria senha; o papel só o admin muda (acesso do campo)
    update: lerUsuarios,
  },
  hooks: {
    beforeValidate: [conferirSenha],
    beforeChange: [bloquearCriacaoAnonima, primeiroEhAdmin],
  },
  fields: [
    {
      name: 'role',
      label: 'Papel',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: { create: campoSoAdmin, update: campoSoAdmin },
      admin: { position: 'sidebar' },
    },
  ],
}
