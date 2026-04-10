# Демо портфолио (Nuxt)

Учебный/демонстрационный фронтенд для портфолио. Реальный бэкенд не подключается без `NUXT_PUBLIC_API` в `.env` (см. `.env.example`). Прокси `/api` вернёт 503, пока URL API пустой.

Официальная документация Nuxt: [nuxt.com/docs](https://nuxt.com/docs/getting-started/introduction).

## Setup

Установите зависимости:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

Перед первым запуском скрипт `yarn dev` создаст `.env` из `.env.example`, если файла ещё нет.

## Development Server

Сервер разработки: `http://localhost:3000`

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
