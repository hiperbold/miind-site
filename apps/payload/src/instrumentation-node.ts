import config from '@payload-config'
import {
  createDeliveryHandler,
  purgeTerminalDeliveries,
  runDeliveryWorkerTick,
  trackingPluginOptionsSchema,
} from '@hiperbold/payload-tracking/server'
import { getPayload } from 'payload'

import { trackingOptions } from './tracking/options'

const INTERVALO_MS = 15_000
const MAX_TICKS_POR_RODADA = 25
const LIMPEZA_MS = 60 * 60 * 1000

let iniciado = false

// Mensagem de erro para o log, sem endereço de banco (que pode trazer senha).
export function mensagemSegura(err: unknown): string {
  const bruto = err instanceof Error ? err.message : 'erro'
  return bruto.replace(/\b[a-z][a-z0-9+.-]*:\/\/\S+/gi, '<endereço>').split(/\r?\n/)[0]!.slice(0, 300)
}

// 1) cria o banco do c15t se faltar e migra; 2) liga o worker que entrega a
// outbox (CAPI, GA4 MP). Nunca na fase de build. TRACKING_WORKER=0 desliga o
// worker (verificação de rede local: nada sai para as plataformas).
// Nunca rejeita: falha de banco ou de configuração vira log e o site sobe.
// Banco do c15t fora na subida: o consentimento responde indisponível até o
// banco voltar (o Pool reconecta sozinho); a migração roda de novo no próximo start.
export async function iniciarTracking(): Promise<void> {
  if (iniciado || process.env.NEXT_PHASE === 'phase-production-build') return
  iniciado = true
  try {
    await prepararC15t()
    await ligarWorker()
  } catch (err) {
    console.error(`[tracking] início do tracking falhou; o site segue sem ele: ${mensagemSegura(err)}`)
  }
}

async function prepararC15t(): Promise<void> {
  try {
    const { c15tConfigurado, MENSAGEM_C15T_DESLIGADO, migrateC15t } = await import('./tracking/c15t')
    if (!c15tConfigurado()) {
      if (process.env.NODE_ENV === 'production') console.error(`[c15t] ${MENSAGEM_C15T_DESLIGADO}`)
      else console.warn(`[c15t] ${MENSAGEM_C15T_DESLIGADO}`)
      return
    }
    const { garantirBancoC15t } = await import('./tracking/banco-c15t')
    const r = await garantirBancoC15t()
    if (r === 'criado') console.info('[c15t] banco do consentimento criado')
    await migrateC15t()
  } catch (err) {
    console.error(`[c15t] preparação do banco do consentimento falhou: ${mensagemSegura(err)}`)
  }
}

async function ligarWorker(): Promise<void> {

  if (process.env.TRACKING_WORKER?.trim() === '0') {
    console.warn('[tracking] worker de entregas desligado (TRACKING_WORKER=0): nada sai da outbox')
    return
  }

  const payload = await getPayload({ config })
  const opcoes = trackingPluginOptionsSchema.parse(trackingOptions)
  const handler = createDeliveryHandler(payload, opcoes)
  let rodando = false

  setInterval(async () => {
    if (rodando) return
    rodando = true
    try {
      for (let i = 0; i < MAX_TICKS_POR_RODADA; i += 1) {
        const r = await runDeliveryWorkerTick(payload, {
          backoffSeconds: 30,
          handler,
          leaseSeconds: 60,
          maxAttempts: opcoes.jobs.maxAttempts,
          snapshotTtlHours: opcoes.jobs.snapshotTtlHours,
        })
        if (r === 'empty') break
      }
    } catch (err) {
      payload.logger.error(`[tracking] rodada do worker falhou: ${String(err)}`)
    } finally {
      rodando = false
    }
  }, INTERVALO_MS).unref?.()

  setInterval(() => {
    purgeTerminalDeliveries(payload, opcoes.jobs.retentionDays).catch((err) =>
      payload.logger.error(`[tracking] limpeza da outbox falhou: ${String(err)}`),
    )
  }, LIMPEZA_MS).unref?.()
}
