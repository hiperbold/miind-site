import { receberDecisaoBanner } from '@/tracking/banner-subjects'

// POST /bu1lder/api/c15t/subjects: o banner grava a decisão do visitante.
// Só este método e este caminho do c15t ficam alcançáveis pelo /bu1lder; as
// regras (limite por IP, cookie pt_subject, domínio fixo) em tracking/banner-subjects.ts.
export async function POST(request: Request): Promise<Response> {
  return receberDecisaoBanner(request)
}
