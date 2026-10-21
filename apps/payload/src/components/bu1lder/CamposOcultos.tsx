'use client'

import { useEffect, useRef } from 'react'

import {
  CAMPOS_OCULTOS,
  COOKIE_ORIGEM,
  decodificarGuardados,
  lerCookie,
  mesclarParametros,
  montarOcultos,
  serializarCookie,
  type CampoOculto,
} from '@/lib/cadastros/parametros'

// Lê os parâmetros da URL atual, mescla com o cookie primário e grava de novo.
// Devolve os valores dos campos ocultos para este momento.
export function capturarParametros(): Record<CampoOculto, string> {
  const guardado = decodificarGuardados(lerCookie(document.cookie, COOKIE_ORIGEM))
  const novo = mesclarParametros(guardado, new URLSearchParams(window.location.search), Date.now())
  if (JSON.stringify(novo) !== JSON.stringify(guardado)) {
    document.cookie = serializarCookie(novo, window.location.protocol === 'https:')
  }
  return montarOcultos(novo, document.cookie, window.location.href)
}

// Na chegada a qualquer página do site: guarda os parâmetros da URL no cookie.
export function CapturaParametros() {
  useEffect(() => {
    try {
      capturarParametros()
    } catch {
      // cookie bloqueado: o envio segue sem os parâmetros guardados
    }
  }, [])
  return null
}

// Atualiza os inputs ocultos do formulário no momento do envio (origem = URL
// atual completa) e devolve os valores.
export function preencherOcultos(form: HTMLFormElement): Record<CampoOculto, string> {
  let valores: Record<CampoOculto, string>
  try {
    valores = capturarParametros()
  } catch {
    valores = Object.fromEntries(CAMPOS_OCULTOS.map((c) => [c, ''])) as Record<CampoOculto, string>
    valores.origem = window.location.href
  }
  for (const nome of CAMPOS_OCULTOS) {
    const input = form.elements.namedItem(nome)
    if (input instanceof HTMLInputElement) input.value = valores[nome]
  }
  return valores
}

// Inputs hidden (visíveis no DOM para inspeção) e o honeypot. Os valores são
// preenchidos depois da hidratação e de novo no envio (preencherOcultos).
export function CamposOcultos({ formId }: { formId: string }) {
  const primeiro = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const form = primeiro.current?.form
    if (form) preencherOcultos(form)
  }, [])
  return (
    <>
      {/* Sem value/defaultValue: em input hidden o React reescreveria o valor
          a cada nova renderização do formulário e apagaria o que foi preenchido. */}
      {CAMPOS_OCULTOS.map((nome, i) => (
        <input key={nome} ref={i === 0 ? primeiro : undefined} type="hidden" name={nome} />
      ))}
      {/* Honeypot: fora da tela e fora da navegação por teclado. Pessoa não preenche. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor={`${formId}-website`}>Não preencha este campo</label>
        <input id={`${formId}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
    </>
  )
}
