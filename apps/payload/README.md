# apps/payload: páginas do Bu1lder em Next.js + Payload

App da migração descrita em `docs/PLANO-PAYLOAD.md`. Fase 1: base com admin, banco local e rotas provisórias. Fase 2a: coleção `paginas` (blocos), globais e as 11 LPs (10 nichos e agência) em `/bu1lder/{slug}`. Fase 2c: homepage (`/bu1lder/`) e programa de parceiros (`/bu1lder/parceiros`) nos globais `homepage` e `parceiros`. Fase 3: formulários enviando de verdade (coleção `cadastros`, webhook do n8n) e página de obrigado (`/bu1lder/ty-page`, global `ty-page`).

Versões: Next.js 16.2 (Turbopack no dev e no build), Payload 3.85 (`@payloadcms/db-postgres`), React 19, Tailwind CSS 4, pnpm, Postgres 17.

## Pré-requisitos

- Node.js 24 e pnpm 11 ou mais novo.
- Docker (OrbStack) para o Postgres local.

## Como subir

```sh
cd apps/payload
cp .env.example .env      # troque PAYLOAD_SECRET e a credencial do admin
pnpm db:up                # Postgres 17 em 127.0.0.1:5438 (bancos miind_bu1lder e miind_bu1lder_c15t)
pnpm install
pnpm migrate              # aplica src/migrations
pnpm seed                 # admin, globais e as 11 LPs publicadas (só cria o que falta; SEED_ATUALIZAR=1 sobrescreve)
pnpm test                 # vitest; os testes de integração usam o Postgres local migrado
pnpm dev                  # http://localhost:3010
```

Outros scripts: `pnpm build`, `pnpm start` (porta 3010), `pnpm db:down`, `pnpm lint`, `pnpm typecheck`, `pnpm generate:types`, `pnpm generate:importmap`, `pnpm migrate:create <nome>`, `pnpm migrate:status`.

## Endereços locais

| O quê | URL |
| --- | --- |
| Homepage do Bu1lder | http://localhost:3010/bu1lder/ (global `homepage`) |
| Programa de parceiros | http://localhost:3010/bu1lder/parceiros (global `parceiros`) |
| LP de nicho | http://localhost:3010/bu1lder/{slug} (páginas publicadas da coleção `paginas`): academias, agencia-marketing, beleza, contabilidade, imobiliarias, odontologia, oficinas, pet, restaurantes, saude, varejo |
| Página de obrigado | http://localhost:3010/bu1lder/ty-page (global `ty-page`) |
| Saúde | http://localhost:3010/api/saude e /bu1lder/api/saude |
| Admin | http://localhost:3010/admin |
| API REST | http://localhost:3010/api/... (login: `/api/users/login`). Por /bu1lder/api/ só o envio do formulário, a mídia, a saúde, os três endpoints do navegador do tracking e o POST do banner no c15t |

`/` redireciona para `/bu1lder/`.

## Decisões

- **Sem `basePath`:** o prefixo `/bu1lder` é a pasta `src/app/(site)/bu1lder`. O admin fica em `/admin`.
- **Barra final:** homepage canônica em `/bu1lder/` (com barra, porque o Cloudflare da MIIND só encaminha `/bu1lder/*`); as demais páginas sem barra. `/bu1lder` e `/bu1lder/parceiros/` recebem 308 para a forma canônica. Feito em `src/proxy.ts` (o antigo middleware, renomeado no Next 16), com `trailingSlash: false` e `skipTrailingSlashRedirect: true`.
- **API em `/bu1lder/api/...`:** só três caminhos são reescritos para `/api/...` (`ROTAS_API_PUBLICAS` em `next.config.ts`): `/cadastros/enviar`, `/media/file/*` e `/saude`. O resto da API (login, coleções, admin) só existe em `/api/...`, fora do domínio público. Para abrir um endpoint novo (ex.: tracking da fase 4), acrescente o caminho na lista.
- **GraphQL desligado** (`graphQL.disable`); as rotas `/api/graphql*` foram removidas.
- **Idioma do admin:** português (`@payloadcms/translations`, `pt`).
- **Schema do banco:** `push` só no `pnpm dev`. Mudança de coleção: `pnpm migrate:create <nome>` e versionar o arquivo em `src/migrations`. Fora do dev o schema só muda por `pnpm migrate`. Depois de rodar o dev, o `payload migrate` avisa que o banco recebeu push e pede confirmação: é esperado no banco local.
- **Uploads:** coleção `media` grava em `MEDIA_DIR` (caminho absoluto) ou, sem a variável, em `apps/payload/media`, ignorada pelo git.

