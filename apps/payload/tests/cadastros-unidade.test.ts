import { describe, expect, it } from 'vitest'

import { ehCloudflare, extrairIp, extrairUserAgent, normalizarIp } from '@/lib/cadastros/ip'
import { normalizarTelefoneBR, lerContexto, montarDetalhe, type ContextoLead } from '@/lib/cadastros/lead'
import { LimiteGlobal, LimitePorChave } from '@/lib/cadastros/limite'
import { urlSegura } from '@/lib/url-segura'
import {
  decodificarGuardados,
  lerCookie,
  mesclarParametros,
  montarFbc,
  montarOcultos,
  serializarCookie,
} from '@/lib/cadastros/parametros'
import type { ConfigFormulario } from '@/lib/cadastros/formularios'
import { validarEnvio } from '@/lib/cadastros/validacao'
import { montarCorpoWebhook } from '@/lib/cadastros/webhook'
import type { Cadastro } from '@/payload-types'

describe('IP e user agent', () => {
  it('par do Cloudflare: vale o CF-Connecting-IP', () => {
    const h = new Headers({ 'x-real-ip': '173.245.48.10', 'cf-connecting-ip': '203.0.113.9' })
    expect(extrairIp(h)).toBe('203.0.113.9')
    const v6 = new Headers({ 'x-real-ip': '2606:4700::1', 'cf-connecting-ip': '2001:db8::5' })
    expect(extrairIp(v6)).toBe('2001:db8::5')
  })
  it('par comum: CF-Connecting-IP forjado é ignorado e vale o IP do par', () => {
    expect(extrairIp(new Headers({ 'x-real-ip': '198.51.100.4', 'cf-connecting-ip': '1.2.3.4' }))).toBe('198.51.100.4')
  })
  it('sem X-Real-IP: último item de X-Forwarded-For é o par', () => {
    expect(extrairIp(new Headers({ 'x-forwarded-for': '1.2.3.4, 198.51.100.4', 'cf-connecting-ip': '9.9.9.9' }))).toBe(
      '198.51.100.4',
    )
    expect(extrairIp(new Headers({ 'x-forwarded-for': '1.2.3.4, 162.158.1.1', 'cf-connecting-ip': '203.0.113.7' }))).toBe(
      '203.0.113.7',
    )
  })
  it('sem cabeçalhos ou com lixo: null', () => {
    expect(extrairIp(new Headers())).toBeNull()
    expect(extrairIp(new Headers({ 'cf-connecting-ip': '203.0.113.9' }))).toBeNull()
    expect(extrairIp(new Headers({ 'x-real-ip': 'não-é-ip' }))).toBeNull()
  })
  it('normaliza ::ffff: e porta', () => {
    expect(normalizarIp('::ffff:198.51.100.4')).toBe('198.51.100.4')
    expect(normalizarIp('198.51.100.4:5555')).toBe('198.51.100.4')
    expect(ehCloudflare('104.16.0.1')).toBe(true)
    expect(ehCloudflare('8.8.8.8')).toBe(false)
  })
  it('user agent do cabeçalho', () => {
    expect(extrairUserAgent(new Headers({ 'user-agent': 'Navegador/1.0' }))).toBe('Navegador/1.0')
    expect(extrairUserAgent(new Headers())).toBeNull()
  })
})

