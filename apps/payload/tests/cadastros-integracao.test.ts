import config from '@payload-config'
import http from 'http'
import type { AddressInfo } from 'net'
import { getPayload, type Payload, type PayloadRequest } from 'payload'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { endpointReenviar } from '@/lib/cadastros/endpoints'
import { LimiteGlobal, LimitePorChave } from '@/lib/cadastros/limite'
import { lerCorpoLimitado, receberCadastro } from '@/lib/cadastros/processar'
import type { User } from '@/payload-types'

// Integração com o Postgres local e um webhook FALSO em 127.0.0.1 (porta livre).
// Nunca usa o webhook real: tests/setup.ts apaga N8N_WEBHOOK_URL.
const DOMINIO = '@teste-vitest-cadastro.example'
const EMAIL_ADMIN = `admin${DOMINIO}`

type Modo = 'ok' | '500' | 'pendurar'
let payload: Payload
let servidor: http.Server
let urlFalsa = ''
let modo: Modo = 'ok'
let recebidos: { corpo: Record<string, unknown>; tipo: string | undefined; segredo: string | undefined }[] = []
let admin: User

async function limpar() {
  await payload.delete({ collection: 'cadastros', where: { email: { like: DOMINIO } }, overrideAccess: true })
  await payload.delete({ collection: 'users', where: { email: { like: DOMINIO } }, overrideAccess: true })
}

beforeAll(async () => {
  expect(process.env.N8N_WEBHOOK_URL).toBeUndefined()
  payload = await getPayload({ config })
  await limpar()
  admin = await payload.create({
    collection: 'users',
    data: { email: EMAIL_ADMIN, password: 'senha-de-teste-vitest-cadastro', role: 'admin' },
    overrideAccess: true,
  })
  servidor = http.createServer((req, res) => {
    let dados = ''
    req.on('data', (c) => (dados += c))
    req.on('end', () => {
      recebidos.push({
        corpo: JSON.parse(dados || '{}'),
        tipo: req.headers['content-type'],
        segredo: req.headers['x-webhook-secret'] as string | undefined,
      })
      if (modo === 'pendurar') return // não responde: o cliente esgota o tempo
      res.statusCode = modo === '500' ? 500 : 200
      res.end(modo === '500' ? 'erro' : '{"ok":true}')
    })
  })
  await new Promise<void>((r) => servidor.listen(0, '127.0.0.1', () => r()))
  urlFalsa = `http://127.0.0.1:${(servidor.address() as AddressInfo).port}/webhook-falso`
})

afterAll(async () => {
  servidor.closeAllConnections()
  await new Promise<void>((r) => servidor.close(() => r()))
  await limpar()
})

beforeEach(() => {
  recebidos = []
  modo = 'ok'
})

const camposContabilidade = (email: string) => ({
  nome: 'Teste Vitest',
  email,
  whatsapp: '(51) 98888-7777',
  cidade_uf: 'Porto Alegre / RS',
  perfil: 'Contador',
  empresas_atendidas: '31 a 100',
  segmento: 'qualquer',
  consent: 'on',
  utm_source: 'meta',
  utm_campaign: 'bu1lder-contabilidade',
  fbclid: 'F1',
  fbc: 'fb.1.1.F1',
  origem: 'http://localhost:3010/bu1lder/contabilidade?utm_source=meta',
  website: '',
  // o servidor ignora estes dois: vêm dos cabeçalhos
  ip: '6.6.6.6',
  user_agent: 'mentira',
})

const corpo = (campos: Record<string, unknown>, extra: Record<string, unknown> = {}) =>
  JSON.stringify({ pagina: 'contabilidade', formulario: 'cadastro-contabilidade', campos, ...extra })

// par comum (não Cloudflare): o IP do cliente é o X-Real-IP
const cabecalhos = (ip: string, extra: Record<string, string> = {}) =>
  new Headers({ 'x-real-ip': ip, 'user-agent': 'Vitest/1.0', ...extra })
const ler = (texto: string) => async (maximo: number) => (texto.length > maximo ? null : texto)
const semTurnstile = { segredo: null }

type OpcoesEnviar = {
  ip?: string
  url?: string
  segredo?: string
  timeoutMs?: number
  limite?: LimitePorChave
  global?: LimiteGlobal
  extraHeaders?: Record<string, string>
  turnstile?: { segredo: string | null; fetch?: typeof fetch }
}
async function enviar(campos: Record<string, unknown>, opcoes: OpcoesEnviar = {}) {
  return receberCadastro({
    payload,
    headers: cabecalhos(opcoes.ip ?? '203.0.113.10', opcoes.extraHeaders),
    lerCorpo: ler(corpo(campos)),
    webhook: { url: opcoes.url ?? urlFalsa, segredo: opcoes.segredo },
    limite: opcoes.limite ?? new LimitePorChave(100, 60_000),
    global: opcoes.global ?? new LimiteGlobal(1000, 60_000),
    turnstile: opcoes.turnstile ?? semTurnstile,
    opcoesEnvio: { timeoutMs: opcoes.timeoutMs ?? 2000 },
  })
}

