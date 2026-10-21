'use client'

import { Button, useDocumentInfo } from '@payloadcms/ui'
import { useState } from 'react'

// Botão na aba "Envio ao n8n" do cadastro: chama POST /api/cadastros/:id/reenviar
// (logado) e recarrega a página para mostrar a nova situação.
export function BotaoReenviar() {
  const { id } = useDocumentInfo()
  const [enviando, setEnviando] = useState(false)
  const [mensagem, setMensagem] = useState<string | null>(null)

  if (!id) return null

  async function reenviar() {
    setEnviando(true)
    setMensagem(null)
    try {
      const res = await fetch(`/api/cadastros/${id}/reenviar`, { method: 'POST', credentials: 'include' })
      const json = (await res.json().catch(() => null)) as { ok?: boolean; status?: string; erro?: string } | null
      if (!res.ok) {
        setMensagem(json?.erro || `Falha (HTTP ${res.status}).`)
        return
      }
      // recarrega para o formulário mostrar a situação gravada
      window.location.reload()
    } catch {
      setMensagem('Não foi possível falar com o servidor.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <Button buttonStyle="secondary" disabled={enviando} onClick={reenviar} size="medium">
        {enviando ? 'Reenviando...' : 'Reenviar ao n8n'}
      </Button>
      {mensagem && (
        <p role="status" style={{ marginTop: 8 }}>
          {mensagem}
        </p>
      )}
    </div>
  )
}
