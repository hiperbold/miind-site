// Evento "reunião agendada" da página de obrigado: regras puras.
// Dispara no máximo uma vez por cadastro (ou por carregamento, sem cadastro).

export const EVENTO_AGENDAMENTO = 'schedule'
export const chaveAgendado = (token: string) => `bu1lder:agendado:${token}`

// Mensagem do widget do Calendly (postMessage) que confirma o agendamento.
export function ehAgendamentoCalendly(evento: { origin: string; data: unknown }): boolean {
  let host: string
  try {
    host = new URL(evento.origin).hostname
  } catch {
    return false
  }
  if (host !== 'calendly.com' && !host.endsWith('.calendly.com')) return false
  const d = evento.data as { event?: unknown } | null
  return typeof d === 'object' && d !== null && d.event === 'calendly.event_scheduled'
}

type Armazenamento = Pick<Storage, 'getItem' | 'setItem'>

export type OpcoesAgendamento = {
  token: string | null
  disparar: (eventId: string) => Promise<unknown> | unknown
  novoId: () => string
  armazenamento?: Armazenamento | null
}

// Devolve a função exposta em window.bu1lderAgendou(). true = disparou agora.
// A marca de "já agendou" no sessionStorage só é gravada depois de o disparo
// resolver; se ele rejeitar, nada é gravado e uma nova chamada tenta de novo.
export function criarAgendamento(op: OpcoesAgendamento): () => boolean {
  let feito = false
  return () => {
    if (feito) return false
    if (op.token) {
      try {
        if (op.armazenamento?.getItem(chaveAgendado(op.token)) === '1') {
          feito = true
          return false
        }
      } catch {
        // sem sessionStorage: vale a trava desta página
      }
    }
    feito = true
    const token = op.token
    void (async () => {
      try {
        await op.disparar(`sched_${op.novoId()}`)
      } catch {
        feito = false
        return
      }
      if (!token) return
      try {
        op.armazenamento?.setItem(chaveAgendado(token), '1')
      } catch {
        // sem sessionStorage: vale a trava desta página
      }
    })()
    return true
  }
}
