import http from 'http'
import type { AddressInfo } from 'net'

import config from '@payload-config'
import { getPayload, type Payload } from 'payload'
import pg from 'pg'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { GET as getC15t } from '@/app/(payload)/api/c15t/[[...route]]/route'
import * as rotaC15t from '@/app/(payload)/api/c15t/[[...route]]/route'
import { POST as postSubjects } from '@/app/(site)/bu1lder/api/c15t/subjects/route'
import { criarAgendamento } from '@/lib/agendamento'
import { formIdContato } from '@/lib/cadastros/ids'
import { LimiteGlobal, LimitePorChave } from '@/lib/cadastros/limite'
import { receberCadastro } from '@/lib/cadastros/processar'
import { EVENTO_CONTATO_PLATAFORMA, EVENTO_LEAD, eventoDoFormulario } from '@/lib/cadastros/propriedades-lead'
import { registrarLeadServidor, type DadosLeadServidor } from '@/lib/cadastros/tracking'
import { ehRequisicaoInterna } from '@/tracking/acesso-interno'
import { dominioCanonico } from '@/tracking/banner-subjects'
import { c15tHandler, migrateC15t } from '@/tracking/c15t'

import { novoSubjectSelado } from './helpers/subject'

// Achados da revisão da fase 4 (tracking). Integração com o Postgres local
// (banco do Payload e do c15t). Nenhum teste fala com o n8n real: o webhook é
// um servidor falso local.

const DOMINIO = '@teste-vitest-revisao.example'
const ENV_ORIGINAL = { ...process.env }
const restaurarEnv = () => {
  for (const k of Object.keys(process.env)) if (!(k in ENV_ORIGINAL)) delete process.env[k]
  Object.assign(process.env, ENV_ORIGINAL)
  delete process.env.N8N_WEBHOOK_URL
}

describe('register() nunca rejeita por causa do tracking', () => {
  const rodarRegister = async () => {
    vi.resetModules()
    process.env.NEXT_RUNTIME = 'nodejs'
    delete process.env.NEXT_PHASE
    const { register } = await import('@/instrumentation')
    return register()
  }

  afterAll(() => {
    vi.doUnmock('payload')
    vi.resetModules()
    restaurarEnv()
  })

  it('sem C15T_DATABASE_URI: resolve e registra que o consentimento está desligado', async () => {
    const erros = vi.spyOn(console, 'error').mockImplementation(() => {})
    const avisos = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      delete process.env.C15T_DATABASE_URI
      process.env.TRACKING_WORKER = '0'
      await expect(rodarRegister()).resolves.toBeUndefined()
      const linhas = [...erros.mock.calls, ...avisos.mock.calls].map((c) => String(c[0]))
      expect(linhas.some((l) => l.includes('consentimento desligado: C15T_DATABASE_URI ausente'))).toBe(true)
    } finally {
      erros.mockRestore()
      avisos.mockRestore()
      restaurarEnv()
    }
  })

  it('banco inacessível na subida: resolve, sem endereço nem senha no log', async () => {
    const erros = vi.spyOn(console, 'error').mockImplementation(() => {})
    const avisos = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      process.env.DATABASE_URI = 'postgres://usuario:SENHA-SECRETA@127.0.0.1:1/miind_bu1lder'
      process.env.C15T_DATABASE_URI = 'postgres://usuario:SENHA-SECRETA@127.0.0.1:1/miind_bu1lder_c15t'
      process.env.TRACKING_WORKER = '0'
      await expect(rodarRegister()).resolves.toBeUndefined()
      const linhas = [...erros.mock.calls, ...avisos.mock.calls].map((c) => c.map(String).join(' '))
      expect(linhas.some((l) => l.includes('[c15t] preparação do banco do consentimento falhou'))).toBe(true)
      expect(linhas.join('\n')).not.toContain('SENHA-SECRETA')
    } finally {
      erros.mockRestore()
      avisos.mockRestore()
      restaurarEnv()
    }
  })

  it('Payload indisponível para o worker: resolve e registra o erro', async () => {
    const erros = vi.spyOn(console, 'error').mockImplementation(() => {})
    const avisos = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      vi.doMock('payload', async (original) => ({
        ...(await original<typeof import('payload')>()),
        getPayload: async () => {
          throw new Error('cannot connect to Postgres postgres://u:SENHA-SECRETA@db:5432/x')
        },
      }))
      delete process.env.C15T_DATABASE_URI
      delete process.env.TRACKING_WORKER
      await expect(rodarRegister()).resolves.toBeUndefined()
      const linhas = erros.mock.calls.map((c) => String(c[0]))
      expect(linhas.some((l) => l.startsWith('[tracking] início do tracking falhou'))).toBe(true)
      expect(linhas.join('\n')).not.toContain('SENHA-SECRETA')
    } finally {
      vi.doUnmock('payload')
      erros.mockRestore()
      avisos.mockRestore()
      restaurarEnv()
    }
  })
})

