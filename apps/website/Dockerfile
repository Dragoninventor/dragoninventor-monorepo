# syntax=docker/dockerfile:1

# Based on: https://turbo.build/repo/docs/guides/tools/docker

FROM node:20-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
RUN npm install -g turbo@^2
WORKDIR /app
COPY . .
RUN TURBO_GLOBAL_WARNING_DISABLED=true turbo prune @dragoninventor/website --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
RUN npm install -g turbo@^2
WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN npm ci

COPY --from=builder /app/out/full/ .
RUN --mount=type=secret,id=DOTENV_PRIVATE_KEY_PRODUCTION,env=DOTENV_PRIVATE_KEY_PRODUCTION turbo run build

FROM base AS runner
WORKDIR	/app

RUN apk add --no-cache curl
RUN curl -sfS https://dotenvx.sh/install.sh | sh

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer --chown=nextjs:nodejs /app/apps/website/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/website/.next/static ./apps/website/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/website/public ./apps/website/public
COPY --from=installer --chown=nextjs:nodejs /app/apps/website/.env.production ./apps/website/

CMD ["dotenvx", "run", "-f", "apps/website/.env.production", "--", "node", "/app/apps/website/server.js"]
