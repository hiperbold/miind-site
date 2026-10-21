// Conteúdo de /bu1lder/beleza, transcrito sem mudanças de
// apps/bu1lder/src/routes/bu1lders.beleza.tsx e de apps/bu1lder/src/data/niches.ts.
// Usado pelo seed (src/seed.ts). Depois do seed, a fonte é o admin do Payload.
import type { PaginaSeed } from '../tipos'

export const beleza: PaginaSeed = {
  "titulo": "Salões de Beleza, Barbearias e Estética",
  "slug": "beleza",
  "tipo": "nicho",
  "navegacao": {
    "rotulo": "Salões de Beleza",
    "ordem": 1
  },
  "visual": "original",
  "temaClaroPadrao": true,
  "cabecalho": {
    "mostrarNavegacaoSegmentos": true,
    "mostrarVoltar": true
  },
  "seo": {
    "title": "Bu1lder para Beleza & Estética — soluções de IA para vender | MIIND",
    "description": "Em 5 dias o salão para de perder horário marcado: a IA confirma, lembra e remarca cada cliente no WhatsApp — e ainda traz de volta quem sumiu."
  },
  "layout": [
    {
      "blockType": "heroCelular",
      "icone": "Scissors",
      "etiqueta": "Programa Bu1lder · Beleza & Estética",
      "titulo": "Encha a agenda do salão sem levantar o dedo.",
      "texto": "Em 5 dias o salão para de perder horário marcado: a IA confirma, lembra e remarca cada cliente no WhatsApp — e ainda traz de volta quem sumiu.",
      "linhaDecisor": "Quem decide é o próprio dono — acesso direto e decisão rápida.",
      "iconeDecisor": null,
      "botaoPrincipal": {
        "texto": "Quero atender beleza & estética",
        "url": "#cadastro"
      },
      "botaoSecundario": {
        "texto": "Ver o que você entrega",
        "url": "#solucoes"
      },
      "celular": {
        "titulo": "Salão Bella",
        "subtitulo": "online · IA Bu1lder",
        "mensagens": [
          {
            "de": "negocio",
            "texto": "Oi Maria! Tudo certo pro seu corte amanhã às 14h? 💇",
            "hora": "09:12"
          },
          {
            "de": "cliente",
            "texto": "Oi! Tudo sim, pode confirmar 🙌",
            "hora": "09:14"
          },
          {
            "de": "negocio",
            "texto": "Perfeito ✨ Te esperamos. Qualquer coisa, é só chamar aqui.",
            "hora": "09:14"
          }
        ]
      }
    },
    {
      "blockType": "faixaNumeros",
      "itens": [
        {
          "icone": "TrendingDown",
          "valor": "20%",
          "rotulo": "no-show médio em salões sem confirmação",
          "tom": "violet"
        },
        {
          "icone": "Wallet",
          "valor": "+R$ 8.500",
          "rotulo": "recuperados em média por mês no salão",
          "tom": "mint"
        },
        {
          "icone": "Store",
          "valor": "≈ 1,25 mi",
          "rotulo": "estabelecimentos de beleza no Brasil",
          "tom": "cyan"
        }
      ]
    },
    {
      "blockType": "linhaDoTempo",
      "etiqueta": "Como funciona",
      "titulo": "Em 5 dias o salão começa a operar com IA",
      "subtitulo": "Você não programa nada. A Bu1lder cuida da operação enquanto você cuida da relação com o dono.",
      "passos": [
        {
          "dia": "Dia 1",
          "titulo": "Briefing com o dono",
          "descricao": "Entender agenda, serviços e voz da marca."
        },
        {
          "dia": "Dia 2",
          "titulo": "Conexão do WhatsApp",
          "descricao": "Número oficial vinculado em minutos."
        },
        {
          "dia": "Dia 3",
          "titulo": "Mensagens treinadas",
          "descricao": "IA aprende o cardápio e o tom do salão."
        },
        {
          "dia": "Dia 4",
          "titulo": "Teste com o dono",
          "descricao": "Aprovação final dos fluxos e respostas."
        },
        {
          "dia": "Dia 5",
          "titulo": "Vai ao ar",
          "descricao": "O salão começa a confirmar e resgatar clientes."
        }
      ],
      "destaque": true
    },
    {
      "blockType": "modulos",
      "etiqueta": "5 soluções que você pode construir",
      "titulo": "O que você entrega para um salão",
      "subtitulo": "Cinco módulos que você liga no cliente como blocos. A IA, o WhatsApp e a infraestrutura ficam por conta da Bu1lder.",
      "itens": [
        {
          "icone": "CalendarCheck",
          "nome": "Agenda Cheia",
          "beneficio": "confirma e remarca cada cliente no WhatsApp",
          "exemplo": "Oi Maria! Confirmando seu corte amanhã às 14h. Posso garantir? 💇"
        },
        {
          "icone": "UserPlus",
          "nome": "Resgata Cliente",
          "beneficio": "traz de volta quem não volta há 60 dias",
          "exemplo": "Senti sua falta, Júlia! Que tal um horário essa semana com 15% off?"
        },
        {
          "icone": "MessageCircle",
          "nome": "Recepcionista IA 24h",
          "beneficio": "responde preços, horários e serviços",
          "exemplo": "Atendemos das 9h às 20h. Corte feminino R$ 90, hidratação R$ 120."
        },
        {
          "icone": "Gift",
          "nome": "Aniversário & Fidelidade",
          "beneficio": "ofertas automáticas e pós-atendimento",
          "exemplo": "Feliz aniversário, Ana! Presente da casa: 30% no seu próximo serviço 🎁"
        },
        {
          "icone": "BarChart3",
          "nome": "Painel do Dono",
          "beneficio": "faturamento, serviços e taxa de retorno",
          "exemplo": "Você atendeu 187 clientes esse mês. Retorno: 72%. No-show: 6%."
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
      "titulo": "Como beleza & estética se comporta na hora de vender",
      "subtitulo": "Nota de 1 a 10 para cada etapa do processo comercial.",
      "achar": 10,
      "explicar": 9,
      "roi": 9,
      "fechar": 8,
      "destaque": false
    },
    {
      "blockType": "antesDepois",
      "etiqueta": "Caso real (hipotético)",
      "titulo": "Como fica na prática",
      "subtitulo": "Salão de 6 cadeiras em São Paulo — 30 dias depois de ligar a IA.",
      "antes": {
        "titulo": "Agenda furada e cliente sumindo no WhatsApp.",
        "itens": [
          {
            "rotulo": "No-show",
            "valor": "20%"
          },
          {
            "rotulo": "Atendimentos/mês",
            "valor": "126"
          },
          {
            "rotulo": "Retorno em 60 dias",
            "valor": "38%"
          }
        ]
      },
      "depois": {
        "titulo": "Confirmação automática e resgate sem ninguém parar pra digitar.",
        "itens": [
          {
            "rotulo": "No-show",
            "valor": "6%"
          },
          {
            "rotulo": "Atendimentos/mês",
            "valor": "+25"
          },
          {
            "rotulo": "Retorno em 60 dias",
            "valor": "72%"
          }
        ]
      },
      "delta": "ROI > 5x no 1º mês",
      "citacao": "Em uma semana já tinha gente que sumiu há meses voltando pra agendar.",
      "autor": "— Mariana, salão em Pinheiros",
      "destaque": true
    },
    {
      "blockType": "argumento",
      "texto": "Em 5 dias o salão para de perder horário marcado: a IA confirma, lembra e remarca cada cliente no WhatsApp — e ainda traz de volta quem sumiu.",
      "assinatura": "— Argumento de venda Bu1lder · Beleza & Estética",
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
          "resposta": "Não. A plataforma é 100% no-code: você liga módulos prontos como blocos e entrega a solução ao cliente sem escrever uma linha de código."
        },
        {
          "pergunta": "Em quanto tempo entrego?",
          "resposta": "Em poucos dias. Os módulos para salões já vêm prontos; a implementação típica leva de 3 a 7 dias úteis e o salão começa a operar imediatamente."
        },
        {
          "pergunta": "Como recebo?",
          "resposta": "Você tem relação comercial direta com o seu cliente. A Bu1lder cobra de você apenas a parte da plataforma por produto ativo — o restante é seu, todo mês."
        },
        {
          "pergunta": "Posso atender outros mercados?",
          "resposta": "Sim. Você pode montar uma carteira misturando segmentos — odonto, oficinas, pet, restaurantes, varejo — tudo na mesma plataforma Bu1lder."
        }
      ],
      "destaque": true
    },
    {
      "blockType": "chamadaCadastro",
      "etiqueta": "Vamos começar",
      "titulo": "Pronto para montar sua carteira de clientes de beleza & estética?",
      "texto": "Seu cadastro já vem com Beleza & Estética selecionado. Nossa equipe te chama em até 1 dia útil para o onboarding.",
      "bullets": [
        {
          "texto": "Sem programar — você liga módulos prontos"
        },
        {
          "texto": "Onboarding completo em 3 a 7 dias"
        },
        {
          "texto": "Suporte humano + IA durante toda a jornada"
        }
      ],
      "depoimento": {
        "texto": "Em 3 semanas eu já tinha 4 salões pagando, sem programar uma linha.",
        "autor": "— Bu1lder em atividade"
      },
      "formulario": {
        "formId": "cadastro-beleza"
      }
    }
  ]
}
