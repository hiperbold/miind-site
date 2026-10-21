import React from 'react'

// Texto com quebras de linha do admin (Enter) virando <br />.
export function ComQuebras({ texto }: { texto: string | null | undefined }) {
  const linhas = (texto ?? '').split(/\r?\n/)
  return (
    <>
      {linhas.map((linha, i) => (
        <React.Fragment key={i}>
          {i > 0 && <br />}
          {linha}
        </React.Fragment>
      ))}
    </>
  )
}
