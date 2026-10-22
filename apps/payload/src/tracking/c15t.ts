import { c15tInstance } from '@c15t/backend'
import { kyselyAdapter } from '@c15t/backend/db/adapters/kysely'
import { migrator } from '@c15t/backend/db/migrator'
import { DB } from '@c15t/backend/db/schema'
import { Kysely, PostgresDialect } from 'kysely'
import pg from 'pg'

import { origensConfiaveis } from './options'

// Backend do consentimento (c15t), first-party, num banco PRÓPRIO na mesma
// instância do Postgres (C15T_DATABASE_URI). Banco separado, não schema: o
// introspector do c15t varre o banco inteiro e tropeça nas tabelas do Payload.
//
// Criado na primeira chamada, não no import (o build e as rotas importam este
// arquivo). Sem C15T_DATABASE_URI não há Pool (connectionString undefined
// cairia em localhost/PG*): o consentimento fica desligado, as rotas do c15t
// respondem 503 e o resto do site segue.

export const MENSAGEM_C15T_DESLIGADO = 'consentimento desligado: C15T_DATABASE_URI ausente'

type Instancia = { adapter: ReturnType<typeof kyselyAdapter>; c15t: ReturnType<typeof c15tInstance> }

let instancia: Instancia | null | undefined

export function c15tConfigurado(): boolean {
  return Boolean(process.env.C15T_DATABASE_URI?.trim())
}

function obter(): Instancia | null {
  if (instancia !== undefined) return instancia
  const uri = process.env.C15T_DATABASE_URI?.trim()
  if (!uri) {
    instancia = null
    return null
  }
  const pool = new pg.Pool({ connectionString: uri, max: 5 })
  // queda de conexão ociosa (banco reiniciado, rede) não derruba o processo
  pool.on('error', (err) => {
    console.error(`[c15t] erro numa conexão ociosa do banco do consentimento: ${err instanceof Error ? err.message : 'erro'}`)
  })
  const adapter = kyselyAdapter({
    db: new Kysely({ dialect: new PostgresDialect({ pool }) }),
    provider: 'postgresql',
  })
  const c15t = c15tInstance({
    adapter,
    appName: 'miind-bu1lder',
    basePath: '/api/c15t',
    trustedOrigins: origensConfiaveis(),
    // sem /spec.json nem /docs públicos
    openapi: { enabled: false },
    // não grava o IP do visitante
    ipAddress: { tracking: false },
  })
  instancia = { adapter, c15t }
  return instancia
}

// Migra o banco do c15t. O migrator devolve um plano: sem execute() nada é aplicado.
export async function migrateC15t(): Promise<void> {
  const i = obter()
  if (!i) throw new Error(MENSAGEM_C15T_DESLIGADO)
  const plano = await migrator({ db: DB.client(i.adapter), schema: 'latest' })
  if ('execute' in plano && typeof plano.execute === 'function') await plano.execute()
}

// Atende uma requisição do c15t. Sem banco configurado: 503 sem detalhes.
export async function c15tHandler(request: Request): Promise<Response> {
  const i = obter()
  if (!i) {
    return Response.json(
      { ok: false, erro: 'consentimento indisponível' },
      { status: 503, headers: { 'cache-control': 'no-store' } },
    )
  }
  return i.c15t.handler(request)
}
