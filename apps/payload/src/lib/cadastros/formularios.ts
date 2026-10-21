import type { Payload } from 'payload'

import type { Homepage } from '@/payload-types'

import { formIdContato, formIdLp, PAGINA_HOMEPAGE, PAGINA_PARCEIROS } from './ids'

// Configuração de cada formulário do site, lida do conteúdo publicado no
// servidor. A validação do envio usa esta configuração, e não o que o
// navegador diz: perguntas obrigatórias, opções e segmento vêm daqui.

export type PerguntaExtra = {
  nome: string
  tipo: 'unica' | 'multipla'
  opcoes: string[]
  obrigatoria: boolean
}

export type ConfigCadastro = {
  tipo: 'lp' | 'hub'
  pagina: string
  formulario: string
  perfis: string[]
  perfilObrigatorio: boolean
  extras: PerguntaExtra[]
  textoConsentimento: string
  // LP: segmento fixo (slug). Hub: opções do seletor (vazio = "ainda não sei").
  segmentoFixo: string | null
  segmentosPermitidos: string[]
}

export type ConfigContato = {
  tipo: 'contato-plataforma'
  pagina: string
  formulario: string
  volumes: string[]
}

export type ConfigFormulario = ConfigCadastro | ConfigContato

async function segmentosPublicados(payload: Payload): Promise<string[]> {
  const res = await payload.find({
    collection: 'paginas',
    where: { tipo: { equals: 'nicho' }, _status: { equals: 'published' } },
    draft: false,
    overrideAccess: false,
    limit: 200,
    depth: 0,
    select: { slug: true },
  })
  return res.docs.map((d) => d.slug)
}

async function configPlataforma(
  payload: Payload,
  pagina: typeof PAGINA_HOMEPAGE | typeof PAGINA_PARCEIROS,
  formulario: string,
): Promise<ConfigFormulario | null> {
  const global = (await payload.findGlobal({
    slug: pagina === PAGINA_HOMEPAGE ? 'homepage' : 'parceiros',
    draft: false,
    depth: 0,
  })) as Pick<Homepage, 'layout'>
  for (const bloco of global.layout ?? []) {
    if (bloco.blockType === 'contato' && formIdContato(bloco.ancora) === formulario) {
      return {
        tipo: 'contato-plataforma',
        pagina,
        formulario,
        volumes: (bloco.formulario?.opcoesVolume ?? []).map((o) => o.valor),
      }
    }
    if (bloco.blockType === 'heroCadastro' || bloco.blockType === 'chamadaFinalCadastro') {
      const padrao = bloco.blockType === 'heroCadastro' ? 'cadastro' : 'cadastro-final'
      if ((bloco.formulario?.formId || padrao) !== formulario) continue
      const [padroes, segmentos] = await Promise.all([
        payload.findGlobal({ slug: 'formulario', depth: 0 }),
        segmentosPublicados(payload),
      ])
      return {
        tipo: 'hub',
        pagina,
        formulario,
        perfis: padroes.perfis ?? [],
        // como na prévia, o perfil é opcional no programa de parceiros
        perfilObrigatorio: false,
        extras: [],
        textoConsentimento: padroes.textoConsentimento,
        segmentoFixo: null,
        segmentosPermitidos: segmentos,
      }
    }
  }
  return null
}

async function configLp(payload: Payload, slug: string, formulario: string): Promise<ConfigFormulario | null> {
  const res = await payload.find({
    collection: 'paginas',
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    draft: false,
    overrideAccess: false,
    limit: 1,
    depth: 0,
  })
  const pagina = res.docs[0]
  if (!pagina) return null
  for (const bloco of pagina.layout ?? []) {
    if (bloco.blockType !== 'chamadaCadastro') continue
    const form = bloco.formulario
    if (formIdLp(slug, form?.formId) !== formulario) continue
    const padroes = await payload.findGlobal({ slug: 'formulario', depth: 0 })
    const perfis = form?.perfis?.length ? form.perfis : (padroes.perfis ?? [])
    return {
      tipo: 'lp',
      pagina: slug,
      formulario,
      perfis,
      perfilObrigatorio: perfis.length > 0,
      extras: (form?.perguntasExtras ?? []).map((q) => ({
        nome: q.nome,
        tipo: q.tipo,
        opcoes: q.opcoes ?? [],
        obrigatoria: Boolean(q.obrigatoria),
      })),
      textoConsentimento: form?.textoConsentimento?.trim() || padroes.textoConsentimento,
      segmentoFixo: slug,
      segmentosPermitidos: [slug],
    }
  }
  return null
}

export async function buscarConfigFormulario(
  payload: Payload,
  pagina: string,
  formulario: string,
): Promise<ConfigFormulario | null> {
  if (!/^[a-z0-9-]{1,100}$/.test(pagina) || !/^[a-z0-9-]{1,100}$/.test(formulario)) return null
  if (pagina === PAGINA_HOMEPAGE || pagina === PAGINA_PARCEIROS) return configPlataforma(payload, pagina, formulario)
  return configLp(payload, pagina, formulario)
}
