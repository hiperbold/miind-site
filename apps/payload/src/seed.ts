import config from '@payload-config'
import { getPayload } from 'payload'

import { faqPlataformaSeed, formularioSeed, planosSeed, rodapeSeed } from './seed/globais'
import { paginasSeed } from './seed/paginas'

// Seed idempotente:
// 1. admin de SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD, se o e-mail ainda não existir;
// 2. globais (planos, FAQ da plataforma, formulário, rodapé), se ainda estiverem vazios;
// 3. as 10 LPs de nicho, publicadas, procuradas pelo slug (cria as que faltam).
// Páginas e globais que já existem não são tocados, para não apagar edições
// feitas no admin. Para sobrescrever com o conteúdo do seed: SEED_ATUALIZAR=1 pnpm seed
const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase()
const password = process.env.SEED_ADMIN_PASSWORD
const atualizar = process.env.SEED_ATUALIZAR === '1'

if (!email || !password) {
  console.error('Defina SEED_ADMIN_EMAIL e SEED_ADMIN_PASSWORD no .env.')
  process.exit(1)
}

const payload = await getPayload({ config })
// Fora do servidor Next não há cache para revalidar.
const context = { semRevalidar: true }

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

// Globais
const planos = await payload.findGlobal({ slug: 'planos', depth: 0 })
if (atualizar || !planos.planos?.length) {
  await payload.updateGlobal({ slug: 'planos', data: planosSeed, context })
  console.log('Global "planos" gravado.')
} else console.log('Global "planos" já preenchido. Mantido.')

const faq = await payload.findGlobal({ slug: 'faq-plataforma', depth: 0 })
if (atualizar || !faq.perguntas?.length) {
  await payload.updateGlobal({ slug: 'faq-plataforma', data: faqPlataformaSeed, context })
  console.log('Global "faq-plataforma" gravado.')
} else console.log('Global "faq-plataforma" já preenchido. Mantido.')

const formulario = await payload.findGlobal({ slug: 'formulario', depth: 0 })
if (atualizar || !formulario.textoConsentimento) {
  await payload.updateGlobal({ slug: 'formulario', data: formularioSeed, context })
  console.log('Global "formulario" gravado.')
} else console.log('Global "formulario" já preenchido. Mantido.')

const rodape = await payload.findGlobal({ slug: 'rodape', depth: 0 })
if (atualizar || !rodape.links?.length) {
  await payload.updateGlobal({ slug: 'rodape', data: rodapeSeed, context })
  console.log('Global "rodape" gravado.')
} else console.log('Global "rodape" já preenchido. Mantido.')

// Páginas
for (const pagina of paginasSeed) {
  const achadas = await payload.find({
    collection: 'paginas',
    where: { slug: { equals: pagina.slug } },
    draft: true,
    limit: 1,
    depth: 0,
  })
  const atual = achadas.docs[0]
  if (!atual) {
    await payload.create({ collection: 'paginas', data: { ...pagina, _status: 'published' }, context })
    console.log(`Página criada e publicada: /bu1lder/${pagina.slug}`)
  } else if (atualizar) {
    await payload.update({
      collection: 'paginas',
      id: atual.id,
      data: { ...pagina, _status: 'published' },
      context,
    })
    console.log(`Página atualizada e publicada: /bu1lder/${pagina.slug}`)
  } else {
    console.log(`Página já existe: /bu1lder/${pagina.slug}. Mantida.`)
  }
}

process.exit(0)