describe('c15t sem C15T_DATABASE_URI', () => {
  afterAll(() => {
    vi.resetModules()
    restaurarEnv()
  })

  it('as rotas do c15t respondem 503 sem criar conexão', async () => {
    vi.resetModules()
    delete process.env.C15T_DATABASE_URI
    const c15t = await import('@/tracking/c15t')
    expect(c15t.c15tConfigurado()).toBe(false)
    const r = await c15t.c15tHandler(new Request('http://127.0.0.1:3010/api/c15t/status'))
    expect(r.status).toBe(503)
    await expect(c15t.migrateC15t()).rejects.toThrow('C15T_DATABASE_URI ausente')
    const rota = await import('@/app/(payload)/api/c15t/[[...route]]/route')
    expect((await rota.GET(new Request('http://127.0.0.1:3010/api/c15t/status'))).status).toBe(503)
  })
})

describe('/api/c15t só para o próprio servidor', () => {
  beforeAll(async () => {
    await migrateC15t()
  })

  it('só GET é exportado (o módulo só lê GET /subjects/:id)', () => {
    expect(Object.keys(rotaC15t).filter((k) => /^[A-Z]+$/.test(k))).toEqual(['GET'])
  })

  it('com X-Forwarded-For de fora, X-Real-IP ou CF-Connecting-IP: 404', async () => {
    const url = 'http://127.0.0.1:3010/api/c15t/status'
    expect((await getC15t(new Request(url, { headers: { 'x-forwarded-for': '203.0.113.5' } }))).status).toBe(404)
    expect((await getC15t(new Request(url, { headers: { 'x-forwarded-for': '127.0.0.1, 203.0.113.5' } }))).status).toBe(404)
    expect((await getC15t(new Request(url, { headers: { 'x-real-ip': '127.0.0.1' } }))).status).toBe(404)
    expect((await getC15t(new Request(url, { headers: { 'cf-connecting-ip': '203.0.113.5' } }))).status).toBe(404)
  })

  it('chamada interna (sem cabeçalho ou com o X-Forwarded-For de loopback que o Next preenche) é atendida', async () => {
    const url = 'http://127.0.0.1:3010/api/c15t/status'
    expect((await getC15t(new Request(url))).status).toBe(200)
    expect((await getC15t(new Request(url, { headers: { 'x-forwarded-for': '::ffff:127.0.0.1' } }))).status).toBe(200)
    expect(ehRequisicaoInterna(new Headers({ 'x-forwarded-for': '::1' }))).toBe(true)
    expect(ehRequisicaoInterna(new Headers({ 'x-forwarded-for': 'lixo' }))).toBe(false)
  })

  it('documentação OpenAPI desligada', async () => {
    for (const caminho of ['/api/c15t/spec.json', '/api/c15t/docs']) {
      const r = await c15tHandler(new Request(`http://127.0.0.1:3010${caminho}`))
      expect(r.status, caminho).toBe(404)
    }
  })
})

