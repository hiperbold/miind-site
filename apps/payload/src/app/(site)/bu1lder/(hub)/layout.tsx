import '@fontsource-variable/geist'
import '@fontsource-variable/geist/wght-italic.css'
import '@/styles/bu1lder/styles.css'
import '@/styles/bu1lder/miind-fonts.css'
import '@/styles/bu1lder/miind-ds.css'

import React from 'react'

import { buscarParceiros, lerOuAdiarNoBuild } from '@/lib/paginas'
import { ScriptsBodyFim, ScriptsHead } from '@/lib/scripts-personalizados'

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
        {children}
        <ScriptsBodyFim html={hub.scriptsPersonalizados?.bodyFim} />
      </body>
    </html>
  )
}
