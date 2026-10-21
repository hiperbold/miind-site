import render from 'dom-serializer'
import { type ChildNode, Element, Text } from 'domhandler'
import { parseDocument } from 'htmlparser2'

// Converte o HTML colado no campo "No <head>" (pixels, tags) em elementos que o
// React consegue renderizar no <head>. O HTML é lido por um parser de verdade
// (htmlparser2). Tags aceitas no topo: script, noscript, style, meta, link.
// Qualquer falha (parse, tag ou atributo) só descarta o pedaço com problema e
// registra no log do servidor: a página nunca cai por causa deste campo.

export type TagHead = 'script' | 'noscript' | 'style' | 'meta' | 'link'

export type ElementoHead = {
  tag: TagHead
  props: Record<string, unknown>
  // conteúdo bruto (script, style) ou HTML interno (noscript)
  html?: string
}

const TAGS_ACEITAS = new Set<string>(['script', 'noscript', 'style', 'meta', 'link'])
const TAGS_VAZIAS = new Set<string>(['meta', 'link'])

const NOME_REACT: Record<string, string> = {
  class: 'className',
  for: 'htmlFor',
  'http-equiv': 'httpEquiv',
  charset: 'charSet',
  crossorigin: 'crossOrigin',
  referrerpolicy: 'referrerPolicy',
  nomodule: 'noModule',
  fetchpriority: 'fetchPriority',
  itemprop: 'itemProp',
  itemscope: 'itemScope',
  itemtype: 'itemType',
  hreflang: 'hrefLang',
  imagesizes: 'imageSizes',
  imagesrcset: 'imageSrcSet',
  tabindex: 'tabIndex',
}

const BOOLEANOS = new Set<string>(['async', 'defer', 'noModule', 'disabled', 'hidden', 'itemScope'])

const NOME_VALIDO = /^[a-zA-Z_:][-a-zA-Z0-9_:.]*$/

function avisar(msg: string, extra?: unknown) {
  console.warn(`[scripts-personalizados] ${msg}`, extra ?? '')
}

// "color: red; --x: 1; background:url(http://a/b)" -> objeto de estilo do React.
export function estiloParaObjeto(texto: string): Record<string, string> | null {
  const estilo: Record<string, string> = {}
  for (const parte of texto.split(';')) {
    const i = parte.indexOf(':')
    if (i <= 0) continue
    const prop = parte.slice(0, i).trim().toLowerCase()
    const valor = parte.slice(i + 1).trim()
    if (!prop || !valor || !/^-{0,2}[a-z][a-z0-9-]*$/.test(prop)) continue
    const chave = prop.startsWith('--')
      ? prop
      : prop.replace(/^-(webkit|moz|ms|o)-/, (_, v: string) => `${v === 'ms' ? 'ms' : v[0].toUpperCase() + v.slice(1)}-`)
          .replace(/-([a-z])/g, (_, l: string) => l.toUpperCase())
    estilo[chave] = valor
  }
  return Object.keys(estilo).length ? estilo : null
}

export function atributosParaProps(attribs: Record<string, string>): Record<string, unknown> {
  const props: Record<string, unknown> = {}
  for (const [nomeOriginal, valor] of Object.entries(attribs)) {
    const nome = nomeOriginal.toLowerCase()
    if (!NOME_VALIDO.test(nome)) {
      avisar(`atributo ignorado (nome inválido): ${nomeOriginal}`)
      continue
    }
    if (nome.startsWith('on')) {
      avisar(`atributo de evento ignorado: ${nome}`)
      continue
    }
    if (nome === 'style') {
      const estilo = estiloParaObjeto(valor)
      if (estilo) props.style = estilo
      else avisar('atributo style ignorado (vazio ou inválido)', valor)
      continue
    }
    const nomeReact = nome.startsWith('data-') || nome.startsWith('aria-') ? nome : (NOME_REACT[nome] ?? nome)
    if (BOOLEANOS.has(nomeReact)) {
      if (valor === '' || valor.toLowerCase() === nome || valor === 'true') props[nomeReact] = true
      else if (valor !== 'false') props[nomeReact] = true
      continue
    }
    props[nomeReact] = valor
  }
  return props
}

function textoInterno(el: Element): string {
  return el.children.map((c) => (c instanceof Text ? c.data : render(c))).join('')
}

function converterElemento(el: Element): ElementoHead | null {
  const tag = el.name.toLowerCase()
  if (!TAGS_ACEITAS.has(tag)) {
    avisar(`tag ignorada no <head>: <${tag}>`)
    return null
  }
  const props = atributosParaProps(el.attribs ?? {})
  if (TAGS_VAZIAS.has(tag)) return { tag: tag as TagHead, props }
  const html = tag === 'noscript' ? render(el.children, { encodeEntities: 'utf8' }) : textoInterno(el)
  return { tag: tag as TagHead, props, html }
}

export function separarHead(html: string | null | undefined): ElementoHead[] {
  if (!html?.trim()) return []
  let nos: ChildNode[]
  try {
    nos = parseDocument(html, { lowerCaseTags: true, lowerCaseAttributeNames: true }).children
  } catch (err) {
    avisar('HTML do <head> não pôde ser lido; nada foi inserido', err)
    return []
  }
  const elementos: ElementoHead[] = []
  for (const no of nos) {
    try {
      if (no instanceof Element) {
        const el = converterElemento(no)
        if (el) elementos.push(el)
      } else if (no instanceof Text && no.data.trim()) {
        avisar('texto solto ignorado no <head>', no.data.trim().slice(0, 80))
      }
    } catch (err) {
      avisar('tag descartada por erro', err)
    }
  }
  return elementos
}
