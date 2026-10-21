import type { MetadataRoute } from 'next'

import { regrasRobots } from '@/lib/noindex'

// Gerado a cada pedido, para seguir o SITE_NOINDEX do ambiente de execução.
export const dynamic = 'force-dynamic'

export default function robots(): MetadataRoute.Robots {
  return regrasRobots()
}