## Páginas (fase 2a)

- Coleção `paginas` (rascunho e versões): layout em blocos (`src/blocks/<Nome>/{config.ts,Component.tsx}`). Globais: `planos`, `faq-plataforma`, `formulario`, `rodape`.
- `/bu1lder/[slug]` tem layout raiz próprio, para o `<html>` já sair do servidor com `class="light"` e `data-miind-ds`. Homepage e parceiros têm layout raiz próprio em `(home)` e `(hub)`. A página de obrigado tem layout raiz próprio em `(obrigado)`.
- `SITE_NOINDEX` entra pela `generateMetadata` dos layouts `(home)`, `(hub)` e `[slug]`; a página de obrigado é sempre noindex. Na imagem Docker o build não tem banco, então essas rotas são geradas no servidor e leem a variável do ambiente de execução (a mesma imagem serve teste e produção). Num `pnpm build` local com banco, o valor é o do momento do build.
- Estilos portados de `apps/bu1lder` em `src/styles/bu1lder`. O Tailwind das LPs só lê `src/components/bu1lder`, `src/components/ui` e `src/blocks`: classe usada fora dessas pastas não é gerada.
- Publicar ou editar página, global ou mídia revalida todas as LPs (`src/lib/revalidar.ts`), via `after()` do Next, depois do commit da transação.
- O seed (`pnpm seed`, `src/seed.ts`) cria o admin e chama `executarSeed` (`src/seed/executar.ts`), que grava globais e LPs. Ele roda fora do Next: no fim ele chama `POST /api/paginas/revalidar` (logado) se o servidor estiver no ar. Sem servidor, as páginas saem atualizadas no próximo `pnpm build`.
- `PUBLIC_SITE_URL` (padrão `http://localhost:3010`; produção `https://www.miind.com.br`) gera canonical, og:url e og:image (servida por `/bu1lder/api/media/...`). É lida no build. `NEXT_PUBLIC_SITE_URL` continua sendo o endereço do admin/servidor.
- Scripts personalizados do `<head>` passam por um parser HTML (htmlparser2, `src/lib/scripts-head.ts`); tag ou atributo com problema é descartado e registrado no log, sem derrubar a página.

## Formulários (fase 3)

