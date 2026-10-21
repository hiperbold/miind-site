import React from 'react'

// Classes das páginas ficam aqui (e não em app/) porque o Tailwind das LPs só
// lê components/bu1lder, components/ui e blocks (ver styles/bu1lder/styles.css).
export function PaginaWrapper({ children }: { children: React.ReactNode }) {
  return <div className="bg-background text-foreground min-h-screen">{children}</div>
}

export function PaginaNaoEncontrada() {
  return (
    <main className="container-editorial section-pad min-h-screen bg-background text-foreground">
      <p className="eyebrow text-brand-violet">Erro 404</p>
      <h1 className="mt-3 text-3xl sm:text-4xl font-semibold">Página não encontrada</h1>
      <p className="mt-4 lead">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className="underline" href="/bu1lder/">
          Voltar ao Bu1lder
        </a>
      </p>
    </main>
  )
}
