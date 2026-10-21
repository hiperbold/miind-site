import { NextResponse, type NextRequest } from 'next/server'

// Barra final das páginas do site:
// - homepage canônica em /bu1lder/ (com barra);
// - demais páginas sem barra (/bu1lder/parceiros).
// Usa o caminho bruto de request.url: com trailingSlash: false o Next remove a
// barra de request.nextUrl.pathname, e assim não daria para distinguir os casos.
export function proxy(request: NextRequest) {
  const url = new URL(request.url)
  const { pathname } = url

  if (pathname.startsWith('/bu1lder/api/') || pathname === '/bu1lder/api') return NextResponse.next()

  let destino: string | null = null
  if (pathname === '/bu1lder') destino = '/bu1lder/'
  else if (pathname !== '/bu1lder/' && pathname.endsWith('/')) destino = pathname.replace(/\/+$/, '')

  if (destino === null) return NextResponse.next()

  url.pathname = destino
  return NextResponse.redirect(url.toString(), 308)
}

export const config = {
  matcher: ['/bu1lder', '/bu1lder/:path*'],
}
