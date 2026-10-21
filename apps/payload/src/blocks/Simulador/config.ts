import type { Block } from 'payload'

import { camposCabecalho, camposSecao } from '@/fields/comuns'
import { CHAVES_PLANOS } from '@/globals/Planos'

export const Simulador: Block = {
  slug: 'simulador',
  interfaceName: 'BlocoSimulador',
  labels: { singular: 'Simulador de ganhos', plural: 'Simuladores de ganhos' },
  fields: [
    ...camposCabecalho,
    {
      name: 'plano',
      label: 'Plano',
      type: 'select',
      required: true,
      defaultValue: 'Crescimento',
      options: CHAVES_PLANOS.map((chave) => ({ label: chave, value: chave })),
      admin: { description: 'Valores vêm do global "Planos".' },
    },
    {
      name: 'rotuloValor',
      label: 'Rótulo do valor mensal',
      type: 'text',
      defaultValue: 'Sua renda mensal',
    },
    {
      type: 'row',
      fields: [
        { name: 'minClientes', label: 'Mínimo de clientes', type: 'number', min: 1, defaultValue: 1, required: true },
        { name: 'maxClientes', label: 'Máximo de clientes', type: 'number', min: 2, defaultValue: 50, required: true },
        {
          name: 'clientesInicial',
          label: 'Clientes ao abrir',
          type: 'number',
          min: 1,
          defaultValue: 10,
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'mostrarAnual', label: 'Mostrar renda anual', type: 'checkbox', defaultValue: true },
        { name: 'mostrarPortfolio', label: 'Mostrar total do portfólio', type: 'checkbox', defaultValue: true },
      ],
    },
    { name: 'aviso', label: 'Aviso abaixo do simulador', type: 'textarea' },
    camposSecao({ destaque: true }),
  ],
}
