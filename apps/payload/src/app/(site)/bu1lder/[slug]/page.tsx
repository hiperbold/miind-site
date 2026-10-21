import { notFound } from 'next/navigation'

import { NICHOS } from '@/lib/nichos'
import { Provisorio } from '@/lib/Provisorio'

export const dynamicParams = false

export function generateStaticParams() {
  return NICHOS.map(({ slug }) => ({ slug }))
}

export default async function NichoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const nicho = NICHOS.find((n) => n.slug === slug)
  if (!nicho) notFound()

  return (
    <Provisorio
      titulo={`LP do nicho: ${nicho.nome}`}
      texto={`Esta é a LP do nicho ${nicho.nome} (/bu1lder/${nicho.slug}). Conteúdo provisório.`}
    />
  )
}
