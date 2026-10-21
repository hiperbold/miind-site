import type { Metadata } from 'next'

import type { BlocoPlataforma } from '@/blocks/RenderPlataforma'
import { RenderPlataforma } from '@/blocks/RenderPlataforma'
import { perguntasDoBloco } from '@/blocks/FaqSecao/Component'
import { CabecalhoPlataforma } from '@/components/bu1lder/plataforma/CabecalhoPlataforma'
import { PaginaHomepage } from '@/components/bu1lder/plataforma/Paginas'
import { RodapePlataforma } from '@/components/bu1lder/plataforma/RodapePlataforma'
import { metadadosPlataforma } from '@/lib/metadados-plataforma'
import { buscarGlobais, buscarHomepage, lerOuAdiarNoBuild } from '@/lib/paginas'
import type { FaqPlataforma } from '@/payload-types'

export async function generateMetadata(): Promise<Metadata> {
  const home = await lerOuAdiarNoBuild(buscarHomepage)
  return metadadosPlataforma(home.seo, '/bu1lder/')
}

// JSON-LD gerado do conteúdo: o aplicativo (aba SEO) e as perguntas das seções
// de FAQ da página (inclui as do global "FAQ da plataforma" quando a seção pede).
function dadosEstruturados(
  home: Awaited<ReturnType<typeof buscarHomepage>>,
  faqPlataforma: FaqPlataforma,
): object[] {
  const saida: object[] = []
  const app = home.seo?.dadosEstruturados
  if (app?.nome) {
    saida.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: app.nome,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      ...(app.descricao ? { description: app.descricao } : {}),
      ...(app.organizacao
        ? { publisher: { '@type': 'Organization', name: app.organizacao, ...(app.slogan ? { slogan: app.slogan } : {}) } }
        : {}),
    })
  }
  const perguntas = (home.layout ?? [])
    .filter((b): b is Extract<BlocoPlataforma, { blockType: 'faqSecao' }> => b.blockType === 'faqSecao')
    .flatMap((b) => perguntasDoBloco(b, { faqPlataforma }))
  if (perguntas.length > 0) {
    saida.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: perguntas.map((p) => ({
        '@type': 'Question',
        name: p.pergunta,
        acceptedAnswer: { '@type': 'Answer', text: p.resposta },
      })),
    })
  }
  return saida
}

// JSON dentro de <script>: "<" escapado para não fechar a tag.
const jsonSeguro = (dado: object) => JSON.stringify(dado).replace(/</g, '\\u003c')

export default async function HomepageBu1lder() {
  const [home, globais] = await lerOuAdiarNoBuild(() => Promise.all([buscarHomepage(), buscarGlobais()]))
  const cab = home.cabecalho
  return (
    <PaginaHomepage>
      {dadosEstruturados(home, globais.faqPlataforma).map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonSeguro(d) }} />
      ))}
      <CabecalhoPlataforma
        itens={(cab?.links ?? []).map((l) => ({ rotulo: l.rotulo, url: l.url }))}
        textoBotao={cab?.textoBotao}
        textoBotaoCelular={cab?.textoBotaoCelular}
        urlBotao={cab?.urlBotao}
      />
      <main id="conteudo">
        <RenderPlataforma
          blocos={home.layout}
          contexto={{
            pagina: 'homepage',
            faqPlataforma: globais.faqPlataforma,
            formulario: globais.formulario,
            nichos: [],
            segmentos: [],
          }}
        />
        <RodapePlataforma rodape={home.rodape} />
      </main>
    </PaginaHomepage>
  )
}
