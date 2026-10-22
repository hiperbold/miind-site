// Contexto do cadastro que a página de obrigado expõe aos scripts
// (window.bu1lderLead, evento "bu1lder:lead" e dataLayer). Funções puras.

export const CHAVE_LEAD = 'bu1lder:lead'
export const chaveDisparado = (token: string) => `bu1lder:lead:disparado:${token}`

export type ContextoLead = {
  token: string
  eventId: string
  nicho: string
  pagina: string
  formulario: string
  tipo: 'lp' | 'hub' | 'contato-plataforma'
  perfil: string
  segmento: string
  empresas_atendidas: string
  clientes_atendidos: string
  segmentos: string[]
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
  utm_id: string
  gclid: string
  gbraid: string
  wbraid: string
  waclid: string
  fbclid: string
  fbc: string
  fbp: string
  xcod: string
  src: string
  origem: string
  // dado pessoal: vai para os scripts só se o admin ligar "Expor contato"
  nome: string
  email: string
  whatsapp: string
}

export type DetalheLead = Omit<ContextoLead, 'nome' | 'email' | 'whatsapp'> & {
  primeiroNome: string
  emailSha256: string | null
  // SHA-256 dos dígitos com DDI, sem "+" (formato da Meta: 5511999998888)
  telefoneSha256: string | null
  // SHA-256 do E.164 com "+" (formato do Google: +5511999998888)
  telefoneSha256E164: string | null
  // false quando a página foi recarregada (o evento já disparou para este token)
  novo: boolean
  nome?: string
  email?: string
  whatsapp?: string
}

// Telefone brasileiro em E.164 (+55DDDNÚMERO). Aceita com ou sem +55, com 0 de
// operadora/DDD na frente e qualquer pontuação. Sem forma válida: null.
export function normalizarTelefoneBR(telefone: string): string | null {
  let d = telefone.replace(/\D/g, '')
  if (d.startsWith('00')) d = d.slice(2)
  if (d.startsWith('55') && (d.length === 12 || d.length === 13)) return `+${d}`
  d = d.replace(/^0+/, '')
  if (d.length === 10 || d.length === 11) return `+55${d}`
  return null
}

export function normalizarEmail(email: string): string | null {
  const e = email.trim().toLowerCase()
  return e.includes('@') ? e : null
}

export function primeiroNome(nome: string): string {
  return nome.trim().split(/\s+/)[0] ?? ''
}

// Valida o JSON do sessionStorage e confere o token da URL.
export function lerContexto(bruto: string | null, token: string | null): ContextoLead | null {
  if (!bruto || !token) return null
  try {
    const c = JSON.parse(bruto) as Partial<ContextoLead>
    if (!c || typeof c !== 'object' || c.token !== token || typeof c.eventId !== 'string') return null
    return c as ContextoLead
  } catch {
    return null
  }
}

export function montarDetalhe(
  c: ContextoLead,
  opcoes: {
    exporContato: boolean
    emailSha256: string | null
    telefoneSha256: string | null
    telefoneSha256E164: string | null
    novo: boolean
  },
): DetalheLead {
  const { nome, email, whatsapp, ...resto } = c
  const detalhe: DetalheLead = {
    ...resto,
    segmentos: Array.isArray(c.segmentos) ? c.segmentos : [],
    primeiroNome: primeiroNome(nome ?? ''),
    emailSha256: opcoes.emailSha256,
    telefoneSha256: opcoes.telefoneSha256,
    telefoneSha256E164: opcoes.telefoneSha256E164,
    novo: opcoes.novo,
  }
  if (opcoes.exporContato) Object.assign(detalhe, { nome, email, whatsapp })
  return detalhe
}
