import type { Block } from 'payload'

import { campoIcone } from '@/fields/comuns'
import { campoAncora, campoCabecalhoPlataforma } from '@/fields/plataforma'

export const GradeCartoes: Block = {
  slug: 'gradeCartoes',
  interfaceName: 'BlocoGradeCartoes',
  labels: { singular: 'Grade de cartões (plataforma)', plural: 'Grades de cartões (plataforma)' },
  fields: [
    campoAncora,
    campoCabecalhoPlataforma,
    {
      name: 'variante',
      label: 'Desenho dos cartões',
      type: 'select',
      required: true,
      defaultValue: 'construir',
      options: [
        { label: 'Ícone violeta e frase (cenário)', value: 'problema' },
        { label: 'Ícone, título e texto (o que construir)', value: 'construir' },
        { label: 'Número, título e texto (diferenciais)', value: 'diferencial' },
        { label: 'Seta, título e texto (benefícios)', value: 'beneficio' },
        { label: 'Número grande, título e texto (metodologia, 5 colunas)', value: 'metodologia' },
        { label: 'Lista com ícone em quadro (governança)', value: 'governanca' },
      ],
    },
    {
      name: 'rotuloItem',
      label: 'Rótulo depois do número',
      type: 'text',
      admin: {
        description: 'Ex.: "Diferencial" gera "01 · Diferencial".',
        condition: (_, s) => s?.variante === 'diferencial',
      },
    },
    {
      name: 'itens',
      label: 'Cartões',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            campoIcone({ admin: { width: '30%', description: 'Não usado nos desenhos com número.' } }),
            {
              name: 'numero',
              label: 'Número (metodologia)',
              type: 'text',
              admin: { width: '20%' },
            },
            { name: 'titulo', label: 'Título', type: 'text', required: true, admin: { width: '50%' } },
          ],
        },
        { name: 'texto', label: 'Texto', type: 'textarea' },
      ],
    },
    {
      name: 'fraseFinal',
      label: 'Frase final (opcional)',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'texto', label: 'Início', type: 'text' },
            { name: 'destaque', label: 'Continuação em destaque', type: 'text' },
          ],
        },
      ],
    },
  ],
}
