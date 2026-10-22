import { isIP } from 'net'

import { normalizarIp } from '@/lib/cadastros/ip'

// O backend do c15t em /api/c15t/* só atende o próprio servidor (o módulo de
// tracking consulta GET {C15T_BACKEND_URL}/subjects/:id pela rede interna).
//
// Requisição que passou pelo Traefik do EasyPanel sempre chega com X-Real-IP
// (o Traefik grava o IP de quem conectou) e com o IP de quem conectou no
// X-Forwarded-For: qualquer um dos dois, ou CF-Connecting-IP, recusa.
// Exceção: quando falta X-Forwarded-For, o próprio Next o preenche com o IP do
// socket (next/dist/server/base-server.js); por isso X-Forwarded-For só com
// endereços de loopback é aceito.

const loopback = (valor: string): boolean => {
  const ip = normalizarIp(valor)
  if (!ip) return false
  if (isIP(ip) === 4) return ip.startsWith('127.')
  return ip === '::1'
}

export function ehRequisicaoInterna(headers: Headers): boolean {
  if (headers.has('x-real-ip') || headers.has('cf-connecting-ip')) return false
  const xff = headers.get('x-forwarded-for')
  if (xff === null) return true
  const itens = xff.split(',').map((v) => v.trim())
  return itens.length > 0 && itens.every(loopback)
}
