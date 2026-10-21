// Conteúdo de /bu1lder/oficinas, transcrito sem mudanças de
// apps/bu1lder/src/routes/bu1lders.oficinas.tsx e de apps/bu1lder/src/data/niches.ts.
// Usado pelo seed (src/seed.ts). Depois do seed, a fonte é o admin do Payload.
import type { PaginaSeed } from '../tipos'

export const oficinas: PaginaSeed = {
  "titulo": "Oficinas Mecânicas e Autocenters",
  "slug": "oficinas",
  "tipo": "nicho",
  "navegacao": {
    "rotulo": "Oficinas Mecânicas",
    "ordem": 4
  },
  "visual": "original",
  "temaClaroPadrao": true,
  "cabecalho": {
    "mostrarNavegacaoSegmentos": true,
    "mostrarVoltar": true
  },
  "seo": {
    "title": "Bu1lder para Oficinas & Autocenter — soluções de IA para vender | MIIND",
    "description": "A IA chama o cliente para a revisão no momento certo e aprova orçamentos pelo WhatsApp."
  },
  "layout": [
    {
      "blockType": "heroCelular",
      "icone": "Wrench",
      "etiqueta": "Programa Bu1lder · Oficinas & Autocenter",
      "titulo": "Traga o carro do seu cliente de volta — automaticamente.",
      "texto": "A IA chama o cliente para a revisão no momento certo e aprova orçamentos pelo WhatsApp.",
      "linhaDecisor": "Dono da oficina (perfil mão na massa) · Venda por demonstração.",
      "iconeDecisor": null,
      "botaoPrincipal": {
        "texto": "Quero atender oficinas & autocenter",
        "url": "#cadastro"
      },
      "botaoSecundario": {
        "texto": "Ver o que você entrega",
        "url": "#solucoes"
      },
      "celular": {
        "titulo": "Auto Center Sul",
        "subtitulo": "online · IA Bu1lder",
        "mensagens": [
          {
            "de": "negocio",
            "texto": "Seu Civic já fez 10 mil km, Seu João — hora da revisão 🔧",
            "hora": "10:08"
          },
          {
            "de": "cliente",
            "texto": "Verdade, esqueci 😅 Pode marcar terça 9h",
            "hora": "10:10"
          },
          {
            "de": "negocio",
            "texto": "Box reservado pra terça 9h ✅ Te aviso quando o carro estiver pronto.",
            "hora": "10:10"
          }
        ]
      }
    },
    {
      "blockType": "faixaNumeros",
      "itens": [
        {
          "icone": "Building2",
          "valor": "76.429",
          "rotulo": "oficinas mecânicas no Brasil",
          "tom": "cyan"
        },
        {
          "icone": "Car",
          "valor": "41,7 mi",
          "rotulo": "veículos na frota brasileira",
          "tom": "violet"
        },
        {
          "icone": "Wallet",
          "valor": "+R$ 5 mil",
          "rotulo": "recuperados por mês com lembrete de revisão",
          "tom": "mint"
        }
      ]
    },
    {
      "blockType": "linhaDoTempo",
      "etiqueta": "Como funciona",
      "titulo": "Em 5 dias a oficina começa a operar com IA",
      "subtitulo": "Você não programa nada. A Bu1lder cuida da operação enquanto você cuida da relação com o dono.",
      "passos": [
        {
          "dia": "Dia 1",
          "titulo": "Briefing com o dono",
          "descricao": "Serviços, ticket e perfil dos clientes."
        },
        {
          "dia": "Dia 2",
          "titulo": "WhatsApp + base de clientes",
          "descricao": "Número oficial e histórico de veículos."
        },
        {
          "dia": "Dia 3",
          "titulo": "IA treinada",
          "descricao": "Aprende serviços, peças e gatilhos de km/tempo."
        },
        {
          "dia": "Dia 4",
          "titulo": "Teste com o time",
          "descricao": "Validação dos orçamentos e mensagens."
        },
        {
          "dia": "Dia 5",
          "titulo": "Vai ao ar",
          "descricao": "A oficina começa a chamar o carro de volta sozinha."
        }
      ],
      "destaque": true
    },
    {
      "blockType": "modulos",
      "etiqueta": "5 soluções que você pode construir",
      "titulo": "O que você entrega para uma oficina",
      "subtitulo": "Cinco módulos que você liga no cliente como blocos. A IA, o WhatsApp e a infraestrutura ficam por conta da Bu1lder.",
      "itens": [
        {
          "icone": "BellRing",
          "nome": "Lembrete de Revisão",
          "beneficio": "reconvoca no km/tempo certo",
          "exemplo": "Seu Civic já fez 10 mil km, Seu João — hora da revisão. Posso reservar terça 9h? 🔧"
        },
        {
          "icone": "FileCheck",
          "nome": "Orçamento no WhatsApp",
          "beneficio": "cliente aprova pelo celular",
          "exemplo": "Orçamento: pastilha + óleo R$ 480. Aprova? Responde SIM e a gente segue."
        },
        {
          "icone": "CarFront",
          "nome": "Status do Serviço",
          "beneficio": "avisa 'carro pronto' e 'aguardando peça'",
          "exemplo": "Carro pronto! Pode buscar até 18h. Pagamento Pix ou cartão na retirada."
        },
        {
          "icone": "CalendarCheck",
          "nome": "Agendamento de Box",
          "beneficio": "organiza a fila de serviços",
          "exemplo": "Box 2 livre quarta 14h. Posso encaixar sua troca de óleo nesse horário?"
        },
        {
          "icone": "BarChart3",
          "nome": "Painel da Oficina",
          "beneficio": "ticket médio, retorno e lucro por serviço",
          "exemplo": "Mês: 142 serviços, ticket médio R$ 620. Retorno de cliente: 48%. Top: revisão."
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
      "titulo": "Como oficinas & autocenter se comportam na hora de vender",
      "subtitulo": "Nota de 1 a 10 para cada etapa do processo comercial.",
      "achar": 9,
      "explicar": 8,
      "roi": 8,
      "fechar": 7,
      "destaque": false
    },
    {
      "blockType": "antesDepois",
      "etiqueta": "Caso real (hipotético)",
      "titulo": "Como fica na prática",
      "subtitulo": "Oficina de bairro com 4 boxes — 30 dias depois de ligar a IA.",
      "antes": {
        "titulo": "Cliente sumia depois da troca de óleo e só voltava quando dava problema.",
        "itens": [
          {
            "rotulo": "Follow-up de revisão",
            "valor": "—"
          },
          {
            "rotulo": "Retorno em 6 meses",
            "valor": "~25%"
          },
          {
            "rotulo": "Aprovação de orçamento",
            "valor": "Lenta"
          }
        ]
      },
      "depois": {
        "titulo": "Lembrete por km/tempo e orçamento aprovado pelo celular.",
        "itens": [
          {
            "rotulo": "Clientes recuperados/mês",
            "valor": "+15"
          },
          {
            "rotulo": "Faturamento extra",
            "valor": "+R$ 5 mil"
          },
          {
            "rotulo": "Aprovação de orçamento",
            "valor": "Minutos"
          }
        ]
      },
      "delta": "ROI acima de 10x",
      "citacao": "Apareceu cliente que eu não via há 8 meses voltando pra trocar óleo.",
      "autor": "— Seu Roberto, oficina em Canoas",
      "destaque": true
    },
    {
      "blockType": "argumento",
      "texto": "A IA chama o cliente para a revisão no momento certo e aprova orçamentos pelo WhatsApp.",
      "assinatura": "— Argumento de venda Bu1lder · Oficinas & Autocenter",
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
          "resposta": "Não. A plataforma é 100% no-code: você liga módulos prontos e entrega a solução à oficina sem escrever uma linha de código."
        },
        {
          "pergunta": "Em quanto tempo entrego?",
          "resposta": "Em poucos dias. Os módulos para oficinas já vêm prontos; a implementação típica leva de 3 a 7 dias úteis."
        },
        {
          "pergunta": "Como recebo?",
          "resposta": "Você tem relação comercial direta com o seu cliente. A Bu1lder cobra de você apenas a parte da plataforma por produto ativo — o restante é seu, todo mês."
        },
        {
          "pergunta": "Posso atender outros mercados?",
          "resposta": "Sim. Você pode montar uma carteira misturando segmentos — beleza, odonto, saúde, pet, restaurantes — tudo na mesma plataforma Bu1lder."
        }
      ],
      "destaque": true
    },
    {
      "blockType": "chamadaCadastro",
      "etiqueta": "Vamos começar",
      "titulo": "Pronto para montar sua carteira de clientes de oficinas & autocenter?",
      "texto": "Seu cadastro já vem com Oficinas & Autocenter selecionado. Nossa equipe te chama em até 1 dia útil para o onboarding.",
      "bullets": [
        {
          "texto": "Sem programar — você liga módulos prontos"
        },
        {
          "texto": "Onboarding completo em 3 a 7 dias"
        },
        {
          "texto": "Lembrete automático por km e por tempo"
        },
        {
          "texto": "Suporte humano + IA durante toda a jornada"
        }
      ],
      "depoimento": {
        "texto": "Mostrei o lembrete de revisão pro dono — ele fechou na hora.",
        "autor": "— Bu1lder em atividade"
      },
      "formulario": {
        "formId": "cadastro-oficinas"
      }
    }
  ]
}
