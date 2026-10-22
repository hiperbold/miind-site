import config from '@payload-config'
import { getPayload, type Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { POST as postSubjects } from '@/app/(site)/bu1lder/api/c15t/subjects/route'
import { LimiteGlobal, LimitePorChave } from '@/lib/cadastros/limite'
import { receberCadastro } from '@/lib/cadastros/processar'
import { registrarLeadServidor } from '@/lib/cadastros/tracking'
import { c15tHandler, migrateC15t } from '@/tracking/c15t'

import { abrirSnapshot } from './helpers/outbox'

// Integração com o Postgres local (banco do Payload e do c15t). Tags com IDs
// FALSOS, criadas e apagadas aqui; o worker não roda nos testes, então nada
// sai da outbox. O c15t é chamado pelo handler real (o fetch do módulo para
// /api/c15t é desviado para ele, sem rede).
const DOMINIO = '@teste-vitest-tracking.example'
let payload: Payload
const limpeza: Array<() => Promise<unknown>> = []
const fetchReal = globalThis.fetch
let metaId: number | string
let ga4Id: number | string

type Entrega = { eventId: string; destinationId: unknown; consentBasis?: string; snapshot: string; idempotencyKey: string; eventKey: string }

async function entregas(eventId: string): Promise<Entrega[]> {
  const r = await payload.find({
    collection: 'tracking-deliveries' as never,
    overrideAccess: true,
    pagination: false,
    where: { eventId: { equals: eventId } },
  })
  return r.docs as unknown as Entrega[]
}

beforeAll(async () => {
  await migrateC15t()
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input)
    if (url.includes('/api/c15t/')) return c15tHandler(new Request(url, init))
    return fetchReal(input as never, init)
  }) as typeof fetch
  payload = await getPayload({ config })
  await payload.delete({ collection: 'cadastros', where: { email: { like: DOMINIO } }, overrideAccess: true })
  const meta = await payload.create({
    collection: 'tracking-tags' as never,
    data: { meta: { capiToken: 'TOKEN-FALSO-VITEST', pixelId: '000000000000001' }, name: 'Meta FALSO vitest', platform: 'meta' } as never,
    overrideAccess: true,
  })
  const ga4 = await payload.create({
    collection: 'tracking-tags' as never,
    data: { ga4: { apiSecret: 'segredo-falso-vitest', measurementId: 'G-FALSOVITEST' }, name: 'GA4 FALSO vitest', platform: 'ga4' } as never,
    overrideAccess: true,
  })
  metaId = (meta as { id: number }).id
  ga4Id = (ga4 as { id: number }).id
  const evento = await payload.create({
    collection: 'tracking-events' as never,
    data: {
      commerceType: 'lead',
      destinations: [{ tag: metaId }, { tag: ga4Id }],
      key: 'lead',
      name: 'Lead (vitest)',
      triggers: [
        { key: 'lead', type: 'server' },
        { key: 'lead', type: 'manual' },
      ],
    } as never,
    overrideAccess: true,
  })
  limpeza.push(async () => {
    await payload.delete({ collection: 'tracking-deliveries' as never, where: { eventKey: { equals: 'lead' } }, overrideAccess: true })
    await payload.delete({ collection: 'tracking-events' as never, id: (evento as { id: number }).id, overrideAccess: true })
    await payload.delete({ collection: 'tracking-tags' as never, id: metaId, overrideAccess: true })
    await payload.delete({ collection: 'tracking-tags' as never, id: ga4Id, overrideAccess: true })
    await payload.delete({ collection: 'cadastros', where: { email: { like: DOMINIO } }, overrideAccess: true })
  })
})

afterAll(async () => {
  for (const passo of limpeza) await passo().catch(() => undefined)
  globalThis.fetch = fetchReal
})

const campos = (email: string) => ({
  nome: 'Teste Tracking',
  email,
  whatsapp: '(51) 98888-7777',
  cidade_uf: 'Porto Alegre / RS',
  perfil: 'Contador',
  empresas_atendidas: '31 a 100',
  consent: 'on',
  origem: 'http://localhost:3010/bu1lder/contabilidade?utm_source=meta',
  website: '',
})

