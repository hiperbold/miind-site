# apps/payload: páginas do Bu1lder em Next.js + Payload

App da migração descrita em `docs/PLANO-PAYLOAD.md`. Fase 1: base com admin, banco local e rotas provisórias. Fase 2a: coleção `paginas` (blocos), globais e as 11 LPs (10 nichos e agência) em `/bu1lder/{slug}`. Fase 2c: homepage (`/bu1lder/`) e programa de parceiros (`/bu1lder/parceiros`) nos globais `homepage` e `parceiros`. Só a página de obrigado continua provisória.

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
| Página de obrigado (provisória) | http://localhost:3010/bu1lder/ty-page |
| Saúde | http://localhost:3010/api/saude e /bu1lder/api/saude |
| Admin | http://localhost:3010/admin |
| API REST | http://localhost:3010/api/... e também /bu1lder/api/... (reescrita) |

`/` redireciona para `/bu1lder/`.

## Decisões

- **Sem `basePath`:** o prefixo `/bu1lder` é a pasta `src/app/(site)/bu1lder`. O admin fica em `/admin`.
- **Barra final:** homepage canônica em `/bu1lder/` (com barra, porque o Cloudflare da MIIND só encaminha `/bu1lder/*`); as demais páginas sem barra. `/bu1lder` e `/bu1lder/parceiros/` recebem 308 para a forma canônica. Feito em `src/proxy.ts` (o antigo middleware, renomeado no Next 16), com `trailingSlash: false` e `skipTrailingSlashRedirect: true`.
- **API em `/bu1lder/api/*`:** reescrita para `/api/*` em `next.config.ts`.
- **Idioma do admin:** português (`@payloadcms/translations`, `pt`).
- **Schema do banco:** `push` só no `pnpm dev`. Mudança de coleção: `pnpm migrate:create <nome>` e versionar o arquivo em `src/migrations`. Fora do dev o schema só muda por `pnpm migrate`. Depois de rodar o dev, o `payload migrate` avisa que o banco recebeu push e pede confirmação: é esperado no banco local.
- **Uploads:** coleção `media` grava em `MEDIA_DIR` (caminho absoluto) ou, sem a variável, em `apps/payload/media`, ignorada pelo git.

## Páginas (fase 2a)

- Coleção `paginas` (rascunho e versões): layout em blocos (`src/blocks/<Nome>/{config.ts,Component.tsx}`). Globais: `planos`, `faq-plataforma`, `formulario`, `rodape`.
- `/bu1lder/[slug]` tem layout raiz próprio, para o `<html>` já sair do servidor com `class="light"` e `data-miind-ds`. Homepage e parceiros têm layout raiz próprio em `(home)` e `(hub)`. Só a página de obrigado continua provisória, no grupo `(provisorio)`.
- `SITE_NOINDEX` entra pela `generateMetadata` dos layouts `(home)`, `(hub)`, `[slug]` e `(provisorio)`. Na imagem Docker o build não tem banco, então essas rotas são geradas no servidor e leem a variável do ambiente de execução (a mesma imagem serve teste e produção). Num `pnpm build` local com banco, o valor é o do momento do build.
- Estilos portados de `apps/bu1lder` em `src/styles/bu1lder`. O Tailwind das LPs só lê `src/components/bu1lder`, `src/components/ui` e `src/blocks`: classe usada fora dessas pastas não é gerada.
- Publicar ou editar página, global ou mídia revalida todas as LPs (`src/lib/revalidar.ts`), via `after()` do Next, depois do commit da transação.
- O seed (`pnpm seed`, `src/seed.ts`) cria o admin e chama `executarSeed` (`src/seed/executar.ts`), que grava globais e LPs. Ele roda fora do Next: no fim ele chama `POST /api/paginas/revalidar` (logado) se o servidor estiver no ar. Sem servidor, as páginas saem atualizadas no próximo `pnpm build`.
- `PUBLIC_SITE_URL` (padrão `http://localhost:3010`; produção `https://www.miind.com.br`) gera canonical, og:url e og:image (servida por `/bu1lder/api/media/...`). É lida no build. `NEXT_PUBLIC_SITE_URL` continua sendo o endereço do admin/servidor.
- Scripts personalizados do `<head>` passam por um parser HTML (htmlparser2, `src/lib/scripts-head.ts`); tag ou atributo com problema é descartado e registrado no log, sem derrubar a página.
- Formulário: só valida no navegador e mostra a falha explícita; o envio entra na fase 3.

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
| `N8N_WEBHOOK_URL` | webhook do formulário (fase 3) |
| `MEDIA_DIR` | pasta dos uploads (`/app/media` na imagem) |

Observação: o `robots.txt` do app fica em `/robots.txt`. Atrás do Cloudflare da MIIND, que só encaminha `/bu1lder/*`, o que vale para as LPs é a meta robots de cada página.

Teste local da imagem (OrbStack): `docker build -t miind-bu1lder:teste .` e `docker run -p 127.0.0.1:3020:3000 -e DATABASE_URI=postgres://<usuário>:<senha>@host.docker.internal:5438/miind_bu1lder -e PAYLOAD_SECRET=<segredo> -e SITE_NOINDEX=1 miind-bu1lder:teste`.

## Portas

Next 3010; Postgres 5438 (container `miind-bu1lder-postgres`, volume `miind_bu1lder_pgdata`). O script `docker/postgres-init` só roda na criação do volume.
