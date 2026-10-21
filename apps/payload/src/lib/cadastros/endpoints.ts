import { after } from 'next/server'
import type { Endpoint } from 'payload'

import { enviarEAtualizar, receberCadastro } from './processar'

// Roda depois da resposta (o navegador não espera o n8n). Fora de uma
// requisição do Next, roda na hora.
function depoisDaResposta(tarefa: () => Promise<unknown>) {
  try {
    after(tarefa)
  } catch {
    return tarefa()
  }
}

// POST /api/cadastros/enviar (o navegador usa /bu1lder/api/cadastros/enviar).
// Público: é o envio dos formulários do site. Não devolve dados de cadastros.
export const endpointEnviar: Endpoint = {
  path: '/enviar',
  method: 'post',
  handler: async (req) => {
    const textoCorpo = req.text ? await req.text() : ''
    const r = await receberCadastro({
      payload: req.payload,
      headers: req.headers,
      textoCorpo,
      webhookUrl: process.env.N8N_WEBHOOK_URL,
      agendar: depoisDaResposta,
    })
    return Response.json(r.corpo, { status: r.status, headers: { 'cache-control': 'no-store' } })
  },
}

// POST /api/cadastros/:id/reenviar (logado): envia de novo ao webhook e devolve a situação.
export const endpointReenviar: Endpoint = {
  path: '/:id/reenviar',
  method: 'post',
  handler: async (req) => {
    if (!req.user) return Response.json({ ok: false, erro: 'Não autorizado.' }, { status: 401 })
    const id = Number(req.routeParams?.id)
    if (!Number.isInteger(id) || id <= 0) return Response.json({ ok: false, erro: 'Cadastro inválido.' }, { status: 400 })
    const cadastro = await req.payload
      .findByID({ collection: 'cadastros', id, depth: 0, overrideAccess: false, user: req.user, disableErrors: true })
      .catch(() => null)
    if (!cadastro) return Response.json({ ok: false, erro: 'Cadastro não encontrado.' }, { status: 404 })
    const r = await enviarEAtualizar(req.payload, cadastro, process.env.N8N_WEBHOOK_URL)
    return Response.json({ ok: r.ok, status: r.status }, { status: 200, headers: { 'cache-control': 'no-store' } })
  },
}
