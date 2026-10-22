import pg from 'pg'

// Cria o banco do c15t se ainda não existir, usando a conexão principal
// (DATABASE_URI). Só age quando os dois endereços apontam para o mesmo
// servidor Postgres (mesmo host e porta): o banco do c15t é um banco à parte
// na mesma instância. Idempotente: banco existente, ou criado por outro
// processo ao mesmo tempo (42P04), não é erro.

const NOME_SEGURO = /^[A-Za-z_][A-Za-z0-9_]{0,62}$/

export type ResultadoBancoC15t = 'existia' | 'criado' | 'ignorado'

export function alvoDoBancoC15t(
  principal: string | undefined,
  c15t: string | undefined,
): { nome: string } | { motivo: string } {
  if (!principal?.trim() || !c15t?.trim()) return { motivo: 'DATABASE_URI ou C15T_DATABASE_URI ausente' }
  let a: URL
  let b: URL
  try {
    a = new URL(principal)
    b = new URL(c15t)
  } catch {
    return { motivo: 'endereço de banco inválido' }
  }
  if (a.hostname !== b.hostname || (a.port || '5432') !== (b.port || '5432')) {
    return { motivo: 'C15T_DATABASE_URI em outro servidor: o banco não é criado automaticamente' }
  }
  const nome = decodeURIComponent(b.pathname.replace(/^\//, ''))
  if (!NOME_SEGURO.test(nome)) return { motivo: 'nome do banco do c15t fora do padrão [A-Za-z_][A-Za-z0-9_]*' }
  const principalNome = decodeURIComponent(a.pathname.replace(/^\//, ''))
  if (nome === principalNome) return { motivo: 'C15T_DATABASE_URI aponta para o banco do Payload' }
  return { nome }
}

export async function garantirBancoC15t(
  principal = process.env.DATABASE_URI,
  c15t = process.env.C15T_DATABASE_URI,
): Promise<ResultadoBancoC15t> {
  const alvo = alvoDoBancoC15t(principal, c15t)
  if ('motivo' in alvo) {
    console.warn(`[c15t] criação do banco ignorada: ${alvo.motivo}`)
    return 'ignorado'
  }
  const cliente = new pg.Client({ connectionString: principal })
  await cliente.connect()
  try {
    const { rowCount } = await cliente.query('SELECT 1 FROM pg_database WHERE datname = $1', [alvo.nome])
    if (rowCount) return 'existia'
    try {
      // identificador validado por NOME_SEGURO; CREATE DATABASE não aceita parâmetro
      await cliente.query(`CREATE DATABASE "${alvo.nome}"`)
      return 'criado'
    } catch (err) {
      if ((err as { code?: string }).code === '42P04') return 'existia'
      throw err
    }
  } finally {
    await cliente.end().catch(() => {})
  }
}