async function cadastroPorEmail(email: string) {
  const r = await payload.find({ collection: 'cadastros', where: { email: { equals: email } }, overrideAccess: true, limit: 1 })
  return r.docs[0]
}

describe('acesso à coleção cadastros', () => {
  it('anônimo não lê, não cria e não atualiza; logado lê', async () => {
    const r = await enviar(camposContabilidade(`acesso${DOMINIO}`))
    expect(r.status).toBe(200)
    const doc = await cadastroPorEmail(`acesso${DOMINIO}`)

    await expect(payload.find({ collection: 'cadastros', overrideAccess: false })).rejects.toThrow()
    await expect(payload.findByID({ collection: 'cadastros', id: doc.id, overrideAccess: false })).rejects.toThrow()
    await expect(
      payload.create({ collection: 'cadastros', data: { nome: 'x', email: `x${DOMINIO}` }, overrideAccess: false }),
    ).rejects.toThrow()
    await expect(
      payload.create({ collection: 'cadastros', data: { nome: 'x', email: `x${DOMINIO}` }, overrideAccess: false, user: admin }),
    ).rejects.toThrow()
    await expect(
      payload.update({ collection: 'cadastros', id: doc.id, data: { nome: 'mudado' }, overrideAccess: false }),
    ).rejects.toThrow()
    await expect(payload.delete({ collection: 'cadastros', id: doc.id, overrideAccess: false })).rejects.toThrow()

    const logado = await payload.find({ collection: 'cadastros', overrideAccess: false, user: admin, where: { id: { equals: doc.id } } })
    expect(logado.docs[0]?.nome).toBe('Teste Vitest')
  })
})