describe('fbc e parâmetros guardados', () => {
  it('monta o fbc no formato da Meta', () => {
    expect(montarFbc('ABC123', 1761091200123)).toBe('fb.1.1761091200123.ABC123')
  })

  it('valor novo substitui, ausente mantém', () => {
    const primeira = mesclarParametros({}, new URLSearchParams('utm_source=meta&utm_campaign=c1&xcod=X1'), 1000)
    expect(primeira).toEqual({ utm_source: 'meta', utm_campaign: 'c1', xcod: 'X1' })
    const segunda = mesclarParametros(primeira, new URLSearchParams('utm_source=google&gclid=G1&utm_medium='), 2000)
    expect(segunda).toEqual({ utm_source: 'google', utm_campaign: 'c1', xcod: 'X1', gclid: 'G1' })
    // URL sem parâmetros: nada muda
    expect(mesclarParametros(segunda, new URLSearchParams(''), 3000)).toEqual(segunda)
  })

  it('fbclid novo gera fbc com o horário da chegada; o mesmo fbclid mantém', () => {
    const a = mesclarParametros({}, new URLSearchParams('fbclid=F1'), 1111)
    expect(a.fbc_gerado).toBe('fb.1.1111.F1')
    expect(mesclarParametros(a, new URLSearchParams('fbclid=F1'), 2222).fbc_gerado).toBe('fb.1.1111.F1')
    expect(mesclarParametros(a, new URLSearchParams('fbclid=F2'), 3333).fbc_gerado).toBe('fb.1.3333.F2')
  })

  it('ignora parâmetros fora da lista e corta valores longos', () => {
    const r = mesclarParametros({}, new URLSearchParams(`foo=bar&utm_term=${'x'.repeat(900)}`), 1)
    expect(r).toEqual({ utm_term: 'x'.repeat(500) })
  })

  it('cookie: ida e volta e atributos', () => {
    const guardado = { utm_source: 'meta', fbclid: 'F1', fbc_gerado: 'fb.1.1.F1' }
    const cookie = serializarCookie(guardado, true)
    expect(cookie).toContain('Path=/bu1lder')
    expect(cookie).toContain(`Max-Age=${90 * 24 * 60 * 60}`)
    expect(cookie).toContain('SameSite=Lax')
    expect(cookie).toContain('Secure')
    expect(serializarCookie(guardado, false)).not.toContain('Secure')
    const valor = lerCookie(cookie.split(';')[0], 'bu1lder_origem')
    expect(decodificarGuardados(valor)).toEqual(guardado)
    expect(decodificarGuardados('%7Bquebrado')).toEqual({})
    expect(decodificarGuardados(encodeURIComponent(JSON.stringify({ ip: '1.1.1.1', utm_id: 'U' })))).toEqual({ utm_id: 'U' })
  })

  it('campos ocultos: _fbc do cookie tem prioridade; senão o fbc gerado; fbp do _fbp; origem = URL', () => {
    const g = { fbclid: 'F1', fbc_gerado: 'fb.1.1.F1', utm_source: 'meta' }
    const com = montarOcultos(g, '_fbc=fb.1.9.REAL; _fbp=fb.1.5.777', 'https://x/bu1lder/a?b=1')
    expect(com.fbc).toBe('fb.1.9.REAL')
    expect(com.fbp).toBe('fb.1.5.777')
    expect(com.origem).toBe('https://x/bu1lder/a?b=1')
    expect(com.utm_source).toBe('meta')
    expect(com.gclid).toBe('')
    const sem = montarOcultos(g, 'outro=1', 'https://x/')
    expect(sem.fbc).toBe('fb.1.1.F1')
    expect(sem.fbp).toBe('')
  })
})

describe('corpo do webhook', () => {
  it('tem exatamente as chaves do contrato', () => {
    const cadastro = {
      id: 7,
      nome: 'Ana',
      email: 'ana@example.com',
      whatsapp: '11999990000',
      segmentos: ['Odontologia'],
      consentimento: { aceito: true, texto: 't', data: '2026-10-21T00:00:00.000Z' },
      utm_source: 'meta',
      ip: '203.0.113.9',
      user_agent: 'UA',
      event_id: 'lead_x',
      createdAt: '2026-10-21T00:00:00.000Z',
      updatedAt: '2026-10-21T00:00:00.000Z',
    } as unknown as Cadastro
    const corpo = montarCorpoWebhook(cadastro)
    const esperado = [
      'nome', 'whatsapp', 'email', 'id', 'perfil', 'empresas_atendidas', 'clientes_atendidos', 'segmentos', 'uso',
      'cidade_uf', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'gclid', 'gbraid',
      'wbraid', 'waclid', 'fbclid', 'fbc', 'fbp', 'xcod', 'src', 'origem', 'ip', 'user_agent', 'formulario', 'tipo',
      'pagina', 'segmento', 'consentimento', 'event_id', 'criado_em', 'empresa', 'cargo', 'volume', 'desafio',
    ]
    expect(Object.keys(corpo).sort()).toEqual([...esperado].sort())
    expect(corpo).toMatchObject({
      id: 7,
      nome: 'Ana',
      segmentos: ['Odontologia'],
      consentimento: true,
      utm_source: 'meta',
      utm_medium: null,
      ip: '203.0.113.9',
      criado_em: '2026-10-21T00:00:00.000Z',
    })
  })
})

