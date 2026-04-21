# SaleKit LDP

Landing page builder monorepo — NestJS API + React/Vite web + shared `@salekit/core` package.

See full implementation plan: [../docs/IMPLEMENTATION_PLAN.md](../docs/IMPLEMENTATION_PLAN.md)

## Quick start

```bash
# 1. Copy env and fill in secrets
cp .env.example .env

# 2. Install dependencies and start infrastructure
pnpm setup   # pnpm install + build @salekit/core + docker compose up

# 3. Start all dev servers (core watch + api + web)
pnpm dev
```

| Service | URL |
|---------|-----|
| API | http://localhost:3000 |
| Swagger | http://localhost:3000/api/docs |
| Web | http://localhost:5173 |
| Mongo Express | http://localhost:8081 |

## Individual commands

```bash
pnpm dev:api        # NestJS only (:3000)
pnpm dev:web        # Vite only (:5173)
pnpm lint           # biome check
pnpm format         # biome format --write
pnpm typecheck      # tsc --noEmit across all packages
pnpm test           # jest + vitest across all packages
pnpm docker:up      # start MongoDB + mongo-express
pnpm docker:down    # stop containers
```

