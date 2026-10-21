import config from '@payload-config'
import { getPayload, type Payload } from 'payload'
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'

import { GET as saude } from '@/app/(payload)/api/saude/route'
import robots from '@/app/robots'
import { criarAdminInicial } from '@/lib/admin-inicial'
import { metadataRobots } from '@/lib/noindex'
import { executarSeed, seedNoInit } from '@/seed/executar'
import { paginasSeed } from '@/seed/paginas'

// Integração com o Postgres local. Usuário de teste com e-mail
// teste-vitest-admin@example.com, apagado no fim.
const EMAIL = 'teste-vitest-admin@example.com'
const SENHA = 'senha-de-teste-vitest-123'
let payload: Payload

async function limpar() {
  await payload.delete({ collection: 'users', where: { email: { equals: EMAIL } }, overrideAccess: true })
}

beforeAll(async () => {
  payload = await getPayload({ config })
  await limpar()
})

afterAll(async () => {
  await limpar()
})

describe('admin inicial', () => {
  it('não faz nada sem as variáveis', async () => {
    expect(await criarAdminInicial(payload, { email: EMAIL })).toBe('sem-variaveis')
    expect(await criarAdminInicial(payload, { senha: SENHA })).toBe('sem-variaveis')
    const { totalDocs } = await payload.count({ collection: 'users', where: { email: { equals: EMAIL } } })
    expect(totalDocs).toBe(0)
  })

  it('cria o usuário uma vez, consegue entrar e não registra a senha', async () => {
    const info = vi.spyOn(payload.logger, 'info')
    const erro = vi.spyOn(payload.logger, 'error')

    expect(await criarAdminInicial(payload, { email: ` ${EMAIL.toUpperCase()} `, senha: SENHA })).toBe('criado')
    expect(await criarAdminInicial(payload, { email: EMAIL, senha: 'outra-senha-qualquer' })).toBe('existe')

    const login = await payload.login({ collection: 'users', data: { email: EMAIL, password: SENHA } })
    expect(login.user?.email).toBe(EMAIL)

    const registrado = JSON.stringify([...info.mock.calls, ...erro.mock.calls])
    expect(registrado).not.toContain(SENHA)
    info.mockRestore()
    erro.mockRestore()
  })
})

describe('noindex', () => {
  const original = process.env.SITE_NOINDEX
  afterEach(() => {
    if (original === undefined) delete process.env.SITE_NOINDEX
    else process.env.SITE_NOINDEX = original
  })

  it('SITE_NOINDEX=1 bloqueia indexação e o robots.txt', () => {
    process.env.SITE_NOINDEX = '1'
    expect(metadataRobots()).toEqual({ robots: { index: false, follow: false } })
    expect(robots()).toEqual({ rules: { userAgent: '*', disallow: '/' } })
  })

  it('sem a variável, robots normal', () => {
    delete process.env.SITE_NOINDEX
    expect(metadataRobots()).toEqual({})
    const regras = robots().rules
    expect(Array.isArray(regras) ? regras[0] : regras).toMatchObject({ userAgent: '*', allow: '/' })
  })
})

describe('/api/saude', () => {
  it('responde 200 {ok:true} com o banco no ar', async () => {
    const res = await saude()
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(res.headers.get('cache-control')).toBe('no-store')
  })
})

describe('conteúdo inicial (executarSeed / seedNoInit)', () => {
  it('sem atualizar, rodar de novo não duplica nem grava nada', async () => {
    await executarSeed(payload, { log: () => {} })
    const contar = () => payload.count({ collection: 'paginas', overrideAccess: true }).then((r) => r.totalDocs)
    const antes = await contar()
    const segunda = await executarSeed(payload, { log: () => {} })
    expect(segunda.mudou).toBe(false)
    expect(await contar()).toBe(antes)
    for (const { slug } of paginasSeed) {
      const { totalDocs } = await payload.count({ collection: 'paginas', where: { slug: { equals: slug } } })
      expect(totalDocs).toBe(1)
    }
    const home = await payload.findGlobal({ slug: 'homepage', depth: 0 })
    expect(home.updatedAt).toBeTruthy()
  })

  it('erro no seed do init vai para o log e não é lançado', async () => {
    const falho = {
      findGlobal: async () => {
        throw new Error('banco fora')
      },
      logger: { info: vi.fn(), error: vi.fn() },
    } as unknown as Payload
    await expect(seedNoInit(falho)).resolves.toBe('erro')
    expect(falho.logger.error).toHaveBeenCalledWith(expect.stringContaining('banco fora'))
  })
})