describe('validação do envio', () => {
  const lp: ConfigFormulario = {
    tipo: 'lp',
    pagina: 'agencia-marketing',
    formulario: 'cadastro-agencia-marketing',
    perfis: ['Gestor de tráfego', 'Outro'],
    perfilObrigatorio: true,
    extras: [
      { nome: 'clientes_atendidos', tipo: 'unica', opcoes: ['1 a 5', '6 a 15'], obrigatoria: true },
      { nome: 'segmentos', tipo: 'multipla', opcoes: ['Odontologia', 'Varejo'], obrigatoria: false },
    ],
    textoConsentimento: 'Autorizo.',
    segmentoFixo: 'agencia-marketing',
    segmentosPermitidos: ['agencia-marketing'],
  }
  const valido = {
    nome: ' Ana Souza ',
    email: 'ana@example.com',
    whatsapp: '(11) 99999-0000',
    cidade_uf: 'São Paulo / SP',
    perfil: 'Gestor de tráfego',
    segmento: 'outro-valor-do-navegador',
    clientes_atendidos: '6 a 15',
    segmentos: ['Odontologia', 'Varejo'],
    consent: 'on',
    utm_source: 'meta',
    ip: '1.2.3.4',
    user_agent: 'falso',
    website: '',
  }

  it('aceita o envio válido, fixa o segmento da LP e ignora ip/user_agent do navegador', () => {
    const r = validarEnvio(lp, valido)
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.dados.nome).toBe('Ana Souza')
    expect(r.dados.segmento).toBe('agencia-marketing')
    expect(r.dados.clientes_atendidos).toBe('6 a 15')
    expect(r.dados.segmentos).toEqual(['Odontologia', 'Varejo'])
    expect(r.dados.consentimento).toEqual({ aceito: true, texto: 'Autorizo.' })
    expect(r.dados.ocultos.utm_source).toBe('meta')
    expect(JSON.stringify(r.dados)).not.toContain('1.2.3.4')
    expect(JSON.stringify(r.dados)).not.toContain('falso')
  })

  it('honeypot preenchido é recusado', () => {
    const r = validarEnvio(lp, { ...valido, website: 'http://spam' })
    expect(r).toMatchObject({ ok: false, honeypot: true })
  })

  it('obrigatórios: pergunta extra, perfil e consentimento', () => {
    const r = validarEnvio(lp, { ...valido, clientes_atendidos: '', perfil: '', consent: '' })
    expect(r.ok).toBe(false)
    if (r.ok) return
    expect(Object.keys(r.erros).sort()).toEqual(['clientes_atendidos', 'consent', 'perfil'])
  })

  it('opção fora da lista e tamanho máximo', () => {
    const r = validarEnvio(lp, { ...valido, perfil: 'Hacker', segmentos: ['Nada'], nome: 'x'.repeat(101) })
    expect(r.ok).toBe(false)
    if (r.ok) return
    expect(Object.keys(r.erros).sort()).toEqual(['nome', 'perfil', 'segmentos'])
  })

  it('hub: segmento precisa ser uma das páginas publicadas (ou vazio)', () => {
    const hub: ConfigFormulario = { ...lp, tipo: 'hub', extras: [], perfilObrigatorio: false, segmentoFixo: null, segmentosPermitidos: ['pet', 'saude'] }
    expect(validarEnvio(hub, { ...valido, perfil: '', segmento: 'pet' })).toMatchObject({ ok: true, dados: { segmento: 'pet' } })
    expect(validarEnvio(hub, { ...valido, perfil: '', segmento: '' })).toMatchObject({ ok: true, dados: { segmento: null } })
    expect(validarEnvio(hub, { ...valido, segmento: 'inventado' })).toMatchObject({ ok: false })
  })

  it('contato da homepage', () => {
    const contato: ConfigFormulario = { tipo: 'contato-plataforma', pagina: 'homepage', formulario: 'contato-form', volumes: ['ate-100', '100-500'], textoConsentimento: 'Autorizo.' }
    const base = { name: 'Bia', company: 'ACME', role: 'CEO', email: 'bia@acme.com', phone: '11999990000', volume: 'ate-100', challenge: 'Automatizar o atendimento', consent: 'on' }
    expect(validarEnvio(contato, base)).toMatchObject({
      ok: true,
      dados: {
        nome: 'Bia',
        whatsapp: '11999990000',
        contato: { empresa: 'ACME', cargo: 'CEO', volume: 'ate-100' },
        consentimento: { aceito: true, texto: 'Autorizo.' },
      },
    })
    const r = validarEnvio(contato, { ...base, volume: 'x', challenge: 'curto', consent: '' })
    expect(r.ok ? [] : Object.keys(r.erros).sort()).toEqual(['challenge', 'consent', 'volume'])
  })
})

