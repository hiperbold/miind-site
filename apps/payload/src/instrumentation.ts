// Ao subir o servidor (só no runtime Node): banco e migração do c15t e o
// worker de entregas do tracking. O import dinâmico fica DENTRO do if para o
// código do worker não entrar no bundle do runtime edge.
//
// O tracking nunca impede o site de subir: qualquer falha (banco fora,
// variável ausente, import que quebra) vira uma linha no log e o register()
// resolve. Sem worker, nada sai da outbox até o próximo restart; as entregas
// ficam guardadas e saem quando ele voltar.
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  try {
    const { iniciarTracking } = await import('./instrumentation-node')
    await iniciarTracking()
  } catch (err) {
    // sem endereço de banco no log (pode trazer senha)
    const msg = (err instanceof Error ? err.message : 'erro').replace(/\b[a-z][a-z0-9+.-]*:\/\/\S+/gi, '<endereço>')
    console.error(`[tracking] início do tracking falhou; o site segue sem ele: ${msg.split(/\r?\n/)[0]!.slice(0, 300)}`)
  }
}
