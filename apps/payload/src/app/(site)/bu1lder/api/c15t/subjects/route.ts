import { c15t } from '@/tracking/c15t'

// POST /bu1lder/api/c15t/subjects: o banner grava a decisão do visitante.
// Só este método e este caminho do c15t ficam alcançáveis pelo /bu1lder; o
// resto do c15t (leitura de subjects, legal-documents, status) só em /api/c15t.
const TETO_BYTES = 4096

export async function POST(request: Request): Promise<Response> {
  const declarado = Number(request.headers.get('content-length'))
  if (Number.isFinite(declarado) && declarado > TETO_BYTES) return new Response(null, { status: 413 })
  const corpo = await request.text()
  if (Buffer.byteLength(corpo) > TETO_BYTES) return new Response(null, { status: 413 })
  const destino = new URL('/api/c15t/subjects', request.url)
  const resposta = await c15t.handler(
    new Request(destino, { method: 'POST', headers: request.headers, body: corpo }),
  )
  const cabecalhos = new Headers(resposta.headers)
  cabecalhos.set('cache-control', 'private, no-store')
  return new Response(resposta.body, { status: resposta.status, headers: cabecalhos })
}
