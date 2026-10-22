import type { Block } from 'payload'

import { campoAncora, campoCabecalhoHub } from '@/fields/plataforma'
import { validarUrl } from '@/lib/url-segura'

export const CartoesLink: Block = {
  slug: 'cartoesLink',
  interfaceName: 'BlocoCartoesLink',
  labels: { singular: 'Cartões com link', plural: 'Cartões com link' },
  fields: [
    campoAncora,
    campoCabecalhoHub,
    {
      name: 'cartoes',
      label: 'Cartões',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'etiqueta', label: 'Etiqueta', type: 'text' },
            { name: 'titulo', label: 'Título', type: 'text', required: true },
          ],
        },
        { name: 'texto', label: 'Texto', type: 'textarea' },
        {
          type: 'row',
          fields: [
            { name: 'url', label: 'Link', type: 'text', validate: validarUrl, required: true, admin: { description: 'Ex.: /bu1lder/contabilidade' } },
            { name: 'textoLink', label: 'Texto do link', type: 'text' },
          ],
        },
      ],
    },
  ],
}
