import config from '@payload-config'
import { type DataFromGlobalSlug, getPayload, type GlobalSlug } from 'payload'

import { cartoesHubSeed } from './seed/cartoes-hub'
import { faqPlataformaSeed, formularioSeed, planosSeed, rodapeSeed } from './seed/globais'
import { homepageSeed } from './seed/homepage'
import { paginasSeed } from './seed/paginas'
import { parceirosSeed } from './seed/parceiros'

// Seed idempotente:
// 1. admin de SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD, se o e-mail ainda não existir;
// 2. globais (homepage, parceiros, planos, FAQ da plataforma, formulário, rodapé)
//    que nunca foram salvos; homepage e parceiros saem publicados;
// 3. as 11 LPs (10 nichos e agência), publicadas, procuradas pelo slug (cria as que faltam);
//    o grupo "No programa de parceiros" (cartaoHub) vem de seed/cartoes-hub.ts e é
//    preenchido também em páginas já existentes que ainda não o têm.
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

await gravarGlobal('homepage', homepageSeed)
await gravarGlobal('parceiros', parceirosSeed)
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
  if (publicada.docs[0]) return publicada.docs[0].id as number
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

for (const paginaBase of paginasSeed) {
  const cartaoHub = cartoesHubSeed[paginaBase.slug as keyof typeof cartoesHubSeed]
  const pagina = cartaoHub ? { ...paginaBase, cartaoHub } : paginaBase
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
    const atual = await payload.findByID({ collection: 'paginas', id, depth: 0, draft: false })
    if (cartaoHub && !atual.cartaoHub?.nome) {
      // só o grupo novo; o resto da página fica como está
      await payload.update({ collection: 'paginas', id, data: { cartaoHub }, context })
      mudou = true
      console.log(`Página já existe: /bu1lder/${pagina.slug}. Cartão do programa preenchido.`)
    } else console.log(`Página já existe: /bu1lder/${pagina.slug}. Mantida.`)
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
