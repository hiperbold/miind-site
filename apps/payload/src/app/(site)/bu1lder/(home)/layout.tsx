import '@fontsource-variable/geist'
import '@fontsource-variable/geist/wght-italic.css'
import '@/styles/bu1lder/styles.css'
import '@/styles/bu1lder/miind-fonts.css'
import '@/styles/bu1lder/miind-ds.css'

import React from 'react'

import { buscarHomepage, lerOuAdiarNoBuild } from '@/lib/paginas'
import { ScriptsBodyFim, ScriptsHead } from '@/lib/scripts-personalizados'

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