describe('envio ao webhook falso', () => {
  it('sucesso: grava, envia o contrato com ip e user agent do servidor e marca enviado', async () => {
    const email = `ok${DOMINIO}`
    const r = await enviar(camposContabilidade(email))
    expect(r.status).toBe(200)
    expect(r.corpo).toMatchObject({ ok: true })
    if (!r.corpo.ok) return
    expect(r.corpo.token).toMatch(/^[A-Za-z0-9_-]{32}$/)
    expect(r.corpo.eventId).toMatch(/^lead_[0-9a-f-]{36}$/)
    expect(Object.keys(r.corpo).sort()).toEqual(['eventId', 'ok', 'token'])

    expect(recebidos).toHaveLength(1)
    const c = recebidos[0].corpo
    expect(recebidos[0].tipo).toBe('application/json')
    expect(recebidos[0].segredo).toBeUndefined()
    const doc = await cadastroPorEmail(email)
    expect(c).toMatchObject({
      id: doc.id,
      nome: 'Teste Vitest',
      email,
      whatsapp: '(51) 98888-7777',
      perfil: 'Contador',
      empresas_atendidas: '31 a 100',
      segmentos: [],
      empresa: null,
      cidade_uf: 'Porto Alegre / RS',
      utm_source: 'meta',
      utm_campaign: 'bu1lder-contabilidade',
      fbclid: 'F1',
      fbc: 'fb.1.1.F1',
      origem: 'http://localhost:3010/bu1lder/contabilidade?utm_source=meta',
      ip: '203.0.113.10',
      user_agent: 'Vitest/1.0',
      formulario: 'cadastro-contabilidade',
      tipo: 'lp',
      pagina: 'contabilidade',
      segmento: 'contabilidade',
      consentimento: true,
      event_id: r.corpo.eventId,
    })
    expect(typeof c.criado_em).toBe('string')
    expect(doc.token).toBe(r.corpo.token)
    expect(doc.envio).toMatchObject({ status: 'enviado', tentativas: 1, respostaStatus: 200, ultimoErro: null })
    expect(doc.envio?.enviadoEm).toBeTruthy()
    expect(doc.consentimento).toMatchObject({
      aceito: true,
      texto: 'Autorizo a MIIND a falar comigo por WhatsApp e e-mail sobre o programa Bu1lder.',
    })
  })

  it('500: tenta de novo uma vez, a pessoa segue (ok) e o cadastro fica com falha', async () => {
    modo = '500'
    const email = `quinhentos${DOMINIO}`
    const r = await enviar(camposContabilidade(email))
    expect(r.corpo.ok).toBe(true)
    expect(recebidos).toHaveLength(2)
    const doc = await cadastroPorEmail(email)
    expect(doc.envio).toMatchObject({ status: 'falha', tentativas: 2, respostaStatus: 500, ultimoErro: 'HTTP 500' })
  })

  it('tempo esgotado: tenta de novo uma vez e marca falha', async () => {
    modo = 'pendurar'
    const email = `timeout${DOMINIO}`
    const r = await enviar(camposContabilidade(email), { timeoutMs: 300 })
    expect(r.corpo.ok).toBe(true)
    expect(recebidos).toHaveLength(2)
    const doc = await cadastroPorEmail(email)
    expect(doc.envio).toMatchObject({ status: 'falha', tentativas: 2, ultimoErro: 'tempo esgotado' })
    expect(doc.envio?.ultimoErro).not.toContain('127.0.0.1')
  })

  it('sem webhook configurado: grava e marca falha', async () => {
    const email = `semurl${DOMINIO}`
    const r = await enviar(camposContabilidade(email), { url: '' })
    expect(r.corpo.ok).toBe(true)
    const doc = await cadastroPorEmail(email)
    expect(doc.envio).toMatchObject({ status: 'falha', tentativas: 0, ultimoErro: 'webhook não configurado' })
  })

  it('reenviar: anônimo 401; logado manda de novo e muda para enviado', async () => {
    modo = '500'
    const email = `reenvio${DOMINIO}`
    await enviar(camposContabilidade(email))
    const doc = await cadastroPorEmail(email)
    expect(doc.envio?.status).toBe('falha')

    const original = process.env.N8N_WEBHOOK_URL
    process.env.N8N_WEBHOOK_URL = urlFalsa
    process.env.N8N_WEBHOOK_SECRET = 'segredo-do-teste'
    try {
      const anonimo = await endpointReenviar.handler({ payload, user: null, routeParams: { id: String(doc.id) } } as unknown as PayloadRequest)
      expect(anonimo.status).toBe(401)

      modo = 'ok'
      recebidos = []
      const res = await endpointReenviar.handler({
        payload,
        user: { ...admin, collection: 'users' },
        routeParams: { id: String(doc.id) },
      } as unknown as PayloadRequest)
      expect(res.status).toBe(200)
      expect(await res.json()).toEqual({ ok: true, status: 'enviado' })
      expect(recebidos).toHaveLength(1)
      expect(recebidos[0].corpo.id).toBe(doc.id)
      expect(recebidos[0].segredo).toBe('segredo-do-teste')
      const depois = await cadastroPorEmail(email)
      expect(depois.envio).toMatchObject({ status: 'enviado', tentativas: 3, ultimoErro: null })
    } finally {
      delete process.env.N8N_WEBHOOK_SECRET
      if (original === undefined) delete process.env.N8N_WEBHOOK_URL
      else process.env.N8N_WEBHOOK_URL = original
    }
  })
})

