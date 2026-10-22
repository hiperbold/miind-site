import config from '@payload-config'
import { getPayload, type Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import type { User } from '@/payload-types'

// Papéis admin x editor, senha mínima e bloqueio do cadastro anônimo em produção.
const DOMINIO = '@teste-vitest-papeis.example'
const SENHA = 'senha-de-teste-papeis-123'
let payload: Payload
let admin: User
let editor: User

const comoUsuario = (u: User) => ({ ...u, collection: 'users' as const })

async function limpar() {
  await payload.delete({ collection: 'cadastros', where: { email: { like: DOMINIO } }, overrideAccess: true })
  await payload.delete({ collection: 'users', where: { email: { like: DOMINIO } }, overrideAccess: true })
}

beforeAll(async () => {
  payload = await getPayload({ config })
  await limpar()
  admin = await payload.create({ collection: 'users', data: { email: `admin${DOMINIO}`, password: SENHA, role: 'admin' } })
  // sem role: o padrão (editor) vale
  editor = await payload.create({ collection: 'users', data: { email: `editor${DOMINIO}`, password: SENHA } as never })
})

afterAll(async () => {
  await limpar()
})

describe('papéis', () => {
  it('usuário novo nasce editor', () => {
    expect(editor.role).toBe('editor')
    expect(admin.role).toBe('admin')
  })

  it('editor não cria, não apaga e não lê outros usuários; admin cria', async () => {
    await expect(
      payload.create({
        collection: 'users',
        data: { email: `novo${DOMINIO}`, password: SENHA, role: 'editor' },
        overrideAccess: false,
        user: comoUsuario(editor),
      }),
    ).rejects.toThrow()
    await expect(
      payload.delete({ collection: 'users', id: admin.id, overrideAccess: false, user: comoUsuario(editor) }),
    ).rejects.toThrow()
    const lista = await payload.find({ collection: 'users', overrideAccess: false, user: comoUsuario(editor), limit: 100 })
    expect(lista.docs.map((d) => d.id)).toEqual([editor.id])
    const novo = await payload.create({
      collection: 'users',
      data: { email: `novo${DOMINIO}`, password: SENHA, role: 'editor' },
      overrideAccess: false,
      user: comoUsuario(admin),
    })
    expect(novo.role).toBe('editor')
  })

  it('editor não se promove a admin', async () => {
    const r = await payload.update({
      collection: 'users',
      id: editor.id,
      data: { role: 'admin' },
      overrideAccess: false,
      user: comoUsuario(editor),
    })
    expect(r.role).toBe('editor')
  })

  it('scripts personalizados: editor não grava; admin grava', async () => {
    const antes = await payload.findGlobal({ slug: 'ty-page', depth: 0 })
    try {
      await payload.updateGlobal({
        slug: 'ty-page',
        data: { scriptsPersonalizados: { bodyFim: '<script>editor()</script>' }, exporContatoAosScripts: true, texto: antes.texto },
        overrideAccess: false,
        user: comoUsuario(editor),
      })
      let depois = await payload.findGlobal({ slug: 'ty-page', depth: 0 })
      expect(depois.scriptsPersonalizados?.bodyFim ?? '').not.toContain('editor()')
      expect(depois.exporContatoAosScripts).toBe(antes.exporContatoAosScripts ?? false)

      await payload.updateGlobal({
        slug: 'ty-page',
        data: { scriptsPersonalizados: { bodyFim: '<script>admin()</script>' } },
        overrideAccess: false,
        user: comoUsuario(admin),
      })
      depois = await payload.findGlobal({ slug: 'ty-page', depth: 0 })
      expect(depois.scriptsPersonalizados?.bodyFim).toContain('admin()')
    } finally {
      await payload.updateGlobal({
        slug: 'ty-page',
        data: {
          scriptsPersonalizados: antes.scriptsPersonalizados ?? {},
          exporContatoAosScripts: antes.exporContatoAosScripts ?? false,
        },
      })
    }
  })

  it('cadastros: editor lê, mas não apaga; admin apaga', async () => {
    const c = await payload.create({
      collection: 'cadastros',
      data: { nome: 'Papel', email: `cadastro${DOMINIO}`, token: `tok-papeis-${Date.now()}`, event_id: `lead_papeis_${Date.now()}` },
      overrideAccess: true,
    })
    const lido = await payload.findByID({ collection: 'cadastros', id: c.id, overrideAccess: false, user: comoUsuario(editor) })
    expect(lido.nome).toBe('Papel')
    await expect(
      payload.delete({ collection: 'cadastros', id: c.id, overrideAccess: false, user: comoUsuario(editor) }),
    ).rejects.toThrow()
    await payload.delete({ collection: 'cadastros', id: c.id, overrideAccess: false, user: comoUsuario(admin) })
  })
})

describe('senha e criação de usuário', () => {
  it('senha com menos de 12 caracteres é recusada', async () => {
    await expect(
      payload.create({ collection: 'users', data: { email: `curta${DOMINIO}`, password: 'curta12345', role: 'editor' } }),
    ).rejects.toMatchObject({
      data: { errors: [{ path: 'password', message: expect.stringMatching(/12 caracteres/) }] },
    })
  })

  it('em produção, criação sem login (first-register) é recusada; a do sistema passa', async () => {
    const env = process.env as Record<string, string | undefined>
    const original = env.NODE_ENV
    env.NODE_ENV = 'production'
    try {
      await expect(
        payload.create({ collection: 'users', data: { email: `anonimo${DOMINIO}`, password: SENHA, role: 'editor' }, overrideAccess: true }),
      ).rejects.toThrow(/desativada/)
      const ok = await payload.create({
        collection: 'users',
        data: { email: `sistema${DOMINIO}`, password: SENHA, role: 'admin' },
        overrideAccess: true,
        context: { criacaoPeloSistema: true },
      })
      expect(ok.role).toBe('admin')
    } finally {
      env.NODE_ENV = original
    }
  })
})
