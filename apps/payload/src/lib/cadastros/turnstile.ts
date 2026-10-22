// Cloudflare Turnstile opcional. Ativo só com TURNSTILE_SITE_KEY e
// TURNSTILE_SECRET_KEY definidas; sem elas, o formulário segue sem o desafio.
const VERIFICAR = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
export const CAMPO_TURNSTILE = 'cf-turnstile-response'

export function chaveSiteTurnstile(): string | null {
  const site = process.env.TURNSTILE_SITE_KEY?.trim()
  const segredo = process.env.TURNSTILE_SECRET_KEY?.trim()
  return site && segredo ? site : null
}

export function segredoTurnstile(): string | null {
  return chaveSiteTurnstile() ? (process.env.TURNSTILE_SECRET_KEY?.trim() ?? null) : null
}

// Valida o token na API do Cloudflare. Falha de rede conta como reprovado.
export async function validarTurnstile(
  segredo: string,
  token: string,
  ip: string | null,
  f: typeof fetch = fetch,
): Promise<boolean> {
  if (!token || token.length > 2048) return false
  try {
    const corpo = new URLSearchParams({ secret: segredo, response: token })
    if (ip) corpo.set('remoteip', ip)
    const res = await f(VERIFICAR, { method: 'POST', body: corpo, signal: AbortSignal.timeout(8000) })
    const json = (await res.json().catch(() => null)) as { success?: boolean } | null
    return Boolean(res.ok && json?.success === true)
  } catch {
    return false
  }
}
