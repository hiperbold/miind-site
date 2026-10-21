import React from 'react'

// Códigos colados no admin (pixels, tags). Entram exatamente como foram colados,
// sem filtro: só administradores editam esses campos.
//
// <head>: o React não aceita HTML bruto dentro do head, então o trecho é
// separado nas tags de topo aceitas no head (script, noscript, style, meta,
// link) e cada uma vira um elemento com o conteúdo original.

type TagHead = { tag: 'script' | 'noscript' | 'style' | 'meta' | 'link'; attrs: Record<string, string>; html: string }

const ATTR_RE = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g
const TAG_RE = /<(script|noscript|style)\b([^>]*)>([\s\S]*?)<\/\1\s*>|<(meta|link)\b([^>]*?)\/?>/gi

const ATTR_REACT: Record<string, string> = {
  class: 'className',
  for: 'htmlFor',
  crossorigin: 'crossOrigin',
  referrerpolicy: 'referrerPolicy',
  nomodule: 'noModule',
  'http-equiv': 'httpEquiv',
  charset: 'charSet',
  fetchpriority: 'fetchPriority',
}

function lerAtributos(texto: string): Record<string, string> {
  const attrs: Record<string, string> = {}
  for (const m of texto.matchAll(ATTR_RE)) {
    const nome = m[1].toLowerCase()
    const valor = m[2] ?? m[3] ?? m[4] ?? ''
    attrs[ATTR_REACT[nome] ?? nome] = valor
  }
  return attrs
}

export function separarTagsHead(html: string | null | undefined): TagHead[] {
  if (!html?.trim()) return []
  const tags: TagHead[] = []
  for (const m of html.matchAll(TAG_RE)) {
    if (m[1]) {
      tags.push({ tag: m[1].toLowerCase() as TagHead['tag'], attrs: lerAtributos(m[2]), html: m[3] })
    } else if (m[4]) {
      tags.push({ tag: m[4].toLowerCase() as TagHead['tag'], attrs: lerAtributos(m[5]), html: '' })
    }
  }
  return tags
}

function valorAtributo(nome: string, valor: string): string | boolean {
  // atributo booleano sem valor (ex.: async, defer)
  if (valor === '' && ['async', 'defer', 'noModule', 'nomodule'].includes(nome)) return true
  return valor
}

export function ScriptsHead({ html }: { html: string | null | undefined }) {
  return (
    <>
      {separarTagsHead(html).map((t, i) => {
        const props: Record<string, unknown> = { key: `script-head-${i}` }
        for (const [k, v] of Object.entries(t.attrs)) props[k] = valorAtributo(k, v)
        if (t.tag === 'meta' || t.tag === 'link') return React.createElement(t.tag, props)
        return React.createElement(t.tag, { ...props, dangerouslySetInnerHTML: { __html: t.html } })
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
