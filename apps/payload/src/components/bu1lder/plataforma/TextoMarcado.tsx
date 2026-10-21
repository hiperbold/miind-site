import React from 'react'

// Marcação simples dos títulos editáveis da homepage e do programa:
//   *texto*  -> trecho em degradê (classe `destaque`, por padrão o degradê animado)
//   _texto_  -> trecho em itálico com degradê (<em>)
// O resto do texto sai como está. Marcação sem par fecha é exibida literalmente.
export const DEGRADE_ANIMADO = 'text-gradient animate-gradient-x bg-[length:200%_auto]'

type Trecho = { tipo: 'texto' | 'destaque' | 'italico'; valor: string }

export function separarMarcacao(texto: string | null | undefined): Trecho[] {
  const fonte = texto ?? ''
  const trechos: Trecho[] = []
  const re = /\*([^*]+)\*|_([^_]+)_/g
  let ultimo = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(fonte))) {
    if (m.index > ultimo) trechos.push({ tipo: 'texto', valor: fonte.slice(ultimo, m.index) })
    if (m[1] !== undefined) trechos.push({ tipo: 'destaque', valor: m[1] })
    else trechos.push({ tipo: 'italico', valor: m[2] })
    ultimo = m.index + m[0].length
  }
  if (ultimo < fonte.length) trechos.push({ tipo: 'texto', valor: fonte.slice(ultimo) })
  return trechos
}

export function TextoMarcado({
  texto,
  destaque = DEGRADE_ANIMADO,
  italico = 'italic font-normal text-gradient',
}: {
  texto: string | null | undefined
  destaque?: string
  italico?: string
}) {
  return (
    <>
      {separarMarcacao(texto).map((t, i) => {
        if (t.tipo === 'destaque')
          return (
            <span key={i} className={destaque}>
              {t.valor}
            </span>
          )
        if (t.tipo === 'italico')
          return (
            <em key={i} className={italico}>
              {t.valor}
            </em>
          )
        return <React.Fragment key={i}>{t.valor}</React.Fragment>
      })}
    </>
  )
}

// Texto puro, sem a marcação (JSON-LD, títulos acessíveis).
export function textoSemMarcacao(texto: string | null | undefined): string {
  return separarMarcacao(texto)
    .map((t) => t.valor)
    .join('')
}