describe('lead pelo servidor no envio do cadastro', () => {
  it('LP sem banner: grava Meta e GA4 na outbox com o event_id do cadastro e os parâmetros de qualificação', async () => {
    const email = `lp${DOMINIO}`
    const r = await receberCadastro({
      payload,
      headers: new Headers({
        'x-real-ip': '203.0.113.20',
        'user-agent': 'Mozilla/5.0 Vitest',
        cookie: '_ga=GA1.1.111111111.1700000000; _fbp=fb.1.1700000000000.123',
      }),
      lerCorpo: async () => JSON.stringify({ pagina: 'contabilidade', formulario: 'cadastro-contabilidade', campos: campos(email) }),
      webhook: { url: undefined },
      limite: new LimitePorChave(100, 60_000),
      global: new LimiteGlobal(100, 60_000),
      turnstile: { segredo: null },
    })
    expect(r.status).toBe(200)
    if (!r.corpo.ok) throw new Error('envio falhou')
    expect(Object.keys(r.corpo).sort()).toEqual(['eventId', 'ok', 'token'])
    const { eventId } = r.corpo
    expect(eventId).toMatch(/^lead_[0-9a-f-]{36}$/)

    const cad = await payload.find({ collection: 'cadastros', where: { email: { equals: email } }, overrideAccess: true })
    expect(cad.docs[0]?.event_id).toBe(eventId)
    // fbp completado pelo cookie da Meta (o formulário não mandou)
    expect(cad.docs[0]?.fbp).toBe('fb.1.1700000000000.123')

    const linhas = await entregas(eventId)
    expect(linhas.map((l) => String(l.destinationId)).sort()).toEqual([String(metaId), String(ga4Id)].sort())
    for (const l of linhas) {
      expect(l.consentBasis).toBe('page_policy_none')
      const s = abrirSnapshot(l)
      const props = (s.context as { properties?: Record<string, string> } | undefined)?.properties
      expect(props).toEqual({ perfil: 'Contador', empresas_atendidas: '31 a 100', pagina: 'contabilidade' })
      const texto = JSON.stringify(s)
      expect(texto).not.toContain(email)
      expect(texto).not.toContain('98888')
    }

    // repetir o mesmo event_id não duplica
    const de_novo = await registrarLeadServidor(
      payload,
      { eventId, pagina: 'contabilidade', email, whatsapp: '(51) 98888-7777' },
      new Headers({ cookie: '_ga=GA1.1.111111111.1700000000' }),
    )
    expect(de_novo?.accepted).toBe(0)
    expect(de_novo?.reason).toBe('replayed')
    expect((await entregas(eventId)).length).toBe(2)
  })

  it('LP com o checkbox marcado exige consentimento: sem decisão, nada entra na outbox', async () => {
    await payload.update({
      collection: 'paginas',
      where: { slug: { equals: 'beleza' } },
      data: { trackingConsentRequired: true, _status: 'published' } as never,
      overrideAccess: true,
      context: { semRevalidar: true },
    })
    try {
      const eventId = `lead_vitest_beleza_${Date.now()}`
      const r = await registrarLeadServidor(
        payload,
        { eventId, pagina: 'beleza', email: `b${DOMINIO}`, whatsapp: '51988887777' },
        new Headers({ cookie: '_ga=GA1.1.1.1' }),
      )
      expect(r?.accepted).toBe(0)
      expect((await entregas(eventId)).length).toBe(0)
    } finally {
      await payload.update({
        collection: 'paginas',
        where: { slug: { equals: 'beleza' } },
        data: { trackingConsentRequired: false, _status: 'published' } as never,
        overrideAccess: true,
        context: { semRevalidar: true },
      })
    }
  })

  it('homepage: sem consentimento não grava; depois do aceite pelo banner (POST /bu1lder/api/c15t/subjects) grava', async () => {
    // subject novo, como o browser-token cria
    const { sealSubject } = await import('../node_modules/@hiperbold/payload-tracking/dist/consent/subjectCookie.js')
    const { loadKeyringFromEnv } = await import('../node_modules/@hiperbold/payload-tracking/dist/vault/repository.js')
    const hmac = loadKeyringFromEnv({
      activeKeyIdEnv: 'PAYLOAD_TRACKING_BROWSER_TOKEN_ACTIVE_KEY_ID',
      keyringEnv: 'PAYLOAD_TRACKING_BROWSER_TOKEN_KEYS',
    })
    const B58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
    const subjectId = `sub_${Array.from({ length: 22 }, () => B58[Math.floor(Math.random() * B58.length)]).join('')}`
    const cookie = `pt_subject=${sealSubject(subjectId, hmac)}; _ga=GA1.1.222222222.1700000000`

    const antes = `lead_vitest_home_a_${Date.now()}`
    const r1 = await registrarLeadServidor(payload, { eventId: antes, pagina: 'homepage', email: `h${DOMINIO}`, whatsapp: '51988887777' }, new Headers({ cookie }))
    expect(r1?.accepted).toBe(0)
    expect((await entregas(antes)).length).toBe(0)

    const resp = await postSubjects(
      new Request('http://localhost:3010/bu1lder/api/c15t/subjects', {
        method: 'POST',
        headers: { 'content-type': 'application/json', origin: 'http://localhost:3010', cookie, 'x-real-ip': '203.0.113.31' },
        body: JSON.stringify({
          domain: 'localhost',
          givenAt: Date.now(),
          preferences: { measurement: true, marketing: true },
          subjectId,
          type: 'cookie_banner',
        }),
      }),
    )
    expect(resp.ok).toBe(true)
    expect(resp.headers.get('cache-control')).toBe('private, no-store')

    const depois = `lead_vitest_home_b_${Date.now()}`
    const r2 = await registrarLeadServidor(payload, { eventId: depois, pagina: 'homepage', email: `h${DOMINIO}`, whatsapp: '51988887777' }, new Headers({ cookie }))
    expect(r2, JSON.stringify(r2)).toMatchObject({ accepted: 2 })
    const linhas = await entregas(depois)
    expect(linhas.every((l) => l.consentBasis === 'consent')).toBe(true)
  })

  it('a rota do banner recusa corpo grande', async () => {
    const resp = await postSubjects(
      new Request('http://localhost:3010/bu1lder/api/c15t/subjects', { method: 'POST', body: 'x'.repeat(5000) }),
    )
    expect(resp.status).toBe(413)
  })
})
