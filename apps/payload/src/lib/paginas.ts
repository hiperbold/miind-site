import config from '@payload-config'
import { getPayload } from 'payload'
import { connection } from 'next/server'
import { cache } from 'react'

import type { SegmentNavItem } from '@/components/bu1lder/SegmentNav'

// Leituras das páginas públicas. overrideAccess: false aplica o acesso da
// coleção sem usuário, ou seja, só o que está publicado.

export const buscarPagina = cache(async (slug: string) => {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'paginas',
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    draft: false,
    overrideAccess: false,
    limit: 1,
    depth: 1,
  })
  return res.docs[0] ?? null
})

export const buscarSlugsPublicados = async () => {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'paginas',
    where: { _status: { equals: 'published' } },
    draft: false,
    overrideAccess: false,
    limit: 500,
    depth: 0,
    select: { slug: true },
  })
  return res.docs.map((d) => d.slug)
}

export const buscarNavegacaoSegmentos = cache(async (): Promise<SegmentNavItem[]> => {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'paginas',
    where: { tipo: { equals: 'nicho' }, _status: { equals: 'published' } },
    draft: false,
    overrideAccess: false,
    limit: 200,
    depth: 0,
    sort: ['navegacao.ordem', 'titulo'],
    select: { slug: true, titulo: true, navegacao: true },
  })
  return res.docs.map((d) => ({ slug: d.slug, label: d.navegacao?.rotulo || d.titulo }))
})

export const buscarGlobais = cache(async () => {
  const payload = await getPayload({ config })
  const [planos, faqPlataforma, formulario, rodape] = await Promise.all([
    payload.findGlobal({ slug: 'planos', depth: 0 }),
    payload.findGlobal({ slug: 'faq-plataforma', depth: 0 }),
    payload.findGlobal({ slug: 'formulario', depth: 0 }),
    payload.findGlobal({ slug: 'rodape', depth: 0 }),
  ])
  return { planos, faqPlataforma, formulario, rodape }
})

// Homepage e programa de parceiros: globais com rascunho; o site lê a versão
// publicada (draft: false).
export const buscarHomepage = cache(async () => {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'homepage', draft: false, depth: 1 })
})

export const buscarParceiros = cache(async () => {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'parceiros', draft: false, depth: 1 })
})

// Páginas de nicho publicadas para o programa de parceiros: todas entram no
// seletor de segmento; só as marcadas entram na grade de cartões.
export const buscarNichosHub = cache(async () => {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'paginas',
    where: { tipo: { equals: 'nicho' }, _status: { equals: 'published' } },
    draft: false,
    overrideAccess: false,
    limit: 200,
    depth: 0,
    sort: ['navegacao.ordem', 'titulo'],
    select: { slug: true, titulo: true, navegacao: true, cartaoHub: true },
  })
  const nome = (d: (typeof res.docs)[number]) => d.cartaoHub?.nome || d.navegacao?.rotulo || d.titulo
  return {
    segmentos: res.docs.map((d) => ({ value: d.slug, label: nome(d) })),
    nichos: res.docs
      .filter((d) => d.cartaoHub?.mostrarNaGrade)
      .map((d) => ({
        slug: d.slug,
        nome: nome(d),
        icone: d.cartaoHub?.icone,
        estatistica: d.cartaoHub?.estatistica,
        texto: d.cartaoHub?.texto,
      })),
  }
})

// No `next build` sem banco (imagem montada sem Postgres), a leitura falha: em
// vez de quebrar o build, a rota passa a ser gerada na hora da visita. Fora do
// build, o erro segue normalmente.
export async function lerOuAdiarNoBuild<T>(ler: () => Promise<T>): Promise<T> {
  try {
    return await ler()
  } catch (err) {
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      console.warn('Banco indisponível no build: rota gerada sob demanda.')
      await connection()
    }
    throw err
  }
}
