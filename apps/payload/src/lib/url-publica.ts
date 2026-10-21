// Endereço público das LPs (www.miind.com.br em produção). É separado de
// NEXT_PUBLIC_SITE_URL, que é o endereço do admin/servidor do Payload na VPS.
// Lido no build e no servidor: canonical, og:url e og:image saem daqui.
export function urlPublica(): string {
  const valor = process.env.PUBLIC_SITE_URL?.trim() || 'http://localhost:3010'
  return valor.replace(/\/+$/, '')
}

// O Cloudflare da MIIND só encaminha /bu1lder/*: arquivos de mídia vão pela
// reescrita /bu1lder/api/* -> /api/*.
export function urlMidiaPublica(filename: string | null | undefined): string | null {
  if (!filename) return null
  return `${urlPublica()}/bu1lder/api/media/file/${encodeURIComponent(filename)}`
}
