# Plano: páginas do Bu1lder em Payload

Criado em 21/10/2026. Branch `feat/payload`. A prévia estática do GitHub Pages continua saindo da `main` até a troca.

## Objetivo

Levar as páginas do Bu1lder para Payload, com o conteúdo editável no admin, formulário real e o módulo de tracking. Desenvolvimento local primeiro; publicação na VPS (EasyPanel, projeto `client-project-5`) só na fase final.

## Endereços

| Página | Endereço final |
| --- | --- |
| Homepage do Bu1lder | `www.miind.com.br/bu1lder/` |
| Programa de parceiros | `www.miind.com.br/bu1lder/parceiros` |
| LP de cada nicho | `www.miind.com.br/bu1lder/{nicho}` |
| Página de obrigado | `www.miind.com.br/bu1lder/ty-page` |

O site institucional (`apps/institucional`) fica fora: `miind.com.br` continua sendo o site da MIIND. As LPs apontam para as páginas legais que já existem lá (`/politica-de-privacidade`, `/termos-de-servico`).

## Decisões técnicas

- **App novo em `apps/payload`:** Next.js 15.5 (App Router) + Payload 3.85 + Postgres 17 + React 19 + Tailwind 4, com pnpm. São as versões exigidas pelo módulo de tracking e as mesmas da Unique House.
- **Prefixo `/bu1lder` como pasta de rotas, sem `basePath` do Next.** O site fica em `app/(site)/bu1lder/...`; o admin fica em `/admin`, acessado pelo domínio próprio da VPS, fora do `miind.com.br`. As chamadas do navegador para a API usam `/bu1lder/api/...`, reescritas para `/api/...`, porque o Cloudflare da MIIND só vai encaminhar `/bu1lder/*`.
- **Conteúdo em blocos.** Uma coleção `paginas` com layout em blocos. Os modelos de página viram blocos reutilizáveis: hero com celular, faixa de números, linha do tempo, módulos, simulador, notas de facilidade, caso antes e depois, argumento, FAQ, chamada com formulário, e os blocos da agência (fluxo, oportunidades, passos, destaque, checklist). Uma LP nova, como a de gestor de tráfego, se monta no admin sem código.
- **Dados comuns em globais:** planos (Essencial, Crescimento, Performance), FAQ da plataforma, perfis do formulário, cabeçalho e rodapé, página de obrigado.
- **Cadastros na coleção `cadastros`:** nome, e-mail, WhatsApp, cidade/UF, segmento, perfil, consentimento, página de origem, UTMs, gclid, fbclid, fbp, fbc e situação do envio ao n8n. O envio ao n8n entra quando o Filipe passar o webhook.
- **Nomes dos campos alinhados ao Hiperbold CRM** (funil "Bu1lder · Aquisição"): `perfil`, `empresas_atendidas`, `clientes_atendidos`, `segmentos`, `uso`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `fbclid`, `fbp`, `fbc`. O site envia ao webhook do n8n; o n8n envia à fonte "Receber dados" do CRM. A URL do webhook vai no `.env` (local e VPS), nunca no repositório.
- **Campos ocultos de todo formulário** (pedido do Filipe, 21/10/2026), todos enviados ao webhook:
  - `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `utm_id`;
  - `gclid`, `gbraid`, `wbraid` (Google), `waclid`, `fbclid`, `fbc`, `fbp` (Meta);
  - `xcod`, `src`;
  - `origem`: URL completa da página onde o cadastro foi feito, com a query string;
  - `ip` e `user_agent` completos, lidos no servidor no momento do envio (IP do cabeçalho `CF-Connecting-IP`, com reserva em `X-Forwarded-For`), nunca confiando no valor vindo do navegador.
  - Os parâmetros de URL são guardados no navegador ao chegar (cookie primário de 90 dias) para não se perderem se a pessoa navegar antes de enviar; um valor novo na URL substitui o antigo. `fbc` é montado a partir do `fbclid` quando o cookie `_fbc` não existir.
- **Corpo do webhook (contrato com o fluxo do n8n `builder-form`):** JSON com as chaves `nome`, `whatsapp`, `email`, `id` (identificador do cadastro no Payload), `perfil`, `empresas_atendidas`, `clientes_atendidos`, `segmentos`, `uso`, `cidade_uf`, todos os campos ocultos acima com os mesmos nomes, `ip` e `user_agent`. O n8n usa os nomes como estão; `ip`, `user_agent` e `cidade_uf` não têm campo no CRM.
- **Página de obrigado:** o envio do formulário devolve um identificador opaco do cadastro e o `event_id`. A página recebe `?nicho=...&cadastro=...` (sem dado pessoal na URL), lê o contexto guardado no `sessionStorage` e o expõe como `window.bu1lderLead`, com o evento `bu1lder:lead` e um push no `dataLayer`. Um campo de scripts personalizados na página de obrigado e em cada página permite colar códigos.
- **Tema e DS:** o DS MIIND vira o padrão das páginas novas. As 11 LPs abrem em claro, com o botão de tema mantido.
- **Banco local:** Postgres 17 no OrbStack (`docker compose`), porta 5438, bancos `miind_bu1lder` e `miind_bu1lder_c15t`. Next na porta 3010.

## Requisitos dos blocos vindos da revisão de copy

A revisão de copy de contabilidade e agência (chat Estrategista, aguardando OK do Filipe) pede flexibilidade que os blocos precisam ter desde a fase 2:

- Bloco de cartões por segmento, sem link.
- Bloco de texto e lista genérico (ex.: "Usar no seu escritório").
- Todas as seções opcionais por página: notas de facilidade, citação de argumento, depoimento, caso antes e depois (com ou sem nome e números).
- FAQ por página com opção de incluir ou não as perguntas da plataforma.
- Simulador configurável por página: rótulo do valor, faixa de clientes (mínimo, máximo, inicial), mostrar ou esconder renda anual e total do portfólio, aviso de rodapé.
- Formulário configurável por página: lista de perfis, perguntas extras de qualificação (escolha única e múltipla escolha), texto do consentimento e botão secundário opcional.

## Fases

1. **Base:** app Next + Payload, banco local, admin, rotas `/bu1lder/*` com conteúdo provisório.
2. **Blocos e coleções:** portar componentes e estilos, criar blocos, globais e coleções; seed com o conteúdo atual das 13 páginas (homepage, parceiros, 10 nichos, agência).
3. **Formulário e página de obrigado:** envio real com gravação no Payload, campos ocultos de origem, perguntas de qualificação (clientes ativos, segmentos atendidos), página de obrigado com dados para scripts.
4. **Tracking:** módulo instalado, eventos de visita e de cadastro, banner de consentimento na homepage.
5. **Verificação local:** todas as rotas, desktop e celular, claro e escuro, formulário, eventos na rede.
6. **Publicação (final):** imagem montada no GitHub Actions, VPS só baixa; Postgres no EasyPanel; regra no Cloudflare da MIIND para `/bu1lder/*`. Cada passo na VPS precisa de autorização do Filipe.

## Pendências que dependem de outros

O módulo de tracking é cuidado pelo chat "payload-modules". A demanda (itens abaixo, mais Lead com deduplicação, evento de reunião agendada, prefixo `/bu1lder/api` e campos de atribuição) foi enviada a ele em 21/10/2026. Este projeto não altera o módulo; só instala o pacote que ele entregar.

- **Tracking sem consentimento nas LPs de nicho:** o módulo é fechado por padrão; sem consentimento nada dispara, no navegador e no servidor. Liberar por página exige uma opção nova no próprio módulo (projeto `tracking-payload-module`).
- **Pacote do módulo:** a versão 1.2.0 está só na branch `feat/v1.2-ecommerce` e o `piloto.tgz` da raiz está como 0.0.0. Precisa de um pacote com versão definida, gerado no projeto do módulo.
- **Copy de contabilidade e agência:** em revisão pelo chat Estrategista; aplicada nos campos do Payload depois de aprovada.
- **Webhook do n8n:** recebido em 21/10/2026 e guardado como `N8N_WEBHOOK_URL` no `.env` local (fora do git). O fluxo do n8n é cuidado por outro agente; este projeto só envia o cadastro para a URL. Na VPS, entra como variável de ambiente.
