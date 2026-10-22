import '@fontsource-variable/geist'
import '@fontsource-variable/geist/wght-italic.css'
import '@/styles/bu1lder/styles.css'
import '@/styles/bu1lder/miind-fonts.css'
import '@/styles/bu1lder/miind-ds.css'

import { TrackingProvider } from '@hiperbold/payload-tracking/client'
import type { Metadata } from 'next'
import { connection } from 'next/server'
import React, { Suspense } from 'react'

import { CapturaParametros } from '@/components/bu1lder/CamposOcultos'
import { buscarTyPage } from '@/lib/paginas'
import { ScriptsHead } from '@/lib/scripts-personalizados'

// Página de obrigado: sempre fora dos buscadores, com ou sem SITE_NOINDEX, e
// sem canonical próprio (não entra em sitemap).
export async function generateMetadata(): Promise<Metadata> {
  await connection()
  const ty = await buscarTyPage()
  const titulo = ty.titulo?.trim().replace(/[.!]+$/, '')
  return {
    title: titulo ? `${titulo} | Bu1lder by MIIND` : 'Bu1lder by MIIND',
    robots: { index: false, follow: false },
  }
}

// Layout raiz de /bu1lder/ty-page: tema claro e DS MIIND desde o servidor.
// Os scripts do fim do <body> não entram aqui: a página os executa depois de
// preparar window.bu1lderLead (components/bu1lder/obrigado/LeadObrigado).
export default async function ObrigadoLayout({ children }: { children: React.ReactNode }) {
  await connection()
  const ty = await buscarTyPage()
  return (
    <html lang="pt-BR" className="light" style={{ colorScheme: 'light' }} data-miind-ds="true" suppressHydrationWarning>
      <head>
        <ScriptsHead html={ty.scriptsPersonalizados?.head} />
      </head>
      <body>
        <CapturaParametros />
        <Suspense fallback={null}>
          <TrackingProvider apiBase="/bu1lder/api" />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