- Todos os formulários (LeadForm das LPs e do programa de parceiros, contato da homepage) enviam para `POST /bu1lder/api/cadastros/enviar` (reescrito para `/api/cadastros/enviar`, endpoint da coleção `cadastros`). Rota de API e não Server Action: resposta JSON com status HTTP, testável sem o Next, e o mesmo caminho `/bu1lder/*` que o Cloudflare encaminha.
- O servidor acha a configuração do formulário pelo conteúdo publicado (`pagina` + id do formulário; homepage = `homepage`, programa = `parceiros`) e valida com zod: obrigatórios, opções da lista, perguntas extras obrigatórias do bloco, consentimento, tamanho dos campos, honeypot (`website`) e limite de 5 envios por IP a cada 10 minutos (em memória). Segmento da LP é sempre o slug da página.
- IP: o par é o `X-Real-IP` (o Traefik do EasyPanel apaga o valor vindo do cliente e grava o IP de quem conectou); sem ele, o último item de `X-Forwarded-For`. `CF-Connecting-IP` só vale se o par estiver nas faixas oficiais do Cloudflare (lista em `src/lib/cadastros/ip.ts`, com fonte e data); de outro par é ignorado. `user_agent` do cabeçalho. Nunca do corpo.
- Ordem no servidor: limite por IP (5 pedidos a cada 10 min, contando inválidos e honeypot; mapa com teto de 10 mil IPs), `content-length` acima de 32 KB dá 413 sem ler (e a leitura para no teto), validação, Turnstile, limite global (`FORM_LIMITE_GLOBAL`, padrão 60 cadastros aceitos a cada 10 min por processo; acima, 429), gravação e webhook.
- Turnstile opcional: com `TURNSTILE_SITE_KEY` e `TURNSTILE_SECRET_KEY`, os formulários mostram o widget e o servidor confere o token na API do Cloudflare antes de gravar. Sem as duas, segue sem o desafio. A chave do site entra no HTML quando a página é gerada (como o `SITE_NOINDEX`): depois de definir as chaves, reinicie o container ou republique as páginas.
- Coleção `cadastros`: dado pessoal. Ler e editar: admin e editor; apagar: só admin; criar: só o servidor. Cada cadastro tem `token` (opaco, usado na URL da página de obrigado) e `event_id` (`lead_<uuid>`, para o tracking da fase 4).
- Webhook (`N8N_WEBHOOK_URL`): POST JSON com as chaves do contrato mais `empresa`, `cargo`, `volume` e `desafio` (contato da homepage; `null` nos outros). Com `N8N_WEBHOOK_SECRET`, vai o cabeçalho `X-Webhook-Secret`. Demais regras: (`src/lib/cadastros/webhook.ts`, `CHAVES_WEBHOOK`), timeout de 8 s e uma nova tentativa em erro de rede, tempo esgotado ou 5xx. Roda depois da resposta (`after()`): a pessoa vai para a página de obrigado mesmo com o n8n fora. Situação em `envio` (pendente, enviado, falha; tentativas, último erro sem dados, status HTTP). Sem a variável: falha "webhook não configurado". Reenvio: botão "Reenviar ao n8n" na aba "Envio ao n8n" do cadastro, ou `POST /api/cadastros/:id/reenviar` (logado).
- Campos ocultos (`src/lib/cadastros/parametros.ts`, `components/bu1lder/CamposOcultos.tsx`): na chegada a qualquer página, os parâmetros `utm_*`, `gclid`, `gbraid`, `wbraid`, `waclid`, `fbclid`, `xcod`, `src` vão para o cookie `bu1lder_origem` (path `/bu1lder`, 90 dias, SameSite=Lax, Secure em https). `fbp` = cookie `_fbp`; `fbc` = cookie `_fbc` ou `fb.1.<ms da chegada>.<fbclid>`; `origem` = URL completa no envio. Ficam como inputs hidden no form.
- Testes de envio usam um webhook falso local; `tests/setup.ts` apaga `N8N_WEBHOOK_URL` para nenhum teste chegar ao n8n real. Para rodar o app sem o n8n real: `N8N_WEBHOOK_URL=http://127.0.0.1:<porta> pnpm start`.

## Página de obrigado

- `/bu1lder/ty-page?nicho=<slug>&cadastro=<token>`, conteúdo no global `ty-page` (título, texto, próximos passos, agenda por iframe ou código, botão, variações por nicho, scripts, "Expor nome, e-mail e WhatsApp aos scripts", desligado por padrão). Tema claro, sempre noindex, sem canonical.
- O formulário guarda o contexto em `sessionStorage['bu1lder:lead']`. Com o mesmo token da URL, a página define `window.bu1lderLead` (origem, perfil, segmentos, `primeiroNome`, `emailSha256`, `telefoneSha256` dos dígitos com DDI sem `+`, formato da Meta, e `telefoneSha256E164` do E.164 com `+`, formato do Google, `novo`), dispara `bu1lder:lead` e `dataLayer.push({event: 'bu1lder_lead'})` uma vez por token (o reload não repete; `novo: false`). Os scripts do fim do `<body>` rodam depois disso, no navegador. Nenhum dado pessoal vai na URL.

## Tracking (fase 4)

