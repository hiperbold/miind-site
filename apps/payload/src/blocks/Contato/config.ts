import type { Block } from 'payload'

import { DESCRICAO_MARCACAO } from '@/fields/plataforma'

export const Contato: Block = {
  slug: 'contato',
  interfaceName: 'BlocoContato',
  labels: { singular: 'Contato com formulário', plural: 'Contatos com formulário' },
  fields: [
    {
      name: 'ancora',
      label: 'Âncora',
      type: 'text',
      required: true,
      defaultValue: 'contato',
      admin: { description: 'id da seção (alvo dos botões "Agendar demo").' },
      validate: (value: string | null | undefined) =>
        (!!value && /^[a-z0-9-]+$/.test(value)) || 'Use só letras minúsculas, números e hífen.',
    },
    { name: 'etiqueta', label: 'Etiqueta', type: 'text' },
    { name: 'titulo', label: 'Título', type: 'text', required: true, admin: { description: DESCRICAO_MARCACAO } },
    { name: 'texto', label: 'Texto', type: 'textarea' },
    {
      name: 'itens',
      label: 'Itens',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'titulo', label: 'Título', type: 'text', required: true },
            { name: 'texto', label: 'Texto', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'citacao',
      label: 'Citação (opcional)',
      type: 'group',
      fields: [
        { name: 'texto', label: 'Texto (sem aspas)', type: 'text' },
        { name: 'autor', label: 'Autor', type: 'text' },
      ],
    },
    {
      name: 'formulario',
      label: 'Formulário',
      type: 'group',
      admin: { description: 'O envio grava em "Cadastros", vai ao webhook do n8n e leva à página de obrigado.' },
      fields: [
        {
          name: 'opcoesVolume',
          label: 'Opções de "Volume / colaboradores"',
          type: 'array',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'valor', label: 'Valor', type: 'text', required: true },
                { name: 'rotulo', label: 'Texto', type: 'text', required: true },
              ],
            },
          ],
        },
        { name: 'aviso', label: 'Aviso de privacidade', type: 'textarea' },
        { name: 'textoBotao', label: 'Texto do botão', type: 'text' },
      ],
    },
  ],
}
