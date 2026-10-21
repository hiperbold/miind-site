import { randomBytes, randomUUID } from 'crypto'
import type { Payload } from 'payload'

import type { Cadastro } from '@/payload-types'

import { buscarConfigFormulario } from './formularios'
import { extrairIp, extrairUserAgent } from './ip'
import { limiteEnvios, type LimitePorChave } from './limite'
import { esquemaCorpo, TAMANHO_MAXIMO_CORPO, validarEnvio } from './validacao'
import { enviarWebhook, montarCorpoWebhook, type OpcoesEnvio } from './webhook'

export type RespostaEnvio = {
  status: number
  corpo:
    | { ok: true; token: string; eventId: string }
    | { ok: false; erro: string; erros?: Record<string, string> }
}

const MENSAGEM_GENERICA = 'Não foi possível enviar o cadastro. Tente de novo em instantes.'

export function novoToken(): string {
  return randomBytes(24).toString('base64url')
}

export function novoEventId(): string {
  return `lead_${randomUUID()}`
}

const falha = (status: number, erro: string, erros?: Record<string, string>): RespostaEnvio => ({
  status,
  corpo: erros ? { ok: false, erro, erros } : { ok: false, erro },
})

// URL do webhook: só http(s). Nunca vai para log nem para o cadastro.
function urlValida(url: string | undefined): string | null {
  const v = url?.trim()
  if (!v) return null
  try {
    const u = new URL(v)
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.toString() : null
  } catch {
    return null
  }
}

// Envia o cadastro ao webhook e grava a situação do envio. Nunca lança.
export async function enviarEAtualizar(
  payload: Payload,
  cadastro: Cadastro,
  webhookUrl: string | undefined,
  opcoes: OpcoesEnvio = {},
): Promise<{ ok: boolean; status: 'enviado' | 'falha' }> {
  const anteriores = cadastro.envio?.tentativas ?? 0
  const url = urlValida(webhookUrl)
  let envio: NonNullable<Cadastro['envio']>
  if (!url) {
    envio = {
      status: 'falha',
      tentativas: anteriores,
      ultimoErro: webhookUrl?.trim() ? 'webhook mal configurado' : 'webhook não configurado',
      respostaStatus: null,
    }
  } else {
    const r = await enviarWebhook(url, montarCorpoWebhook(cadastro), opcoes)
    envio = r.ok
      ? {
          status: 'enviado',
          tentativas: anteriores + r.tentativas,
          ultimoErro: null,
          respostaStatus: r.respostaStatus,
          enviadoEm: new Date().toISOString(),
        }
      : { status: 'falha', tentativas: anteriores + r.tentativas, ultimoErro: r.erro, respostaStatus: r.respostaStatus }
  }
  try {
    await payload.update({ collection: 'cadastros', id: cadastro.id, data: { envio }, overrideAccess: true, depth: 0 })
  } catch (err) {
    payload.logger.error(
      `[cadastros] não foi possível gravar a situação do envio do cadastro ${cadastro.id}: ${err instanceof Error ? err.message : 'erro'}`,
    )
  }
  if (envio.status === 'falha') payload.logger.warn(`[cadastros] envio ao webhook falhou (cadastro ${cadastro.id}): ${envio.ultimoErro}`)
  return { ok: envio.status === 'enviado', status: envio.status as 'enviado' | 'falha' }
}

export type OpcoesReceber = {
  payload: Payload
  headers: Headers
  textoCorpo: string
  webhookUrl: string | undefined
  limite?: LimitePorChave
  opcoesEnvio?: OpcoesEnvio
  // Como rodar o envio ao webhook. Padrão: aguarda. No endpoint: after() do
  // Next, para a resposta não esperar o n8n.
  agendar?: (tarefa: () => Promise<unknown>) => void | Promise<unknown>
}

// Recebe o envio de um formulário do site: limite por IP, validação pela
// configuração publicada, gravação e envio ao webhook.
export async function receberCadastro(op: OpcoesReceber): Promise<RespostaEnvio> {
  const { payload, headers } = op
  const ip = extrairIp(headers)
  const limite = op.limite ?? limiteEnvios
  if (!limite.permitir(ip ?? 'sem-ip')) {
    return falha(429, 'Muitos envios seguidos. Aguarde alguns minutos e tente de novo.')
  }
  if (op.textoCorpo.length > TAMANHO_MAXIMO_CORPO) return falha(413, MENSAGEM_GENERICA)

  let json: unknown
  try {
    json = JSON.parse(op.textoCorpo)
  } catch {
    return falha(400, MENSAGEM_GENERICA)
  }
  const corpo = esquemaCorpo.safeParse(json)
  if (!corpo.success) return falha(400, MENSAGEM_GENERICA)

  const config = await buscarConfigFormulario(payload, corpo.data.pagina, corpo.data.formulario)
  if (!config) return falha(400, 'Formulário não encontrado. Atualize a página e tente de novo.')

  const v = validarEnvio(config, corpo.data.campos)
  if (!v.ok) {
    if (v.honeypot) return falha(400, MENSAGEM_GENERICA)
    return falha(400, 'Confira os campos destacados.', v.erros)
  }
  const d = v.dados
  const token = novoToken()
  const eventId = novoEventId()
  const agora = new Date().toISOString()

  let cadastro: Cadastro
  try {
    cadastro = await payload.create({
      collection: 'cadastros',
      overrideAccess: true,
      depth: 0,
      data: {
        nome: d.nome,
        email: d.email,
        whatsapp: d.whatsapp,
        cidade_uf: d.cidade_uf,
        perfil: d.perfil,
        segmento: d.segmento,
        empresas_atendidas: d.empresas_atendidas,
        clientes_atendidos: d.clientes_atendidos,
        segmentos: d.segmentos,
        uso: d.uso,
        extras: d.extras,
        contato: d.contato ?? undefined,
        consentimento: {
          aceito: d.consentimento.aceito,
          texto: d.consentimento.texto,
          data: d.consentimento.aceito ? agora : null,
        },
        formulario: config.formulario,
        tipo: config.tipo,
        pagina: config.pagina,
        ...d.ocultos,
        ip,
        user_agent: extrairUserAgent(headers),
        token,
        event_id: eventId,
        envio: { status: 'pendente', tentativas: 0 },
      },
    })
  } catch (err) {
    payload.logger.error(`[cadastros] falha ao gravar o cadastro: ${err instanceof Error ? err.message : 'erro'}`)
    return falha(500, MENSAGEM_GENERICA)
  }

  const tarefa = () => enviarEAtualizar(payload, cadastro, op.webhookUrl, op.opcoesEnvio)
  if (op.agendar) await op.agendar(tarefa)
  else await tarefa()

  return { status: 200, corpo: { ok: true, token, eventId } }
}
