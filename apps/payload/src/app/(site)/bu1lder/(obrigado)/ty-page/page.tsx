import { PaginaObrigado } from '@/components/bu1lder/obrigado/PaginaObrigado'
import { buscarGlobais, buscarTyPage } from '@/lib/paginas'

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

const um = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)

// /bu1lder/ty-page?nicho=<slug>&cadastro=<token>. O token só serve para o
// navegador conferir o contexto guardado no sessionStorage; o servidor não
// procura o cadastro e não mostra dado nenhum dele.
export default async function TyPagePagina({ searchParams }: Props) {
  const q = await searchParams
  const nichoBruto = um(q.nicho)
  const tokenBruto = um(q.cadastro)
  const nicho = nichoBruto && /^[a-z0-9-]{1,100}$/.test(nichoBruto) ? nichoBruto : null
  const token = tokenBruto && /^[A-Za-z0-9_-]{16,100}$/.test(tokenBruto) ? tokenBruto : null
  const [ty, globais] = await Promise.all([buscarTyPage(), buscarGlobais()])
  return (
    <PaginaObrigado
      conteudo={ty}
      nicho={nicho}
      token={token}
      rodape={{
        tituloLinks: globais.rodape.tituloLinks,
        links: (globais.rodape.links ?? []).map((l) => ({ label: l.rotulo, url: l.url })),
        textoDireitos: globais.rodape.textoDireitos,
      }}
    />
  )
}