describe('POST do banner (/bu1lder/api/c15t/subjects)', () => {
  let ipSeq = 0
  const ip = () => `198.51.100.${(ipSeq += 1)}`
  const corpo = (subjectId: string, extra: Record<string, unknown> = {}) =>
    JSON.stringify({
      domain: 'evil.example',
      givenAt: Date.now(),
      preferences: { measurement: true, marketing: false },
      subjectId,
      type: 'cookie_banner',
      ...extra,
    })
  const post = (headers: Record<string, string>, body: string) =>
    postSubjects(
      new Request('http://localhost:3010/bu1lder/api/c15t/subjects', {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...headers },
        body,
      }),
    )

  beforeAll(async () => {
    await migrateC15t()
  })

  it('sem cookie pt_subject: 403', async () => {
    const { subjectId } = await novoSubjectSelado()
    expect((await post({ 'x-real-ip': ip() }, corpo(subjectId))).status).toBe(403)
  })

  it('cookie de outro subject ou adulterado: 403', async () => {
    const a = await novoSubjectSelado()
    const b = await novoSubjectSelado()
    expect((await post({ 'x-real-ip': ip(), cookie: a.cookie }, corpo(b.subjectId))).status).toBe(403)
    const adulterado = a.cookie.replace(a.subjectId, b.subjectId)
    expect((await post({ 'x-real-ip': ip(), cookie: adulterado }, corpo(b.subjectId))).status).toBe(403)
  })

  it('subject do cookie: grava, com o domínio do servidor e não o do corpo', async () => {
    const { subjectId, cookie } = await novoSubjectSelado()
    const r = await post({ 'x-real-ip': ip(), cookie }, corpo(subjectId))
    expect(r.status, await r.clone().text()).toBe(200)
    expect(r.headers.get('cache-control')).toBe('private, no-store')
    const lido = await c15tHandler(new Request(`http://127.0.0.1:3010/api/c15t/subjects/${subjectId}`))
    const texto = await lido.text()
    expect(lido.status, texto).toBe(200)
    expect(texto).not.toContain('evil.example')
    // o c15t só conhece o domínio fixado pelo servidor
    const cliente = new pg.Client({ connectionString: process.env.C15T_DATABASE_URI })
    await cliente.connect()
    try {
      const { rows } = await cliente.query<{ name: string }>('SELECT name FROM "domain"')
      expect(rows.map((l) => l.name)).toContain(dominioCanonico())
      expect(rows.map((l) => l.name)).not.toContain('evil.example')
    } finally {
      await cliente.end()
    }
  })

  it('limite por IP: o 21º pedido em 10 minutos recebe 429', async () => {
    const mesmo = ip()
    const { subjectId } = await novoSubjectSelado()
    for (let i = 0; i < 20; i += 1) expect((await post({ 'x-real-ip': mesmo }, corpo(subjectId))).status).toBe(403)
    expect((await post({ 'x-real-ip': mesmo }, corpo(subjectId))).status).toBe(429)
    // outro IP segue normal
    expect((await post({ 'x-real-ip': ip() }, corpo(subjectId))).status).toBe(403)
  })
})

