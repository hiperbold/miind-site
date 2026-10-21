import { EarningsSimulator } from '@/components/bu1lder/EarningsSimulator'
import { Secao } from '@/components/bu1lder/Secao'
import { SectionHeader } from '@/components/bu1lder/SectionHeader'
import type { BlocoSimulador } from '@/payload-types'

import type { ContextoBloco } from '../contexto'

export function SimuladorBloco({ bloco, contexto }: { bloco: BlocoSimulador; contexto: ContextoBloco }) {
  const plano = (contexto.planos.planos ?? []).find((p) => p.chave === bloco.plano)
  if (!plano) return null
  const mostrarPlataforma = Boolean(contexto.planos.mostrarParcelaPlataforma)
  return (
    <Secao ancora={bloco.ancora} destaque={bloco.destaque}>
      <SectionHeader eyebrow={bloco.etiqueta} title={bloco.titulo} subtitle={bloco.subtitulo} />
      <div className="mt-10">
        <EarningsSimulator
          plan={{
            key: plano.chave,
            price: plano.preco,
            builderEarns: plano.parteBu1lder,
            // a parcela da plataforma só vai ao navegador quando o global manda mostrar
            ...(mostrarPlataforma ? { platform: plano.plataforma } : {}),
          }}
          headerLabel={(bloco.cabecalhoCartao ?? 'Quanto você ganha · Plano {plano}').replaceAll('{plano}', plano.chave)}
          setupNote={bloco.linhaSetup}
          operationNote={bloco.linhaOperacao}
          valueLabel={bloco.rotuloValor || 'Sua renda mensal'}
          minClients={bloco.minClientes ?? 1}
          maxClients={bloco.maxClientes ?? 50}
          initialClients={bloco.clientesInicial ?? 10}
          showYearly={bloco.mostrarAnual ?? true}
          showPortfolio={bloco.mostrarPortfolio ?? true}
          showPlatformShare={mostrarPlataforma}
        />
      </div>
      {bloco.aviso && <p className="mt-4 text-xs text-muted-foreground">{bloco.aviso}</p>}
    </Secao>
  )
}
