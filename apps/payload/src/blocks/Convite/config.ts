import type { Block } from 'payload'

import { campoAncora, campoBotao, DESCRICAO_MARCACAO } from '@/fields/plataforma'

export const Convite: Block = {
  slug: 'convite',
  interfaceName: 'BlocoConvite',
  labels: { singular: 'Convite (chamada centralizada)', plural: 'Convites (chamadas centralizadas)' },
  fields: [
    campoAncora,
    { name: 'etiqueta', label: 'Etiqueta', type: 'text' },
    { name: 'titulo', label: 'Título', type: 'text', required: true, admin: { description: DESCRICAO_MARCACAO } },
    { name: 'texto', label: 'Texto', type: 'textarea' },
    campoBotao('botao', 'Botão', '#contato'),
    campoBotao('linkSecundario', 'Link secundário', '#contato'),
  ],
}
