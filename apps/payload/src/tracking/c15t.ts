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

const pool = new pg.Pool({ connectionString: process.env.C15T_DATABASE_URI, max: 5 })
const adapter = kyselyAdapter({
  db: new Kysely({ dialect: new PostgresDialect({ pool }) }),
  provider: 'postgresql',
})

// Migra o banco do c15t. O migrator devolve um plano: sem execute() nada é aplicado.
export async function migrateC15t(): Promise<void> {
  const plano = await migrator({ db: DB.client(adapter), schema: 'latest' })
  if ('execute' in plano && typeof plano.execute === 'function') await plano.execute()
}

export const c15t = c15tInstance({
  adapter,
  appName: 'miind-bu1lder',
  basePath: '/api/c15t',
  trustedOrigins: origensConfiaveis(),
})
