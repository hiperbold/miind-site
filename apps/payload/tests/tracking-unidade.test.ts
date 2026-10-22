import { describe, expect, it } from 'vitest'

import { criarAgendamento, ehAgendamentoCalendly } from '@/lib/agendamento'
import { propriedadesLead } from '@/lib/cadastros/propriedades-lead'
import { caminhoDaPagina } from '@/lib/cadastros/tracking'
import {
  CHAVE_DECISAO,
  gravarDecisao,
  lerDecisao,
  registrarDecisao,
  TODAS,
  URL_BROWSER_TOKEN,
  URL_C15T_SUBJECTS,
} from '@/lib/consentimento'
import { trackingOptions } from '@/tracking/options'
import { alvoDoBancoC15t } from '@/tracking/banco-c15t'

const memoria = () => {
  const m = new Map<string, string>()
  return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), m }
}

describe('opções do tracking', () => {
  it('LPs de nicho pela coleção paginas, ty-page isenta, cookie e token sob /bu1lder', () => {
    expect(trackingOptions.consentPolicy?.pages).toEqual([{ collection: 'paginas', pathField: 'slug', pathPrefix: '/bu1lder' }])
    expect(trackingOptions.consentPolicy?.exemptPaths).toEqual(['/bu1lder/ty-page'])
    expect(trackingOptions.subjectCookie).toEqual({ path: '/bu1lder' })
    expect(trackingOptions.consent.trustedOrigins).toContain('https://www.miind.com.br')
    expect(trackingOptions.privacy?.stripUrlParams).toContain('cadastro')
  })

  it('só admin desmarca o banner da página', () => {
    const pode = trackingOptions.consentPolicy!.canEdit!
    expect(pode({ req: { user: { collection: 'users', role: 'admin' } } } as never)).toBe(true)
    expect(pode({ req: { user: { collection: 'users', role: 'editor' } } } as never)).toBe(false)
    expect(pode({ req: { user: null } } as never)).toBe(false)
  })
})

describe('evento Lead', () => {
  it('parâmetros só de qualificação, sem vazios e sem dado pessoal', () => {
    expect(
      propriedadesLead({ pagina: 'contabilidade', perfil: 'Contador', empresas_atendidas: ' 31 a 100 ', clientes_atendidos: '' }),
    ).toEqual({ perfil: 'Contador', empresas_atendidas: '31 a 100', pagina: 'contabilidade' })
    const props = propriedadesLead({ pagina: 'homepage' })
    expect(Object.keys(props)).toEqual(['pagina'])
    expect(propriedadesLead({ pagina: 'x', perfil: 'a'.repeat(400) }).perfil).toHaveLength(256)
  })

  it('caminho da página usado na política de consentimento', () => {
    expect(caminhoDaPagina('homepage')).toBe('/bu1lder/')
    expect(caminhoDaPagina('parceiros')).toBe('/bu1lder/parceiros')
    expect(caminhoDaPagina('contabilidade')).toBe('/bu1lder/contabilidade')
  })
})

