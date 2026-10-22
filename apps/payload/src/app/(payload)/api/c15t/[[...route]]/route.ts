import { ehRequisicaoInterna } from '@/tracking/acesso-interno'
import { c15tHandler } from '@/tracking/c15t'

// Backend do c15t em /api/c15t/* (fora do /bu1lder: não passa pelo Cloudflare
// da MIIND), só para o próprio servidor: o módulo de tracking lê o
// consentimento por GET {C15T_BACKEND_URL}/subjects/:id. Requisição vinda de
// fora (pelo Traefik) responde 404. O navegador só grava a decisão do banner
// por /bu1lder/api/c15t/subjects, que chama o c15t direto, sem esta rota.
export async function GET(request: Request): Promise<Response> {
  if (!ehRequisicaoInterna(request.headers)) return new Response(null, { status: 404 })
  return c15tHandler(request)
}
