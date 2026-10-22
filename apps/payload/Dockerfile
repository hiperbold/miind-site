# syntax=docker/dockerfile:1.7
# Imagem do app Payload (Bu1lder). Montada no GitHub Actions e publicada no
# GHCR; a VPS só baixa. O build não acessa banco: as LPs são geradas no
# servidor, na primeira visita, e as migrações rodam no init em produção.

ARG NODE_IMAGE=node:22-bookworm-slim
ARG PNPM_VERSION=12.11.2

FROM ${NODE_IMAGE} AS base
ARG PNPM_VERSION
ENV NEXT_TELEMETRY_DISABLED=1 \
    COREPACK_ENABLE_DOWNLOAD_PROMPT=0
# pnpm pela corepack, na mesma versão usada para gerar o pnpm-lock.yaml.
RUN corepack enable && corepack prepare "pnpm@${PNPM_VERSION}" --activate
WORKDIR /app

# Dependências (camada em cache enquanto o lock não muda).
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Pacote privado do tracking (file:vendor/...): precisa estar aqui antes do install.
COPY vendor ./vendor
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --store-dir /pnpm/store

# Build. Valores fictícios só neste estágio, nunca os reais: a porta 1 recusa a
# conexão na hora, e generateStaticParams cai no fallback sem banco.
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production \
    PAYLOAD_SECRET=build-somente-valor-ficticio \
    DATABASE_URI=postgres://build:build@127.0.0.1:1/build
RUN pnpm build

# Execução: só o standalone, os estáticos e o public.
FROM ${NODE_IMAGE} AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    MEDIA_DIR=/app/media
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
RUN mkdir -p /app/media && chown node:node /app/media
USER node
VOLUME ["/app/media"]
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/api/saude').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]
CMD ["node", "server.js"]
