// Subject novo selado como o browser-token faz (cookie pt_subject), com o
// keyring HMAC do ambiente. Só para os testes: usa a função interna do módulo.
export async function novoSubjectSelado(): Promise<{ subjectId: string; cookie: string }> {
  const { sealSubject } = await import('../../node_modules/@hiperbold/payload-tracking/dist/consent/subjectCookie.js')
  const { loadKeyringFromEnv } = await import('../../node_modules/@hiperbold/payload-tracking/dist/vault/repository.js')
  const hmac = loadKeyringFromEnv({
    activeKeyIdEnv: 'PAYLOAD_TRACKING_BROWSER_TOKEN_ACTIVE_KEY_ID',
    keyringEnv: 'PAYLOAD_TRACKING_BROWSER_TOKEN_KEYS',
  })
  const B58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
  const subjectId = `sub_${Array.from({ length: 22 }, () => B58[Math.floor(Math.random() * B58.length)]).join('')}`
  return { subjectId, cookie: `pt_subject=${sealSubject(subjectId, hmac)}` }
}
