import '@fontsource-variable/geist'
import '@fontsource-variable/geist/wght-italic.css'
import '@/styles/bu1lder/styles.css'
import '@/styles/bu1lder/miind-fonts.css'
import '@/styles/bu1lder/miind-ds.css'

import { TrackingProvider } from '@hiperbold/payload-tracking/client'
import type { Metadata } from 'next'
import React, { Suspense } from 'react'

import { BannerConsentimento } from '@/components/bu1lder/BannerConsentimento'
import { CapturaParametros } from '@/components/bu1lder/CamposOcultos'
import { metadataRobots } from '@/lib/noindex'
import { buscarPagina } from '@/lib/paginas'
import { ScriptsBodyFim, ScriptsHead } from '@/lib/scripts-personalizados'

// SITE_NOINDEX=1: robots noindex,nofollow em todas as LPs.
export function generateMetadata(): Metadata {
  return metadataRobots()
}

// Layout raiz das páginas /bu1lder/{slug}. É raiz (tem <html>) para que o
// servidor já entregue a classe do tema e o atributo do DS no <html>, sem
// piscar escuro antes da hidratação.
export default async function PaginaLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const pagina = await buscarPagina(slug)
  // Sem página (404): claro e com o DS MIIND.
  const claro = pagina ? pagina.temaClaroPadrao !== false : true
  const ds = pagina ? pagina.visual === 'ds' : true

  return (
    <html
      lang="pt-BR"
      className={claro ? 'light' : undefined}
      style={{ colorScheme: claro ? 'light' : 'dark' }}
      data-miind-ds={ds ? 'true' : undefined}
      suppressHydrationWarning
    >
      <head>
        <ScriptsHead html={pagina?.scriptsPersonalizados?.head} />
      </head>
      <body>
        <CapturaParametros />
        <Suspense fallback={null}>
          <TrackingProvider apiBase="/bu1lder/api" />
        </Suspense>
        {/* LP com "Exigir banner de consentimento" marcado no admin */}
        {pagina && pagina.trackingConsentRequired !== false && <BannerConsentimento />}
        {children}
        <ScriptsBodyFim html={pagina?.scriptsPersonalizados?.bodyFim} />
      </body>
    </html>
  )
}
