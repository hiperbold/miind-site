import type { DataFromGlobalSlug, GlobalSlug, Payload } from 'payload'

import { cartoesHubSeed } from './cartoes-hub'
import { faqPlataformaSeed, formularioSeed, planosSeed, rodapeSeed, tyPageSeed } from './globais'
import { homepageSeed } from './homepage'
import { paginasSeed } from './paginas'
import { parceirosSeed } from './parceiros'

export type OpcoesSeed = {
  // true: sobrescreve com o conteúdo do seed o que já existe (SEED_ATUALIZAR=1).
  atualizar?: boolean
  log?: (mensagem: string) => void
}

// Conteúdo inicial idempotente, usado pelo `pnpm seed` (src/seed.ts) e pelo
// onInit em produção (SEED_CONTEUDO_NO_INIT=1):
// 1. globais (homepage, parceiros, planos, FAQ da plataforma, formulário, rodapé, página de obrigado)
//    que nunca foram salvos; homepage e parceiros saem publicados;
// 2. as 11 LPs (10 nichos e agência), publicadas, procuradas pelo slug (cria as que faltam);
//    o grupo "No programa de parceiros" (cartaoHub) vem de seed/cartoes-hub.ts e é
//    preenchido também em páginas já existentes que ainda não o têm.
// Sem `atualizar`, o que já existe não é tocado, para não apagar edições do admin.
// Não revalida o cache (context.semRevalidar): quem chama decide. Devolve se gravou algo.
export async function executarSeed(payload: Payload, opcoes: OpcoesSeed = {}): Promise<{ mudou: boolean }> {
  const atualizar = opcoes.atualizar === true
  const log = opcoes.log ?? ((m: string) => payload.logger.info(m))
  const context = { semRevalidar: true }
  let mudou = false

  // Globais: um global nunca salvo volta sem updatedAt.
  async function gravarGlobal<S extends GlobalSlug>(slug: S, data: Omit<DataFromGlobalSlug<S>, 'id'>) {
    const atual = await payload.findGlobal({ slug, depth: 0 })
    if (atualizar || !(atual as { updatedAt?: string | null })?.updatedAt) {
      // o tipo genérico do updateGlobal não se resolve com S aberto; data já foi checado na chamada
      await payload.updateGlobal({ slug, data: data as never, context })
      mudou = true
      log(`Global "${slug}" gravado.`)
    } else log(`Global "${slug}" já existe. Mantido.`)
  }

  await gravarGlobal('homepage', homepageSeed)
  await gravarGlobal('parceiros', parceirosSeed)
  await gravarGlobal('planos', planosSeed)
  await gravarGlobal('faq-plataforma', faqPlataformaSeed)
  await gravarGlobal('formulario', formularioSeed)
  await gravarGlobal('rodape', rodapeSeed)
  await gravarGlobal('ty-page', tyPageSeed)

  // Páginas: procura o slug no documento (publicado) e nos rascunhos.
  async function acharPagina(slug: string) {
    const publicada = await payload.find({
      collection: 'paginas',
      where: { slug: { equals: slug } },
      draft: false,
      limit: 1,
      depth: 0,
    })
    if (publicada.docs[0]) return publicada.docs[0].id as number
    const rascunho = await payload.findVersions({
      collection: 'paginas',
      where: { 'version.slug': { equals: slug } },
      sort: '-updatedAt',
      limit: 1,
      depth: 0,
    })
    const parent = rascunho.docs[0]?.parent as number | { id: number } | null | undefined
    if (parent) return typeof parent === 'object' ? parent.id : parent
    return null
  }

  for (const paginaBase of paginasSeed) {
    const cartaoHub = cartoesHubSeed[paginaBase.slug as keyof typeof cartoesHubSeed]
    const pagina = cartaoHub ? { ...paginaBase, cartaoHub } : paginaBase
    const id = await acharPagina(pagina.slug)
    if (!id) {
      await payload.create({ collection: 'paginas', data: { ...pagina, trackingConsentRequired: false, _status: 'published' }, context })
      mudou = true
      log(`Página criada e publicada: /bu1lder/${pagina.slug}`)
    } else if (atualizar) {
      await payload.update({ collection: 'paginas', id, data: { ...pagina, trackingConsentRequired: false, _status: 'published' }, context })
      mudou = true
      log(`Página atualizada e publicada: /bu1lder/${pagina.slug}`)
    } else {
      const atual = await payload.findByID({ collection: 'paginas', id, depth: 0, draft: false })
      if (cartaoHub && !atual.cartaoHub?.nome) {
        // só o grupo novo; o resto da página fica como está
        await payload.update({ collection: 'paginas', id, data: { cartaoHub }, context })
        mudou = true
        log(`Página já existe: /bu1lder/${pagina.slug}. Cartão do programa preenchido.`)
      } else log(`Página já existe: /bu1lder/${pagina.slug}. Mantida.`)
    }
  }

  return { mudou }
}

// Chamado no onInit em produção: só cria o que falta e nunca derruba o servidor.
// O log leva só a mensagem do erro, sem os dados enviados.
export async function seedNoInit(payload: Payload): Promise<'ok' | 'erro'> {
  try {
    const { mudou } = await executarSeed(payload, { atualizar: false })
    payload.logger.info(mudou ? 'Conteúdo inicial criado no init.' : 'Conteúdo inicial já existia. Nada gravado.')
    return 'ok'
  } catch (err) {
    const mensagem = err instanceof Error ? err.message : 'erro desconhecido'
    payload.logger.error(`Falha no conteúdo inicial do init: ${mensagem}`)
    return 'erro'
  }
}
