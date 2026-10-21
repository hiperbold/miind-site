// Conteúdo de /bu1lder/restaurantes, transcrito sem mudanças de
// apps/bu1lder/src/routes/bu1lders.restaurantes.tsx e de apps/bu1lder/src/data/niches.ts.
// Usado pelo seed (src/seed.ts). Depois do seed, a fonte é o admin do Payload.
import type { PaginaSeed } from '../tipos'

export const restaurantes: PaginaSeed = {
  "titulo": "Restaurantes, Bares e Food Service",
  "slug": "restaurantes",
  "tipo": "nicho",
  "navegacao": {
    "rotulo": "Restaurantes",
    "ordem": 6
  },
  "visual": "original",
  "temaClaroPadrao": true,
  "cabecalho": {
    "mostrarNavegacaoSegmentos": true,
    "mostrarVoltar": true
  },
  "seo": {
    "title": "Bu1lder para Restaurantes & Food — soluções de IA para vender | MIIND",
    "description": "Receba pedidos e reservas direto no WhatsApp e pare de doar 25% de cada venda para o marketplace."
  },
  "layout": [
    {
      "blockType": "heroCelular",
      "icone": "UtensilsCrossed",
      "etiqueta": "Programa Bu1lder · Restaurantes & Food",
      "titulo": "Receba pedidos direto no WhatsApp e pare de doar comissão.",
      "texto": "Receba pedidos e reservas direto no WhatsApp e pare de doar 25% de cada venda para o marketplace.",
      "linhaDecisor": "Dono ou gerente · Foco em vender direto sem comissão de marketplace.",
      "iconeDecisor": null,
      "botaoPrincipal": {
        "texto": "Quero atender restaurantes & food",
        "url": "#cadastro"
      },
      "botaoSecundario": {
        "texto": "Ver o que você entrega",
        "url": "#solucoes"
      },
      "celular": {
        "titulo": "Cantina da Esquina",
        "subtitulo": "online · IA Bu1lder",
        "mensagens": [
          {
            "de": "cliente",
            "texto": "Boa noite! Vocês entregam até a Vila Mariana?",
            "hora": "19:42"
          },
          {
            "de": "negocio",
            "texto": "Entregamos sim 🍕 Quer pedir por aqui mesmo? Pizza grande margherita R$ 59,90.",
            "hora": "19:42"
          },
          {
            "de": "cliente",
            "texto": "Fechado! Pago no Pix",
            "hora": "19:44"
          },
          {
            "de": "negocio",
            "texto": "Pedido confirmado ✅ 35 min. Sem taxa de marketplace 💪",
            "hora": "19:44"
          }
        ]
      }
    },
    {
      "blockType": "faixaNumeros",
      "itens": [
        {
          "icone": "Wallet",
          "valor": "R$ 495 bi",
          "rotulo": "faturamento do setor food service em 2025",
          "tom": "cyan"
        },
        {
          "icone": "TrendingDown",
          "valor": "~25%",
          "rotulo": "de comissão evitada por pedido direto",
          "tom": "violet"
        },
        {
          "icone": "PiggyBank",
          "valor": "~R$ 2.000",
          "rotulo": "economizados por mês saindo do marketplace",
          "tom": "mint"
        }
      ]
    },
    {
      "blockType": "linhaDoTempo",
      "etiqueta": "Como funciona",
      "titulo": "Em 5 dias o restaurante começa a operar com IA",
      "subtitulo": "Você não programa nada. A Bu1lder cuida da operação enquanto você cuida da relação com o dono.",
      "passos": [
        {
          "dia": "Dia 1",
          "titulo": "Briefing com o dono",
          "descricao": "Cardápio, ticket médio e dor com marketplaces."
        },
        {
          "dia": "Dia 2",
          "titulo": "WhatsApp + cardápio",
          "descricao": "Número oficial e cardápio completo com preços."
        },
        {
          "dia": "Dia 3",
          "titulo": "IA treinada",
          "descricao": "Aprende itens, combos, horários e regras de entrega."
        },
        {
          "dia": "Dia 4",
          "titulo": "Teste com a equipe",
          "descricao": "Validação dos pedidos, reservas e mensagens."
        },
        {
          "dia": "Dia 5",
          "titulo": "Vai ao ar",
          "descricao": "O restaurante começa a receber pedido direto, sem comissão."
        }
      ],
      "destaque": true
    },
    {
      "blockType": "modulos",
      "etiqueta": "5 soluções que você pode construir",
      "titulo": "O que você entrega para um restaurante ou bar",
      "subtitulo": "Cinco módulos que você liga no cliente como blocos. A IA, o WhatsApp e a infraestrutura ficam por conta da Bu1lder.",
      "itens": [
        {
          "icone": "MessageCircle",
          "nome": "Pedido / Reserva Direto",
          "beneficio": "sem comissão de marketplace",
          "exemplo": "Boa noite! 🍕 Quer fazer seu pedido por aqui? Pizza grande margherita sai R$ 59,90. Posso confirmar?"
        },
        {
          "icone": "BadgePercent",
          "nome": "Clube de Fidelidade",
          "beneficio": "ofertas para dias fracos",
          "exemplo": "Terça é dia de cliente VIP 🎉 20% off no rodízio só hoje. Reserva mesa pra 2?"
        },
        {
          "icone": "UserPlus",
          "nome": "Recuperador de Cliente",
          "beneficio": "reativa quem não volta há tempos",
          "exemplo": "Faz 45 dias que você não vem 😢 Tá com saudade do nosso fettuccine? Te garanto sobremesa por conta da casa."
        },
        {
          "icone": "Users",
          "nome": "Recrutamento & Onboarding",
          "beneficio": "triagem e integração de equipe",
          "exemplo": "Triagem do garçom feita ✅ João passou nas 5 perguntas. Posso agendar a entrevista com o gerente?"
        },
        {
          "icone": "BarChart3",
          "nome": "Painel de Vendas",
          "beneficio": "itens mais vendidos e horários de pico",
          "exemplo": "Sex 20h–22h é seu pico: 38% do faturamento. Top item: parmegiana. Sugiro reforçar a equipe."
        }
      ],
      "textoEntrega": "Entrega em poucos dias · WhatsApp + IA",
      "ancora": "solucoes",
      "destaque": false
    },
    {
      "blockType": "simulador",
      "etiqueta": "Quanto você ganha",
      "titulo": "Plano recomendado: Crescimento",
      "subtitulo": "Cliente paga R$ 3.500/mês (setup incluso). Você recebe R$ 1.400/mês por cliente. Pode cobrar acima do piso e ficar com 100% do excedente.",
      "plano": "Crescimento",
      "rotuloValor": "Sua renda mensal",
      "minClientes": 1,
      "maxClientes": 50,
      "clientesInicial": 10,
      "mostrarAnual": true,
      "mostrarPortfolio": true,
      "aviso": "Você pode cobrar acima do piso e aumentar esse número.",
      "destaque": true
    },
    {
      "blockType": "notasFacilidade",
      "etiqueta": "Facilidade de venda",
      "titulo": "Como restaurantes & food se comportam na hora de vender",
      "subtitulo": "Nota de 1 a 10 para cada etapa do processo comercial.",
      "achar": 8,
      "explicar": 7,
      "roi": 8,
      "fechar": 6,
      "destaque": false
    },
    {
      "blockType": "antesDepois",
      "etiqueta": "Caso real (hipotético)",
      "titulo": "Como fica na prática",
      "subtitulo": "Restaurante de bairro 100% dependente de marketplace — 30 dias depois de ligar a IA.",
      "antes": {
        "titulo": "Quase todo pedido vinha do marketplace, comendo 25% de comissão.",
        "itens": [
          {
            "rotulo": "Pedidos diretos",
            "valor": "~0%"
          },
          {
            "rotulo": "Comissão por mês",
            "valor": "−R$ 2.000+"
          },
          {
            "rotulo": "Relação com cliente",
            "valor": "Nula"
          }
        ]
      },
      "depois": {
        "titulo": "Pedido e reserva direto no WhatsApp, com o número da casa.",
        "itens": [
          {
            "rotulo": "Pedidos diretos",
            "valor": "~20%"
          },
          {
            "rotulo": "Economia/mês",
            "valor": "+R$ 2.000"
          },
          {
            "rotulo": "Base de clientes própria",
            "valor": "Sim"
          }
        ]
      },
      "delta": "ROI acima de 3x só em comissão",
      "citacao": "Cada pedido direto é dinheiro que não vai mais embora pro app.",
      "autor": "— Marcos, restaurante em São Paulo",
      "destaque": true
    },
    {
      "blockType": "argumento",
      "texto": "Receba pedidos e reservas direto no WhatsApp e pare de doar 25% de cada venda para o marketplace.",
      "assinatura": "— Argumento de venda Bu1lder · Restaurantes & Food",
      "destaque": false
    },
    {
      "blockType": "faq",
      "etiqueta": "FAQ",
      "titulo": "Perguntas frequentes",
      "incluirPerguntasPlataforma": true,
      "itens": [
        {
          "pergunta": "Preciso saber programar?",
          "resposta": "Não. A plataforma é 100% no-code: você liga módulos prontos e entrega a solução ao restaurante sem escrever uma linha de código."
        },
        {
          "pergunta": "Em quanto tempo entrego?",
          "resposta": "Em poucos dias. Os módulos para restaurantes & food já vêm prontos; a implementação típica leva de 3 a 7 dias úteis."
        },
        {
          "pergunta": "Como recebo?",
          "resposta": "Você tem relação comercial direta com o seu cliente. A Bu1lder cobra de você apenas a parte da plataforma por produto ativo — o restante é seu, todo mês."
        },
        {
          "pergunta": "Posso atender outros mercados?",
          "resposta": "Sim. Você pode montar uma carteira misturando segmentos — odonto, beleza, saúde, oficinas, pet — tudo na mesma plataforma Bu1lder."
        }
      ],
      "destaque": true
    },
    {
      "blockType": "chamadaCadastro",
      "etiqueta": "Vamos começar",
      "titulo": "Pronto para montar sua carteira de clientes de restaurantes & food?",
      "texto": "Seu cadastro já vem com Restaurantes & Food selecionado. Nossa equipe te chama em até 1 dia útil para o onboarding.",
      "bullets": [
        {
          "texto": "Sem programar — você liga módulos prontos"
        },
        {
          "texto": "Onboarding completo em 3 a 7 dias"
        },
        {
          "texto": "Pedido e reserva direto no WhatsApp, sem comissão"
        },
        {
          "texto": "Suporte humano + IA durante toda a jornada"
        }
      ],
      "depoimento": {
        "texto": "Mostrei o pedido direto no WhatsApp pro dono — fechou na hora pra fugir da comissão.",
        "autor": "— Bu1lder em atividade"
      },
      "formulario": {
        "formId": "cadastro-restaurantes"
      }
    }
  ]
}
