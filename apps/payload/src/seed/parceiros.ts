// Conteúdo de /bu1lder/parceiros (global "parceiros"), transcrito sem mudanças
// de apps/bu1lder/src/routes/bu1lders.index.tsx e de components/bu1lders
// (BuildersHeader, FlowSteps, FaqAccordion, LeadForm). A grade de segmentos e o
// seletor do formulário vêm das páginas de nicho (ver seed/cartoes-hub.ts).
// Usado pelo seed (src/seed.ts). Depois do seed, a fonte é o admin do Payload.
import type { DataFromGlobalSlug } from 'payload'

const formularioHub = (origem: string, formId: string) => ({
  origem,
  formId,
  rotuloSegmento: 'Segmento de interesse',
  opcaoSemSegmento: 'Mais de um / ainda não sei',
})

export const parceirosSeed: Omit<DataFromGlobalSlug<'parceiros'>, 'id'> = {
  _status: 'published',
  cabecalho: { textoBotao: 'Quero ser um Bu1lder', textoBotaoCurto: 'Cadastrar', urlBotao: '#cadastro' },
  layout: [
    {
      blockType: 'heroCadastro',
      etiqueta: 'Programa Bu1lders · Cadastro aberto',
      titulo: 'Vire um Bu1lder e ganhe *renda recorrente* com IA.',
      texto:
        'Você descobre a dor, a MIIND constrói a tecnologia, e você fica com sua parte da recorrência — todo mês, sem precisar programar.',
      bullets: [
        { icone: 'Wallet', texto: 'Renda recorrente todo mês, enquanto o cliente estiver ativo.' },
        { icone: 'Layers', texto: 'Plataforma com IA, WhatsApp e integrações prontas — sem código.' },
        { icone: 'Zap', texto: 'Implementação típica de 3 a 7 dias úteis.' },
        { icone: 'ShieldCheck', texto: 'Soluções para 10 segmentos de mercado.' },
      ],
      selos: ['Sem programar', 'Setup incluso', 'Sem mensalidade', 'Suporte completo'],
      cartao: {
        etiqueta: 'Comece em 1 minuto',
        titulo: 'Cadastre-se agora',
        texto: 'Nossa equipe entra em contato em até 1 dia útil. Sem custo de adesão.',
      },
      formulario: formularioHub('hub-hero', 'cadastro'),
    },
    {
      blockType: 'faixaEstatisticas',
      itens: [
        { valor: '10', rotulo: 'segmentos prontos' },
        { valor: 'R$ 1,2k+', rotulo: 'ticket médio / cliente' },
        { valor: '70%', rotulo: 'da recorrência fica com você' },
      ],
    },
    {
      blockType: 'passosHub',
      cabecalho: { etiqueta: 'Como funciona', titulo: 'Três passos para sua primeira recorrência' },
      rotuloPasso: 'Passo',
      passos: [
        {
          icone: 'Search',
          titulo: 'Você descobre a dor',
          texto:
            'Use sua rede e sua escuta. A pessoa do mercado é você — chega no dono, ouve o problema, propõe a solução.',
        },
        {
          icone: 'Cog',
          titulo: 'A Bu1lder constrói a tecnologia',
          texto:
            'IA, WhatsApp, integrações, infraestrutura. Você liga os módulos no no-code; a plataforma opera tudo nos bastidores.',
        },
        {
          icone: 'Wallet',
          titulo: 'Você recebe a recorrência',
          texto:
            'O cliente paga R$ 2.000 a R$ 5.000/mês. Você recebe sua fatia todo mês — e pode cobrar acima do piso, ficando com 100% do excedente.',
        },
      ],
    },
    {
      blockType: 'cartoesLink',
      cabecalho: {
        etiqueta: 'Para quem já atende empresas',
        titulo: 'Sua carteira pode ser o ponto de partida',
        subtitulo: 'Conheça a abordagem do programa para o seu perfil de negócio.',
      },
      cartoes: [
        {
          etiqueta: 'Programa de parceiros',
          titulo: 'Escritórios de contabilidade',
          texto: 'Comece pelas rotinas do escritório e identifique oportunidades na sua carteira.',
          url: '/bu1lder/contabilidade',
          textoLink: 'Conhecer a proposta',
        },
        {
          etiqueta: 'Programa de parceiros',
          titulo: 'Agências de marketing',
          texto:
            'Conecte a captação ao atendimento e ofereça soluções de IA aos negócios que você já atende.',
          url: '/bu1lder/agencia-marketing',
          textoLink: 'Conhecer a proposta',
        },
      ],
    },
    {
      blockType: 'gradeNichos',
      ancora: 'segmentos',
      cabecalho: {
        etiqueta: 'Escolha seu segmento',
        titulo: 'Em qual mercado você já tem trânsito?',
        subtitulo: 'Cada segmento tem sua própria página de cadastro, já com o foco certo.',
      },
      textoLink: 'Ver soluções',
      textoLinkCurto: 'Ver',
    },
    {
      blockType: 'faqSecao',
      variante: 'programa',
      etiqueta: 'Perguntas frequentes',
      titulo: 'Antes de cadastrar',
      incluirPerguntasPlataforma: false,
      itens: [
        {
          pergunta: 'Preciso saber programar?',
          resposta:
            'Não. A plataforma é 100% no-code: você liga módulos prontos como um construtor de soluções, sem escrever uma linha de código.',
        },
        {
          pergunta: 'Quanto custa para começar?',
          resposta:
            'O cadastro no programa é gratuito. Após aprovação, você passa por um onboarding rápido e já pode oferecer soluções aos seus clientes.',
        },
        {
          pergunta: 'Como eu recebo?',
          resposta:
            'Você tem a relação comercial direta com seu cliente. A Bu1lder cobra de você a parte da plataforma por produto ativo — o restante é seu, todo mês.',
        },
        {
          pergunta: 'Em quanto tempo entrego a primeira solução?',
          resposta:
            'Em poucos dias. A plataforma já vem com os módulos prontos para cada segmento; o trabalho de implementação leva de 3 a 7 dias úteis.',
        },
        {
          pergunta: 'Posso atender mais de um segmento?',
          resposta:
            'Sim. Você pode montar uma carteira misturando nichos — clínicas, oficinas, salões, lojas — todos rodando na mesma plataforma.',
        },
      ],
    },
    {
      blockType: 'chamadaFinalCadastro',
      etiqueta: 'Pronto para começar?',
      titulo: 'Cadastre-se e monte sua carteira de clientes',
      texto:
        'Preencha o formulário e nossa equipe te chama em até 1 dia útil. Sem compromisso, sem custo de adesão.',
      vantagens: ['Cadastro gratuito', 'Sem mensalidade', 'Suporte completo'],
      linkCelular: { texto: 'Ir para o cadastro', url: '#cadastro' },
      formulario: formularioHub('hub-bottom', 'cadastro-final'),
    },
  ],
  rodape: {
    texto: 'MIIND · Programa Bu1lder',
    textoLink: '← Voltar ao site institucional',
    urlLink: '/bu1lder/',
  },
  seo: {
    title: 'Seja um Bu1lder — cadastre-se e construa IA com renda recorrente | MIIND',
    description:
      'Cadastre-se no programa Bu1lder by MIIND e comece a montar sua carteira de pequenas e médias empresas com soluções de IA no WhatsApp. Sem programar.',
    ogTitle: 'Seja um Bu1lder — cadastro aberto | MIIND',
    ogDescription:
      'Preencha o cadastro e nossa equipe entra em contato em até 1 dia útil. Renda recorrente com IA, sem programar.',
  },
}
