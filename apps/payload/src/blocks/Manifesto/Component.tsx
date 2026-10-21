'use client'

import { motion } from 'framer-motion'

import { EtiquetaPilula } from '@/components/bu1lder/plataforma/CabecalhoSecao'
import { TextoMarcado } from '@/components/bu1lder/plataforma/TextoMarcado'
import type { BlocoManifesto } from '@/payload-types'

// Porte de ManifestoSection (NarrativeSections.tsx).
export function ManifestoBloco({ bloco }: { bloco: BlocoManifesto }) {
  const linhas = bloco.linhas ?? []
  return (
    <section id={bloco.ancora || undefined} className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-brand-blue/15 [.light_&]:bg-brand-blue/10 blur-[160px] aurora-drift" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-brand-violet/15 [.light_&]:bg-brand-violet/10 blur-[160px] aurora-drift"
          style={{ animationDelay: '-6s' }}
        />
      </div>

      <div className="container-editorial max-w-5xl! text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {bloco.etiqueta && <EtiquetaPilula texto={bloco.etiqueta} />}
          <p className="mt-8 display-m text-foreground/95 max-w-4xl mx-auto">
            {linhas.map((l, i) => (
              <motion.span
                key={l.id ?? i}
                className={i === 0 ? 'block' : 'block mt-2'}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <TextoMarcado texto={l.texto} />
              </motion.span>
            ))}
          </p>
          {bloco.assinatura && (
            <div className="mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
              <span className="block h-px w-10 bg-brand-cyan/40" />
              {bloco.assinatura}
              <span className="block h-px w-10 bg-brand-cyan/40" />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
