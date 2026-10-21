import '@fontsource-variable/geist'
import '@fontsource-variable/geist/wght-italic.css'
import '@/styles/bu1lder/styles.css'
import '@/styles/bu1lder/miind-fonts.css'
import '@/styles/bu1lder/miind-ds.css'

import type { Metadata } from 'next'
import React from 'react'

import { metadataRobots } from '@/lib/noindex'
import { buscarHomepage, lerOuAdiarNoBuild } from '@/lib/paginas'
import { ScriptsBodyFim, ScriptsHead } from '@/lib/scripts-personalizados'

// SITE_NOINDEX=1: robots noindex,nofollow. Como em [slug]: na imagem Docker o
// build não tem banco, a rota é gerada no servidor e lê o ambiente de execução.
export function generateMetadata(): Metadata {
  return metadataRobots()
}

// Layout raiz da homepage (/bu1lder/). Como na prévia, abre no tema escuro
// (o visitante alterna no botão) e com o DS MIIND ativo.
export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const home = await lerOuAdiarNoBuild(buscarHomepage)
  return (
    <html lang="pt-BR" style={{ colorScheme: 'dark' }} data-miind-ds="true" suppressHydrationWarning>
      <head>
        <ScriptsHead html={home.scriptsPersonalizados?.head} />
      </head>
      <body>
        {children}
        <ScriptsBodyFim html={home.scriptsPersonalizados?.bodyFim} />
      </body>
    </html>
  )
}
