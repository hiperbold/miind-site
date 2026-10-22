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
- **Atenção ao mudar opções dos formulários:** o fluxo do n8n converte o TEXTO das opções de `perfil`, `empresas_atendidas`, `clientes_atendidos` e `uso` para o valor do CRM (ex.: "Dono ou sócio de escritório contábil" → `contador`, "Até 30" → `ate_30`). Mudar o texto de uma opção no admin exige avisar o chat Hiperbold CRM. O n8n recusa com 401 envio sem `X-Webhook-Secret` correto (no ar desde 22/10/2026). `tipo: "contato-plataforma"` vai para o funil "MIIND · Plataforma"; os demais para "Bu1lder · Aquisição".
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

## Andamento

- 21/10/2026: fases 1 e 2 concluídas (base, blocos, as 14 páginas). Publicação de teste no EasyPanel, projeto `client-project-5` (serviço `bu1lder-site`, banco `bu1lder-db`), em https://client-project-5-bu1lder-site.z0oemb.easypanel.host/bu1lder/ com `SITE_NOINDEX=1`. Conferido no ar: 14 páginas 200, 404 para slug inexistente, redirecionamentos de barra, 51 links e recursos sem erro, sem erro de console, sem rolagem lateral no celular, login do admin.
- 21-22/10/2026: fase 3 concluída (formulários gravando em `cadastros`, webhook do n8n com `X-Webhook-Secret`, campos ocultos, ty-page com `window.bu1lderLead`) e endurecida após auditoria de segurança (IP só confiado vindo do Cloudflare, limites, papéis admin/editor, API pública restrita a envio, mídia e saúde). Publicada no EasyPanel e conferida no ar: 14 páginas 200, 56 links sem erro, cabeçalhos de segurança, `/bu1lder/api/users/login` 404, IP forjado ignorado (429 no 6º envio), nenhum cadastro gravado pelos testes.
- 22/10/2026 (madrugada): fase 4 instalada localmente, NÃO publicada. Módulo 1.3.0 em `apps/payload/vendor/`, banner c15t na homepage e parceiros, LPs e ty-page isentas, Lead com o `event_id` do cadastro (servidor e navegador) e parâmetros `perfil`, `empresas_atendidas`, `clientes_atendidos`, `pagina`, Schedule na ty-page (`window.bu1lderAgendou()` e Calendly). Verificação de rede 15/15 PASS (relatório em `~/temp/2026-10-22/miind-fase4/verificacao-rede.md`). Antes de publicar: revisão do diff, cadastrar no EasyPanel as variáveis de `~/.claude/clientes/miind-tracking.env` (preencher `C15T_DATABASE_URI` com o banco `miind_bu1lder_c15t`), e cadastrar Tags/Eventos no admin com os IDs reais. Pontos abertos: `TRACKING_TRUSTED_PROXIES` (IP do visitante não vai para a CAPI; o módulo só aceita IP exato) e Pixel ausente na ty-page por causa do `cadastro` na URL.
- IDs das plataformas para cadastrar no admin do módulo: GA4 do Bu1lder `G-87MK0RRH23` (fluxo criado com o domínio bu1lder.com.br; o `G-9BTYVRF2TF` é do institucional e não vai nestas páginas). Pixel/dataset, token da CAPI, API secret do GA4 e Google Ads (AW- e rótulos) chegam pelo Filipe.
- 22/10/2026 (tarde): fase 4 PUBLICADA (imagem `sha-8072a2d`). Antes, revisão e auditoria: o tracking nunca impede o site de subir (c15t carregado sob demanda, 503 sem o banco), lead do tracking roda depois do envio ao n8n e fora da resposta, contato da plataforma dispara `contato_plataforma` (não `lead`), POST do banner exige o cookie `pt_subject` selado, fixa o domínio e limita por IP, `/api/c15t` só atende GET interno (OpenAPI desligado, IP não gravado). Testes 102/102, build ok, imagem testada com banco descartável com e sem as chaves. No ar: 14 rotas 200, 58 links sem quebra, `public-config` 200 (sem Tags/Eventos), `tracking-tags`/`tracking-events` só com login de admin, banner aceita e grava, `/api/c15t/*` 404 de fora. Cadastro dos Eventos: ver README, seção "Cadastro dos Eventos no admin" (não pôr destino Meta em `schedule` e PageView até haver fonte servidor; `lead` com gatilho Server-side).
- Pendente: teste ponta a ponta com o n8n real (aguarda OK do Filipe, cria lead de teste no CRM), Turnstile (sem chaves), fase 4 (módulo de tracking 1.3.0) e a regra do Cloudflare da MIIND para `/bu1lder/*`.

