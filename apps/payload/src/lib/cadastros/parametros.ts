// Campos ocultos de origem (docs/PLANO-PAYLOAD.md, "Campos ocultos de todo
// formulário"). Funções puras, usadas no navegador e nos testes.

// Parâmetros lidos da URL na chegada e guardados no cookie primário.
export const PARAMETROS_URL = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
  'gclid',
  'gbraid',
  'wbraid',
  'waclid',
  'fbclid',
  'xcod',
  'src',
] as const

export type ParametroUrl = (typeof PARAMETROS_URL)[number]

// Todos os campos ocultos enviados com o formulário (mesmos nomes do webhook).
export const CAMPOS_OCULTOS = [...PARAMETROS_URL, 'fbc', 'fbp', 'origem'] as const
export type CampoOculto = (typeof CAMPOS_OCULTOS)[number]

export const COOKIE_ORIGEM = 'bu1lder_origem'
export const COOKIE_DIAS = 90
// Valor máximo guardado por parâmetro (o servidor também limita).
export const TAMANHO_MAXIMO_PARAMETRO = 500

// O que fica no cookie: os parâmetros e o fbc montado na chegada do fbclid
// (o timestamp do fbc é o do clique, não o do envio).
export type ParametrosGuardados = Partial<Record<ParametroUrl, string>> & { fbc_gerado?: string }

// fb.1.<timestamp em ms>.<fbclid>, formato do cookie _fbc da Meta.
export function montarFbc(fbclid: string, agoraMs: number): string {
  return `fb.1.${Math.floor(agoraMs)}.${fbclid}`
}

// Valor novo na URL substitui o guardado; parâmetro ausente (ou vazio) mantém o
// guardado. Um fbclid novo gera um fbc novo.
export function mesclarParametros(
  guardado: ParametrosGuardados,
  busca: URLSearchParams,
  agoraMs: number,
): ParametrosGuardados {
  const saida: ParametrosGuardados = { ...guardado }
  for (const nome of PARAMETROS_URL) {
    const valor = busca.get(nome)?.trim()
    if (!valor) continue
    const cortado = valor.slice(0, TAMANHO_MAXIMO_PARAMETRO)
    if (nome === 'fbclid' && (cortado !== guardado.fbclid || !guardado.fbc_gerado)) {
      saida.fbc_gerado = montarFbc(cortado, agoraMs)
    }
    saida[nome] = cortado
  }
  return saida
}

export function lerCookie(cookies: string, nome: string): string | null {
  for (const parte of cookies.split(';')) {
    const i = parte.indexOf('=')
    if (i < 0) continue
    if (parte.slice(0, i).trim() === nome) return parte.slice(i + 1).trim()
  }
  return null
}

export function decodificarGuardados(valor: string | null): ParametrosGuardados {
  if (!valor) return {}
  try {
    const obj = JSON.parse(decodeURIComponent(valor)) as unknown
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return {}
    const saida: ParametrosGuardados = {}
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      if (typeof v !== 'string') continue
      if ((PARAMETROS_URL as readonly string[]).includes(k) || k === 'fbc_gerado') {
        saida[k as ParametroUrl] = v.slice(0, TAMANHO_MAXIMO_PARAMETRO)
      }
    }
    return saida
  } catch {
    return {}
  }
}

export function serializarCookie(guardado: ParametrosGuardados, seguro: boolean): string {
  const partes = [
    `${COOKIE_ORIGEM}=${encodeURIComponent(JSON.stringify(guardado))}`,
    'Path=/bu1lder',
    `Max-Age=${COOKIE_DIAS * 24 * 60 * 60}`,
    'SameSite=Lax',
  ]
  if (seguro) partes.push('Secure')
  return partes.join('; ')
}

// Valores dos campos ocultos no momento do envio.
export function montarOcultos(
  guardado: ParametrosGuardados,
  cookies: string,
  href: string,
): Record<CampoOculto, string> {
  const saida = {} as Record<CampoOculto, string>
  for (const nome of PARAMETROS_URL) saida[nome] = guardado[nome] ?? ''
  const fbcCookie = lerCookie(cookies, '_fbc')
  const fbpCookie = lerCookie(cookies, '_fbp')
  saida.fbc = (fbcCookie && decodeURIComponent(fbcCookie)) || guardado.fbc_gerado || ''
  saida.fbp = (fbpCookie && decodeURIComponent(fbpCookie)) || ''
  saida.origem = href
  return saida
}
