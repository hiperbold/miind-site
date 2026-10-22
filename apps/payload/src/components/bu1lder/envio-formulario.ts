'use client'

import { track } from '@hiperbold/payload-tracking/client'

import { preencherOcultos } from './CamposOcultos'
import { CHAVE_LEAD, type ContextoLead } from '@/lib/cadastros/lead'
import { EVENTO_LEAD, propriedadesLead } from '@/lib/cadastros/propriedades-lead'

export type RespostaServidor =
  | { ok: true; token: string; eventId: string }
  | { ok: false; erro: string; erros?: Record<string, string> }

// Endereço que o navegador alcança (o Cloudflare da MIIND só encaminha /bu1lder/*).
const ENDPOINT = '/bu1lder/api/cadastros/enviar'

function lerCampos(form: HTMLFormElement): Record<string, string | string[]> {
  const fd = new FormData(form)
  const campos: Record<string, string | string[]> = {}
  for (const nome of new Set(fd.keys())) {
    const valores = fd.getAll(nome).map((v) => (typeof v === 'string' ? v : ''))
    campos[nome] = valores.length > 1 ? valores : (valores[0] ?? '')
  }
  return campos
}

// Envia o formulário ao servidor. Os campos ocultos são atualizados antes
// (origem = URL atual). Nunca simula sucesso: qualquer falha volta com a
// mensagem do servidor ou uma mensagem de conexão.
export async function enviarFormulario(
  form: HTMLFormElement,
  alvo: { pagina: string; formulario: string },
): Promise<{ resposta: RespostaServidor; campos: Record<string, string | string[]> }> {
  preencherOcultos(form)
  const campos = lerCampos(form)
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...alvo, campos }),
      credentials: 'same-origin',
    })
    const json = (await res.json().catch(() => null)) as RespostaServidor | null
    if (res.ok && json?.ok && json.token && json.eventId) return { resposta: json, campos }
    const erro =
      (json && !json.ok && json.erro) || `Não foi possível enviar o cadastro (erro ${res.status}). Tente de novo.`
    return { resposta: { ok: false, erro, erros: json && !json.ok ? json.erros : undefined }, campos }
  } catch {
    return {
      resposta: { ok: false, erro: 'Sem conexão com o servidor. Confira a internet e tente de novo.' },
      campos,
    }
  }
}

const um = (v: string | string[] | undefined) => (Array.isArray(v) ? (v[0] ?? '') : (v ?? ''))
const lista = (v: string | string[] | undefined) => (Array.isArray(v) ? v : v ? [v] : [])

// Guarda no sessionStorage o contexto que a página de obrigado expõe aos
// scripts. Dado pessoal fica só no navegador da pessoa, nunca na URL.
export function guardarContextoLead(dados: {
  token: string
  eventId: string
  nicho: string
  pagina: string
  formulario: string
  tipo: ContextoLead['tipo']
  campos: Record<string, string | string[]>
  contato: { nome: string; email: string; whatsapp: string }
}) {
  const c = dados.campos
  const contexto: ContextoLead = {
    token: dados.token,
    eventId: dados.eventId,
    nicho: dados.nicho,
    pagina: dados.pagina,
    formulario: dados.formulario,
    tipo: dados.tipo,
    perfil: um(c.perfil),
    segmento: um(c.segmento),
    empresas_atendidas: um(c.empresas_atendidas),
    clientes_atendidos: um(c.clientes_atendidos),
    segmentos: lista(c.segmentos),
    utm_source: um(c.utm_source),
    utm_medium: um(c.utm_medium),
    utm_campaign: um(c.utm_campaign),
    utm_content: um(c.utm_content),
    utm_term: um(c.utm_term),
    utm_id: um(c.utm_id),
    gclid: um(c.gclid),
    gbraid: um(c.gbraid),
    wbraid: um(c.wbraid),
    waclid: um(c.waclid),
    fbclid: um(c.fbclid),
    fbc: um(c.fbc),
    fbp: um(c.fbp),
    xcod: um(c.xcod),
    src: um(c.src),
    origem: um(c.origem),
    nome: dados.contato.nome.trim(),
    email: dados.contato.email.trim(),
    whatsapp: dados.contato.whatsapp.trim(),
  }
  try {
    sessionStorage.setItem(CHAVE_LEAD, JSON.stringify(contexto))
  } catch {
    // sessionStorage bloqueado: a página de obrigado abre sem contexto
  }
}

export function urlObrigado(nicho: string, token: string): string {
  const q = new URLSearchParams({ nicho, cadastro: token })
  return `/bu1lder/ty-page?${q.toString()}`
}

const texto = (v: string | string[] | undefined) => (Array.isArray(v) ? v.join(', ') : (v ?? ''))

// Lead no navegador (Pixel e conversão do gtag do Ads) com o MESMO event_id do
// servidor (CAPI, GA4 MP). Chamar só no sucesso, antes de ir para a página de
// obrigado: a Promise resolve quando os disparos saíram (teto de 1 s), nunca
// rejeita, e é no-op sem consentimento ou sem Evento cadastrado. `evento`:
// lead (cadastro Bu1lder) ou contato_plataforma (contato da plataforma enterprise).
export async function dispararLead(
  eventId: string,
  pagina: string,
  campos: Record<string, string | string[]>,
  evento: string = EVENTO_LEAD,
): Promise<void> {
  try {
    await track(
      evento,
      propriedadesLead({
        pagina,
        perfil: texto(campos.perfil),
        empresas_atendidas: texto(campos.empresas_atendidas),
        clientes_atendidos: texto(campos.clientes_atendidos),
      }),
      { eventId },
    )
  } catch {
    // o tracking nunca impede a ida para a página de obrigado
  }
}
