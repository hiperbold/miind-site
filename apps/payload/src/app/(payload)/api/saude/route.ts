import config from '@payload-config'
import type { PostgresAdapter } from '@payloadcms/db-postgres'
import { getPayload } from 'payload'

// Health check da VPS: GET /api/saude (também /bu1lder/api/saude pela reescrita).
// 200 {ok:true} com o banco respondendo; 503 {ok:false} sem detalhes caso contrário.
export const dynamic = 'force-dynamic'

const LIMITE_MS = 5000

async function conferirBanco(): Promise<void> {
  const payload = await getPayload({ config })
  await (payload.db as unknown as PostgresAdapter).pool.query('select 1')
}

export async function GET() {
  const cabecalhos = { 'Cache-Control': 'no-store' }
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    await Promise.race([
      conferirBanco(),
      new Promise((_, rejeitar) => {
        timer = setTimeout(() => rejeitar(new Error('tempo esgotado')), LIMITE_MS)
      }),
    ])
    return Response.json({ ok: true }, { headers: cabecalhos })
  } catch (err) {
    console.error('Saúde: banco indisponível.', err instanceof Error ? err.message : err)
    return Response.json({ ok: false }, { status: 503, headers: cabecalhos })
  } finally {
    clearTimeout(timer)
  }
}
