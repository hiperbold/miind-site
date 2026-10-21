'use client'

import { useSyncExternalStore } from 'react'

const semAssinatura = () => () => {}

// Ano do rodapé. O HTML estático traz o ano do build; no navegador o valor é
// trocado pelo ano atual logo após a hidratação, então não congela no build.
export function AnoAtual({ anoDoServidor }: { anoDoServidor: number }) {
  const ano = useSyncExternalStore(
    semAssinatura,
    () => new Date().getFullYear(),
    () => anoDoServidor,
  )
  return <>{ano}</>
}
