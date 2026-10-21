'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { EtiquetaPilula } from '@/components/bu1lder/plataforma/CabecalhoSecao'
import { TextoMarcado } from '@/components/bu1lder/plataforma/TextoMarcado'
import { botaoClasses } from '@/components/ui/button'
import type { BlocoConvite } from '@/payload-types'

// Porte de CTABanner (Sections.tsx).
export function ConviteBloco({ bloco }: { bloco: BlocoConvite }) {
  const botao = bloco.botao
  const link = bloco.linkSecundario
  return (
    <section id={bloco.ancora || undefined} className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-brand-blue/15 blur-[160px] aurora-drift" />
        <div
          className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[600px] h-[500px] rounded-full bg-brand-cyan/15 blur-[160px] aurora-drift"
          style={{ animationDelay: '-7s' }}
        />
      </div>
      <div className="container-editorial max-w-5xl! text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {bloco.etiqueta && (
            <div className="mb-8">
              <EtiquetaPilula texto={bloco.etiqueta} />
            </div>
          )}
          <h2 className="display-l">
            <TextoMarcado texto={bloco.titulo} />
          </h2>
          {bloco.texto && <p className="mt-6 lead max-w-2xl mx-auto">{bloco.texto}</p>}
          {(botao?.texto || link?.texto) && (
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
              {botao?.texto && (
                <a
                  href={botao.url || '#contato'}
                  className={botaoClasses({
                    size: 'lg',
                    className:
                      'bg-gradient-to-r from-brand-cyan to-brand-blue text-background hover:opacity-90 shadow-[0_18px_50px_-14px_oklch(0.82_0.14_210/0.6)]',
                  })}
                >
                  {botao.texto} <ArrowRight className="ml-1 size-4" />
                </a>
              )}
              {link?.texto && (
                <a
                  href={link.url || '#contato'}
                  className="ink-link text-sm text-muted-foreground hover:text-foreground transition-colors px-2"
                >
                  {link.texto}
                </a>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
