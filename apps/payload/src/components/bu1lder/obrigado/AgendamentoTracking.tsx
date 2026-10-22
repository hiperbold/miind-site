'use client'

import { track } from '@hiperbold/payload-tracking/client'
import { useEffect } from 'react'

import { criarAgendamento, ehAgendamentoCalendly, EVENTO_AGENDAMENTO } from '@/lib/agendamento'

declare global {
  interface Window {
    // Chamar quando a reunião for confirmada por uma agenda sem integração
    // automática (ex.: script colado no admin). Dispara "schedule" uma vez.
    bu1lderAgendou?: () => boolean
  }
}

const sessao = () => {
  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

// Reunião agendada na página de obrigado: window.bu1lderAgendou() e o
// postMessage "calendly.event_scheduled" da agenda embutida disparam o
// evento "schedule" (Pixel, gtag e CAPI pelo collect) uma única vez.
export function AgendamentoTracking({ token }: { token: string | null }) {
  useEffect(() => {
    const agendou = criarAgendamento({
      token,
      armazenamento: sessao(),
      novoId: () => crypto.randomUUID(),
      disparar: (eventId) => track(EVENTO_AGENDAMENTO, {}, { eventId }),
    })
    window.bu1lderAgendou = agendou
    const ouvir = (e: MessageEvent) => {
      if (ehAgendamentoCalendly(e)) agendou()
    }
    window.addEventListener('message', ouvir)
    return () => {
      window.removeEventListener('message', ouvir)
      if (window.bu1lderAgendou === agendou) delete window.bu1lderAgendou
    }
  }, [token])
  return null
}
