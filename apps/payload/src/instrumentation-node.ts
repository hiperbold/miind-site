import config from '@payload-config'
import {
  createDeliveryHandler,
  purgeTerminalDeliveries,
  runDeliveryWorkerTick,
  trackingPluginOptionsSchema,
} from '@hiperbold/payload-tracking/server'
import { getPayload } from 'payload'

import { garantirBancoC15t } from './tracking/banco-c15t'
import { migrateC15t } from './tracking/c15t'
import { trackingOptions } from './tracking/options'

const INTERVALO_MS = 15_000
const MAX_TICKS_POR_RODADA = 25
const LIMPEZA_MS = 60 * 60 * 1000

let iniciado = false

// 1) cria o banco do c15t se faltar e migra; 2) liga o worker que entrega a
// outbox (CAPI, GA4 MP). Nunca na fase de build. TRACKING_WORKER=0 desliga o
// worker (verificação de rede local: nada sai para as plataformas).
export async function iniciarTracking(): Promise<void> {
  if (iniciado || process.env.NEXT_PHASE === 'phase-production-build') return
  iniciado = true

  try {
    const r = await garantirBancoC15t()
    if (r === 'criado') console.info('[c15t] banco do consentimento criado')
    await migrateC15t()
  } catch (err) {
    console.error(`[c15t] preparação do banco do consentimento falhou: ${err instanceof Error ? err.message : 'erro'}`)
  }

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
