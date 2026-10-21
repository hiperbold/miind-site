import config from '@payload-config'
import { getPayload, type Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { validarSlug } from '@/collections/Paginas'

// Integração com o Postgres local (pnpm db:up + pnpm migrate). Cria páginas de
// teste com slug "teste-vitest-*" e apaga no fim.
const PREFIXO = 'teste-vitest'
let payload: Payload

const base = (slug: string) => ({
  titulo: `Página ${slug}`,
  slug,
  tipo: 'outra' as const,
  visual: 'ds' as const,
  seo: { title: `Teste ${slug}` },
})

// ValidationError do Payload: a mensagem do campo fica em data.errors (é a que o
// admin mostra embaixo do campo); a mensagem geral só cita o campo.
async function mensagemDoSlug(promessa: Promise<unknown>): Promise<string> {
  try {
    await promessa
  } catch (err) {
    const e = err as { data?: { errors?: { path: string; message: string }[] } }
    return e.data?.errors?.find((x) => x.path === 'slug')?.message ?? String(err)
  }
  return 'nenhum erro'
}

async function limpar() {
  await payload.delete({
    collection: 'paginas',
    where: { slug: { like: PREFIXO } },
    overrideAccess: true,
    context: { semRevalidar: true },
  })
}

beforeAll(async () => {
  payload = await getPayload({ config })
  await limpar()
})

afterAll(async () => {
  await limpar()
})

describe('validarSlug', () => {
  it('recusa reservado, formato inválido e vazio; aceita o formato certo', () => {
    expect(validarSlug('parceiros')).toMatch(/reservado/)
    expect(validarSlug('ty-page')).toMatch(/reservado/)
    expect(validarSlug('Contabilidade')).toMatch(/minúsculas/)
    expect(validarSlug('com espaco')).toMatch(/minúsculas/)
    expect(validarSlug('-hifen')).toMatch(/minúsculas/)
    expect(validarSlug('')).toMatch(/Informe/)
    expect(validarSlug('gestor-de-trafego')).toBe(true)
  })
})

describe('coleção paginas', () => {
  it('slug reservado é recusado também em rascunho', async () => {
    expect(
      await mensagemDoSlug(
      payload.create({
        collection: 'paginas',
        data: { ...base('api'), _status: 'draft' },
        draft: true,
        context: { semRevalidar: true },
      })
      ),
    ).toMatch(/reservado/)
  })

  it('slug com formato inválido é recusado em rascunho', async () => {
    expect(
      await mensagemDoSlug(
      payload.create({
        collection: 'paginas',
        data: { ...base('Teste Vitest'), _status: 'draft' },
        draft: true,
        context: { semRevalidar: true },
      })
      ),
    ).toMatch(/minúsculas/)
  })

  it('slug repetido dá mensagem clara (publicada e em rascunho)', async () => {
    await payload.create({
      collection: 'paginas',
      data: { ...base(`${PREFIXO}-a`), _status: 'published' },
      context: { semRevalidar: true },
    })
    expect(
      await mensagemDoSlug(
      payload.create({
        collection: 'paginas',
        data: { ...base(`${PREFIXO}-a`), _status: 'published' },
        context: { semRevalidar: true },
      })
      ),
    ).toMatch(/Já existe uma página com o slug/)
    const b = await payload.create({
      collection: 'paginas',
      data: { ...base(`${PREFIXO}-b`), _status: 'published' },
      context: { semRevalidar: true },
    })
    expect(
      await mensagemDoSlug(
      payload.update({
        collection: 'paginas',
        id: b.id,
        data: { slug: `${PREFIXO}-a`, _status: 'draft' },
        draft: true,
        context: { semRevalidar: true },
      })
      ),
    ).toMatch(/Já existe uma página com o slug/)
  })

  it('anônimo não lê rascunho e lê o que está publicado', async () => {
    await payload.create({
      collection: 'paginas',
      data: { ...base(`${PREFIXO}-rascunho`), _status: 'draft' },
      draft: true,
      context: { semRevalidar: true },
    })
    const rascunho = await payload.find({
      collection: 'paginas',
      where: { slug: { equals: `${PREFIXO}-rascunho` } },
      overrideAccess: false,
      draft: true,
    })
    expect(rascunho.totalDocs).toBe(0)
    const publicada = await payload.find({
      collection: 'paginas',
      where: { slug: { equals: `${PREFIXO}-a` } },
      overrideAccess: false,
    })
    expect(publicada.totalDocs).toBe(1)
  })

  it('anônimo não cria, não altera e não apaga', async () => {
    await expect(
      payload.create({
        collection: 'paginas',
        data: { ...base(`${PREFIXO}-anonimo`), _status: 'published' },
        overrideAccess: false,
        context: { semRevalidar: true },
      }),
    ).rejects.toThrow()
    const alvo = await payload.find({ collection: 'paginas', where: { slug: { equals: `${PREFIXO}-a` } } })
    const id = alvo.docs[0].id
    await expect(
      payload.update({
        collection: 'paginas',
        id,
        data: { titulo: 'invadido' },
        overrideAccess: false,
        context: { semRevalidar: true },
      }),
    ).rejects.toThrow()
    await expect(
      payload.delete({ collection: 'paginas', id, overrideAccess: false, context: { semRevalidar: true } }),
    ).rejects.toThrow()
    await expect(
      payload.updateGlobal({ slug: 'planos', data: { mostrarParcelaPlataforma: true }, overrideAccess: false }),
    ).rejects.toThrow()
  })
})
