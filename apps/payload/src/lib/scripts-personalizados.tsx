import React from 'react'

import { separarHead } from './scripts-head'

// Códigos colados no admin (pixels, tags). Entram como foram colados, sem
// filtro de conteúdo: só administradores editam esses campos.

export function ScriptsHead({ html }: { html: string | null | undefined }) {
  return (
    <>
      {separarHead(html).map((el, i) => {
        const props = { ...el.props, key: `script-head-${i}` }
        if (el.html === undefined) return React.createElement(el.tag, props)
        return React.createElement(el.tag, { ...props, dangerouslySetInnerHTML: { __html: el.html } })
      })}
    </>
  )
}

// Fim do <body>: HTML bruto num contêiner sem caixa. Os <script> fazem parte
// do HTML entregue pelo servidor e rodam no carregamento da página.
export function ScriptsBodyFim({ html }: { html: string | null | undefined }) {
  if (!html?.trim()) return null
  return <div style={{ display: 'contents' }} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />
}
