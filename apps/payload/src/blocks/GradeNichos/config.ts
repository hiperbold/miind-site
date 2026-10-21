import type { Block } from 'payload'

import { campoAncora, campoCabecalhoHub } from '@/fields/plataforma'

export const GradeNichos: Block = {
  slug: 'gradeNichos',
  interfaceName: 'BlocoGradeNichos',
  labels: { singular: 'Grade de nichos', plural: 'Grades de nichos' },
  // Os cartões vêm das páginas de nicho publicadas com "Mostrar na grade do programa".
  fields: [
    { ...campoAncora, defaultValue: 'segmentos' } as typeof campoAncora,
    campoCabecalhoHub,
    {
      type: 'row',
      fields: [
        { name: 'textoLink', label: 'Texto do link (telas maiores)', type: 'text' },
        { name: 'textoLinkCurto', label: 'Texto do link (celular)', type: 'text' },
      ],
    },
  ],
}
