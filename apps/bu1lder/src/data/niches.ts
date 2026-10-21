// Modelo de parceria: a Bu1lder fica com 60% da mensalidade; o consultor (Bu1lder) com 40%.
// O consultor pode cobrar acima do piso e ficar com 100% do excedente.

export const SHOW_PLATFORM_SHARE = false; // ligue para exibir a fatia da plataforma nas páginas

export type Plan = {
  key: "Essencial" | "Crescimento" | "Performance";
  price: number;
  builderEarns: number;
  platform: number;
  includes: string;
  best?: boolean;
};

export const plans: Plan[] = [
  { key: "Essencial",   price: 2000, builderEarns: 800,  platform: 1200, includes: "1 módulo-âncora + IA + WhatsApp" },
  { key: "Crescimento", price: 3500, builderEarns: 1400, platform: 2100, includes: "3 módulos integrados", best: true },
  { key: "Performance", price: 5000, builderEarns: 2000, platform: 3000, includes: "5 módulos + painel de gestão" },
];

export const projection = [
  { label: "Conservador", clients: 5,  monthly: 7000,  yearly: 84000  },
  { label: "Moderado",    clients: 20, monthly: 28000, yearly: 336000 },
  { label: "Acelerado",   clients: 50, monthly: 70000, yearly: 840000 },
];

export type Niche = {
  slug: string;
  name: string;
  icon: string;
  marketStat: string;
  marketLabel: string;
  decisor: string;
  argument: string;
  recommendedPlan: "Essencial" | "Crescimento" | "Performance";
  ease: { achar: number; explicar: number; roi: number; fechar: number };
  modules: { name: string; benefit: string }[];
  caseStudy: { situacao: string; solucao: string; resultado: string; roi: string };
};

