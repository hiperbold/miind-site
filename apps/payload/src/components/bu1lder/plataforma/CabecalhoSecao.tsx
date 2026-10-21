import { TextoMarcado } from './TextoMarcado'

export type CabecalhoPlataforma = {
  etiqueta?: string | null
  estiloEtiqueta?: 'pilula' | 'tracos' | null
  titulo?: string | null
  subtitulo?: string | null
}

// Porte do SectionHeader de apps/bu1lder/src/components/site/Sections.tsx.
export function CabecalhoSecao({
  cabecalho,
  alinhamento = 'centro',
}: {
  cabecalho: CabecalhoPlataforma | null | undefined
  alinhamento?: 'centro' | 'esquerda'
}) {
  if (!cabecalho || (!cabecalho.etiqueta && !cabecalho.titulo && !cabecalho.subtitulo)) return null
  const centro = alinhamento === 'centro'
  const estilo = cabecalho.estiloEtiqueta ?? 'pilula'
  return (
    <div className={`max-w-3xl mb-14 ${centro ? 'mx-auto text-center' : ''}`}>
      {cabecalho.etiqueta && estilo === 'pilula' && <EtiquetaPilula texto={cabecalho.etiqueta} centro={centro} margem />}
      {cabecalho.etiqueta && estilo === 'tracos' && (
        <div className={`flex items-center gap-3 mb-5 ${centro ? 'justify-center' : ''}`}>
          <span className="brand-divider !w-10" />
          <span className="eyebrow text-brand-cyan/90">{cabecalho.etiqueta}</span>
          <span className="brand-divider !w-10" />
        </div>
      )}
      {cabecalho.titulo && (
        <h2 className="display-l">
          <TextoMarcado texto={cabecalho.titulo} />
        </h2>
      )}
      {cabecalho.subtitulo && <p className="mt-5 lead">{cabecalho.subtitulo}</p>}
    </div>
  )
}

export function EtiquetaPilula({ texto, centro = true, margem = false }: { texto: string; centro?: boolean; margem?: boolean }) {
  return (
    <div className={`flex ${margem ? 'mb-5' : ''} ${centro ? 'justify-center' : ''}`}>
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-medium tracking-wide">
        <span className="size-1.5 rounded-full bg-brand-cyan" />
        {texto}
      </span>
    </div>
  )
}
