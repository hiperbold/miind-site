import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { pt } from '@payloadcms/translations/languages/pt'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Paginas } from './collections/Paginas'
import { Users } from './collections/Users'
import { criarAdminInicial } from './lib/admin-inicial'
import { migrations } from './migrations'
import { FaqPlataforma } from './globals/FaqPlataforma'
import { Formulario } from './globals/Formulario'
import { Homepage } from './globals/Homepage'
import { Parceiros } from './globals/Parceiros'
import { Planos } from './globals/Planos'
import { Rodape } from './globals/Rodape'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// `next build` também carrega esta config (generateStaticParams). Nessa fase
// não se migra o banco nem se cria usuário.
const emBuild = process.env.NEXT_PHASE === 'phase-production-build'
const emProducao = process.env.NODE_ENV === 'production'

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
  collections: [Paginas, Users, Media],
  globals: [Homepage, Parceiros, Planos, FaqPlataforma, Formulario, Rodape],
  editor: lexicalEditor(),
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
  },
  sharp,
  plugins: [],
})
