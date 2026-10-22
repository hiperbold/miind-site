import type { TrackingPluginOptions } from '@hiperbold/payload-tracking'

import { ehAdmin } from '@/lib/acesso'

// Opções do módulo de tracking (@hiperbold/payload-tracking). O MESMO objeto
// vai para o plugin (payload.config.ts), para o worker (instrumentation-node.ts)
// e para o trackServerEvent do cadastro (lib/cadastros/tracking.ts).

type ComPapel = Parameters<typeof ehAdmin>[0]

const origem = (v: string | undefined): string | null => {
  try {
    return v?.trim() ? new URL(v.trim()).origin : null
  } catch {
    return null
  }
}

// Origens aceitas pelo browser-token e pelo c15t: o domínio público, o
// endereço do servidor (NEXT_PUBLIC_SITE_URL), o das LPs (PUBLIC_SITE_URL) e,
// fora de produção, o localhost do dev.
export function origensConfiaveis(): string[] {
  const lista = [
    'https://www.miind.com.br',
    origem(process.env.NEXT_PUBLIC_SITE_URL),
    origem(process.env.PUBLIC_SITE_URL),
    process.env.NODE_ENV !== 'production' ? 'http://localhost:3010' : null,
  ].filter((v): v is string => Boolean(v))
  return [...new Set(lista)].slice(0, 32)
}

// O servidor consulta o consentimento no próprio c15t, pela rede interna
// (GET {backendURL}/subjects/:id), sem passar pelo Cloudflare.
export function urlC15tInterna(): string {
  const definida = process.env.C15T_BACKEND_URL?.trim()
  if (definida) return definida
  return `http://127.0.0.1:${process.env.PORT?.trim() || '3010'}/api/c15t`
}

// TRACKING_TRUSTED_PROXIES: IPs exatos (separados por vírgula) dos proxies que
// gravam o X-Forwarded-For. Vazio: o módulo não lê IP do cabeçalho.
const proxiesConfiaveis = (): string[] =>
  (process.env.TRACKING_TRUSTED_PROXIES ?? '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
    .slice(0, 16)

export const CAMINHO_OBRIGADO = '/bu1lder/ty-page'

export const trackingOptions: TrackingPluginOptions = {
  access: { isAdmin: (args) => ehAdmin((args as { req?: { user?: ComPapel } })?.req?.user) },
  consent: {
    transport: 'http',
    backendURL: urlC15tInterna(),
    policyId: 'bu1lder',
    trustedOrigins: origensConfiaveis(),
  },
  // Checkbox "Exigir banner de consentimento" nas páginas da coleção paginas
  // (/bu1lder/{slug}); desmarcado = LP sem banner. Só admin altera.
  consentPolicy: {
    pages: [{ collection: 'paginas', pathField: 'slug', pathPrefix: '/bu1lder' }],
    exemptPaths: [CAMINHO_OBRIGADO],
    canEdit: ({ req }) => ehAdmin(req.user as ComPapel),
  },
  encryption: {},
  installationId: 'miind-bu1lder',
  // ?cadastro=<token> da página de obrigado nunca sai para as plataformas.
  privacy: { stripUrlParams: ['cadastro'] },
  subjectCookie: { path: '/bu1lder' },
  trustedProxies: proxiesConfiaveis(),
}
