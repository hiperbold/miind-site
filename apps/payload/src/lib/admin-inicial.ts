import type { Payload } from 'payload'

export type ResultadoAdminInicial = 'sem-variaveis' | 'existe' | 'criado' | 'erro'

// Cria o primeiro usuário do admin a partir de SEED_ADMIN_EMAIL e
// SEED_ADMIN_PASSWORD, só se ainda não existir usuário com esse e-mail.
// Roda no onInit em produção. A senha nunca vai para o log.
export async function criarAdminInicial(
  payload: Payload,
  env: { email?: string; senha?: string } = {
    email: process.env.SEED_ADMIN_EMAIL,
    senha: process.env.SEED_ADMIN_PASSWORD,
  },
): Promise<ResultadoAdminInicial> {
  const email = env.email?.trim().toLowerCase()
  const senha = env.senha
  if (!email || !senha) return 'sem-variaveis'

  try {
    const { totalDocs } = await payload.count({
      collection: 'users',
      where: { email: { equals: email } },
      overrideAccess: true,
    })
    if (totalDocs > 0) return 'existe'

    await payload.create({
      collection: 'users',
      data: { email, password: senha, role: 'admin' },
      overrideAccess: true,
      context: { criacaoPeloSistema: true },
    })
    payload.logger.info(`Admin inicial criado: ${email}`)
    return 'criado'
  } catch (err) {
    // Só a mensagem: os dados enviados (com a senha) não entram no log.
    const mensagem = err instanceof Error ? err.message : 'erro desconhecido'
    payload.logger.error(`Falha ao criar o admin inicial (${email}): ${mensagem}`)
    return 'erro'
  }
}
