import { Quote } from 'lucide-react'

import { Reveal } from '@/components/bu1lder/Reveal'
import type { BlocoArgumento } from '@/payload-types'

export function ArgumentoBloco({ bloco }: { bloco: BlocoArgumento }) {
  return (
    <section
      id={bloco.ancora || undefined}
      className={bloco.destaque ? 'border-y border-foreground/5 bg-foreground/[0.015]' : undefined}
    >
      <div className="container-editorial pt-12 sm:pt-16 pb-12 sm:pb-16">
        <Reveal>
          <blockquote className="surface-card surface-card-feature p-8 sm:p-10 relative overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-brand-violet/25 blur-3xl"
            />
            <Quote className="relative size-7 text-brand-cyan/80 mb-4" />
            <p className="relative text-xl sm:text-2xl font-medium text-foreground leading-snug">
              &quot;{bloco.texto}&quot;
            </p>
            {bloco.assinatura && (
              <footer className="relative mt-4 eyebrow text-brand-violet">{bloco.assinatura}</footer>
            )}
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
