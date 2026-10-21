import type { Metadata, MetadataRoute } from 'next'

// SITE_NOINDEX=1: o site inteiro fica fora dos buscadores (homologação).
// Lida quando a página é gerada; na imagem Docker o build não tem banco, então
// as LPs são geradas no servidor e leem o valor do ambiente de execução.
export function semIndexacao(): boolean {
  return process.env.SITE_NOINDEX?.trim() === '1'
}

export function metadataRobots(): Metadata {
  return semIndexacao() ? { robots: { index: false, follow: false } } : {}
}

export function regrasRobots(): MetadataRoute.Robots {
  return semIndexacao()
    ? { rules: { userAgent: '*', disallow: '/' } }
    : { rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] } }
}
