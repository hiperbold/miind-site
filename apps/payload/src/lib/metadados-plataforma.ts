import type { Metadata } from 'next'

import type { Media } from '@/payload-types'

import { urlMidiaPublica, urlPublica } from './url-publica'

type SeoGlobal = {
  title: string
  description?: string | null
  ogTitle?: string | null
  ogDescription?: string | null
  ogImage?: number | Media | null
  keywords?: string | null
}

// Metadados da homepage e do programa de parceiros. Sem imagem enviada, usa a
// imagem padrão do Bu1lder (public/bu1lder/media/og-image.jpg, 1216 x 640).
export function metadadosPlataforma(seo: SeoGlobal | null | undefined, caminho: string): Metadata {
  if (!seo) return {}
  const url = `${urlPublica()}${caminho}`
  const og = seo.ogImage && typeof seo.ogImage === 'object' ? urlMidiaPublica(seo.ogImage.filename) : null
  const imagem = og
    ? { url: og }
    : { url: `${urlPublica()}/bu1lder/media/og-image.jpg`, width: 1216, height: 640 }
  const ogTitle = seo.ogTitle || seo.title
  const ogDescription = seo.ogDescription || seo.description || undefined
  return {
    metadataBase: new URL(urlPublica()),
    title: seo.title,
    description: seo.description || undefined,
    keywords: seo.keywords || undefined,
    alternates: { canonical: url },
    openGraph: { title: ogTitle, description: ogDescription, url, type: 'website', images: [imagem] },
    twitter: { card: 'summary_large_image', title: ogTitle, description: ogDescription, images: [imagem.url] },
  }
}
