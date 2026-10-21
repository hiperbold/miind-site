// Conteúdo de /bu1lder/contabilidade com a copy aprovada na revisão de copy
// (documento "revisao-copy-paginas-bu1lder.md", Página 1, seções 1.0 a 1.12).
// [TEXTO] aplicado; [MIIND] com o texto provisório proposto; [ESTRUTURA]
// montado com os blocos. Seções retiradas pela revisão ficam fora do layout:
// notas de facilidade (1.8) e citação "Argumento de venda" (1.10).
// O que a revisão manteve (celular de exemplo, módulos e benefícios) vem de
// apps/bu1lder/src/routes/bu1lders.contabilidade.tsx.
import type { PaginaSeed } from '../tipos'

export const contabilidade: PaginaSeed = {
  titulo: 'Escritórios de Contabilidade',
  slug: 'contabilidade',
  tipo: 'nicho',
  navegacao: { rotulo: 'Escritórios de Contabilidade', ordem: 9 },
  visual: 'ds',
  temaClaroPadrao: true,
  cabecalho: { mostrarNavegacaoSegmentos: false, mostrarVoltar: false },
  // 1.0
  seo: {
    title: 'Bu1lder para contadores: IA no seu escritório e na sua carteira | MIIND',
    description:
      'Use IA no WhatsApp do escritório para cobrar documentos e honorários. Depois, leve as mesmas soluções para as empresas que você atende, sem programar.',
  },
  layout: [
    // 1.1
    {
      blockType: 'heroCelular',
      icone: 'Calculator',
      etiqueta: 'Programa Bu1lder para contadores',
      titulo: 'Use IA no seu escritório. Depois, leve para os seus clientes.',
      texto:
        'Comece com a IA cobrando documentos e honorários no WhatsApp do escritório. Depois, ofereça as mesmas soluções para as empresas que já confiam em você. A MIIND constrói e opera, e você fica com parte da recorrência.',
      linhaDecisor: 'Para donos e sócios de escritório contábil. Sem programar e com cadastro gratuito.',
      botaoPrincipal: { texto: 'Quero ser um Bu1lder', url: '#cadastro' },
      botaoSecundario: { texto: 'Ver as soluções', url: '#solucoes' },
      celular: {
        titulo: 'Contábil Vértice',
        subtitulo: 'online · IA Bu1lder',
        mensagens: [
          {
            de: 'negocio',
            texto: 'Oi! Faltam só as notas de saída de novembro 📄 Pode mandar até sexta?',
            hora: '08:32',
          },
          { de: 'cliente', texto: 'Verdade, esqueci. Mando hoje à tarde', hora: '08:40' },
          {
            de: 'negocio',
            texto: 'Combinado ✅ Aproveito e te lembro: DAS vence dia 20, R$ 412,30.',
            hora: '08:40',
          },
        ],
      },
    },
    // 1.2
    {
      blockType: 'faixaNumeros',
      itens: [
        { icone: 'Wallet', valor: 'R$ 0', rotulo: 'para se cadastrar', tom: 'cyan' },
        { icone: 'Code', valor: '0 linha de código', rotulo: 'a MIIND constrói e opera', tom: 'violet' },
        { icone: 'Clock', valor: '1 dia útil', rotulo: 'para a MIIND chamar você', tom: 'mint' },
      ],
    },
    // 1.3 (rótulos "Etapa", aprovados pelo Estrategista)
    {
      blockType: 'linhaDoTempo',
      etiqueta: 'Como funciona',
      titulo: 'Em até 7 dias úteis o seu escritório começa a usar IA',
      subtitulo: 'Você não programa nada. A MIIND monta e opera a IA enquanto você cuida dos seus clientes.',
      passos: [
        {
          dia: 'Etapa 1',
          titulo: 'Conversa com a MIIND',
          descricao: 'Carteira, regimes e calendário de obrigações do seu escritório.',
        },
        {
          dia: 'Etapa 2',
          titulo: 'WhatsApp oficial e base de clientes',
          descricao: 'Número oficial do escritório e lista de documentos por cliente.',
        },
        {
          dia: 'Etapa 3',
          titulo: 'IA configurada',
          descricao: 'Aprende os prazos, os regimes e as regras de cobrança do escritório.',
        },
        {
          dia: 'Etapa 4',
          titulo: 'Teste com a equipe',
          descricao: 'A equipe valida as mensagens antes de ir para os clientes.',
        },
        {
          dia: 'Etapa 5',
          titulo: 'No ar',
          descricao: 'O escritório passa a cobrar documentos sem ninguém precisar lembrar.',
        },
      ],
      destaque: true,
    },
    // 1.4
    {
      blockType: 'modulos',
      etiqueta: 'Comece pelo seu escritório',
      titulo: '5 soluções prontas para a rotina que mais toma o tempo da equipe',
      subtitulo:
        'A MIIND liga cada módulo no WhatsApp oficial do escritório. A IA, a infraestrutura e o suporte ficam com a MIIND.',
      itens: [
        {
          icone: 'FileText',
          nome: 'Coletor de Documentos IA',
          beneficio: 'cobra notas todo mês automaticamente',
          exemplo: 'Oi! Faltam só as notas de saída de novembro 📄 Pode mandar por aqui até sexta?',
        },
        {
          icone: 'CalendarClock',
          nome: 'Lembrete de Obrigações',
          beneficio: 'avisa DAS, guias e vencimentos',
          exemplo: 'DAS de outubro vence amanhã 📅 Guia: R$ 412,30. Posso te enviar o PDF agora?',
        },
        {
          icone: 'CreditCard',
          nome: 'Cobrança de Honorários',
          beneficio: 'régua automática reduz inadimplência',
          exemplo: 'Honorário de R$ 890 vence amanhã 💼 Pix da Contábil: chave@contabil. Tudo certo?',
        },
        {
          icone: 'ClipboardCheck',
          nome: 'Onboarding de Cliente',
          beneficio: 'coleta documentação inicial sem retrabalho',
          exemplo: 'Pra abrir sua empresa preciso de 4 documentos ✅ Te mando a lista por aqui e você anexa cada um.',
        },
        {
          icone: 'MessageCircle',
          nome: 'Atendimento de Dúvidas',
          beneficio: 'IA responde perguntas repetitivas',
          exemplo: 'A folha deste mês fecha dia 25. Quer que eu te lembre na véspera?',
        },
      ],
      textoEntrega: 'WhatsApp oficial · IA · suporte da MIIND',
      ancora: 'solucoes',
      destaque: false,
    },
    // 1.5
    {
      blockType: 'cartoesSegmento',
      etiqueta: 'Depois, a sua carteira',
      titulo: 'As empresas que você atende têm as mesmas dores no WhatsApp',
      subtitulo:
        'Agenda, cobrança, confirmação e atendimento. Você já conhece cada cliente. No Bu1lder, leva a solução pronta e a MIIND constrói e opera.',
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
      ],
      destaque: true,
    },
    // 1.6 [MIIND]: texto provisório, sem valor
    {
      blockType: 'textoLista',
      titulo: 'Usar no seu escritório',
      texto:
        'Você começa usando o Bu1lder na rotina do seu escritório. As condições para esse uso são apresentadas na conversa com a MIIND.',
      destaque: false,
    },
    // 1.7
    {
      blockType: 'simulador',
      etiqueta: 'Como você ganha',
      titulo: 'Você fica com parte da recorrência de cada cliente',
      subtitulo:
        'Exemplo com o plano Performance: o cliente paga R$ 5.000 por mês e você recebe R$ 2.000 por mês enquanto ele estiver ativo. Valores de referência, confirmados na conversa com a MIIND.',
      plano: 'Performance',
      cabecalhoCartao: 'Exemplo · Plano {plano}',
      linhaSetup: null,
      linhaOperacao: 'A MIIND constrói e opera',
      rotuloValor: 'Sua parte por mês (exemplo)',
      minClientes: 1,
      maxClientes: 10,
      clientesInicial: 3,
      mostrarAnual: false,
      mostrarPortfolio: false,
      aviso:
        'Exemplo com os valores de referência do programa, antes de impostos e despesas. O resultado depende das vendas de cada Bu1lder.',
      destaque: true,
    },
    // 1.8 (notas de facilidade) e 1.10 (citação) saem da página.
    // 1.9
    {
      blockType: 'antesDepois',
      etiqueta: 'Exemplo de rotina',
      titulo: 'Como fica no dia a dia',
      subtitulo: 'Um escritório que cobra documentos de cada cliente pelo WhatsApp, todo mês.',
      antes: {
        titulo: 'A equipe passa os primeiros dias do mês atrás de nota e documento.',
        itens: [
          { rotulo: 'Cobrança manual, um por um' },
          { rotulo: 'Prazo apertado no fechamento' },
          { rotulo: 'Honorário lembrado só quando atrasa' },
        ],
      },
      depois: {
        titulo: 'A IA cobra cada cliente no dia certo, e a equipe só processa.',
        itens: [
          { rotulo: 'Cobrança automática, cliente por cliente' },
          { rotulo: 'Documento chega antes do fechamento' },
          { rotulo: 'Lembrete de honorário antes do vencimento' },
        ],
      },
      destaque: false,
    },
    // 1.11: só as perguntas da página
    {
      blockType: 'faq',
      etiqueta: 'FAQ',
      titulo: 'Perguntas frequentes',
      incluirPerguntasPlataforma: false,
      itens: [
        {
          pergunta: 'Preciso saber programar?',
          resposta: 'Não. A MIIND constrói, opera e dá suporte. Você e a sua equipe usam e indicam.',
        },
        {
          pergunta: 'O que é a certificação Bu1lder?',
          resposta:
            'É a certificação da MIIND para quem leva soluções de software personalizado com IA aos próprios clientes. Na conversa inicial, a equipe explica a formação e os critérios.',
        },
        {
          pergunta: 'Como ficam os dados dos meus clientes?',
          resposta:
            'A solução usa o WhatsApp oficial e segue a LGPD. Na conversa, a MIIND mostra onde os dados ficam e quem tem acesso.',
        },
        {
          pergunta: 'Vou ter que virar vendedor?',
          resposta:
            'Não. Você indica a solução para clientes que já confiam em você, a partir de um problema que você já conhece. A MIIND apoia a apresentação e a implantação.',
        },
        {
          pergunta: 'E se a equipe não usar?',
          resposta:
            'Você começa por um módulo, na rotina que mais toma tempo, e a MIIND acompanha a implantação até a equipe usar no dia a dia.',
        },
        { pergunta: 'Em quanto tempo fica pronto?', resposta: 'Em até 7 dias úteis depois da conversa inicial.' },
        {
          pergunta: 'Como eu recebo?',
          resposta:
            'Você fica com parte da mensalidade de cada cliente que indicar, enquanto ele estiver ativo. Os valores de cada solução são apresentados na conversa inicial.',
        },
        {
          pergunta: 'Meus clientes são de vários segmentos. Posso oferecer para todos?',
          resposta:
            'Sim. Salões, clínicas, odontologia, oficinas, pet shops, restaurantes, imobiliárias, academias e varejo têm soluções prontas.',
        },
      ],
      destaque: true,
    },
    // 1.12: sem depoimento
    {
      blockType: 'chamadaCadastro',
      etiqueta: 'Vamos começar',
      titulo: 'Comece pelo seu escritório.',
      texto:
        'Cadastro gratuito. A equipe da MIIND chama você no WhatsApp em até 1 dia útil para conhecer o escritório e a sua carteira.',
      bullets: [
        { texto: 'Sem programar: a MIIND constrói e opera' },
        { texto: 'Primeiro no seu escritório, depois na sua carteira' },
        { texto: 'WhatsApp oficial e suporte humano' },
        { texto: 'Cadastro gratuito' },
      ],
      formulario: {
        perfis: [
          'Dono ou sócio de escritório contábil',
          'Contador',
          'Agência ou gestor de tráfego',
          'Consultor de gestão ou do Sebrae',
          'Outro',
        ],
        perguntasExtras: [
          {
            rotulo: 'Quantas empresas o escritório atende?',
            nome: 'empresas_atendidas',
            tipo: 'unica',
            opcoes: ['Até 30', '31 a 100', '101 a 300', 'Mais de 300'],
            obrigatoria: true,
          },
        ],
        textoConsentimento: 'Autorizo a MIIND a falar comigo por WhatsApp e e-mail sobre o programa Bu1lder.',
        formId: 'cadastro-contabilidade',
      },
    },
  ],
}
