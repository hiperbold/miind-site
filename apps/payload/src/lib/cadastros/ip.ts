import { BlockList, isIP } from 'net'

// IP de quem enviou, lido só dos cabeçalhos (nunca do corpo).
//
// 1. IP do par (quem conectou no proxy da VPS): X-Real-IP. O Traefik do
//    EasyPanel apaga o X-Real-IP vindo de cliente não confiável e o define com
//    o host de RemoteAddr (traefik/traefik, pkg/middlewares/forwardedheaders/
//    forwarded_header.go). Sem X-Real-IP, o último item de X-Forwarded-For
//    (o que o proxy mais próximo acrescentou).
// 2. CF-Connecting-IP só vale se o par for do Cloudflare (faixas abaixo).
//    Vindo de qualquer outro par, é ignorado: qualquer cliente pode forjá-lo.
// 3. Senão, o IP do cliente é o IP do par.

// Faixas oficiais do Cloudflare: https://www.cloudflare.com/ips-v4 e
// https://www.cloudflare.com/ips-v6, conferidas em 21/10/2026. Revisar quando
// o Cloudflare anunciar mudança.
export const FAIXAS_CLOUDFLARE_V4 = [
  '173.245.48.0/20',
  '103.21.244.0/22',
  '103.22.200.0/22',
  '103.31.4.0/22',
  '141.101.64.0/18',
  '108.162.192.0/18',
  '190.93.240.0/20',
  '188.114.96.0/20',
  '197.234.240.0/22',
  '198.41.128.0/17',
  '162.158.0.0/15',
  '104.16.0.0/13',
  '104.24.0.0/14',
  '172.64.0.0/13',
  '131.0.72.0/22',
]
export const FAIXAS_CLOUDFLARE_V6 = [
  '2400:cb00::/32',
  '2606:4700::/32',
  '2803:f800::/32',
  '2405:b500::/32',
  '2405:8100::/32',
  '2a06:98c0::/29',
  '2c0f:f248::/32',
]

const cloudflare = new BlockList()
for (const faixa of FAIXAS_CLOUDFLARE_V4) {
  const [rede, prefixo] = faixa.split('/')
  cloudflare.addSubnet(rede, Number(prefixo), 'ipv4')
}
for (const faixa of FAIXAS_CLOUDFLARE_V6) {
  const [rede, prefixo] = faixa.split('/')
  cloudflare.addSubnet(rede, Number(prefixo), 'ipv6')
}

// Normaliza e valida: tira porta, colchetes, zona IPv6 e o prefixo ::ffff:.
export function normalizarIp(valor: string | null | undefined): string | null {
  let v = valor?.trim()
  if (!v) return null
  if (v.startsWith('[')) v = v.slice(1, v.indexOf(']') > 0 ? v.indexOf(']') : undefined)
  else if (/^\d+\.\d+\.\d+\.\d+:\d+$/.test(v)) v = v.slice(0, v.lastIndexOf(':'))
  v = v.replace(/%.*$/, '')
  if (/^::ffff:\d+\.\d+\.\d+\.\d+$/i.test(v)) v = v.slice(7)
  return isIP(v) ? v.toLowerCase() : null
}

export function ehCloudflare(ip: string | null): boolean {
  if (!ip) return false
  const tipo = isIP(ip)
  if (tipo === 4) return cloudflare.check(ip, 'ipv4')
  if (tipo === 6) return cloudflare.check(ip, 'ipv6')
  return false
}

export function ipDoPar(headers: Headers): string | null {
  const real = normalizarIp(headers.get('x-real-ip'))
  if (real) return real
  const xff = headers.get('x-forwarded-for')
  if (!xff) return null
  const itens = xff.split(',')
  return normalizarIp(itens[itens.length - 1])
}

export function extrairIp(headers: Headers): string | null {
  const par = ipDoPar(headers)
  if (ehCloudflare(par)) {
    const cf = normalizarIp(headers.get('cf-connecting-ip'))
    if (cf) return cf
  }
  return par
}

export function extrairUserAgent(headers: Headers): string | null {
  const ua = headers.get('user-agent')?.trim()
  return ua ? ua.slice(0, 1000) : null
}