describe('recusas do servidor', () => {
  it('pergunta extra obrigatória e consentimento faltando: 400 com os campos, nada gravado', async () => {
    const email = `invalido${DOMINIO}`
    const r = await enviar({ ...camposContabilidade(email), empresas_atendidas: '', consent: '' })
    expect(r.status).toBe(400)
    expect(r.corpo).toMatchObject({ ok: false })
    if (r.corpo.ok) return
    expect(Object.keys(r.corpo.erros ?? {}).sort()).toEqual(['consent', 'empresas_atendidas'])
    expect(await cadastroPorEmail(email)).toBeUndefined()
    expect(recebidos).toHaveLength(0)
  })

  it('honeypot: 400, nada gravado nem enviado', async () => {
    const email = `robo${DOMINIO}`
    const r = await enviar({ ...camposContabilidade(email), website: 'http://spam.example' })
    expect(r.status).toBe(400)
    expect(await cadastroPorEmail(email)).toBeUndefined()
    expect(recebidos).toHaveLength(0)
  })

  it('formulário inexistente: 400', async () => {
    const r = await receberCadastro({
      payload,
      headers: cabecalhos('203.0.113.11'),
      lerCorpo: ler(corpo(camposContabilidade(`x${DOMINIO}`), { formulario: 'nao-existe' })),
      webhook: { url: urlFalsa },
      limite: new LimitePorChave(100, 60_000),
      turnstile: semTurnstile,
    })
    expect(r.status).toBe(400)
  })

  it('limite por IP: o 6º envio em 10 minutos recebe 429', async () => {
    const limite = new LimitePorChave(5, 10 * 60 * 1000)
    const status: number[] = []
    for (let i = 0; i < 6; i++) {
      const r = await enviar({ ...camposContabilidade(`limite${i}${DOMINIO}`), consent: '' }, { ip: '198.51.100.77', limite })
      status.push(r.status)
    }
    expect(status).toEqual([400, 400, 400, 400, 400, 429])
  })

  it('corpo grande demais: 413 pelo content-length (sem ler) e pela leitura com teto', async () => {
    let leu = false
    const r1 = await receberCadastro({
      payload,
      headers: cabecalhos('203.0.113.12', { 'content-length': String(40 * 1024) }),
      lerCorpo: async () => {
        leu = true
        return ''
      },
      webhook: { url: urlFalsa },
      limite: new LimitePorChave(100, 60_000),
      turnstile: semTurnstile,
    })
    expect(r1.status).toBe(413)
    expect(leu).toBe(false)

    // sem content-length (chunked): a leitura para no teto
    const grande = new ReadableStream<Uint8Array>({
      start(c) {
        for (let i = 0; i < 10; i++) c.enqueue(new Uint8Array(8 * 1024))
        c.close()
      },
    })
    expect(await lerCorpoLimitado(grande, 32 * 1024)).toBeNull()
    const pequeno = new ReadableStream<Uint8Array>({
      start(c) {
        c.enqueue(new TextEncoder().encode('{"a":1}'))
        c.close()
      },
    })
    expect(await lerCorpoLimitado(pequeno, 32 * 1024)).toBe('{"a":1}')
  })

  it('honeypot conta no limite por IP; o 6º pedido dá 429 mesmo trocando CF-Connecting-IP', async () => {
    const limite = new LimitePorChave(5, 10 * 60 * 1000)
    const status: number[] = []
    for (let i = 0; i < 6; i++) {
      const r = await enviar(
        { ...camposContabilidade(`robo${i}${DOMINIO}`), website: 'http://spam.example' },
        { ip: '198.51.100.88', limite, extraHeaders: { 'cf-connecting-ip': `203.0.113.${100 + i}` } },
      )
      status.push(r.status)
    }
    expect(status).toEqual([400, 400, 400, 400, 400, 429])
    expect(recebidos).toHaveLength(0)
    const { totalDocs } = await payload.count({ collection: 'cadastros', where: { email: { like: `robo` } }, overrideAccess: true })
    expect(totalDocs).toBe(0)
  })

  it('CF-Connecting-IP forjado por par comum é ignorado; de par Cloudflare vale', async () => {
    await enviar(camposContabilidade(`forjado${DOMINIO}`), { ip: '198.51.100.90', extraHeaders: { 'cf-connecting-ip': '1.2.3.4' } })
    expect((await cadastroPorEmail(`forjado${DOMINIO}`)).ip).toBe('198.51.100.90')
    await enviar(camposContabilidade(`cloudflare${DOMINIO}`), { ip: '173.245.48.20', extraHeaders: { 'cf-connecting-ip': '203.0.113.55' } })
    expect((await cadastroPorEmail(`cloudflare${DOMINIO}`)).ip).toBe('203.0.113.55')
  })

  it('limite global: acima do teto de envios aceitos, 429 sem gravar', async () => {
    const global = new LimiteGlobal(1, 60_000)
    expect((await enviar(camposContabilidade(`global1${DOMINIO}`), { global })).status).toBe(200)
    const r = await enviar(camposContabilidade(`global2${DOMINIO}`), { global, ip: '203.0.113.60' })
    expect(r.status).toBe(429)
    expect(await cadastroPorEmail(`global2${DOMINIO}`)).toBeUndefined()
  })
})

describe('Turnstile (com chaves)', () => {
  const fetchFalso = (sucesso: boolean, chamadas: URLSearchParams[]) =>
    (async (_url: unknown, init?: RequestInit) => {
      chamadas.push(init?.body as URLSearchParams)
      return new Response(JSON.stringify({ success: sucesso }), { status: 200 })
    }) as unknown as typeof fetch

  it('token reprovado: 400 sem gravar; aprovado: grava', async () => {
    const chamadas: URLSearchParams[] = []
    const ruim = await enviar(
      { ...camposContabilidade(`ts-ruim${DOMINIO}`), 'cf-turnstile-response': 'tok-ruim' },
      { turnstile: { segredo: 'segredo-ts', fetch: fetchFalso(false, chamadas) } },
    )
    expect(ruim.status).toBe(400)
    expect(await cadastroPorEmail(`ts-ruim${DOMINIO}`)).toBeUndefined()
    const bom = await enviar(
      { ...camposContabilidade(`ts-bom${DOMINIO}`), 'cf-turnstile-response': 'tok-bom' },
      { turnstile: { segredo: 'segredo-ts', fetch: fetchFalso(true, chamadas) } },
    )
    expect(bom.status).toBe(200)
    expect(chamadas[1].get('response')).toBe('tok-bom')
    expect(chamadas[1].get('secret')).toBe('segredo-ts')
    expect(chamadas[1].get('remoteip')).toBe('203.0.113.10')
  })
})
