import type { Field, SelectField } from 'payload'

import { NOMES_ICONES } from '@/lib/icones-nomes'

export const opcoesIcones = NOMES_ICONES.map((nome) => ({ label: nome, value: nome }))

export function campoIcone(overrides: Partial<SelectField> & { name?: string } = {}): SelectField {
  return {
    name: 'icone',
    label: 'Ícone',
    type: 'select',
    options: opcoesIcones,
    admin: { description: 'Nome do ícone (biblioteca lucide).' },
    ...overrides,
  } as SelectField
}

// Etiqueta, título e subtítulo do cabeçalho de seção.
export const camposCabecalho: Field[] = [
  { name: 'etiqueta', label: 'Etiqueta', type: 'text' },
  { name: 'titulo', label: 'Título', type: 'text' },
  { name: 'subtitulo', label: 'Subtítulo', type: 'textarea' },
]

// Âncora (id da seção, para links com #) e faixa de fundo destacado.
export function camposSecao({
  ancora,
  destaque = false,
}: { ancora?: string; destaque?: boolean } = {}): Field {
  return {
    type: 'row',
    fields: [
      {
        name: 'ancora',
        label: 'Âncora',
        type: 'text',
        defaultValue: ancora,
        admin: { description: 'id da seção para links com # (opcional).', width: '50%' },
        validate: (value: string | null | undefined) =>
          !value || /^[a-z0-9-]+$/.test(value) || 'Use só letras minúsculas, números e hífen.',
      },
      {
        name: 'destaque',
        label: 'Faixa com fundo destacado',
        type: 'checkbox',
        defaultValue: destaque,
        admin: { width: '50%' },
      },
    ],
  }
}
