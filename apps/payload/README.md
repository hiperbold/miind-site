# apps/payload: páginas do Bu1lder em Next.js + Payload

App da migração descrita em `docs/PLANO-PAYLOAD.md`. Fase 1: base com admin, banco local e rotas `/bu1lder/*` com conteúdo provisório.

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
pnpm seed                 # cria o admin de SEED_ADMIN_EMAIL/SEED_ADMIN_PASSWORD, se não existir
pnpm dev                  # http://localhost:3010
```

Outros scripts: `pnpm build`, `pnpm start` (porta 3010), `pnpm db:down`, `pnpm lint`, `pnpm typecheck`, `pnpm generate:types`, `pnpm generate:importmap`, `pnpm migrate:create <nome>`, `pnpm migrate:status`.

## Endereços locais

| O quê | URL |
| --- | --- |
| Homepage do Bu1lder | http://localhost:3010/bu1lder/ |
| Programa de parceiros | http://localhost:3010/bu1lder/parceiros |
| LP de nicho | http://localhost:3010/bu1lder/{nicho} (lista em `src/lib/nichos.ts`) |
| Página de obrigado | http://localhost:3010/bu1lder/ty-page |
| Admin | http://localhost:3010/admin |
| API REST | http://localhost:3010/api/... e também /bu1lder/api/... (reescrita) |

`/` redireciona para `/bu1lder/`.

## Decisões

- **Sem `basePath`:** o prefixo `/bu1lder` é a pasta `src/app/(site)/bu1lder`. O admin fica em `/admin`.
- **Barra final:** homepage canônica em `/bu1lder/` (com barra, porque o Cloudflare da MIIND só encaminha `/bu1lder/*`); as demais páginas sem barra. `/bu1lder` e `/bu1lder/parceiros/` recebem 308 para a forma canônica. Feito em `src/proxy.ts` (o antigo middleware, renomeado no Next 16), com `trailingSlash: false` e `skipTrailingSlashRedirect: true`.
- **API em `/bu1lder/api/*`:** reescrita para `/api/*` em `next.config.ts`.
- **Idioma do admin:** português (`@payloadcms/translations`, `pt`).
- **Schema do banco:** `push` só no `pnpm dev`. Mudança de coleção: `pnpm migrate:create <nome>` e versionar o arquivo em `src/migrations`. Fora do dev o schema só muda por `pnpm migrate`. Depois de rodar o dev, o `payload migrate` avisa que o banco recebeu push e pede confirmação: é esperado no banco local.
- **Uploads:** coleção `media` grava em `apps/payload/media`, ignorada pelo git.

## Portas

Next 3010; Postgres 5438 (container `miind-bu1lder-postgres`, volume `miind_bu1lder_pgdata`). O script `docker/postgres-init` só roda na criação do volume.