- Módulo `@hiperbold/payload-tracking` 1.3.0, instalado de `vendor/hiperbold-payload-tracking-1.3.0.tgz` (pacote privado da Hiperbold, versionado; nunca reempacotar com a mesma versão). Opções em `src/tracking/options.ts`, usadas pelo plugin, pelo worker e pelo lead do servidor.
- Tags e Eventos no admin (só admin), começam vazios. Eventos que o site usa: `lead` (tipo Lead, gatilhos Server-side e Manual com chave `lead`), `schedule` (tipo Agendamento, gatilho Manual `schedule`) e `contato_plataforma` (contato da plataforma enterprise). PageView da Meta é um Evento com gatilho de visualização de página; page_view do GA4 é automático.
- Consentimento: checkbox "Exigir banner de consentimento" nas páginas (`paginas`, só admin altera). As 11 LPs saem desmarcadas (migração `tracking_1_3_0` e seed); página nova nasce marcada. `/bu1lder/ty-page` é isenta. Homepage e programa usam o banner (`components/bu1lder/BannerConsentimento.tsx`): browser-token (emite o cookie `pt_subject` selado), `POST /bu1lder/api/c15t/subjects` (só POST), `refreshConsent()`.
- `POST /bu1lder/api/c15t/subjects` (`src/tracking/banner-subjects.ts`): limite de 20 pedidos por IP a cada 10 min (mesmo IP e mesmo limitador dos cadastros, mapa com teto de 10 mil IPs; acima, 429), corpo até 4 KB (413), cookie `pt_subject` aberto com o keyring HMAC do browser-token: sem cookie válido ou com `subjectId` do corpo diferente do cookie, 403. O `domain` é sempre o host de `PUBLIC_SITE_URL` (o do corpo é ignorado) e só `content-type` vai ao c15t.
- Lead: o envio do cadastro grava, agenda o envio ao n8n e, depois dele, `trackServerEvent('lead')` com o `event_id` do cadastro, `pagePath` da página e os headers do navegador, os dois fora do caminho da resposta (`after()`). Falha do tracking nunca afeta o n8n nem a resposta. O navegador dispara `track('lead', ..., { eventId })` e só então vai à página de obrigado. Parâmetros: `perfil`, `empresas_atendidas`, `clientes_atendidos`, `pagina` (sem dado pessoal). `fbp`, `fbc`, `gclid` e `gbraid` vazios no formulário são completados pelos cookies das plataformas.
- Contato da plataforma enterprise (tipo `contato-plataforma`): não dispara `lead` (a conversão primária é o cadastro Bu1lder). Usa a chave `contato_plataforma` no navegador e no servidor, com o mesmo `event_id`. Sem Evento cadastrado com essa chave, nada é enviado (o módulo devolve `event_not_found`, sem erro).
- Reunião agendada: na ty-page, `window.bu1lderAgendou()` ou o `postMessage` `calendly.event_scheduled` do Calendly disparam `schedule` uma vez por cadastro.
- `?cadastro=` está em `stripUrlParams`: na ty-page o Pixel não carrega (regra do módulo para URL com parâmetro removido); PageView e Schedule da Meta saem pela CAPI.
- c15t em `/api/c15t/*` (banco próprio, `C15T_DATABASE_URI`), só `GET` e só para o próprio servidor (o módulo lê `GET {C15T_BACKEND_URL}/subjects/:id`): requisição com `X-Real-IP`, `CF-Connecting-IP` ou `X-Forwarded-For` que não seja de loopback responde 404 (o Traefik do EasyPanel sempre grava `X-Real-IP`; o Next preenche `X-Forwarded-For` com o IP do socket quando falta, por isso loopback passa). Documentação OpenAPI do c15t desligada e IP do visitante não gravado (`ipAddress.tracking: false`).
- Sem `C15T_DATABASE_URI`: o consentimento fica desligado (log `[c15t] consentimento desligado: C15T_DATABASE_URI ausente`, como erro em produção), as rotas do c15t respondem 503 e o resto do site segue. Páginas com banner não disparam nada (sem consentimento confirmado).
- No start (`src/instrumentation.ts`), fora do build: cria o banco do c15t se faltar (mesmo servidor do `DATABASE_URI`), migra e liga o worker de entregas (`TRACKING_WORKER=0` desliga). O `register()` nunca rejeita por causa do tracking: falha (banco fora, variável ausente) vira log sem endereço de banco e o site sobe. Banco do c15t fora na subida: o consentimento responde indisponível até o banco voltar e a migração roda de novo no próximo start; se o worker não ligar, a outbox guarda as entregas até o próximo start.
- `@c15t/backend` fica em `serverExternalPackages` (o Turbopack não resolve um import opcional dele).

### Cadastro dos Eventos no admin (regras)

