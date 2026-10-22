import {
  createTrackingClient,
  readAttribution,
  trackingPluginOptionsSchema,
  type HeadersLike,
  type ServerTrackResult,
} from '@hiperbold/payload-tracking/server'
import type { Payload } from 'payload'

import { trackingOptions } from '@/tracking/options'

import { PAGINA_HOMEPAGE, PAGINA_PARCEIROS } from './ids'
import { TAMANHO_MAXIMO_PARAMETRO } from './parametros'
import type { Ocultos } from './validacao'
import { propriedadesLead } from './propriedades-lead'

// Lead pelo servidor (Meta CAPI, GA4 Measurement Protocol, Google Ads API),
// depois de o cadastro estar gravado, com o MESMO event_id que o navegador usa
// no Pixel. O módulo só grava na outbox; quem entrega é o worker.

export { propriedadesLead }

// Caminho público da página do formulário, para a política de consentimento
// por página (LP sem banner, homepage e programa com banner).
export function caminhoDaPagina(pagina: string): string {
  if (pagina === PAGINA_HOMEPAGE) return '/bu1lder/'
  if (pagina === PAGINA_PARCEIROS) return '/bu1lder/parceiros'
  return `/bu1lder/${pagina}`
}

let opcoesResolvidas: ReturnType<typeof trackingPluginOptionsSchema.parse> | null = null
const opcoes = () => (opcoesResolvidas ??= trackingPluginOptionsSchema.parse(trackingOptions))

// fbp/fbc/gclid/gbraid dos cookies das plataformas, para completar o que o
// cookie bu1lder_origem não tiver. Os demais campos ocultos são nossos.
export function completarAtribuicao(ocultos: Ocultos, headers: HeadersLike): Ocultos {
  let a: ReturnType<typeof readAttribution>
  try {
    a = readAttribution(headers, { pageUrl: ocultos.origem || undefined })
  } catch {
    return ocultos
  }
  const corta = (v: string | undefined) => (v ? v.slice(0, TAMANHO_MAXIMO_PARAMETRO) : null)
  return {
    ...ocultos,
    fbp: ocultos.fbp || corta(a.fbp),
    fbc: ocultos.fbc || corta(a.fbc),
    gclid: ocultos.gclid || corta(a.gclid),
    gbraid: ocultos.gbraid || corta(a.gbraid),
  }
}

export type DadosLeadServidor = {
  eventId: string
  pagina: string
  origem?: string | null
  email: string
  whatsapp: string
  perfil?: string | null
  empresas_atendidas?: string | null
  clientes_atendidos?: string | null
}

// Nunca lança: falha do tracking não derruba o cadastro (já gravado).
export async function registrarLeadServidor(
  payload: Payload,
  dados: DadosLeadServidor,
  headers: HeadersLike,
): Promise<ServerTrackResult | null> {
  try {
    const cliente = createTrackingClient(payload, opcoes())
    const r = await cliente.trackServerEvent('lead', propriedadesLead(dados), {
      eventId: dados.eventId,
      headers,
      pagePath: caminhoDaPagina(dados.pagina),
      ...(dados.origem ? { page: { url: dados.origem } } : {}),
      user: { email: dados.email, phone: dados.whatsapp },
    })
    if (r.accepted === 0 && r.reason !== 'replayed' && r.reason !== 'event_not_found') {
      payload.logger.warn(`[tracking] lead ${dados.eventId} não enfileirado: ${r.reason}${r.message ? ` (${r.message})` : ''}`)
    }
    return r
  } catch (err) {
    payload.logger.error(`[tracking] lead ${dados.eventId}: ${err instanceof Error ? err.message : 'erro'}`)
    return null
  }
}
