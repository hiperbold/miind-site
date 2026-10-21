import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RenderBlocos } from '@/blocks/RenderBlocos'
import { BuildersHeader } from '@/components/bu1lder/BuildersHeader'
import { NicheFooter } from '@/components/bu1lder/NicheFooter'
import { PaginaWrapper } from '@/components/bu1lder/Pagina'
import { SegmentNav } from '@/components/bu1lder/SegmentNav'
import { buscarGlobais, buscarNavegacaoSegmentos, buscarPagina, buscarSlugsPublicados } from '@/lib/paginas'
import type { Media } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }

// Páginas geradas no build a partir do banco; slug novo publicado depois é
// gerado na primeira visita. Slug inexistente dá 404.
export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const slugs = await buscarSlugsPublicados()
    return slugs.map((slug) => ({ slug }))
  } catch (err) {
    // Sem banco no build: as páginas são geradas sob demanda.
    console.warn('generateStaticParams /bu1lder/[slug]: banco indisponível.', err)
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const pagina = await buscarPagina(slug)
  if (!pagina) return {}
  const title = pagina.seo?.title || pagina.titulo
  const description = pagina.seo?.description || undefined
  const og = pagina.seo?.ogImage
  const ogUrl = og && typeof og === 'object' ? (og as Media).url : null
  const url = `/bu1lder/${pagina.slug}`
  return {
    metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      ...(ogUrl ? { images: [{ url: ogUrl }] } : {}),
    },
  }
}

export default async function PaginaBu1lder({ params }: Props) {
  const { slug } = await params
  const pagina = await buscarPagina(slug)
  if (!pagina) notFound()

  const [globais, navegacao] = await Promise.all([
    buscarGlobais(),
    pagina.cabecalho?.mostrarNavegacaoSegmentos ? buscarNavegacaoSegmentos() : Promise.resolve([]),
  ])
  const comNavegacao = Boolean(pagina.cabecalho?.mostrarNavegacaoSegmentos) && navegacao.length > 0

  return (
    <PaginaWrapper>
      <BuildersHeader showBackLink={Boolean(pagina.cabecalho?.mostrarVoltar)} />
      {comNavegacao && <SegmentNav activeSlug={pagina.slug} items={navegacao} />}

      <RenderBlocos
        blocos={pagina.layout}
        contexto={{
          slug: pagina.slug,
          comNavegacaoSegmentos: comNavegacao,
          planos: globais.planos,
          faqPlataforma: globais.faqPlataforma,
          formulario: globais.formulario,
        }}
      />

      <NicheFooter
        linksTitle={globais.rodape.tituloLinks}
        links={(globais.rodape.links ?? []).map((l) => ({ label: l.rotulo, url: l.url }))}
        rightsText={globais.rodape.textoDireitos}
      />
    </PaginaWrapper>
  )
}