describe('reunião agendada: marca só depois do disparo', () => {
  const memoria = () => {
    const m = new Map<string, string>()
    return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), m }
  }

  it('não grava antes de resolver; grava depois', async () => {
    const s = memoria()
    let resolver: () => void = () => {}
    const pendente = new Promise<void>((r) => (resolver = r))
    const agendou = criarAgendamento({ token: 'tok', armazenamento: s, novoId: () => 'u1', disparar: () => pendente })
    expect(agendou()).toBe(true)
    expect(agendou()).toBe(false)
    expect(s.m.size).toBe(0)
    resolver()
    await pendente
    await new Promise((r) => setTimeout(r, 0))
    expect(s.m.get('bu1lder:agendado:tok')).toBe('1')
  })

  it('disparo que rejeita não grava a marca e permite tentar de novo', async () => {
    const s = memoria()
    let vez = 0
    const ids: string[] = []
    const agendou = criarAgendamento({
      token: 'tok',
      armazenamento: s,
      novoId: () => `u${(vez += 1)}`,
      disparar: async (id) => {
        ids.push(id)
        if (ids.length === 1) throw new Error('falhou')
      },
    })
    expect(agendou()).toBe(true)
    await new Promise((r) => setTimeout(r, 0))
    expect(s.m.size).toBe(0)
    expect(agendou()).toBe(true)
    await new Promise((r) => setTimeout(r, 0))
    expect(ids).toEqual(['sched_u1', 'sched_u2'])
    expect(s.m.get('bu1lder:agendado:tok')).toBe('1')
  })
})

