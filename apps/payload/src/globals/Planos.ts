import type { GlobalConfig } from 'payload'

import { logado, publico } from '@/lib/acesso'
import { revalidarPaginas } from '@/lib/revalidar'

export const CHAVES_PLANOS = ['Essencial', 'Crescimento', 'Performance'] as const
export type ChavePlano = (typeof CHAVES_PLANOS)[number]

export const Planos: GlobalConfig = {
  slug: 'planos',
  label: 'Planos',
  access: { read: publico, update: logado },
  hooks: { afterChange: [({ context }) => revalidarPaginas({ context })] },
  fields: [
    {
      name: 'mostrarParcelaPlataforma',
      label: 'Mostrar a parcela da plataforma no simulador',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'planos',
      label: 'Planos',
      type: 'array',
      minRows: 1,
      validate: (value: unknown) => {
        const linhas = Array.isArray(value) ? (value as { chave?: string }[]) : []
        const chaves = linhas.map((l) => l.chave)
        return new Set(chaves).size === chaves.length || 'Cada plano só pode aparecer uma vez.'
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'chave',
              label: 'Plano',
              type: 'select',
              required: true,
              options: CHAVES_PLANOS.map((c) => ({ label: c, value: c })),
            },
            { name: 'preco', label: 'Cliente paga (R$/mês)', type: 'number', required: true },
            { name: 'parteBu1lder', label: 'Bu1lder recebe (R$/mês)', type: 'number', required: true },
            { name: 'plataforma', label: 'Plataforma (R$/mês)', type: 'number', required: true },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'inclui', label: 'O que inclui', type: 'text' },
            { name: 'destaque', label: 'Plano em destaque', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
  ],
}
