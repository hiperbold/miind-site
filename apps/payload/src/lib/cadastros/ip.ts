// IP de quem enviou, lido só dos cabeçalhos do servidor (nunca do corpo):
// CF-Connecting-IP (Cloudflare), senão o primeiro de X-Forwarded-For, senão X-Real-IP.
const TAMANHO_MAXIMO = 100

function limpar(valor: string | null | undefined): string | null {
  const v = valor?.trim()
  if (!v) return null
  return v.slice(0, TAMANHO_MAXIMO)
}

export function extrairIp(headers: Headers): string | null {
  const cf = limpar(headers.get('cf-connecting-ip'))
  if (cf) return cf
  const xff = headers.get('x-forwarded-for')
  if (xff) {
    const primeiro = limpar(xff.split(',')[0])
    if (primeiro) return primeiro
  }
  return limpar(headers.get('x-real-ip'))
}

export function extrairUserAgent(headers: Headers): string | null {
  const ua = headers.get('user-agent')?.trim()
  return ua ? ua.slice(0, 1000) : null
}