describe('cadastro: tracking fora do caminho da resposta e do n8n', () => {
  let payload: Payload
  let servidor: http.Server
  let urlFalsa: string
  let recebidos: unknown[] = []

  beforeAll(async () => {
    expect(process.env.N8N_WEBHOOK_URL).toBeUndefined()
    payload = await getPayload({ config })
    await payload.delete({ collection: 'cadastros', where: { email: { like: DOMINIO } }, overrideAccess: true })
    servidor = http.createServer((req, res) => {
      let dados = ''
      req.on('data', (c) => (dados += c))
      req.on('end', () => {
        recebidos.push(JSON.parse(dados || '{}'))
        res.end('{"ok":true}')
      })
    })
    await new Promise<void>((r) => servidor.listen(0, '127.0.0.1', () => r()))
    urlFalsa = `http://127.0.0.1:${(servidor.address() as AddressInfo).port}/webhook-falso`
  })

  afterAll(async () => {
    servidor.closeAllConnections()
    await new Promise<void>((r) => servidor.close(() => r()))
    await payload.delete({ collection: 'cadastros', where: { email: { like: DOMINIO } }, overrideAccess: true })
  })

  const camposLp = (email: string) => ({
    nome: 'Teste Revisão',
    email,
    whatsapp: '(51) 98888-7777',
    cidade_uf: 'Porto Alegre / RS',
    perfil: 'Contador',
    empresas_atendidas: '31 a 100',
    consent: 'on',
    website: '',
  })

  it('o n8n é agendado antes do tracking, e falha do tracking não afeta o envio nem a resposta', async () => {
    recebidos = []
    const email = `falha${DOMINIO}`
    const tarefas: Array<() => Promise<unknown>> = []
    let chamadasTracking = 0
    const r = await receberCadastro({
      payload,
      headers: new Headers({ 'x-real-ip': '203.0.113.60', 'user-agent': 'Mozilla/5.0 Vitest' }),
      lerCorpo: async () => JSON.stringify({ pagina: 'contabilidade', formulario: 'cadastro-contabilidade', campos: camposLp(email) }),
      webhook: { url: urlFalsa },
      limite: new LimitePorChave(100, 60_000),
      global: new LimiteGlobal(100, 60_000),
      turnstile: { segredo: null },
      agendar: (t) => {
        tarefas.push(t)
      },
      registrarLead: () => {
        chamadasTracking += 1
        throw new Error('tracking fora')
      },
    })
    expect(r.status).toBe(200)
    // nada do tracking rodou no caminho da resposta
    expect(chamadasTracking).toBe(0)
    expect(tarefas).toHaveLength(2)
    // a primeira tarefa agendada é o envio ao n8n
    await tarefas[0]!()
    expect(recebidos).toHaveLength(1)
    // a do tracking falha sem lançar
    await expect(tarefas[1]!()).resolves.toBeUndefined()
    expect(chamadasTracking).toBe(1)
    const cad = await payload.find({ collection: 'cadastros', where: { email: { equals: email } }, overrideAccess: true })
    expect(cad.docs[0]?.envio?.status).toBe('enviado')
  })

  it('sem agendador: tracking que rejeita não impede o n8n nem a resposta', async () => {
    recebidos = []
    const email = `rejeita${DOMINIO}`
    const r = await receberCadastro({
      payload,
      headers: new Headers({ 'x-real-ip': '203.0.113.61' }),
      lerCorpo: async () => JSON.stringify({ pagina: 'contabilidade', formulario: 'cadastro-contabilidade', campos: camposLp(email) }),
      webhook: { url: urlFalsa },
      limite: new LimitePorChave(100, 60_000),
      global: new LimiteGlobal(100, 60_000),
      turnstile: { segredo: null },
      registrarLead: async () => {
        throw new Error('tracking fora')
      },
    })
    expect(r.status).toBe(200)
    expect(recebidos).toHaveLength(1)
  })

  it('contato da plataforma usa a chave contato_plataforma (nunca lead), com o event_id do cadastro', async () => {
    const home = (await payload.findGlobal({ slug: 'homepage', draft: false, depth: 0 })) as {
      layout?: Array<{ blockType: string; ancora?: string | null; formulario?: { opcoesVolume?: { valor: string }[] | null } | null }>
    }
    const bloco = home.layout?.find((b) => b.blockType === 'contato')
    if (!bloco) throw new Error('homepage sem bloco de contato (rode o seed)')
    const recebido: DadosLeadServidor[] = []
    const email = `contato${DOMINIO}`
    const r = await receberCadastro({
      payload,
      headers: new Headers({ 'x-real-ip': '203.0.113.62' }),
      lerCorpo: async () =>
        JSON.stringify({
          pagina: 'homepage',
          formulario: formIdContato(bloco.ancora),
          campos: {
            name: 'Ana Revisão',
            company: 'Empresa',
            role: 'Gerente',
            email,
            phone: '11999998888',
            volume: bloco.formulario?.opcoesVolume?.[0]?.valor ?? '',
            challenge: 'Atendimento manual no WhatsApp',
            consent: 'on',
            website: '',
          },
        }),
      webhook: { url: urlFalsa },
      limite: new LimitePorChave(100, 60_000),
      global: new LimiteGlobal(100, 60_000),
      turnstile: { segredo: null },
      registrarLead: async (dados) => {
        recebido.push(dados)
      },
    })
    expect(r.status, JSON.stringify(r.corpo)).toBe(200)
    if (!r.corpo.ok) throw new Error('envio falhou')
    expect(recebido).toHaveLength(1)
    expect(recebido[0]!.evento).toBe(EVENTO_CONTATO_PLATAFORMA)
    expect(recebido[0]!.eventId).toBe(r.corpo.eventId)
    expect(eventoDoFormulario('lp')).toBe(EVENTO_LEAD)
    expect(eventoDoFormulario('hub')).toBe(EVENTO_LEAD)
  })

  it('sem Evento cadastrado com a chave contato_plataforma, o módulo não envia nada e não dá erro', async () => {
    const eventId = `lead_vitest_contato_${Date.now()}`
    const res = await registrarLeadServidor(
      payload,
      { eventId, evento: EVENTO_CONTATO_PLATAFORMA, pagina: 'contabilidade', email: `x${DOMINIO}`, whatsapp: '51988887777' },
      new Headers({ cookie: '_ga=GA1.1.1.1', 'user-agent': 'Mozilla/5.0 Vitest' }),
    )
    expect(res).toMatchObject({ accepted: 0, reason: 'event_not_found' })
    const linhas = await payload.find({
      collection: 'tracking-deliveries' as never,
      overrideAccess: true,
      where: { eventId: { equals: eventId } },
    })
    expect(linhas.totalDocs).toBe(0)
  })
})
