'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

import { CabecalhoSecao } from '@/components/bu1lder/plataforma/CabecalhoSecao'
import { cn } from '@/lib/utils'
import type { BlocoCasosUso } from '@/payload-types'

// Porte de UseCasesSection (Sections.tsx), com as classes do Tabs de components/ui.
export function CasosUsoBloco({ bloco }: { bloco: BlocoCasosUso }) {
  const abas = bloco.abas ?? []
  if (abas.length === 0) return null
  const valor = (i: number) => `aba-${i}`
  return (
    <section id={bloco.ancora || undefined} className="relative section-pad">
      <div className="container-editorial">
        <CabecalhoSecao cabecalho={bloco.cabecalho} />
        <Tabs.Root defaultValue={valor(0)} className="w-full">
          <div className="relative -mx-6 px-6 overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] sm:mask-none mb-8">
            <Tabs.List
              className={cn(
                'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
                'inline-flex sm:flex sm:flex-wrap h-auto bg-transparent gap-2 sm:justify-center w-max sm:w-full',
              )}
            >
              {abas.map((a, i) => (
                <Tabs.Trigger
                  key={a.id ?? i}
                  value={valor(i)}
                  className={cn(
                    'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
                    'data-[state=active]:bg-brand-cyan/15 data-[state=active]:text-foreground data-[state=active]:border-brand-cyan/30 border border-foreground/10 rounded-full px-4 py-1.5 text-sm whitespace-nowrap',
                  )}
                >
                  {a.nome}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </div>
          {abas.map((a, i) => (
            <Tabs.Content
              key={a.id ?? i}
              value={valor(i)}
              className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={valor(i)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
                >
                  {(a.itens ?? []).map((item, j) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: j * 0.04 }}
                      className="rounded-xl glass p-4 flex items-start gap-3"
                    >
                      <CheckCircle2 className="size-4 text-brand-mint mt-0.5 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  )
}
