'use client'

import { useEffect, useRef } from 'react'

import {
  CHAVE_LEAD,
  chaveDisparado,
  lerContexto,
  montarDetalhe,
  normalizarEmail,
  normalizarTelefoneBR,
  type DetalheLead,
} from '@/lib/cadastros/lead'

import { injetarHtml } from './injetar-html'

declare global {
  interface Window {
    bu1lderLead?: DetalheLead
    dataLayer?: unknown[]
  }
}

async function sha256(valor: string | null): Promise<string | null> {
  if (!valor || !globalThis.crypto?.subtle) return null
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(valor))
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, '0')).join('')
}

// Com contexto válido (sessionStorage com o mesmo token do ?cadastro=):
// window.bu1lderLead, evento "bu1lder:lead" e dataLayer (uma vez por token).
// Depois disso, e só então, os scripts do fim do <body> da página de obrigado.
export function LeadObrigado({
  token,
  exporContato,
  scriptsBodyFim,
}: {
  token: string | null
  exporContato: boolean
  scriptsBodyFim: string | null | undefined
}) {
  const feito = useRef(false)
  const destino = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (feito.current) return
    feito.current = true
    void (async () => {
      try {
        let bruto: string | null = null
        try {
          bruto = sessionStorage.getItem(CHAVE_LEAD)
        } catch {
          bruto = null
        }
        const contexto = lerContexto(bruto, token)
        if (contexto) {
          const chave = chaveDisparado(contexto.token)
          let jaDisparado = false
          try {
            jaDisparado = sessionStorage.getItem(chave) === '1'
          } catch {
            jaDisparado = false
          }
          const e164 = normalizarTelefoneBR(contexto.whatsapp ?? '')
          const [emailSha256, telefoneSha256, telefoneSha256E164] = await Promise.all([
            sha256(normalizarEmail(contexto.email ?? '')),
            sha256(e164 ? e164.slice(1) : null),
            sha256(e164),
          ])
          const detalhe = montarDetalhe(contexto, {
            exporContato,
            emailSha256,
            telefoneSha256,
            telefoneSha256E164,
            novo: !jaDisparado,
          })
          window.bu1lderLead = detalhe
          if (!jaDisparado) {
            try {
              sessionStorage.setItem(chave, '1')
            } catch {
              // sem sessionStorage: o evento pode repetir no reload
            }
            window.dispatchEvent(new CustomEvent('bu1lder:lead', { detail: detalhe }))
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({ event: 'bu1lder_lead', ...detalhe })
          }
        }
      } catch (err) {
        console.error('[ty-page] falha ao preparar os dados do cadastro', err)
      }
      if (destino.current) await injetarHtml(destino.current, scriptsBodyFim)
    })()
  }, [token, exporContato, scriptsBodyFim])

  return <div ref={destino} style={{ display: 'contents' }} data-scripts-ty-page="" />
}

// Código de incorporação da agenda (ex.: widget do Calendly), com os scripts rodando.
export function EmbedAgenda({ html }: { html: string }) {
  const destino = useRef<HTMLDivElement>(null)
  const feito = useRef(false)
  useEffect(() => {
    if (feito.current || !destino.current) return
    feito.current = true
    void injetarHtml(destino.current, html)
  }, [html])
  return <div ref={destino} />
}
