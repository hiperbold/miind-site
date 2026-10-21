import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  // Imagem Docker enxuta: só .next/standalone + .next/static + public.
  output: 'standalone',
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
      beforeFiles: [{ source: '/bu1lder/api/:path*', destination: '/api/:path*' }],
      afterFiles: [],
      fallback: [],
    }
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
