import config from '@payload-config'
import { getPayload } from 'payload'
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
