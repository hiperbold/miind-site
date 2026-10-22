'use client'

import { refreshConsent } from '@hiperbold/payload-tracking/client'
import { useId, useState, useSyncExternalStore } from 'react'

import { botaoClasses } from '@/components/ui/button'
import {
  CHAVE_DECISAO,
  gravarDecisao,
  lerDecisao,
  NENHUMA,
  registrarDecisao,
  TODAS,
  type Preferencias,
} from '@/lib/consentimento'

const POLITICA = 'https://www.miind.com.br/politica-de-privacidade'

const semAssinatura = () => () => {}
// string (ou null) do localStorage no navegador; undefined no servidor
const lerBruto = () => {
  try {
    return window.localStorage.getItem(CHAVE_DECISAO)
  } catch {
    return null
  }
}

const armazenamento = () => {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

// Banner de cookies das páginas que exigem consentimento (homepage e
// programa de parceiros). Sem decisão, nada de Google ou Meta carrega. O
// visitante aceita, recusa ou escolhe por categoria; "Preferências de cookies"
// no canto reabre a escolha.
export function BannerConsentimento() {
  // undefined no servidor e na hidratação: nada aparece até ler o navegador
  const bruto = useSyncExternalStore<string | null | undefined>(semAssinatura, lerBruto, () => undefined)
  const decisao = bruto === undefined ? null : lerDecisao({ getItem: () => bruto, setItem: () => {} })
  const [abertoManual, setAberto] = useState<boolean | null>(null)
  const [detalhes, setDetalhes] = useState(false)
  const [prefsEditadas, setPrefsEditadas] = useState<Preferencias | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState(false)
  const id = useId()

  const pronto = bruto !== undefined
  const aberto = abertoManual ?? !decisao
  const prefs: Preferencias =
    prefsEditadas ?? (decisao ? { measurement: decisao.measurement, marketing: decisao.marketing } : NENHUMA)
  const setPrefs = (f: (p: Preferencias) => Preferencias) => setPrefsEditadas(f(prefs))

  async function decidir(p: Preferencias) {
    if (enviando) return
    setEnviando(true)
    setErro(false)
    const ok = await registrarDecisao({
      preferencias: p,
      pagePath: window.location.pathname,
      dominio: window.location.hostname,
      refresh: refreshConsent,
    })
    setEnviando(false)
    if (!ok) {
      setErro(true)
      return
    }
    gravarDecisao(armazenamento(), p, Date.now())
    setPrefsEditadas(p)
    setAberto(false)
    setDetalhes(false)
  }

  if (!pronto) return null

  if (!aberto) {
    return (
      <button
        type="button"
        data-consentimento="reabrir"
        onClick={() => {
          setAberto(true)
          setDetalhes(true)
        }}
        className="fixed bottom-3 left-3 z-40 rounded-md border border-border bg-background/90 px-3 py-1.5 text-xs text-muted-foreground shadow-sm backdrop-blur hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Preferências de cookies
      </button>
    )
  }

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby={`${id}-titulo`}
      aria-describedby={`${id}-texto`}
      data-consentimento="banner"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl surface-card p-5 shadow-lg sm:p-6"
    >
      <h2 id={`${id}-titulo`} className="text-base font-semibold">
        Cookies e medição
      </h2>
      <p id={`${id}-texto`} className="mt-2 text-sm text-muted-foreground">
        Usamos cookies para medir as visitas e para mostrar nossos anúncios a quem já conhece o Bu1lder. Nada disso
        é ativado sem a sua escolha. Saiba mais na{' '}
        <a href={POLITICA} className="underline underline-offset-2 hover:text-foreground" target="_blank" rel="noopener">
          política de privacidade
        </a>
        .
      </p>

      {detalhes && (
        <fieldset className="mt-4 grid gap-3">
          <legend className="sr-only">Categorias de cookies</legend>
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              name="measurement"
              className="mt-1 size-4 accent-primary"
              checked={prefs.measurement}
              onChange={(e) => setPrefs((p) => ({ ...p, measurement: e.target.checked }))}
            />
            <span>
              <span className="font-medium">Medição</span>
              <span className="block text-muted-foreground">Google Analytics: quantas pessoas visitam e o que procuram.</span>
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              name="marketing"
              className="mt-1 size-4 accent-primary"
              checked={prefs.marketing}
              onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
            />
            <span>
              <span className="font-medium">Marketing</span>
              <span className="block text-muted-foreground">Meta e Google Ads: anúncios e medição das campanhas.</span>
            </span>
          </label>
        </fieldset>
      )}

      {erro && (
        <p role="alert" className="mt-3 text-sm text-destructive">
          Não foi possível salvar a sua escolha. Tente de novo.
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          data-consentimento="aceitar"
          disabled={enviando}
          onClick={() => decidir(TODAS)}
          className={botaoClasses()}
        >
          Aceitar todos
        </button>
        <button
          type="button"
          data-consentimento="recusar"
          disabled={enviando}
          onClick={() => decidir(NENHUMA)}
          className={botaoClasses({ variant: 'outline' })}
        >
          Recusar
        </button>
        {detalhes ? (
          <button
            type="button"
            data-consentimento="salvar"
            disabled={enviando}
            onClick={() => decidir(prefs)}
            className={botaoClasses({ variant: 'outline' })}
          >
            Salvar preferências
          </button>
        ) : (
          <button
            type="button"
            data-consentimento="preferencias"
            aria-expanded={false}
            onClick={() => setDetalhes(true)}
            className={botaoClasses({ variant: 'outline' })}
          >
            Preferências
          </button>
        )}
      </div>
    </section>
  )
}