export const niches: Niche[] = [
  {
    slug: "beleza", name: "Salões de Beleza, Barbearias e Estética", icon: "Scissors",
    marketStat: "≈ 1,25 milhão", marketLabel: "estabelecimentos no Brasil",
    decisor: "Quem decide é o próprio dono — acesso direto e decisão rápida.",
    argument: "Em 5 dias o salão para de perder horário marcado: a IA confirma, lembra e remarca cada cliente no WhatsApp — e ainda traz de volta quem sumiu.",
    recommendedPlan: "Crescimento",
    ease: { achar: 10, explicar: 9, roi: 9, fechar: 8 },
    modules: [
      { name: "Agenda Cheia", benefit: "confirma e remarca cada cliente no WhatsApp" },
      { name: "Resgata Cliente", benefit: "traz de volta quem não volta há 60 dias" },
      { name: "Recepcionista IA 24h", benefit: "responde preços, horários e serviços" },
      { name: "Aniversário & Fidelidade", benefit: "ofertas automáticas e pós-atendimento" },
      { name: "Painel do Dono", benefit: "faturamento, serviços e taxa de retorno" },
    ],
    caseStudy: { situacao: "Salão de 6 cadeiras perdia ~20% das marcações por esquecimento.", solucao: "Agenda Cheia com confirmação e remarcação automática.", resultado: "No-show caiu para ~6%, recuperando ~25 atendimentos/mês.", roi: "ROI acima de 5x no primeiro mês." },
  },
  {
    slug: "odontologia", name: "Clínicas Odontológicas", icon: "Smile",
    marketStat: "44.553", marketLabel: "clínicas + 450 mil dentistas",
    decisor: "Dentista-proprietário ou gerente. Sensível a LGPD — destaque privacidade.",
    argument: "Em 7 dias a clínica passa a confirmar e remarcar cada paciente sozinha no WhatsApp, reduzindo faltas e enchendo a cadeira.",
    recommendedPlan: "Performance",
    ease: { achar: 8, explicar: 9, roi: 10, fechar: 8 },
    modules: [
      { name: "Zero Faltas", benefit: "confirma e remarca pacientes sozinho" },
      { name: "Recall de Retorno", benefit: "reconvoca manutenção/limpeza semestral" },
      { name: "Triagem e Orçamento IA", benefit: "qualifica o lead e agenda avaliação" },
      { name: "Pós-tratamento + Cobrança", benefit: "acompanha e lembra parcelas em aberto" },
      { name: "Painel da Clínica", benefit: "ocupação de cadeira, faltas e origem" },
    ],
    caseStudy: { situacao: "Clínica com 3 dentistas tinha 18% de faltas.", solucao: "Zero Faltas com confirmação e remarcação inteligente.", resultado: "Faltas caíram para ~7%; ~30 horários recuperados/mês.", roi: "ROI estimado de 6 a 8x." },
  },
  {
    slug: "saude", name: "Clínicas Médicas, Consultórios e Estética Avançada", icon: "Stethoscope",
    marketStat: "≈ 605 mil", marketLabel: "estabelecimentos de saúde",
    decisor: "Médico/esteticista-proprietário ou gestor. Abordagem consultiva.",
    argument: "Transforme cada anúncio em consulta marcada: a IA responde, qualifica e agenda seus leads de estética em segundos, 24h por dia.",
    recommendedPlan: "Performance",
    ease: { achar: 8, explicar: 8, roi: 9, fechar: 7 },
    modules: [
      { name: "Agenda Inteligente", benefit: "confirmação automática de consultas" },
      { name: "Captador de Leads", benefit: "qualifica e agenda leads de anúncios 24h" },
      { name: "Recall de Procedimentos", benefit: "reconvoca reaplicação no tempo certo" },
      { name: "Pré-consulta automatizada", benefit: "coleta anamnese e documentos antes" },
      { name: "Painel de Faturamento", benefit: "origem de leads e ocupação de agenda" },
    ],
    caseStudy: { situacao: "Clínica de estética gastava em anúncios mas perdia leads por demora na resposta.", solucao: "Captador de Leads respondendo e agendando em segundos.", resultado: "Taxa de agendamento de leads subiu de ~12% para ~30%.", roi: "Retorno paga a mensalidade várias vezes." },
  },
  {
    slug: "oficinas", name: "Oficinas Mecânicas e Autocenters", icon: "Wrench",
    marketStat: "76.429", marketLabel: "oficinas · frota de 41,7 mi",
    decisor: "Dono da oficina (perfil mão na massa). Venda por demonstração.",
    argument: "A oficina nunca mais esquece de chamar o cliente para a revisão — a IA traz o carro de volta no momento certo e aprova orçamentos pelo WhatsApp.",
    recommendedPlan: "Crescimento",
    ease: { achar: 9, explicar: 8, roi: 8, fechar: 7 },
    modules: [
      { name: "Lembrete de Revisão", benefit: "reconvoca no km/tempo certo" },
      { name: "Orçamento no WhatsApp", benefit: "cliente aprova pelo celular" },
      { name: "Status do Serviço", benefit: "avisa 'carro pronto' e 'aguardando peça'" },
      { name: "Agendamento de Box", benefit: "organiza a fila de serviços" },
      { name: "Painel da Oficina", benefit: "ticket médio, retorno e lucro por serviço" },
    ],
    caseStudy: { situacao: "Oficina sem nenhum follow-up de revisão.", solucao: "Lembrete de Revisão no km/tempo certo.", resultado: "~15 clientes/mês recuperados para revisão e troca de óleo (+R$ 5.000/mês).", roi: "ROI acima de 10x." },
  },
  {
    slug: "pet", name: "Pet Shops e Clínicas Veterinárias", icon: "PawPrint",
    marketStat: "≈ 300 mil", marketLabel: "estabelecimentos · mercado de R$ 78 bi",
    decisor: "Dono do pet shop ou veterinário-proprietário. Foco em recorrência.",
    argument: "Lote a agenda de banho e tosa e faça o tutor recomprar ração na hora certa — tudo automático no WhatsApp.",
    recommendedPlan: "Crescimento",
    ease: { achar: 9, explicar: 9, roi: 8, fechar: 8 },
    modules: [
      { name: "Agenda de Banho & Tosa", benefit: "com lembrete automático" },
      { name: "Recorrência de Ração", benefit: "lembra recompra no ciclo certo" },
      { name: "Carteira de Vacina Digital", benefit: "avisa vacina e vermífugo em dia" },
      { name: "Atendente IA do Pet", benefit: "responde dúvidas e agenda" },
      { name: "Painel do Pet Shop", benefit: "recorrência, ticket e serviços" },
    ],
    caseStudy: { situacao: "Banho e tosa ocioso nas segundas e terças.", solucao: "Lembretes e ofertas direcionadas para esses dias.", resultado: "+40 banhos/mês a R$ 60 = +R$ 2.400/mês.", roi: "ROI acima de 5x." },
  },
  {
    slug: "restaurantes", name: "Restaurantes, Bares e Food Service", icon: "UtensilsCrossed",
    marketStat: "R$ 495 bi", marketLabel: "faturamento do setor em 2025",
    decisor: "Dono ou gerente. Foco em vender direto sem comissão de marketplace.",
    argument: "Receba pedidos e reservas direto no WhatsApp e pare de doar 25% de cada venda para o marketplace.",
    recommendedPlan: "Crescimento",
    ease: { achar: 8, explicar: 7, roi: 8, fechar: 6 },
    modules: [
      { name: "Pedido / Reserva Direto", benefit: "sem comissão de marketplace" },
      { name: "Clube de Fidelidade", benefit: "ofertas para clientes em dias fracos" },
      { name: "Recuperador de Cliente", benefit: "reativa quem não volta" },
      { name: "Recrutamento & Onboarding", benefit: "triagem e integração de equipe" },
      { name: "Painel de Vendas", benefit: "itens mais vendidos e horários de pico" },
    ],
    caseStudy: { situacao: "Dependência total de marketplaces caros.", solucao: "Pedido/Reserva direto no WhatsApp próprio.", resultado: "~20% dos pedidos migrados, economizando ~R$ 2.000/mês em comissões.", roi: "ROI acima de 3x só em comissão." },
  },
  {
    slug: "imobiliarias", name: "Imobiliárias e Corretores", icon: "Building2",
    marketStat: "28.370", marketLabel: "imobiliárias · ≈ 580 mil corretores",
    decisor: "Dono da imobiliária ou corretor de alta produção. Quem responde primeiro fecha.",
    argument: "Seja sempre o primeiro a responder: a IA atende, qualifica e agenda visita com cada lead em segundos, antes do concorrente.",
    recommendedPlan: "Performance",
    ease: { achar: 8, explicar: 8, roi: 9, fechar: 7 },
    modules: [
      { name: "Resposta Imediata de Lead", benefit: "atende em segundos, 24h" },
      { name: "Qualificador de Cliente", benefit: "orçamento, região e urgência" },
      { name: "Follow-up Automático", benefit: "cadência até o cliente responder" },
      { name: "Match de Imóveis", benefit: "envia compatíveis com o perfil" },
      { name: "Painel de Funil", benefit: "leads, conversões e produtividade" },
    ],
    caseStudy: { situacao: "Imobiliária com 200 leads/mês perdia metade por demora.", solucao: "Resposta imediata + qualificação automática.", resultado: "Visitas agendadas dobraram.", roi: "Uma única venda paga anos de mensalidade." },
  },
  {
    slug: "academias", name: "Academias, Estúdios e Fitness", icon: "Dumbbell",
    marketStat: "62.718", marketLabel: "CNPJs ativos no setor",
    decisor: "Dono ou gerente. Foco em reduzir cancelamento e recuperar aluno sumido.",
    argument: "Cada aluno que cancela é uma mensalidade perdida todo mês: a IA identifica quem está sumindo e traz de volta antes que peça baixa.",
    recommendedPlan: "Crescimento",
    ease: { achar: 8, explicar: 8, roi: 9, fechar: 7 },
    modules: [
      { name: "Anti-evasão IA", benefit: "reengaja antes do cancelamento" },
      { name: "Cobrança de Mensalidade", benefit: "reduz inadimplência com régua automática" },
      { name: "Captador de Matrículas", benefit: "agenda aula experimental" },
      { name: "Onboarding de Aluno", benefit: "acompanha as primeiras semanas" },
      { name: "Painel de Retenção", benefit: "frequência, churn e inadimplência" },
    ],
    caseStudy: { situacao: "Academia com 800 alunos e churn de 8%/mês.", solucao: "Anti-evasão IA com reengajamento automático.", resultado: "Churn caiu para 5,5%; ~20 alunos retidos × R$ 110 = +R$ 2.200/mês.", roi: "ROI recorrente de ~4x." },
  },
  {
    slug: "contabilidade", name: "Escritórios de Contabilidade", icon: "Calculator",
    marketStat: "101.228", marketLabel: "empresas contábeis no Brasil",
    decisor: "Contador-sócio. Foco em reduzir o vai-e-vem de documentos e a inadimplência.",
    argument: "Acabe com a correria do fim do mês: a IA cobra os documentos de cada cliente automaticamente e reduz a inadimplência dos honorários.",
    recommendedPlan: "Performance",
    ease: { achar: 7, explicar: 8, roi: 8, fechar: 7 },
    modules: [
      { name: "Coletor de Documentos IA", benefit: "cobra notas todo mês automaticamente" },
      { name: "Lembrete de Obrigações", benefit: "avisa DAS, guias e vencimentos" },
      { name: "Cobrança de Honorários", benefit: "régua automática contra inadimplência" },
      { name: "Onboarding de Cliente", benefit: "coleta documentação inicial sem retrabalho" },
      { name: "Atendimento de Dúvidas", benefit: "IA responde perguntas repetitivas" },
    ],
    caseStudy: { situacao: "Escritório com 120 clientes gastava ~3 dias/mês cobrando documentos.", solucao: "Coletor de Documentos IA automatizando a cobrança.", resultado: "Atrasos de entrega caíram ~60% e liberou a equipe.", roi: "Paga-se em horas economizadas." },
  },
  {
    slug: "varejo", name: "Comércio Varejista Local", icon: "Store",
    marketStat: "≈ 991,6 mil", marketLabel: "empresas no varejo",
    decisor: "Dono(a) da loja. Foco em vender mais para quem já comprou.",
    argument: "Sua loja vende no WhatsApp o dia inteiro, mesmo quando você está ocupado: a IA atende, mostra o catálogo e fecha o pedido.",
    recommendedPlan: "Essencial",
    ease: { achar: 10, explicar: 8, roi: 7, fechar: 7 },
    modules: [
      { name: "Vendedor IA no WhatsApp", benefit: "mostra catálogo e fecha pedido" },
      { name: "Campanha de Recompra", benefit: "ofertas segmentadas para a base" },
      { name: "Recuperador de Orçamento", benefit: "retoma quem pediu preço e não comprou" },
      { name: "Catálogo Inteligente", benefit: "busca por IA no WhatsApp" },
      { name: "Painel de Vendas", benefit: "produtos e clientes top" },
    ],
    caseStudy: { situacao: "Loja de bairro com atendimento informal e zero CRM.", solucao: "Vendedor IA + campanha de recompra.", resultado: "~30 clientes/mês recuperados e ticket maior com ofertas dirigidas (+R$ 1.800/mês).", roi: "ROI de ~4x." },
  },
];

export const PERFIL_OPTIONS = [
  "Consultor do Sebrae",
  "Consultor de gestão",
  "Profissional autônomo",
  "Empreendedor",
  "Outro",
] as const;

export function getNicheBySlug(slug: string): Niche | undefined {
  return niches.find((n) => n.slug === slug);
}

export function getPlanByKey(key: Plan["key"]): Plan {
  return plans.find((p) => p.key === key)!;
}