- **`lead` e GA4:** o GA4 não deduplica por `event_id`, então o lead não pode ir ao GA4 pelos dois caminhos. No módulo 1.3.0 isso sai certo por construção quando o Evento `lead` é do tipo **Lead** e tem gatilho **Server-side com a mesma chave do Evento** (`lead`): o navegador não manda o GA4 (só Pixel e conversão do Google Ads, com o mesmo `event_id`) e o collect não enfileira nada; CAPI e GA4 (Measurement Protocol) saem só do servidor. Não criar outro Evento com destino GA4 disparado pelo gatilho Manual `lead`, e não tirar o gatilho Server-side nem mudar o tipo.
- **`schedule` e PageView sem API de Conversões:** até existir fonte servidor para o agendamento (webhook do Calendly), não cadastrar destino Meta no Evento `schedule`: o `collect` do navegador na ty-page pode ser inflado por script, e na ty-page o Pixel nem carrega (`?cadastro=` em `stripUrlParams`), então o destino Meta seria só CAPI. O mesmo para PageView. O módulo 1.3.0 não separa Pixel e CAPI dentro de um destino Meta: Evento sem gatilho Server-side com destino Meta sempre manda o Pixel e também enfileira a CAPI pelo collect (`endpoints/collect.js`). Pixel só no navegador depende de uma opção nova no módulo (pedido ao time do módulo). Google Ads (conversão no navegador) no `schedule` pode.
- **`contato_plataforma`:** existe no código (navegador e servidor) e só é enviado se alguém cadastrar um Evento com essa chave (gatilhos Manual e Server-side `contato_plataforma`). Sem Evento, nada sai.

Variáveis novas: `PAYLOAD_TRACKING_ENCRYPTION_KEYS`, `PAYLOAD_TRACKING_ACTIVE_KEY_ID`, `PAYLOAD_TRACKING_BROWSER_TOKEN_KEYS`, `PAYLOAD_TRACKING_BROWSER_TOKEN_ACTIVE_KEY_ID`, `C15T_DATABASE_URI`; opcionais `TRACKING_WORKER`, `TRACKING_TRUSTED_PROXIES`, `C15T_BACKEND_URL` (ver `.env.example`).

`TRACKING_TRUSTED_PROXIES` fica **vazio** nesta topologia (Cloudflare da MIIND na frente do Traefik do EasyPanel). O módulo só aceita IPs exatos (sem faixas): preenchido com o IP do Traefik, o IP da borda do Cloudflare viraria o IP do visitante na CAPI. Vazio, o módulo não lê IP do cabeçalho (a CAPI sai sem IP).

## Usuários e segurança

- Papéis em `users.role`: **admin** (usuários, scripts personalizados, embed e URL da agenda e "expor contato" da página de obrigado) e **editor** (conteúdo; lê cadastros, não apaga). Usuário novo nasce editor; o primeiro do banco, o admin inicial e o do seed nascem admin. A migração `papeis_usuarios` tornou admin quem já existia.
- Senha com no mínimo 12 caracteres. Recuperar senha por e-mail exige um adaptador de e-mail, que não está configurado: hoje um admin redefine a senha pelo admin.
- Em produção, criar usuário sem estar logado é recusado (hook em `users`): isso fecha o "criar primeiro usuário" (`/api/users/first-register` e a tela do admin), que o Payload executa sem login. O admin inicial vem só de `SEED_ADMIN_EMAIL`/`SEED_ADMIN_PASSWORD`; sem usuário e sem essas variáveis, o init registra erro no log. Escolhido o hook, e não só esconder a tela, porque cobre qualquer caminho de criação (REST e tela).
- Cookie de sessão `Secure` em produção, `SameSite=Lax`. CSRF: origem de `NEXT_PUBLIC_SITE_URL` (sem ela, `PUBLIC_SITE_URL`, com aviso no log); nunca vazio.
- Cabeçalhos: `X-Content-Type-Options: nosniff` e `Referrer-Policy: strict-origin-when-cross-origin` em tudo; no `/admin`, também `X-Frame-Options: DENY` e `Content-Security-Policy: frame-ancestors 'none'`. As páginas do site continuam podendo ter iframe de terceiros (agenda).
- Mídia: só PNG, JPEG, WebP, AVIF e GIF (sem SVG). Links editáveis (botões, rodapé, página de obrigado) só aceitam `http(s)://`, caminho relativo, `mailto:` e `tel:`.

## Publicação

A imagem é montada no GitHub Actions (`.github/workflows/payload-imagem.yml`) e publicada no GHCR. A VPS (EasyPanel) só baixa a imagem; nunca montar a imagem na VPS.

