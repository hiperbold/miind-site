import { c15t } from '@/tracking/c15t'

// Backend do c15t em /api/c15t/* (fora do /bu1lder: não passa pelo Cloudflare
// da MIIND). O servidor consulta o consentimento aqui pela rede interna. O
// navegador só grava a decisão do banner por /bu1lder/api/c15t/subjects.
const handler = (request: Request) => c15t.handler(request)

export const DELETE = handler
export const GET = handler
export const OPTIONS = handler
export const PATCH = handler
export const POST = handler
export const PUT = handler
