import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

// Endpoints da API alcançáveis por /bu1lder/api/... (reescritos para /api/...).
// Os três do tracking são os endpoints do navegador do módulo; o c15t não entra
// aqui (o banner grava por app/(site)/bu1lder/api/c15t/subjects, só POST).
const ROTAS_API_PUBLICAS = [
  '/cadastros/enviar',
  '/media/file/:path*',
  '/saude',
  '/tracking/browser-token',
  '/tracking/collect',
  '/tracking/public-config',
]

const nextConfig: NextConfig = {
  // Imagem Docker enxuta: só .next/standalone + .next/static + public.
  output: 'standalone',
  // c15t fora do bundle: o hono-openapi dele tem import opcional (zod-openapi)
  // que o Turbopack não resolve. Carregado do node_modules em execução.
  serverExternalPackages: ['@c15t/backend'],
  // Sem basePath: o prefixo /bu1lder é uma pasta de rotas em app/(site)/bu1lder.
  // Barra final: sem barra em todas as rotas, exceto a homepage, que é /bu1lder/
  // (o Cloudflare da MIIND só encaminha /bu1lder/*). O redirecionamento é feito
  // em src/middleware.ts, por isso o automático do Next fica desligado.
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  images: {
    localPatterns: [{ pathname: '/api/media/file/**' }],
  },
  async redirects() {
    return [{ source: '/', destination: '/bu1lder/', permanent: false }]
  },
  async rewrites() {
    return {
      // Só o que o navegador precisa alcançar por /bu1lder/* (o Cloudflare da
      // MIIND só encaminha /bu1lder/*). Para abrir mais um endpoint (ex.: o
      // tracking da fase 4), acrescente o caminho em ROTAS_API_PUBLICAS.
      beforeFiles: ROTAS_API_PUBLICAS.map((rota) => ({ source: `/bu1lder/api${rota}`, destination: `/api${rota}` })),
      afterFiles: [],
      fallback: [],
    }
  },
  async headers() {
    const comuns = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    ]
    // O admin não pode ser aberto dentro de iframe. As páginas do site podem
    // conter iframe de terceiros (agenda na ty-page): isso não é afetado.
    const admin = [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
    ]
    return [
      { source: '/:path*', headers: comuns },
      { source: '/admin', headers: admin },
      { source: '/admin/:path*', headers: admin },
    ]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