describe('banner de consentimento', () => {
  it('decisão guardada e lida; valor inválido é ignorado', () => {
    const a = memoria()
    expect(lerDecisao(a)).toBeNull()
    gravarDecisao(a, { measurement: true, marketing: false }, 123)
    expect(lerDecisao(a)).toEqual({ measurement: true, marketing: false, em: 123 })
    a.setItem(CHAVE_DECISAO, '{"measurement":"sim"}')
    expect(lerDecisao(a)).toBeNull()
  })

  it('aceitar: pega o subject no browser-token, grava no c15t e só então avisa o runtime', async () => {
    const chamadas: { url: string; corpo: unknown }[] = []
    let avisado = false
    const fakeFetch = (async (url: string, init?: RequestInit) => {
      chamadas.push({ url, corpo: init?.body ? JSON.parse(String(init.body)) : null })
      if (url === URL_BROWSER_TOKEN) return Response.json({ code: 'consent_required', subjectId: 'sub_abc' }, { status: 403 })
      expect(avisado).toBe(false)
      return Response.json({ ok: true })
    }) as unknown as typeof fetch
    const ok = await registrarDecisao({
      preferencias: TODAS,
      pagePath: '/bu1lder/',
      dominio: 'www.miind.com.br',
      agora: 1000,
      fetch: fakeFetch,
      refresh: async () => {
        avisado = true
      },
    })
    expect(ok).toBe(true)
    expect(avisado).toBe(true)
    expect(chamadas.map((c) => c.url)).toEqual([URL_BROWSER_TOKEN, URL_C15T_SUBJECTS])
    expect(chamadas[0]!.corpo).toEqual({ pagePath: '/bu1lder/' })
    expect(chamadas[1]!.corpo).toEqual({
      domain: 'www.miind.com.br',
      givenAt: 1000,
      preferences: { measurement: true, marketing: true },
      subjectId: 'sub_abc',
      type: 'cookie_banner',
    })
  })

  it('c15t recusou: não avisa o runtime e devolve false', async () => {
    let avisado = false
    const fakeFetch = (async (url: string) =>
      url === URL_BROWSER_TOKEN
        ? Response.json({ subjectId: 'sub_abc' }, { status: 403 })
        : new Response('x', { status: 500 })) as unknown as typeof fetch
    const ok = await registrarDecisao({
      preferencias: TODAS,
      pagePath: '/bu1lder/',
      dominio: 'x',
      fetch: fakeFetch,
      refresh: async () => {
        avisado = true
      },
    })
    expect(ok).toBe(false)
    expect(avisado).toBe(false)
  })
})

describe('reunião agendada na ty-page', () => {
  it('dispara uma vez, com id sched_, mesmo chamado várias vezes ou depois de recarregar', () => {
    const s = memoria()
    const ids: string[] = []
    const um = criarAgendamento({ token: 'tok', armazenamento: s, novoId: () => 'u1', disparar: (id) => ids.push(id) })
    expect(um()).toBe(true)
    expect(um()).toBe(false)
    const recarregado = criarAgendamento({ token: 'tok', armazenamento: s, novoId: () => 'u2', disparar: (id) => ids.push(id) })
    expect(recarregado()).toBe(false)
    expect(ids).toEqual(['sched_u1'])
  })

  it('só aceita a mensagem de agendamento vinda do Calendly', () => {
    expect(ehAgendamentoCalendly({ origin: 'https://calendly.com', data: { event: 'calendly.event_scheduled' } })).toBe(true)
    expect(ehAgendamentoCalendly({ origin: 'https://calendly.com', data: { event: 'calendly.page_height' } })).toBe(false)
    expect(ehAgendamentoCalendly({ origin: 'https://evil.example', data: { event: 'calendly.event_scheduled' } })).toBe(false)
    expect(ehAgendamentoCalendly({ origin: 'https://calendly.com.evil.example', data: { event: 'calendly.event_scheduled' } })).toBe(false)
  })
})

describe('banco do c15t', () => {
  it('cria só no mesmo servidor e com nome seguro', () => {
    const p = 'postgres://u:s@db:5432/miind_bu1lder'
    expect(alvoDoBancoC15t(p, 'postgres://u:s@db:5432/miind_bu1lder_c15t')).toEqual({ nome: 'miind_bu1lder_c15t' })
    expect(alvoDoBancoC15t(p, 'postgres://u:s@outro:5432/c15t')).toHaveProperty('motivo')
    expect(alvoDoBancoC15t(p, 'postgres://u:s@db:5432/x";drop')).toHaveProperty('motivo')
    expect(alvoDoBancoC15t(p, p)).toHaveProperty('motivo')
    expect(alvoDoBancoC15t(undefined, p)).toHaveProperty('motivo')
  })
})
