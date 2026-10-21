// Cabeçalho das seções do programa de parceiros (SectionHeader de bu1lders.index.tsx).
export function CabecalhoHub({
  cabecalho,
}: {
  cabecalho: { etiqueta?: string | null; titulo?: string | null; subtitulo?: string | null } | null | undefined
}) {
  if (!cabecalho || (!cabecalho.etiqueta && !cabecalho.titulo && !cabecalho.subtitulo)) return null
  return (
    <div className="max-w-2xl">
      {cabecalho.etiqueta && <p className="eyebrow text-brand-violet">{cabecalho.etiqueta}</p>}
      {cabecalho.titulo && (
        <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.03em] leading-[1.1] text-foreground">
          {cabecalho.titulo}
        </h2>
      )}
      {cabecalho.subtitulo && <p className="mt-4 lead">{cabecalho.subtitulo}</p>}
    </div>
  )
}
