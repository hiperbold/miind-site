import React from 'react'

// Invólucros das páginas fixas. As classes ficam aqui (e não em app/) porque o
// Tailwind das páginas só lê components/bu1lder, components/ui e blocks.

// Homepage: fundo com as duas auroras fixas de apps/bu1lder/src/routes/index.tsx.
export function PaginaHomepage({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.18_0.05_265),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(0.18_0.05_295/0.4),transparent_55%)]" />
      </div>
      {children}
    </div>
  )
}

// Rodapé do programa de parceiros (bu1lders.index.tsx).
export function RodapeParceiros({
  texto,
  textoLink,
  urlLink,
  ano,
}: {
  texto?: string | null
  textoLink?: string | null
  urlLink?: string | null
  ano: React.ReactNode
}) {
  return (
    <footer className="border-t border-foreground/10 text-muted-foreground text-sm">
      <div className="container-editorial py-8 flex flex-wrap items-center justify-between gap-4">
        <span>
          © {ano} {texto}
        </span>
        {textoLink && (
          <a href={urlLink || '/bu1lder/'} className="hover:text-foreground transition-colors">
            {textoLink}
          </a>
        )}
      </div>
    </footer>
  )
}