describe('limite por IP', () => {
  it('5 envios a cada 10 minutos', () => {
    const l = new LimitePorChave(5, 10 * 60 * 1000)
    for (let i = 0; i < 5; i++) expect(l.permitir('1.1.1.1', 1000 + i)).toBe(true)
    expect(l.permitir('1.1.1.1', 2000)).toBe(false)
    expect(l.permitir('2.2.2.2', 2000)).toBe(true)
    expect(l.permitir('1.1.1.1', 1000 + 10 * 60 * 1000 + 1)).toBe(true)
  })
  it('teto de chaves: descarta as mais antigas', () => {
    const l = new LimitePorChave(5, 60_000, 3)
    for (const ip of ['a', 'b', 'c', 'd']) l.permitir(ip, 1)
    expect(l.tamanho).toBe(3)
    // "a" saiu: conta do zero de novo
    for (let i = 0; i < 5; i++) expect(l.permitir('a', 2)).toBe(true)
  })
  it('limite global de envios aceitos', () => {
    const g = new LimiteGlobal(2, 60_000)
    expect(g.podeAceitar(1)).toBe(true)
    g.registrar(1)
    g.registrar(2)
    expect(g.podeAceitar(3)).toBe(false)
    expect(g.podeAceitar(60_002)).toBe(true)
  })
})

describe('links editáveis', () => {
  it('aceita http(s), relativo, mailto e tel; recusa o resto', () => {
    for (const ok of ['https://www.miind.com.br/x', 'http://a.b', '/bu1lder/', '#cadastro', '?a=1', 'mailto:a@b.c', 'tel:+5551981652778'])
      expect(urlSegura(ok)).toBe(true)
    for (const ruim of ['javascript:alert(1)', ' JavaScript:alert(1)', 'data:text/html,x', '//evil.com', 'vbscript:x', 'ftp://a', ''])
      expect(urlSegura(ruim)).toBe(false)
  })
})

describe('dados da página de obrigado', () => {
  it('telefone em E.164 do Brasil', () => {
    expect(normalizarTelefoneBR('(11) 99999-0000')).toBe('+5511999990000')
    expect(normalizarTelefoneBR('+55 51 98165-2778')).toBe('+5551981652778')
    expect(normalizarTelefoneBR('011 3333-4444')).toBe('+551133334444')
    expect(normalizarTelefoneBR('0055 11 99999 0000')).toBe('+5511999990000')
    expect(normalizarTelefoneBR('123')).toBeNull()
  })

  it('contexto só vale com o mesmo token; contato só com a opção ligada', () => {
    const c = { token: 'T1', eventId: 'lead_1', nome: 'Ana Souza', email: 'a@b.c', whatsapp: '11', segmentos: [] } as unknown as ContextoLead
    expect(lerContexto(JSON.stringify(c), 'T2')).toBeNull()
    expect(lerContexto('{quebrado', 'T1')).toBeNull()
    const lido = lerContexto(JSON.stringify(c), 'T1')!
    const sem = montarDetalhe(lido, { exporContato: false, emailSha256: 'h1', telefoneSha256: 'h2', telefoneSha256E164: 'h3', novo: true })
    expect(sem).toMatchObject({ primeiroNome: 'Ana', emailSha256: 'h1', telefoneSha256: 'h2', telefoneSha256E164: 'h3', novo: true })
    expect(sem).not.toHaveProperty('email')
    expect(sem).not.toHaveProperty('nome')
    const com = montarDetalhe(lido, { exporContato: true, emailSha256: null, telefoneSha256: null, telefoneSha256E164: null, novo: false })
    expect(com).toMatchObject({ nome: 'Ana Souza', email: 'a@b.c', whatsapp: '11' })
  })
})
