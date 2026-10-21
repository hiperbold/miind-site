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
      admin: { description: 'Valores vêm do global "Planos". Com a escolha de plano ligada, é o plano inicial.' },
    },
    {
      name: 'permitirEscolherPlano',
      label: 'Visitante pode escolher o plano (seletor acima do simulador)',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'cabecalhoCartao',
      label: 'Etiqueta no topo do simulador',
      type: 'text',
      defaultValue: 'Quanto você ganha · Plano {plano}',
      admin: { description: '{plano} vira o nome do plano escolhido.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'linhaSetup',
          label: 'Linha abaixo do preço (opcional)',
          type: 'text',
          defaultValue: 'Setup incluso',
        },
        {
          name: 'linhaOperacao',
          label: 'Linha abaixo do valor por cliente (opcional)',
          type: 'text',
          defaultValue: 'A Bu1lder cuida da operação',
        },
      ],
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
    {
      name: 'botao',
      label: 'Botão abaixo do aviso (opcional)',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'texto', label: 'Texto', type: 'text' },
            { name: 'url', label: 'Link', type: 'text', defaultValue: '#cadastro' },
          ],
        },
      ],
    },
    camposSecao({ destaque: true }),
  ],
}
