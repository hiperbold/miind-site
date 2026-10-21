import React from 'react'

// Invólucro comum das seções dos blocos. `destaque` reproduz a faixa com borda e
// fundo levemente mais claro que as páginas originais alternam entre seções.
export function Secao({
  ancora,
  destaque,
  classeDestaque = 'border-y border-foreground/5 bg-foreground/[0.015]',
  children,
  ariaLabelledby,
}: {
  ancora?: string | null
  destaque?: boolean | null
  classeDestaque?: string
  children: React.ReactNode
  ariaLabelledby?: string
}) {
  return (
    <section
      id={ancora || undefined}
      className={destaque ? classeDestaque : undefined}
      aria-labelledby={ariaLabelledby}
    >
      <div className="container-editorial section-pad">{children}</div>
    </section>
  )
}
