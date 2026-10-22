import { readSubjectFromCookieHeader, trackingPluginOptionsSchema } from '@hiperbold/payload-tracking/server'

import { extrairIp } from '@/lib/cadastros/ip'
import { LimitePorChave } from '@/lib/cadastros/limite'
import { urlPublica } from '@/lib/url-publica'

import { c15tHandler } from './c15t'
import { trackingOptions } from './options'

// POST /bu1lder/api/c15t/subjects: o banner grava a decisão do visitante.
// Ordem: limite por IP, tamanho, cookie pt_subject selado (o browser-token o
// emite antes), subjectId do corpo igual ao do cookie, e só então o c15t, com
// o domínio fixado no servidor e só o content-type.

export const TETO_BYTES_BANNER = 4096
const DEZ_MINUTOS = 10 * 60 * 1000

// 20 decisões por IP a cada 10 minutos (conta todo pedido), mapa com teto de 10 mil IPs.
export const limiteBanner = new LimitePorChave(20, DEZ_MINUTOS)

type Keyring = { activeKeyId: string; keys: Record<string, Buffer> }

// Keyring HMAC do cookie pt_subject: as mesmas variáveis do browser-token
// (opção browserTokens do módulo). Inválido ou ausente: null (falha fechado).
function keyringDoAmbiente(): Keyring | null {
  const { browserTokens } = trackingPluginOptionsSchema.parse(trackingOptions)
  const bruto = process.env[browserTokens.keyringEnv]
  const ativa = process.env[browserTokens.activeKeyIdEnv]?.trim()
  if (!bruto || !ativa) return null
  let json: unknown
  try {
    json = JSON.parse(bruto)
  } catch {
    return null
  }
  if (typeof json !== 'object' || json === null || Array.isArray(json)) return null
  const keys: Record<string, Buffer> = {}
  for (const [id, valor] of Object.entries(json)) {
    if (typeof valor !== 'string' || !/^[A-Za-z0-9_-]+$/.test(valor)) continue
    const chave = Buffer.from(valor, 'base64url')
    if (chave.length === 32) keys[id] = chave
  }
  if (!keys[ativa]) return null
  return { activeKeyId: ativa, keys }
}

// Host canônico das páginas (PUBLIC_SITE_URL; www.miind.com.br em produção).
export function dominioCanonico(): string {
  try {
    return new URL(urlPublica()).hostname
  } catch {
    return 'www.miind.com.br'
  }
}

const vazio = (status: number) =>
  new Response(null, { status, headers: { 'cache-control': 'private, no-store' } })

export async function receberDecisaoBanner(request: Request, limite: LimitePorChave = limiteBanner): Promise<Response> {
  if (!limite.permitir(extrairIp(request.headers) ?? 'sem-ip')) return vazio(429)

  const declarado = Number(request.headers.get('content-length'))
  if (Number.isFinite(declarado) && declarado > TETO_BYTES_BANNER) return vazio(413)
  const texto = await request.text()
  if (Buffer.byteLength(texto) > TETO_BYTES_BANNER) return vazio(413)

  const keyring = keyringDoAmbiente()
  if (!keyring) {
    console.error('[c15t] banner: keyring do browser-token ausente ou inválido; decisão recusada')
    return vazio(503)
  }
  const doCookie = readSubjectFromCookieHeader(request.headers.get('cookie'), keyring)
  if (!doCookie) return vazio(403)

  let corpo: Record<string, unknown>
  try {
    const json = JSON.parse(texto) as unknown
    if (typeof json !== 'object' || json === null || Array.isArray(json)) return vazio(400)
    corpo = json as Record<string, unknown>
  } catch {
    return vazio(400)
  }
  if (corpo.subjectId !== doCookie) return vazio(403)

  // só os campos que o banner manda; o domínio é sempre o do servidor
  const repassado = {
    domain: dominioCanonico(),
    givenAt: corpo.givenAt,
    preferences: corpo.preferences,
    subjectId: doCookie,
    type: corpo.type,
  }
  const destino = new URL('/api/c15t/subjects', request.url)
  const resposta = await c15tHandler(
    new Request(destino, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(repassado),
    }),
  )
  const cabecalhos = new Headers(resposta.headers)
  cabecalhos.set('cache-control', 'private, no-store')
  return new Response(resposta.body, { status: resposta.status, headers: cabecalhos })
}
