import type { Metadata } from 'next'
import { connection } from 'next/server'
import React from 'react'

import { metadataRobots } from '@/lib/noindex'

import './globals.css'

// Páginas sem banco seriam geradas no build; connection() faz o SITE_NOINDEX
// ser lido no servidor, no ambiente de execução.
export async function generateMetadata(): Promise<Metadata> {
  await connection()
  return {
    title: 'Bu1lder by MIIND',
    description: 'Páginas do Bu1lder (versão provisória)',
    ...metadataRobots(),
  }
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-white text-slate-900 antialiased">{children}</body>
    </html>
  )
}
