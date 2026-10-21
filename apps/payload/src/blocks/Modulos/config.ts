import type { Block } from 'payload'

import { campoIcone, camposCabecalho, camposSecao } from '@/fields/comuns'

export const Modulos: Block = {
  slug: 'modulos',
  interfaceName: 'BlocoModulos',
  labels: { singular: 'Módulos', plural: 'Módulos' },
  fields: [
    ...camposCabecalho,
    {
      name: 'itens',
      label: 'Módulos',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            campoIcone({ admin: { width: '30%' } }),
            { name: 'nome', label: 'Nome', type: 'text', required: true, admin: { width: '70%' } },
          ],
        },
        { name: 'beneficio', label: 'Benefício', type: 'text', required: true },
        { name: 'exemplo', label: 'Mensagem de exemplo (aparece ao passar o mouse)', type: 'textarea' },
      ],
    },
    {
      name: 'textoEntrega',
      label: 'Linha abaixo do exemplo',
      type: 'text',
      defaultValue: 'Entrega em poucos dias · WhatsApp + IA',
    },
    camposSecao({ ancora: 'solucoes' }),
  ],
}
