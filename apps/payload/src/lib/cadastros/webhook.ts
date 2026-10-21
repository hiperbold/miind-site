import type { Cadastro } from '@/payload-types'

import { CAMPOS_OCULTOS } from './parametros'

// Contrato com o fluxo do n8n (docs/PLANO-PAYLOAD.md, "Corpo do webhook"):
// chaves do CRM, campos ocultos com os mesmos nomes, ip e user_agent, mais o
// contexto do formulário.
export const CHAVES_WEBHOOK = [
  'nome',
  'whatsapp',
  'email',
  'id',
  'perfil',
  'empresas_atendidas',
  'clientes_atendidos',
  'segmentos',
  'uso',
  'cidade_uf',
  ...CAMPOS_OCULTOS,
  'ip',
  'user_agent',
  'formulario',
  'tipo',
  'pagina',
  'segmento',
  'consentimento',
  'event_id',
  'criado_em',
] as const

export type CorpoWebhook = Record<(typeof CHAVES_WEBHOOK)[number], string | number | boolean | string[] | null>

const texto = (v: string | null | undefined) => (v === undefined || v === null || v === '' ? null : v)

export function montarCorpoWebhook(c: Cadastro): CorpoWebhook {
  const corpo = {
    nome: texto(c.nome),
    whatsapp: texto(c.whatsapp),
    email: texto(c.email),
    id: c.id,
    perfil: texto(c.perfil),
    empresas_atendidas: texto(c.empresas_atendidas),
    clientes_atendidos: texto(c.clientes_atendidos),
    segmentos: c.segmentos ?? [],
    uso: texto(c.uso),
    cidade_uf: texto(c.cidade_uf),
    ...(Object.fromEntries(CAMPOS_OCULTOS.map((k) => [k, texto(c[k])])) as Record<
      (typeof CAMPOS_OCULTOS)[number],
      string | null
    >),
    ip: texto(c.ip),
    user_agent: texto(c.user_agent),
    formulario: texto(c.formulario),
    tipo: texto(c.tipo),
    pagina: texto(c.pagina),
    segmento: texto(c.segmento),
    consentimento: Boolean(c.consentimento?.aceito),
    event_id: texto(c.event_id),
    criado_em: texto(c.createdAt),
  } satisfies CorpoWebhook
  return corpo
}

export type ResultadoEnvio = {
  ok: boolean
  tentativas: number
  respostaStatus: number | null
  // mensagem curta, sem URL, sem corpo e sem dados do cadastro
  erro: string | null
}

export type OpcoesEnvio = {
  timeoutMs?: number
  // tentativas extras em erro de rede, timeout ou 5xx
  novasTentativas?: number
  fetch?: typeof fetch
}

function descreverErro(err: unknown): string {
  if (err instanceof Error && (err.name === 'TimeoutError' || err.name === 'AbortError')) return 'tempo esgotado'
  const causa = (err as { cause?: { code?: unknown } } | null)?.cause
  const codigo = causa && typeof causa.code === 'string' ? causa.code : null
  return codigo ? `erro de rede (${codigo})` : 'erro de rede'
}

// POST JSON ao webhook. 2xx = enviado. 4xx não repete. Erro de rede, tempo
// esgotado ou 5xx: uma nova tentativa.
export async function enviarWebhook(url: string, corpo: CorpoWebhook, opcoes: OpcoesEnvio = {}): Promise<ResultadoEnvio> {
  const timeoutMs = opcoes.timeoutMs ?? 8000
  const maxTentativas = 1 + (opcoes.novasTentativas ?? 1)
  const f = opcoes.fetch ?? fetch
  let tentativas = 0
  let respostaStatus: number | null = null
  let erro: string | null = null

  while (tentativas < maxTentativas) {
    tentativas++
    try {
      const res = await f(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(corpo),
        signal: AbortSignal.timeout(timeoutMs),
        redirect: 'error',
      })
      respostaStatus = res.status
      // descarta o corpo da resposta (não é registrado)
      await res.body?.cancel().catch(() => {})
      if (res.ok) return { ok: true, tentativas, respostaStatus, erro: null }
      erro = `HTTP ${res.status}`
      if (res.status < 500) break
    } catch (err) {
      respostaStatus = null
      erro = descreverErro(err)
    }
  }
  return { ok: false, tentativas, respostaStatus, erro }
}
