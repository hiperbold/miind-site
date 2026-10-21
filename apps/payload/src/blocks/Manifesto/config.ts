import type { Block } from 'payload'

import { campoAncora, DESCRICAO_MARCACAO } from '@/fields/plataforma'

export const Manifesto: Block = {
  slug: 'manifesto',
  interfaceName: 'BlocoManifesto',
  labels: { singular: 'Manifesto', plural: 'Manifestos' },
  fields: [
    campoAncora,
    { name: 'etiqueta', label: 'Etiqueta', type: 'text' },
    {
      name: 'linhas',
      label: 'Frases',
      type: 'array',
      fields: [{ name: 'texto', label: 'Frase', type: 'text', required: true, admin: { description: DESCRICAO_MARCACAO } }],
    },
    { name: 'assinatura', label: 'Assinatura', type: 'text' },
  ],
}
