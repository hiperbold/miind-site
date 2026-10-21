import config from '@payload-config'
import { getPayload } from 'payload'

import { executarSeed } from './seed/executar'

// Seed idempotente (CLI):
// 1. admin de SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD, se o e-mail ainda não existir;
// 2. globais e as 11 LPs, por executarSeed (src/seed/executar.ts), que também
//    roda no onInit em produção com SEED_CONTEUDO_NO_INIT=1.
// O que já existe não é tocado, para não apagar edições feitas no admin.
// Para sobrescrever com o conteúdo do seed: SEED_ATUALIZAR=1 pnpm seed
// No fim, se o servidor estiver no ar, pede a revalidação das LPs.
const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase()
const password = process.env.SEED_ADMIN_PASSWORD
const atualizar = process.env.SEED_ATUALIZAR === '1'

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

const { mudou } = await executarSeed(payload, { atualizar, log: (m) => console.log(m) })

// Revalidação: o seed roda fora do Next, então pede ao servidor (se estiver no
// ar) pelo endpoint POST /api/paginas/revalidar. Sem servidor, as páginas saem
// atualizadas no próximo `pnpm build` (ou ao chamar o endpoint depois).
if (mudou) {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3010').replace(/\/+$/, '')
  try {
    const login = await fetch(`${base}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      signal: AbortSignal.timeout(5000),
    })
    const { token } = (await login.json()) as { token?: string }
    if (!token) throw new Error(`login recusado (${login.status})`)
    const res = await fetch(`${base}/api/paginas/revalidar`, {
      method: 'POST',
      headers: { Authorization: `JWT ${token}` },
      signal: AbortSignal.timeout(5000),
    })
    console.log(res.ok ? 'LPs revalidadas no servidor.' : `Revalidação recusada (${res.status}).`)
  } catch (err) {
    console.log(
      `Servidor em ${base} fora do ar ou sem resposta (${(err as Error).message}). ` +
        'Rode `pnpm build` ou chame POST /api/paginas/revalidar depois.',
    )
  }
}

process.exit(0)
