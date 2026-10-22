import config from '@payload-config'
import { getPayload, type Payload } from 'payload'
import { beforeAll, describe, expect, it } from 'vitest'

import { perguntasDoBloco } from '@/blocks/FaqSecao/Component'
import { validarContato } from '@/components/bu1lder/plataforma/FormularioContato'
import { separarMarcacao, textoSemMarcacao } from '@/components/bu1lder/plataforma/TextoMarcado'
import type { BlocoFaqSecao, FaqPlataforma } from '@/payload-types'

describe('marcação dos títulos', () => {
  it('separa degradê (*...*) e itálico (_..._) e mantém o resto', () => {
    expect(separarMarcacao('Comece com _uma dor real_. Em *software vivo*.')).toEqual([
      { tipo: 'texto', valor: 'Comece com ' },
      { tipo: 'italico', valor: 'uma dor real' },
      { tipo: 'texto', valor: '. Em ' },
      { tipo: 'destaque', valor: 'software vivo' },
      { tipo: 'texto', valor: '.' },
    ])
    expect(textoSemMarcacao('a *b* c')).toBe('a b c')
    expect(separarMarcacao('sem par *aberto')).toEqual([{ tipo: 'texto', valor: 'sem par *aberto' }])
  })
})

describe('formulário de contato da homepage', () => {
  const ok = {
    name: 'Ana',
    company: 'Empresa',
    role: 'Gerente',
    email: 'ana@empresa.com',
    phone: '11999998888',
    volume: '100-500',
    challenge: 'Atendimento manual no WhatsApp',
    consent: 'on',
  }
  it('aceita dados válidos e acusa cada campo inválido', () => {
    expect(validarContato(ok)).toEqual({})
    expect(validarContato({ ...ok, email: 'x@', volume: '', challenge: 'curto', consent: '' })).toEqual({
      email: 'E-mail inválido',
      volume: 'Selecione uma opção',
      challenge: 'Descreva o desafio',
      consent: 'Confirme o consentimento LGPD',
    })
  })
})

describe('perguntas da seção de FAQ', () => {
  const faqPlataforma = { id: 1, perguntas: [{ pergunta: 'P1', resposta: 'R1' }] } as FaqPlataforma
  const bloco = (incluir: boolean) =>
    ({ blockType: 'faqSecao', variante: 'plataforma', incluirPerguntasPlataforma: incluir, itens: [{ pergunta: 'P2', resposta: 'R2' }] }) as BlocoFaqSecao
  it('inclui as do global só quando pedido, antes das da seção', () => {
    expect(perguntasDoBloco(bloco(true), { faqPlataforma }).map((p) => p.pergunta)).toEqual(['P1', 'P2'])
    expect(perguntasDoBloco(bloco(false), { faqPlataforma }).map((p) => p.pergunta)).toEqual(['P2'])
  })
})

// Integração com o Postgres local migrado e com o seed rodado.
describe('globais homepage e parceiros', () => {
  let payload: Payload
  beforeAll(async () => {
    payload = await getPayload({ config })
  })

  it('visitante lê a versão publicada, nunca o rascunho', async () => {
    const publicada = await payload.findGlobal({ slug: 'homepage', depth: 0 })
    const original = publicada.rodape?.etiqueta
    await payload.updateGlobal({
      slug: 'homepage',
      draft: true,
      data: { rodape: { ...publicada.rodape, etiqueta: 'rascunho-vitest' }, _status: 'draft' },
      context: { semRevalidar: true },
    })
    try {
      const visitante = await payload.findGlobal({ slug: 'homepage', draft: true, overrideAccess: false, depth: 0 })
      expect(visitante.rodape?.etiqueta).toBe(original)
      const site = await payload.findGlobal({ slug: 'homepage', draft: false, depth: 0 })
      expect(site.rodape?.etiqueta).toBe(original)
    } finally {
      await payload.updateGlobal({
        slug: 'homepage',
        data: { rodape: { ...publicada.rodape }, _status: 'published' },
        context: { semRevalidar: true },
      })
    }
  })

  it('parceiros tem a grade de segmentos e os dois formulários', async () => {
    const hub = await payload.findGlobal({ slug: 'parceiros', depth: 0 })
    const tipos = (hub.layout ?? []).map((b) => b.blockType)
    expect(tipos).toContain('gradeNichos')
    expect(tipos.filter((t) => t === 'heroCadastro' || t === 'chamadaFinalCadastro')).toHaveLength(2)
  })
})
