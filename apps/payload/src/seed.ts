import config from '@payload-config'
import { type DataFromGlobalSlug, getPayload, type GlobalSlug } from 'payload'

import { faqPlataformaSeed, formularioSeed, planosSeed, rodapeSeed } from './seed/globais'
import { paginasSeed } from './seed/paginas'

// Seed idempotente:
// 1. admin de SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD, se o e-mail ainda não existir;
// 2. globais (planos, FAQ da plataforma, formulário, rodapé) que nunca foram salvos;
// 3. as 10 LPs de nicho, publicadas, procuradas pelo slug (cria as que faltam).
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
// Fora do servidor Next não há cache para revalidar nos hooks (ver o fim do arquivo).
const context = { semRevalidar: true }
let mudou = false

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

// Globais: um global nunca salvo volta sem updatedAt.
async function gravarGlobal<S extends GlobalSlug>(slug: S, data: Omit<DataFromGlobalSlug<S>, 'id'>) {
  const atual = await payload.findGlobal({ slug, depth: 0 })
  if (atualizar || !(atual as { updatedAt?: string | null })?.updatedAt) {
    // o tipo genérico do updateGlobal não se resolve com S aberto; data já foi checado na chamada
    await payload.updateGlobal({ slug, data: data as never, context })
    mudou = true
    console.log(`Global "${slug}" gravado.`)
  } else console.log(`Global "${slug}" já existe. Mantido.`)
}

await gravarGlobal('planos', planosSeed)
await gravarGlobal('faq-plataforma', faqPlataformaSeed)
await gravarGlobal('formulario', formularioSeed)
await gravarGlobal('rodape', rodapeSeed)

// Páginas: procura o slug no documento (publicado) e nos rascunhos.
async function acharPagina(slug: string) {
  const publicada = await payload.find({
    collection: 'paginas',
    where: { slug: { equals: slug } },
    draft: false,
    limit: 1,
    depth: 0,
  })
  if (publicada.docs[0]) return publicada.docs[0].id
  const rascunho = await payload.findVersions({
    collection: 'paginas',
    where: { 'version.slug': { equals: slug } },
    sort: '-updatedAt',
    limit: 1,
    depth: 0,
  })
  const parent = rascunho.docs[0]?.parent as number | { id: number } | null | undefined
  if (parent) return typeof parent === 'object' ? parent.id : parent
  return null
}

for (const pagina of paginasSeed) {
  const id = await acharPagina(pagina.slug)
  if (!id) {
    await payload.create({ collection: 'paginas', data: { ...pagina, _status: 'published' }, context })
    mudou = true
    console.log(`Página criada e publicada: /bu1lder/${pagina.slug}`)
  } else if (atualizar) {
    await payload.update({ collection: 'paginas', id, data: { ...pagina, _status: 'published' }, context })
    mudou = true
    console.log(`Página atualizada e publicada: /bu1lder/${pagina.slug}`)
  } else {
    console.log(`Página já existe: /bu1lder/${pagina.slug}. Mantida.`)
  }
}

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