## Fases

1. **Base:** app Next + Payload, banco local, admin, rotas `/bu1lder/*` com conteúdo provisório.
2. **Blocos e coleções:** portar componentes e estilos, criar blocos, globais e coleções; seed com o conteúdo atual das 13 páginas (homepage, parceiros, 10 nichos, agência).
3. **Formulário e página de obrigado:** envio real com gravação no Payload, campos ocultos de origem, perguntas de qualificação (clientes ativos, segmentos atendidos), página de obrigado com dados para scripts.
4. **Tracking:** módulo instalado, eventos de visita e de cadastro, banner de consentimento na homepage.
5. **Verificação local:** todas as rotas, desktop e celular, claro e escuro, formulário, eventos na rede.
6. **Publicação (final):** imagem montada no GitHub Actions, VPS só baixa; Postgres no EasyPanel; regra no Cloudflare da MIIND para `/bu1lder/*`. Cada passo na VPS precisa de autorização do Filipe.

## Pendências que dependem de outros

**Entregue em 21/10/2026:** pacote `@hiperbold/payload-tracking` 1.3.0, em `~/github-projects/tracking-payload-module/hiperbold-payload-tracking-1.3.0.tgz` (fora do git; instalar com `pnpm add file:...`). Ler primeiro `docs/guia-leads.md` do módulo e as seções 17 e 18 do `docs/guia-instalacao-ecommerce.md`. Pontos de instalação para a fase 4:
- Migração `tracking_1_3_0` antes do primeiro boot.
- `consentPolicy.pages` na coleção `paginas` (`pathField: 'slug'`, `pathPrefix: '/bu1lder'`) e `exemptPaths: ['/bu1lder/ty-page']`; homepage fica com banner c15t. `canEdit` só para admin. Passar sempre `pagePath` no `trackServerEvent`.
- Lead: na Server Action, depois de salvar, `newEventId('lead')` + `trackServerEvent('lead', ..., { eventId, pagePath, user: { email, phone }, headers })`; no navegador, `track('lead', ..., { eventId })` e só então `router.push('/bu1lder/ty-page')`. Reunião agendada: evento `schedule` na ty-page.
- `<TrackingProvider apiBase="/bu1lder/api">`; `subjectCookie: { path: '/bu1lder' }`; `https://www.miind.com.br` nas origens confiáveis.
- Atribuição: `getAttribution()` no navegador e `readAttribution(headers)` no servidor cobrem UTMs (menos `utm_id`), gclid, gbraid, wbraid, fbclid, fbp, fbc. O site captura por conta própria `utm_id`, `waclid`, `xcod`, `src` e `origem`.
- Falta a verificação de rede (docs/verificacao-de-rede.md do módulo), a rodar deste lado e devolver ao payload-modules.

O módulo de tracking é cuidado pelo chat "payload-modules". A demanda (itens abaixo, mais Lead com deduplicação, evento de reunião agendada, prefixo `/bu1lder/api` e campos de atribuição) foi enviada a ele em 21/10/2026. Este projeto não altera o módulo; só instala o pacote que ele entregar.

- **Tracking sem consentimento nas LPs de nicho:** o módulo é fechado por padrão; sem consentimento nada dispara, no navegador e no servidor. Liberar por página exige uma opção nova no próprio módulo (projeto `tracking-payload-module`).
- **Pacote do módulo:** a versão 1.2.0 está só na branch `feat/v1.2-ecommerce` e o `piloto.tgz` da raiz está como 0.0.0. Precisa de um pacote com versão definida, gerado no projeto do módulo.
- **Copy de contabilidade e agência:** em revisão pelo chat Estrategista; aplicada nos campos do Payload depois de aprovada.
- **Webhook do n8n:** recebido em 21/10/2026 e guardado como `N8N_WEBHOOK_URL` no `.env` local (fora do git). O fluxo do n8n é cuidado por outro agente; este projeto só envia o cadastro para a URL. Na VPS, entra como variável de ambiente.
