// Ao subir o servidor (só no runtime Node): banco e migração do c15t e o
// worker de entregas do tracking. O import dinâmico fica DENTRO do if para o
// código do worker não entrar no bundle do runtime edge.
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { iniciarTracking } = await import('./instrumentation-node')
    await iniciarTracking()
  }
}
