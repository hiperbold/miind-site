import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { pt } from '@payloadcms/translations/languages/pt'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Cadastros } from './collections/Cadastros'
import { Media } from './collections/Media'
import { Paginas } from './collections/Paginas'
import { Users } from './collections/Users'
import { criarAdminInicial } from './lib/admin-inicial'
import { migrations } from './migrations'
import { seedNoInit } from './seed/executar'
import { FaqPlataforma } from './globals/FaqPlataforma'
import { Formulario } from './globals/Formulario'
import { Homepage } from './globals/Homepage'
import { Parceiros } from './globals/Parceiros'
import { Planos } from './globals/Planos'
import { Rodape } from './globals/Rodape'
import { TyPage } from './globals/TyPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// `next build` também carrega esta config (generateStaticParams). Nessa fase
// não se migra o banco nem se cria usuário.
const emBuild = process.env.NEXT_PHASE === 'phase-production-build'
const emProducao = process.env.NODE_ENV === 'production'

// Origens aceitas para o login por cookie (CSRF). Nunca vazio: em produção,
// sem NEXT_PUBLIC_SITE_URL usa PUBLIC_SITE_URL (com aviso no log).
function origensCsrf(): string[] {
  const origem = (v: string | undefined) => {
    try {
      return v?.trim() ? new URL(v.trim()).origin : null
    } catch {
      return null
    }
  }
  const servidor = origem(process.env.NEXT_PUBLIC_SITE_URL)
  if (servidor) return [servidor]
  const publico = origem(process.env.PUBLIC_SITE_URL)
  if (emProducao && !emBuild) {
    console.warn(
      `[payload] NEXT_PUBLIC_SITE_URL ausente: CSRF usando ${publico ? 'PUBLIC_SITE_URL' : 'http://localhost:3010'}. Defina NEXT_PUBLIC_SITE_URL.`,
    )
  }
  return [publico ?? 'http://localhost:3010']
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    supportedLanguages: { pt },
    fallbackLanguage: 'pt',
  },
  collections: [Paginas, Cadastros, Users, Media],
  globals: [Homepage, Parceiros, Planos, FaqPlataforma, Formulario, Rodape, TyPage],
  editor: lexicalEditor(),
  csrf: origensCsrf(),
  // sem GraphQL: o site e o admin usam só a REST
  graphQL: { disable: true },
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    // push (sincronizar o schema sem migração) só no `next dev`.
    // Fora do dev o schema muda apenas por `payload migrate`.
    push: process.env.NODE_ENV === 'development',
    migrationDir: path.resolve(dirname, 'migrations'),
    // Em produção (NODE_ENV=production) as migrações de src/migrations rodam
    // sozinhas no init do Payload, sem passo manual.
    prodMigrations: emBuild ? undefined : migrations,
  }),
  onInit: async (payload) => {
    if (emBuild || !emProducao) return
    await criarAdminInicial(payload)
    const { totalDocs } = await payload.count({ collection: 'users', overrideAccess: true })
    if (totalDocs === 0) {
      payload.logger.error(
        'Nenhum usuário no banco e SEED_ADMIN_EMAIL/SEED_ADMIN_PASSWORD ausentes: o admin fica inacessível (o cadastro público do primeiro usuário está bloqueado em produção).',
      )
    }
    // SEED_CONTEUDO_NO_INIT=1: cria globais e LPs que faltam (nunca sobrescreve).
    // Erro só vai para o log; o servidor sobe mesmo assim.
    if (process.env.SEED_CONTEUDO_NO_INIT?.trim() === '1') await seedNoInit(payload)
  },
  sharp,
  plugins: [],
})
