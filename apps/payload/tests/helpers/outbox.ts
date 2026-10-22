// Só para testes e verificação: abre o snapshot cifrado de uma entrega da
// outbox (funções internas do módulo, fora da API pública dele).
import { openSnapshot } from '../../node_modules/@hiperbold/payload-tracking/dist/outbox/repository.js'
import { loadKeyringFromEnv } from '../../node_modules/@hiperbold/payload-tracking/dist/vault/repository.js'

export function abrirSnapshot(linha: { snapshot: string; idempotencyKey: string }): Record<string, unknown> {
  const chaves = loadKeyringFromEnv({
    activeKeyIdEnv: 'PAYLOAD_TRACKING_ACTIVE_KEY_ID',
    keyringEnv: 'PAYLOAD_TRACKING_ENCRYPTION_KEYS',
  })
  return openSnapshot(linha.snapshot, chaves, 'miind-bu1lder', linha.idempotencyKey)
}
