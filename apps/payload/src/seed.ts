import config from '@payload-config'
import { getPayload } from 'payload'

// Cria o usuário admin a partir de SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD.
// Idempotente: se o e-mail já existir, não faz nada.
const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase()
const password = process.env.SEED_ADMIN_PASSWORD

if (!email || !password) {
  console.error('Defina SEED_ADMIN_EMAIL e SEED_ADMIN_PASSWORD no .env.')
  process.exit(1)
}

const payload = await getPayload({ config })

const existing = await payload.find({
  collection: 'users',
  where: { email: { equals: email } },
  limit: 1,
  depth: 0,
})

if (existing.totalDocs > 0) {
  console.log(`Admin já existe (${email}). Nada a fazer.`)
} else {
  await payload.create({
    collection: 'users',
    data: { email, password },
  })
  console.log(`Admin criado (${email}).`)
}

process.exit(0)
