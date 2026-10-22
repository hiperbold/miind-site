'use client'

import { useEffect, useRef } from 'react'

// Widget do Cloudflare Turnstile (opcional). Só aparece quando o servidor passa
// a chave do site (TURNSTILE_SITE_KEY + TURNSTILE_SECRET_KEY definidas). O
// widget cria no formulário o input "cf-turnstile-response", enviado junto.
type ApiTurnstile = {
  render: (el: HTMLElement, opcoes: { sitekey: string; theme?: string }) => string
  reset: (id?: string) => void
}

declare global {
  interface Window {
    turnstile?: ApiTurnstile
  }
}

const SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
let carregando: Promise<void> | null = null

function carregarScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve()
  if (carregando) return carregando
  carregando = new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = SCRIPT
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => {
      carregando = null
      reject(new Error('turnstile'))
    }
    document.head.appendChild(s)
  })
  return carregando
}

export function Turnstile({ siteKey }: { siteKey: string | null | undefined }) {
  const el = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!siteKey || !el.current) return
    let cancelado = false
    carregarScript()
      .then(() => {
        if (cancelado || !el.current || !window.turnstile || el.current.dataset.turnstileId) return
        el.current.dataset.turnstileId = window.turnstile.render(el.current, { sitekey: siteKey })
      })
      .catch(() => {
        // sem o script, o servidor recusa o envio e mostra o erro
      })
    return () => {
      cancelado = true
    }
  }, [siteKey])
  if (!siteKey) return null
  return <div ref={el} className="md:col-span-2 min-h-[65px]" data-turnstile="" />
}

// Depois de um envio recusado, o token já foi usado: pede um novo.
export function resetarTurnstile(form: HTMLFormElement) {
  const el = form.querySelector<HTMLElement>('[data-turnstile-id]')
  if (el?.dataset.turnstileId) window.turnstile?.reset(el.dataset.turnstileId)
}
