import { ArrowRight } from 'lucide-react'

import { Secao } from '@/components/bu1lder/Secao'
import { SectionHeader } from '@/components/bu1lder/SectionHeader'
import { SimuladorPlanos } from '@/components/bu1lder/SimuladorPlanos'
import type { BlocoSimulador } from '@/payload-types'

import type { ContextoBloco } from '../contexto'

export function SimuladorBloco({ bloco, contexto }: { bloco: BlocoSimulador; contexto: ContextoBloco }) {
  const mostrarPlataforma = Boolean(contexto.planos.mostrarParcelaPlataforma)
  const planos = (contexto.planos.planos ?? []).map((p) => ({
    key: p.chave,
    price: p.preco,
    builderEarns: p.parteBu1lder,
    // a parcela da plataforma só vai ao navegador quando o global manda mostrar
    ...(mostrarPlataforma ? { platform: p.plataforma } : {}),
  }))
  const inicial = planos.find((p) => p.key === bloco.plano)
  if (!inicial) return null
  const permitir = Boolean(bloco.permitirEscolherPlano)

  return (
    <Secao ancora={bloco.ancora} destaque={bloco.destaque}>
      <SectionHeader eyebrow={bloco.etiqueta} title={bloco.titulo} subtitle={bloco.subtitulo} />
      <div className={permitir ? 'mt-8' : 'mt-10'}>
        <SimuladorPlanos
          plans={permitir ? planos : [inicial]}
          initialKey={inicial.key}
          allowChoice={permitir}
          selectId={`${bloco.id ?? 'simulador'}-plano`}
          headerTemplate={bloco.cabecalhoCartao ?? 'Quanto você ganha · Plano {plano}'}
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
      {bloco.botao?.texto && (
        <a
          href={bloco.botao.url || '#cadastro'}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-background font-semibold px-5 sm:px-6 h-12 w-full sm:w-auto shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-shadow"
        >
          {bloco.botao.texto} <ArrowRight className="size-4" />
        </a>
      )}
    </Secao>
  )
}
