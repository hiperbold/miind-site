import { ArrowLeft } from 'lucide-react'

import { BrandLockup } from './BrandLockup'
import { ThemeToggle } from './ThemeToggle'

// Porte de BuildersHeader. A marca leva ao programa de parceiros e "Voltar ao
// site" leva à homepage do Bu1lder, como na prévia estática. <a> (e não Link)
// de propósito: cada grupo de rotas tem o próprio layout raiz, então a troca
// de página é uma navegação completa.
export function BuildersHeader({
  showBackLink = true,
  ctaText = 'Quero ser um Bu1lder',
  ctaShortText = 'Cadastrar',
  ctaUrl = '#cadastro',
}: {
  showBackLink?: boolean
  ctaText?: string
  ctaShortText?: string
  ctaUrl?: string
}) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/80">
      <div className="container-editorial flex items-center justify-between gap-2 h-14">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/bu1lder/parceiros" className="flex items-center gap-2 group min-w-0 shrink">
          <BrandLockup />
        </a>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {showBackLink && (
            // eslint-disable-next-line @next/next/no-html-link-for-pages
            <a
              href="/bu1lder/"
              className="hidden md:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" /> Voltar ao site
            </a>
          )}
          <ThemeToggle />
          <a
            href={ctaUrl}
            className="inline-flex items-center whitespace-nowrap rounded-full bg-gradient-to-r from-brand-cyan to-brand-blue text-background text-xs sm:text-sm font-semibold px-3 sm:px-4 h-9 shadow-[0_8px_30px_-8px_oklch(0.82_0.14_210/0.6)] hover:shadow-[0_12px_40px_-10px_oklch(0.82_0.14_210/0.8)] motion-safe:hover:-translate-y-0.5 transition-all"
          >
            <span className="sm:hidden">{ctaShortText}</span>
            <span className="hidden sm:inline">{ctaText}</span>
          </a>
        </div>
      </div>
    </header>
  )
}
