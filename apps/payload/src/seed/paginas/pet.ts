// Conteúdo de /bu1lder/pet, transcrito sem mudanças de
// apps/bu1lder/src/routes/bu1lders.pet.tsx e de apps/bu1lder/src/data/niches.ts.
// Usado pelo seed (src/seed.ts). Depois do seed, a fonte é o admin do Payload.
import type { PaginaSeed } from '../tipos'

export const pet: PaginaSeed = {
  "titulo": "Pet Shops e Clínicas Veterinárias",
  "slug": "pet",
  "tipo": "nicho",
  "navegacao": {
    "rotulo": "Pet Shops",
    "ordem": 5
  },
  "visual": "original",
  "temaClaroPadrao": true,
  "cabecalho": {
    "mostrarNavegacaoSegmentos": true,
    "mostrarVoltar": true
  },
  "seo": {
    "title": "Bu1lder para Pet & Veterinária — soluções de IA para vender | MIIND",
    "description": "Faça o tutor recomprar ração na hora certa e lotar o banho e tosa — tudo automático no WhatsApp."
  },
  "layout": [
    {
      "blockType": "heroCelular",
      "icone": "PawPrint",
      "etiqueta": "Programa Bu1lder · Pet & Veterinária",
      "titulo": "Lote a agenda de banho e tosa e fidelize o tutor.",
      "texto": "Faça o tutor recomprar ração na hora certa e lotar o banho e tosa — tudo automático no WhatsApp.",
      "linhaDecisor": "Dono do pet shop ou veterinário-proprietário · Foco em recorrência.",
      "iconeDecisor": null,
      "botaoPrincipal": {
        "texto": "Quero atender pet & veterinária",
        "url": "#cadastro"
      },
      "botaoSecundario": {
        "texto": "Ver o que você entrega",
        "url": "#solucoes"
      },
      "celular": {
        "titulo": "Pet Shop Amigo Fiel",
        "subtitulo": "online · IA Bu1lder",
        "mensagens": [
          {
            "de": "negocio",
            "texto": "Oi Ana! Já fazem 30 dias do banho do Thor 🐶 Reservo sábado 10h?",
            "hora": "09:14"
          },
          {
            "de": "cliente",
            "texto": "Aaai esqueci! 😅 Pode marcar sim",
            "hora": "09:16"
          },
          {
            "de": "negocio",
            "texto": "Sábado 10h confirmado ✅ A ração tá quase no fim — separo o saco de 15kg pra retirar junto?",
            "hora": "09:16"
          }
        ]
      }
    },
    {
      "blockType": "faixaNumeros",
      "itens": [
        {
          "icone": "Building2",
          "valor": "≈ 300 mil",
          "rotulo": "estabelecimentos pet no Brasil",
          "tom": "cyan"
        },
        {
          "icone": "Wallet",
          "valor": "R$ 78 bi",
          "rotulo": "tamanho do mercado pet brasileiro",
          "tom": "violet"
        },
        {
          "icone": "TrendingUp",
          "valor": "+R$ 2.400",
          "rotulo": "recuperados por mês com banho e tosa ocioso",
          "tom": "mint"
        }
      ]
    },
    {
      "blockType": "linhaDoTempo",
      "etiqueta": "Como funciona",
      "titulo": "Em 5 dias o pet shop começa a operar com IA",
      "subtitulo": "Você não programa nada. A Bu1lder cuida da operação enquanto você cuida da relação com o dono.",
      "passos": [
        {
          "dia": "Dia 1",
          "titulo": "Briefing com o dono",
          "descricao": "Serviços, ticket e perfil dos tutores."
        },
        {
          "dia": "Dia 2",
          "titulo": "WhatsApp + base de tutores/pets",
          "descricao": "Número oficial e histórico de banhos, vacinas e ração."
        },
        {
          "dia": "Dia 3",
          "titulo": "IA treinada",
          "descricao": "Aprende ciclos de ração, vacinas e serviços do pet shop."
        },
        {
          "dia": "Dia 4",
          "titulo": "Teste com o time",
          "descricao": "Validação dos lembretes e respostas no WhatsApp."
        },
        {
          "dia": "Dia 5",
          "titulo": "Vai ao ar",
          "descricao": "O pet shop começa a chamar o tutor de volta sozinho."
        }
      ],
      "destaque": true
    },
    {
      "blockType": "modulos",
      "etiqueta": "5 soluções que você pode construir",
      "titulo": "O que você entrega para um pet shop ou clínica veterinária",
      "subtitulo": "Cinco módulos que você liga no cliente como blocos. A IA, o WhatsApp e a infraestrutura ficam por conta da Bu1lder.",
      "itens": [
        {
          "icone": "CalendarCheck",
          "nome": "Agenda de Banho & Tosa",
          "beneficio": "lembrete automático no ciclo certo",
          "exemplo": "Oi Ana! Já fazem 30 dias do último banho do Thor 🐶 Reservo sábado 10h?"
        },
        {
          "icone": "Repeat",
          "nome": "Recorrência de Ração",
          "beneficio": "lembra a recompra antes de acabar",
          "exemplo": "A ração da Mel deve estar acabando esta semana. Posso separar o saco de 15kg pra retirada?"
        },
        {
          "icone": "Syringe",
          "nome": "Carteira de Vacina Digital",
          "beneficio": "avisa vacina e vermífugo em dia",
          "exemplo": "Vacina V10 do Thor vence em 7 dias 💉 Posso agendar com a Dra. Júlia quarta às 16h?"
        },
        {
          "icone": "MessageCircle",
          "nome": "Atendente IA do Pet",
          "beneficio": "responde dúvidas e agenda 24h",
          "exemplo": "Oi! Sim, atendemos gatos para banho. Pacote mensal R$ 180. Quer agendar uma avaliação?"
        },
        {
          "icone": "BarChart3",
          "nome": "Painel do Pet Shop",
          "beneficio": "recorrência, ticket e serviços",
          "exemplo": "Mês: 312 banhos, ticket médio R$ 95. Recompra de ração: 68%. Top: banho + tosa."
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
      "titulo": "Como pet & veterinária se comportam na hora de vender",
      "subtitulo": "Nota de 1 a 10 para cada etapa do processo comercial.",
      "achar": 9,
      "explicar": 9,
      "roi": 8,
      "fechar": 8,
      "destaque": false
    },
    {
      "blockType": "antesDepois",
      "etiqueta": "Caso real (hipotético)",
      "titulo": "Como fica na prática",
      "subtitulo": "Pet shop de bairro com banho e tosa ocioso nas segundas e terças — 30 dias depois de ligar a IA.",
      "antes": {
        "titulo": "Banho e tosa parado nas segundas e terças — agenda só enchia no fim de semana.",
        "itens": [
          {
            "rotulo": "Banhos/semana seg+ter",
            "valor": "~6"
          },
          {
            "rotulo": "Recompra de ração",
            "valor": "~40%"
          },
          {
            "rotulo": "Lembrete de vacina",
            "valor": "—"
          }
        ]
      },
      "depois": {
        "titulo": "Lembretes e ofertas direcionadas para os dias ociosos.",
        "itens": [
          {
            "rotulo": "Banhos extras/mês",
            "valor": "+40"
          },
          {
            "rotulo": "Faturamento extra",
            "valor": "+R$ 2.400"
          },
          {
            "rotulo": "Recompra de ração",
            "valor": "68%"
          }
        ]
      },
      "delta": "ROI acima de 5x",
      "citacao": "Segunda e terça era deserto. Agora o banho enche com lembrete no WhatsApp.",
      "autor": "— Carla, pet shop em Porto Alegre",
      "destaque": true
    },
    {
      "blockType": "argumento",
      "texto": "Faça o tutor recomprar ração na hora certa e lotar o banho e tosa — tudo automático no WhatsApp.",
      "assinatura": "— Argumento de venda Bu1lder · Pet & Veterinária",
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
          "resposta": "Não. A plataforma é 100% no-code: você liga módulos prontos e entrega a solução ao pet shop ou clínica veterinária sem escrever uma linha de código."
        },
        {
          "pergunta": "Em quanto tempo entrego?",
          "resposta": "Em poucos dias. Os módulos para pet & veterinária já vêm prontos; a implementação típica leva de 3 a 7 dias úteis."
        },
        {
          "pergunta": "Como recebo?",
          "resposta": "Você tem relação comercial direta com o seu cliente. A Bu1lder cobra de você apenas a parte da plataforma por produto ativo — o restante é seu, todo mês."
        },
        {
          "pergunta": "Posso atender outros mercados?",
          "resposta": "Sim. Você pode montar uma carteira misturando segmentos — odonto, beleza, saúde, oficinas, restaurantes — tudo na mesma plataforma Bu1lder."
        }
      ],
      "destaque": true
    },
    {
      "blockType": "chamadaCadastro",
      "etiqueta": "Vamos começar",
      "titulo": "Pronto para montar sua carteira de clientes de pet & veterinária?",
      "texto": "Seu cadastro já vem com Pet & Veterinária selecionado. Nossa equipe te chama em até 1 dia útil para o onboarding.",
      "bullets": [
        {
          "texto": "Sem programar — você liga módulos prontos"
        },
        {
          "texto": "Onboarding completo em 3 a 7 dias"
        },
        {
          "texto": "Lembrete automático de ração, banho e vacina"
        },
        {
          "texto": "Suporte humano + IA durante toda a jornada"
        }
      ],
      "depoimento": {
        "texto": "Mostrei o lembrete de ração pro dono — ele fechou no mesmo dia.",
        "autor": "— Bu1lder em atividade"
      },
      "formulario": {
        "formId": "cadastro-pet"
      }
    }
  ]
}
