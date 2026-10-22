import type { Block } from 'payload'

import { campoIcone } from '@/fields/comuns'
import { validarUrl } from '@/lib/url-segura'

export const HeroCelular: Block = {
  slug: 'heroCelular',
  interfaceName: 'BlocoHeroCelular',
  labels: { singular: 'Topo com celular', plural: 'Topos com celular' },
  fields: [
    {
      type: 'row',
      fields: [
        campoIcone({ admin: { width: '30%' } }),
        { name: 'etiqueta', label: 'Etiqueta', type: 'text', admin: { width: '70%' } },
      ],
    },
    { name: 'titulo', label: 'Título (H1)', type: 'text', required: true },
    { name: 'texto', label: 'Texto de apoio', type: 'textarea' },
    {
      type: 'row',
      fields: [
        campoIcone({ name: 'iconeDecisor', label: 'Ícone da linha de público', admin: { width: '30%' } }),
        { name: 'linhaDecisor', label: 'Linha de público', type: 'text', admin: { width: '70%' } },
      ],
    },
    {
      name: 'botaoPrincipal',
      label: 'Botão principal',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'texto', label: 'Texto', type: 'text' },
            { name: 'url', label: 'Link', type: 'text', validate: validarUrl, defaultValue: '#cadastro' },
          ],
        },
      ],
    },
    {
      name: 'botaoSecundario',
      label: 'Botão secundário',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'texto', label: 'Texto', type: 'text' },
            { name: 'url', label: 'Link', type: 'text', validate: validarUrl, defaultValue: '#solucoes' },
          ],
        },
      ],
    },
    {
      name: 'celular',
      label: 'Celular de exemplo',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'titulo', label: 'Nome no topo da conversa', type: 'text' },
            { name: 'subtitulo', label: 'Linha abaixo do nome', type: 'text', defaultValue: 'online · IA Bu1lder' },
          ],
        },
        {
          name: 'mensagens',
          label: 'Mensagens',
          type: 'array',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'de',
                  label: 'Quem envia',
                  type: 'select',
                  required: true,
                  defaultValue: 'negocio',
                  options: [
                    { label: 'Negócio (IA)', value: 'negocio' },
                    { label: 'Cliente', value: 'cliente' },
                  ],
                  admin: { width: '30%' },
                },
                { name: 'hora', label: 'Hora', type: 'text', admin: { width: '20%' } },
              ],
            },
            { name: 'texto', label: 'Texto', type: 'textarea', required: true },
          ],
        },
      ],
    },
  ],
}
