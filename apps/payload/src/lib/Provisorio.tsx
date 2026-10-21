import React from 'react'

export function Provisorio({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Página provisória</p>
      <h1 className="mt-2 text-4xl font-bold">{titulo}</h1>
      <p className="mt-4 text-lg text-slate-700">{texto}</p>
    </main>
  )
}