- **Imagem:** `ghcr.io/hiperbold/miind-bu1lder`. Tags: `sha-<sha completo do commit>`, o branch saneado (`feat-payload`, `main`) e `latest` (só na `main`). Dispara em push para `feat/payload` e `main` que mude `apps/payload/**` ou o workflow, e manualmente (workflow_dispatch).
- **Dockerfile:** multi-stage em `node:22-bookworm-slim`, pnpm pela corepack na versão do lock, `output: 'standalone'`. A imagem final tem só o standalone, `.next/static` e `public`, roda como usuário `node` (não-root).
- **Build sem banco:** o estágio de build usa `PAYLOAD_SECRET` e `DATABASE_URI` fictícios. `generateStaticParams` cai no fallback e as LPs são geradas no servidor na primeira visita (e depois revalidadas ao publicar). Na fase de build o Payload não migra nem cria usuário.
- **Porta:** 3000 (`PORT=3000`, `HOSTNAME=0.0.0.0`).
- **Volume:** `/app/media` (uploads; `MEDIA_DIR=/app/media` já vem na imagem).
- **Saúde:** `GET /api/saude` (também `/bu1lder/api/saude`): 200 `{"ok":true}` com o banco respondendo, 503 `{"ok":false}` sem detalhes. A imagem tem `HEALTHCHECK` nesse endereço.
- **Migrações:** com `NODE_ENV=production`, as migrações de `src/migrations` rodam sozinhas no init (`prodMigrations`), sem passo manual. O banco de produção nunca deve receber `pnpm dev` (push): migração com push anterior para e pede confirmação.
- **Admin inicial:** no init em produção, se `SEED_ADMIN_EMAIL` e `SEED_ADMIN_PASSWORD` estiverem definidas e não houver usuário com esse e-mail, ele é criado. A senha não vai para o log.
- **Conteúdo inicial:** com `SEED_CONTEUDO_NO_INIT=1`, depois do admin inicial, o init em produção roda `executarSeed` sem sobrescrever: cria os globais nunca salvos e as LPs que faltam, publicados; o que já existe não é tocado. Seguro deixar ligado: nos boots seguintes não grava nada. Erro no seed vai para o log (só a mensagem) e o servidor sobe mesmo assim. Para sobrescrever com o conteúdo do seed, usar `SEED_ATUALIZAR=1 pnpm seed` apontando para o banco.

Variáveis de produção (valores no EasyPanel, nunca no repositório):

| Nome | Para quê |
| --- | --- |
| `NODE_ENV` | `production` (já vem na imagem) |
| `DATABASE_URI` | Postgres de produção |
| `PAYLOAD_SECRET` | segredo do Payload (`openssl rand -hex 32`) |
| `NEXT_PUBLIC_SITE_URL` | endereço do admin/servidor |
| `PUBLIC_SITE_URL` | endereço público das LPs (canonical, og:url, og:image) |
| `SITE_NOINDEX` | `1` tira o site dos buscadores (homologação); sem a variável, robots normal |
| `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` | admin criado no primeiro init |
| `SEED_CONTEUDO_NO_INIT` | `1` cria no init os globais e as LPs que faltam (nunca sobrescreve) |
| `N8N_WEBHOOK_URL` | webhook do n8n que recebe os cadastros (sem ela, o cadastro é gravado com falha "webhook não configurado") |
| `N8N_WEBHOOK_SECRET` | opcional: enviado no cabeçalho `X-Webhook-Secret` |
| `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | opcionais: Turnstile nos formulários (só com as duas) |
| `FORM_LIMITE_GLOBAL` | opcional: cadastros aceitos por processo a cada 10 min (padrão 60) |
| `MEDIA_DIR` | pasta dos uploads (`/app/media` na imagem) |

Observação: o `robots.txt` do app fica em `/robots.txt`. Atrás do Cloudflare da MIIND, que só encaminha `/bu1lder/*`, o que vale para as LPs é a meta robots de cada página.

Observação: `SEED_ADMIN_PASSWORD` precisa ter 12 caracteres ou mais.

Teste local da imagem (OrbStack): `docker build -t miind-bu1lder:teste .` e `docker run -p 127.0.0.1:3020:3000 -e DATABASE_URI=postgres://<usuário>:<senha>@host.docker.internal:5438/miind_bu1lder -e PAYLOAD_SECRET=<segredo> -e SITE_NOINDEX=1 miind-bu1lder:teste`.

## Portas

Next 3010; Postgres 5438 (container `miind-bu1lder-postgres`, volume `miind_bu1lder_pgdata`). O script `docker/postgres-init` só roda na criação do volume.
