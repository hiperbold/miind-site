// Banner de consentimento (homepage e programa de parceiros): regras puras e
// o fluxo do contrato do módulo de tracking (README, "Banner de consentimento"):
// 1) POST browser-token devolve o subjectId (o cookie pt_subject já está selado);
// 2) POST c15t subjects com a decisão; 3) refreshConsent() aplica sem recarregar.

export const CHAVE_DECISAO = 'bu1lder:consentimento:v1'
export const URL_BROWSER_TOKEN = '/bu1lder/api/tracking/browser-token'
export const URL_C15T_SUBJECTS = '/bu1lder/api/c15t/subjects'

export type Preferencias = { measurement: boolean; marketing: boolean }
export type Decisao = Preferencias & { em: number }

export const TODAS: Preferencias = { measurement: true, marketing: true }
export const NENHUMA: Preferencias = { measurement: false, marketing: false }

type Armazenamento = Pick<Storage, 'getItem' | 'setItem'>

export function lerDecisao(armazenamento: Armazenamento | null | undefined): Decisao | null {
  try {
    const bruto = armazenamento?.getItem(CHAVE_DECISAO)
    if (!bruto) return null
    const v = JSON.parse(bruto) as Partial<Decisao>
    if (typeof v?.measurement !== 'boolean' || typeof v?.marketing !== 'boolean' || typeof v?.em !== 'number') return null
    return { measurement: v.measurement, marketing: v.marketing, em: v.em }
  } catch {
    return null
  }
}

export function gravarDecisao(armazenamento: Armazenamento | null | undefined, p: Preferencias, agora: number): void {
  try {
    armazenamento?.setItem(CHAVE_DECISAO, JSON.stringify({ measurement: p.measurement, marketing: p.marketing, em: agora }))
  } catch {
    // sem localStorage: o banner volta na próxima visita
  }
}

export function corpoC15t(subjectId: string, p: Preferencias, dominio: string, agora: number) {
  return {
    domain: dominio,
    givenAt: agora,
    preferences: { measurement: p.measurement, marketing: p.marketing },
    subjectId,
    type: 'cookie_banner',
  }
}

export type OpcoesRegistro = {
  preferencias: Preferencias
  pagePath: string
  dominio: string
  agora?: number
  fetch?: typeof fetch
  refresh: () => Promise<unknown>
}

// Grava a decisão no c15t e avisa o runtime. Devolve false se não deu para
// gravar (o banner continua aberto com a mensagem de erro).
export async function registrarDecisao(op: OpcoesRegistro): Promise<boolean> {
  const f = op.fetch ?? fetch
  const agora = op.agora ?? Date.now()
  try {
    const t = await f(URL_BROWSER_TOKEN, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ pagePath: op.pagePath }),
      credentials: 'same-origin',
    })
    const corpo = (await t.json().catch(() => null)) as { subjectId?: unknown } | null
    const subjectId = typeof corpo?.subjectId === 'string' ? corpo.subjectId : null
    if (!subjectId) return false
    const r = await f(URL_C15T_SUBJECTS, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(corpoC15t(subjectId, op.preferencias, op.dominio, agora)),
      credentials: 'same-origin',
    })
    if (!r.ok) return false
    await op.refresh()
    return true
  } catch {
    return false
  }
}
