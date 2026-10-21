// Conteúdo de /bu1lder/varejo, transcrito sem mudanças de
// apps/bu1lder/src/routes/bu1lders.varejo.tsx e de apps/bu1lder/src/data/niches.ts.
// Usado pelo seed (src/seed.ts). Depois do seed, a fonte é o admin do Payload.
import type { PaginaSeed } from '../tipos'

export const varejo: PaginaSeed = {
  "titulo": "Comércio Varejista Local",
  "slug": "varejo",
  "tipo": "nicho",
  "navegacao": {
    "rotulo": "Comércio Varejista Local",
    "ordem": 10
  },
  "visual": "original",
  "temaClaroPadrao": true,
  "cabecalho": {
    "mostrarNavegacaoSegmentos": true,
    "mostrarVoltar": true
  },
  "seo": {
    "title": "Bu1lder para Varejo Local — soluções de IA para vender | MIIND",
    "description": "A IA atende, mostra o catálogo e fecha o pedido — mesmo quando você está ocupado."
  },
  "layout": [
    {
      "blockType": "heroCelular",
      "icone": "Store",
      "etiqueta": "Programa Bu1lder · Varejo Local",
      "titulo": "Sua loja vende no WhatsApp o dia inteiro.",
      "texto": "A IA atende, mostra o catálogo e fecha o pedido — mesmo quando você está ocupado.",
      "linhaDecisor": "Dono(a) da loja · Foco em vender mais para quem já comprou.",
      "iconeDecisor": null,
      "botaoPrincipal": {
        "texto": "Quero atender varejo local",
        "url": "#cadastro"
      },
      "botaoSecundario": {
        "texto": "Ver o que você entrega",
        "url": "#solucoes"
      },
      "celular": {
        "titulo": "Loja Centro",
        "subtitulo": "online · IA Bu1lder",
        "mensagens": [
          {
            "de": "cliente",
            "texto": "Vcs têm aquele tênis branco no 40?",
            "hora": "20:42"
          },
          {
            "de": "negocio",
            "texto": "Temos sim 👟 Nike Court Vision branco no 40 — R$ 329 à vista ou 3x sem juros.",
            "hora": "20:42"
          },
          {
            "de": "cliente",
            "texto": "Fechado, posso pagar no Pix?",
            "hora": "20:43"
          },
          {
            "de": "negocio",
            "texto": "Claro! Já te mando a chave e separo o tênis ✅",
            "hora": "20:43"
          }
        ]
      }
    },
    {
      "blockType": "faixaNumeros",
      "itens": [
        {
          "icone": "Building2",
          "valor": "991,6 mil",
          "rotulo": "empresas no varejo brasileiro",
          "tom": "cyan"
        },
        {
          "icone": "TrendingUp",
          "valor": "+30",
          "rotulo": "clientes/mês recuperados",
          "tom": "violet"
        },
        {
          "icone": "Wallet",
          "valor": "+R$ 1.800",
          "rotulo": "por mês a mais de faturamento",
          "tom": "mint"
        }
      ]
    },
    {
      "blockType": "linhaDoTempo",
      "etiqueta": "Como funciona",
      "titulo": "Em 5 dias a loja começa a vender com IA",
      "subtitulo": "Você não programa nada. A Bu1lder cuida da operação enquanto você cuida da relação com o lojista.",
      "passos": [
        {
          "dia": "Dia 1",
          "titulo": "Briefing com o lojista",
          "descricao": "Produtos, ticket médio e perfil da clientela."
        },
        {
          "dia": "Dia 2",
          "titulo": "WhatsApp + catálogo",
          "descricao": "Número oficial e fotos/preços dos produtos no ar."
        },
        {
          "dia": "Dia 3",
          "titulo": "IA treinada",
          "descricao": "Aprende catálogo, tamanhos, preços e formas de pagamento."
        },
        {
          "dia": "Dia 4",
          "titulo": "Teste com a equipe",
          "descricao": "Validação das mensagens e fluxo de pedido."
        },
        {
          "dia": "Dia 5",
          "titulo": "Vai ao ar",
          "descricao": "A loja começa a vender no WhatsApp o dia inteiro."
        }
      ],
      "destaque": true
    },
    {
      "blockType": "modulos",
      "etiqueta": "5 soluções que você pode construir",
      "titulo": "O que você entrega para uma loja de varejo local",
      "subtitulo": "Cinco módulos que você liga no cliente como blocos. A IA, o WhatsApp e a infraestrutura ficam por conta da Bu1lder.",
      "itens": [
        {
          "icone": "MessageCircle",
          "nome": "Vendedor IA no WhatsApp",
          "beneficio": "mostra catálogo e fecha pedido",
          "exemplo": "Oi! Temos o tênis Nike Revolution na 41 por R$ 329 👟 Quer que eu já reserve pra você?"
        },
        {
          "icone": "Repeat",
          "nome": "Campanha de Recompra",
          "beneficio": "ofertas segmentadas para a base",
          "exemplo": "Faz 60 dias que você levou o perfume 💛 Hoje ele está com 15% off só para clientes fiéis."
        },
        {
          "icone": "RotateCcw",
          "nome": "Recuperador de Orçamento",
          "beneficio": "retoma quem pediu preço e não comprou",
          "exemplo": "Vi que você se interessou pela jaqueta semana passada 🧥 Ainda tem na sua numeração, posso separar?"
        },
        {
          "icone": "Search",
          "nome": "Catálogo Inteligente",
          "beneficio": "busca por IA no WhatsApp",
          "exemplo": "Procurando vestido para casamento? Tenho 6 opções no seu tamanho 👗 Mando as fotos por aqui?"
        },
        {
          "icone": "BarChart3",
          "nome": "Painel de Vendas",
          "beneficio": "produtos e clientes top",
          "exemplo": "Top da semana: tênis Nike (12 vendas) e perfume Malbec (9). Estoque do tênis tá baixo, vale repor 📈"
        }
      ],
      "textoEntrega": "Entrega em poucos dias · WhatsApp + IA",
      "ancora": "solucoes",
      "destaque": false
    },
    {
      "blockType": "simulador",
      "etiqueta": "Quanto você ganha",
      "titulo": "Plano recomendado: Essencial",
      "subtitulo": "Cliente paga R$ 2.000/mês (setup incluso). Você recebe R$ 800/mês por cliente. Pode cobrar acima do piso e ficar com 100% do excedente.",
      "plano": "Essencial",
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
      "titulo": "Como varejo local se comporta na hora de vender",
      "subtitulo": "Nota de 1 a 10 para cada etapa do processo comercial.",
      "achar": 10,
      "explicar": 8,
      "roi": 7,
      "fechar": 7,
      "destaque": false
    },
    {
      "blockType": "antesDepois",
      "etiqueta": "Caso real (hipotético)",
      "titulo": "Como fica na prática",
      "subtitulo": "Loja de bairro com atendimento informal — 30 dias depois de ligar a IA.",
      "antes": {
        "titulo": "Atendimento informal pelo WhatsApp da dona, sem CRM e sem recompra.",
        "itens": [
          {
            "rotulo": "Clientes recuperados/mês",
            "valor": "0"
          },
          {
            "rotulo": "Base ativada",
            "valor": "Quase nenhuma"
          },
          {
            "rotulo": "Orçamento perdido",
            "valor": "Alto"
          }
        ]
      },
      "depois": {
        "titulo": "A IA atende, mostra o catálogo e fecha o pedido — mesmo de madrugada.",
        "itens": [
          {
            "rotulo": "Clientes recuperados/mês",
            "valor": "~30"
          },
          {
            "rotulo": "Faturamento extra",
            "valor": "+R$ 1.800/mês"
          },
          {
            "rotulo": "ROI estimado",
            "valor": "~4x"
          }
        ]
      },
      "delta": "ROI de ~4x sobre a mensalidade",
      "citacao": "Dormindo a loja vendeu três pares de tênis. A dona acordou e o pedido já estava separado.",
      "autor": "— Marcos, loja de calçados em Porto Alegre",
      "destaque": true
    },
    {
      "blockType": "argumento",
      "texto": "A IA atende, mostra o catálogo e fecha o pedido — mesmo quando você está ocupado.",
      "assinatura": "— Argumento de venda Bu1lder · Varejo Local",
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
          "resposta": "Não. A plataforma é 100% no-code: você liga módulos prontos e entrega a solução para o lojista sem escrever uma linha de código."
        },
        {
          "pergunta": "Em quanto tempo entrego?",
          "resposta": "Em poucos dias. Os módulos para varejo já vêm prontos; a implementação típica leva de 3 a 7 dias úteis."
        },
        {
          "pergunta": "Como recebo?",
          "resposta": "Você tem relação comercial direta com o seu cliente. A Bu1lder cobra de você apenas a parte da plataforma por produto ativo — o restante é seu, todo mês."
        },
        {
          "pergunta": "Posso atender outros mercados?",
          "resposta": "Sim. Você pode montar uma carteira misturando segmentos — odonto, beleza, saúde, oficinas, pet, restaurantes, imobiliárias, academias, contabilidade — tudo na mesma plataforma Bu1lder."
        }
      ],
      "destaque": true
    },
    {
      "blockType": "chamadaCadastro",
      "etiqueta": "Vamos começar",
      "titulo": "Pronto para montar sua carteira de clientes de varejo local?",
      "texto": "Seu cadastro já vem com Varejo Local selecionado. Nossa equipe te chama em até 1 dia útil para o onboarding.",
      "bullets": [
        {
          "texto": "Sem programar — você liga módulos prontos"
        },
        {
          "texto": "Onboarding completo em 3 a 7 dias"
        },
        {
          "texto": "Vendedor IA atende e fecha pedidos 24/7"
        },
        {
          "texto": "Suporte humano + IA durante toda a jornada"
        }
      ],
      "depoimento": {
        "texto": "Liguei o vendedor IA num sábado. Domingo de manhã a loja já tinha fechado dois pedidos sozinha.",
        "autor": "— Bu1lder em atividade"
      },
      "formulario": {
        "formId": "cadastro-varejo"
      }
    }
  ]
}
