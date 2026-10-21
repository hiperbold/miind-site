// Conteúdo de /bu1lder/agencia-marketing com a copy aprovada na revisão de copy
// (documento "revisao-copy-paginas-bu1lder.md", Página 2, seções 2.0 a 2.9).
// [TEXTO] aplicado; [MIIND] com o texto provisório proposto; [ESTRUTURA]
// montado com os blocos. O que a revisão manteve vem de
// apps/bu1lder/src/routes/bu1lders.agencia-marketing.tsx e de
// apps/bu1lder/src/components/bu1lders/AgencyEarningsSimulator.tsx.
import type { PaginaSeed } from '../tipos'

export const agenciaMarketing: PaginaSeed = {
  titulo: 'Agências de marketing',
  slug: 'agencia-marketing',
  tipo: 'nicho',
  // primeira pílula da navegação de segmentos, como na prévia
  navegacao: { rotulo: 'Agências de marketing', ordem: 0 },
  visual: 'ds',
  temaClaroPadrao: true,
  cabecalho: { mostrarNavegacaoSegmentos: false, mostrarVoltar: false },
  // 2.0
  seo: {
    title: 'Bu1lder para agências de marketing | MIIND',
    description:
      'Sua agência gera o lead. Com o Bu1lder, entrega também a IA que responde, agenda e confirma no WhatsApp do cliente. A MIIND constrói e opera.',
  },
  layout: [
    // 2.1
    {
      blockType: 'heroFluxo',
      etiqueta: 'Bu1lder para agências e gestores de tráfego',
      titulo: 'Você gera o lead.',
      tituloDestaque: 'Agora entregue também o atendimento.',
      texto:
        'Com o Bu1lder, a sua agência leva para o cliente a IA que responde, agenda e confirma no WhatsApp. A MIIND constrói e opera, e você fica com parte da recorrência.',
      textoSecundario:
        'Certificação Bu1lder com a chancela da MIIND. Você continua dono da estratégia e do cliente, sem montar equipe técnica.',
      botaoPrincipal: { texto: 'Quero ser um Bu1lder', url: '#cadastro' },
      botaoSecundario: { texto: 'Entender a parceria', url: '#como-funciona' },
      nota: 'Para agências e gestores que atendem negócios locais todo mês.',
      fluxo: {
        etiqueta: 'Do clique à conversão',
        etapas: [
          { icone: 'Megaphone', titulo: 'Captação', texto: 'Sua agência gera o lead.' },
          {
            icone: 'MessageCircle',
            titulo: 'Resposta e qualificação',
            texto: 'A IA responde em minutos, a qualquer hora, e faz as primeiras perguntas.',
          },
          {
            icone: 'CalendarCheck',
            titulo: 'Agenda e confirmação',
            texto: 'A IA marca, confirma e lembra. O comercial do cliente recebe o contato pronto.',
          },
        ],
      },
    },
    // 2.2
    {
      blockType: 'cartoes',
      etiqueta: 'Uma oportunidade na sua carteira',
      titulo: 'O anúncio funciona.\nO problema começa no WhatsApp do cliente.',
      texto:
        'Quando o lead fica sem resposta à noite, não chega ao vendedor ou some depois do orçamento, quem leva a culpa é a campanha. E o cliente cancela a agência.',
      colunas: '2',
      cartoes: [
        {
          icone: 'MessageCircle',
          titulo: 'O lead chegou às 21h. E agora?',
          texto: 'A IA responde em minutos, a qualquer hora, com as perguntas que o seu cliente faria.',
        },
        {
          icone: 'CalendarCheck',
          titulo: 'Da conversa à agenda',
          texto: 'Marca o horário, confirma na véspera e remarca quem desmarca.',
        },
        {
          icone: 'Workflow',
          titulo: 'Follow-up que ninguém esquece',
          texto: 'Chama de volta quem pediu orçamento e não respondeu, com o histórico da conversa.',
        },
        {
          icone: 'BarChart3',
          titulo: 'Resultado além do clique',
          texto: 'Do anúncio ao agendamento, você mostra ao cliente o que a campanha gerou além de lead.',
        },
      ],
      destaque: true,
    },
    // 2.3
    {
      blockType: 'cartoes',
      etiqueta: 'Como funciona a parceria',
      titulo: 'Você conhece o cliente.\nA MIIND entra com a tecnologia.',
      colunas: '3',
      cartoes: [
        {
          numero: '01',
          titulo: 'Escolha o cliente',
          texto: 'Comece por um cliente que recebe muitos contatos no WhatsApp e perde parte deles.',
        },
        {
          numero: '02',
          titulo: 'Monte a solução com a MIIND',
          texto: 'Você leva o contexto e escolhe os módulos. A MIIND define o escopo e o prazo com você.',
        },
        {
          numero: '03',
          titulo: 'A MIIND constrói e opera',
          texto:
            'WhatsApp oficial, infraestrutura e suporte técnico ficam com a MIIND. Você acompanha o resultado com o cliente.',
        },
      ],
      ancora: 'como-funciona',
      destaque: false,
    },
    // 2.4: mesmos cartões da seção 1.5 da contabilidade
    {
      blockType: 'cartoesSegmento',
      etiqueta: 'A sua carteira já precisa disso',
      titulo: 'Uma solução pronta para cada tipo de cliente',
      subtitulo: 'Você escolhe os módulos com o cliente. A MIIND constrói e opera.',
      cartoes: [
        {
          icone: 'Scissors',
          titulo: 'Salões, barbearias e estética',
          texto: 'confirma e remarca horários e traz de volta quem sumiu',
        },
        {
          icone: 'Stethoscope',
          titulo: 'Clínicas e consultórios',
          texto: 'confirma consultas e qualifica quem chega pelo anúncio',
        },
        { icone: 'Smile', titulo: 'Odontologia', texto: 'reduz faltas e chama o paciente para o retorno' },
        { icone: 'Wrench', titulo: 'Oficinas', texto: 'lembra a revisão e envia o orçamento para aprovar no celular' },
        { icone: 'PawPrint', titulo: 'Pet shops', texto: 'agenda banho e tosa e lembra vacina e recompra de ração' },
        { icone: 'UtensilsCrossed', titulo: 'Restaurantes', texto: 'reservas e pedidos direto, sem comissão de aplicativo' },
        { icone: 'Building2', titulo: 'Imobiliárias', texto: 'responde o interessado na hora e faz o acompanhamento' },
        { icone: 'Dumbbell', titulo: 'Academias', texto: 'agenda aula experimental e age antes do cancelamento' },
        {
          icone: 'Store',
          titulo: 'Varejo local',
          texto: 'mostra o catálogo e retoma quem pediu preço e não comprou',
        },
      ],      destaque: true,
    },
    // 2.5
    {
      blockType: 'simulador',
      etiqueta: 'Como a agência ganha',
      titulo: 'Você fica com parte da mensalidade de cada cliente, enquanto ele estiver ativo.',
      subtitulo: 'Escolha um plano de referência e a quantidade de clientes para ver um exemplo.',
      plano: 'Performance',
      permitirEscolherPlano: true,
      cabecalhoCartao: 'Exemplo · Plano {plano}',
      linhaSetup: null,
      linhaOperacao: 'A MIIND constrói e opera',
      rotuloValor: 'Sua parte por mês (exemplo)',
      minClientes: 1,
      maxClientes: 20,
      clientesInicial: 3,
      mostrarAnual: false,
      mostrarPortfolio: false,
      aviso:
        // mesmo aviso da contabilidade (seção 1.7 diz "igual ao da página de agência");
        // o aviso antigo citava o total anual, que saiu do simulador
        'Exemplo com os valores de referência do programa, antes de impostos e despesas. O resultado depende das vendas de cada Bu1lder.',
      botao: { texto: 'Quero ser um Bu1lder', url: '#cadastro' },
      ancora: 'quanto-voce-ganha',
      destaque: true,
    },
    // 2.6
    {
      blockType: 'destaque',
      etiqueta: 'Para quem já sabe fazer automação',
      titulo: 'Pare de ser o suporte técnico do cliente.',
      texto:
        'Você continua dono da estratégia. WhatsApp oficial, infraestrutura, manutenção e suporte ficam com a MIIND, e a sua agência cresce sem contratar desenvolvedor.',
      itens: [
        {
          icone: 'Layers',
          titulo: 'Software sob medida com IA',
          texto: 'Desenhado a partir do problema do cliente, não de um modelo genérico.',
        },
        {
          icone: 'ShieldCheck',
          titulo: 'Infraestrutura e suporte',
          texto: 'A MIIND opera e mantém, com responsabilidades definidas em contrato.',
        },
        {
          icone: 'MessageCircle',
          titulo: 'WhatsApp oficial e integrações',
          texto: 'API oficial do WhatsApp e conexão com os sistemas que o cliente já usa.',
        },
      ],
    },
    // 2.7
    {
      blockType: 'checklist',
      etiqueta: 'Seu ponto de partida',
      titulo: 'Quem já confia na sua agência?',
      texto:
        'Comece com um cliente que tenha volume de contatos, um processo manual relevante e um dono ou gestor que participa das decisões.',
      cartao: {
        icone: 'Users',
        titulo: 'Reconheça o perfil na sua carteira',
        itens: [
          { texto: 'O cliente recebe contatos pelo WhatsApp todos os dias.' },
          { texto: 'A equipe repete tarefas ou perde informações entre ferramentas.' },
          { texto: 'O dono ou gestor participa das decisões.' },
          { texto: 'Existe uma melhoria concreta para medir depois da entrega.' },
        ],
      },
    },
    // 2.8: só as perguntas da página
    {
      blockType: 'faq',
      etiqueta: 'FAQ',
      titulo: 'Perguntas frequentes',
      incluirPerguntasPlataforma: false,
      itens: [
        {
          pergunta: 'Já faço automações. Onde o Bu1lder entra?',
          resposta:
            'Quando o cliente precisa de algo que não pode parar: WhatsApp oficial, integrações, manutenção e suporte. Você desenha a solução com o cliente; a MIIND constrói, opera e mantém.',
        },
        {
          pergunta: 'Preciso contratar desenvolvedores?',
          resposta:
            'Não. A construção e a operação técnica são da MIIND. A agência entra com o diagnóstico, o contexto do negócio e o relacionamento com o cliente.',
        },
        {
          pergunta: 'O programa inclui certificação?',
          resposta:
            'Sim. O Bu1lder é uma certificação para consultores em soluções de software personalizado com IA, com a chancela da MIIND. Na conversa inicial, a equipe explica a formação e os critérios.',
        },
        {
          pergunta: 'Posso oferecer com a marca da minha agência?',
          resposta:
            'A forma de apresentar a solução ao cliente, inclusive com a marca da agência, é combinada com a MIIND na conversa inicial.',
        },
        {
          pergunta: 'Como a agência ganha?',
          resposta:
            'Você fica com parte da mensalidade de cada cliente ativo. A tabela de cada solução é apresentada na conversa inicial.',
        },
        {
          pergunta: 'Serve para qualquer segmento?',
          resposta:
            'Há soluções prontas para salões, clínicas, odontologia, oficinas, pet shops, restaurantes, imobiliárias, academias e varejo. Outros casos são avaliados com a MIIND.',
        },
      ],
      destaque: true,
    },
    // 2.9: sem o botão "Agendar uma conversa"
    {
      blockType: 'chamadaCadastro',
      etiqueta: 'Faça parte do programa',
      titulo: 'Vamos entender o que sua agência pode construir.',
      texto:
        'Conheça a certificação Bu1lder e converse com a MIIND sobre as oportunidades que já existem na sua carteira.',
      formulario: {
        perfis: ['Dono de agência de marketing', 'Gestor de tráfego', 'Profissional de marketing autônomo', 'Outro'],
        perguntasExtras: [
          {
            rotulo: 'Quantos clientes ativos você atende?',
            nome: 'clientes_atendidos',
            tipo: 'unica',
            opcoes: ['1 a 5', '6 a 15', '16 a 40', 'Mais de 40'],
            obrigatoria: true,
          },
          {
            rotulo: 'Em quais segmentos?',
            nome: 'segmentos',
            tipo: 'multipla',
            opcoes: [
              'Salões e estética',
              'Clínicas e consultórios',
              'Odontologia',
              'Restaurantes',
              'Imobiliárias',
              'Academias',
              'Varejo',
              'Outros',
            ],
            obrigatoria: false,
          },
        ],
        textoConsentimento: 'Autorizo a MIIND a falar comigo por WhatsApp e e-mail sobre o programa Bu1lder.',
        formId: 'cadastro-agencia-marketing',
      },
    },
  ],
}
