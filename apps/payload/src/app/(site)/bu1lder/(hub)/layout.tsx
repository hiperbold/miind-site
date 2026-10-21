import '@fontsource-variable/geist'
import '@fontsource-variable/geist/wght-italic.css'
import '@/styles/bu1lder/styles.css'
import '@/styles/bu1lder/miind-fonts.css'
import '@/styles/bu1lder/miind-ds.css'

import type { Metadata } from 'next'
import React from 'react'

import { CapturaParametros } from '@/components/bu1lder/CamposOcultos'
import { metadataRobots } from '@/lib/noindex'
import { buscarParceiros, lerOuAdiarNoBuild } from '@/lib/paginas'
import { ScriptsBodyFim, ScriptsHead } from '@/lib/scripts-personalizados'

// SITE_NOINDEX=1: robots noindex,nofollow. Como em [slug]: na imagem Docker o
// build não tem banco, a rota é gerada no servidor e lê o ambiente de execução.
export function generateMetadata(): Metadata {
  return metadataRobots()
}

// Layout raiz do programa de parceiros (/bu1lder/parceiros). Como na prévia,
// abre no tema escuro (o visitante alterna no botão) e com o DS MIIND ativo.
export default async function HubLayout({ children }: { children: React.ReactNode }) {
  const hub = await lerOuAdiarNoBuild(buscarParceiros)
  return (
    <html lang="pt-BR" style={{ colorScheme: 'dark' }} data-miind-ds="true" suppressHydrationWarning>
      <head>
        <ScriptsHead html={hub.scriptsPersonalizados?.head} />
      </head>
      <body>
        <CapturaParametros />
        {children}
        <ScriptsBodyFim html={hub.scriptsPersonalizados?.bodyFim} />
      </body>
    </html>
  )
}
