# Developer guide — TailTheme Free

For install and Pro comparison, see **[README.md](./README.md)**.

## Prerequisites

- **Node.js** 20+ and **npm** 10+
- E2E: `npx playwright install chromium` (once)

## Run locally

```bash
git clone https://github.com/ezway-tech/tailtheme-reactjs-free.git
cd tailtheme-reactjs-free
npm install
npm run dev
```

**Windows:** clone near the drive root (e.g. `C:\dev\tailtheme-reactjs-free`) if you hit long-path errors.

## Main routes

| Route                     | Purpose                        |
| ------------------------- | ------------------------------ |
| `/landing`                | Marketing landing              |
| `/app/dashboard`          | Overview dashboard             |
| `/app/dashboards/saas`    | SaaS dashboard                 |
| `/app/dashboards/project` | Project dashboard              |
| `/app/ui`                 | UI tokens & component showcase |
| `/auth/login`             | Auth screens                   |

Paths are defined in `src/routes/urls.ts` — use them in `Link` / `navigate()` instead of hard-coded strings.

## Customize

1. **Branding** — `src/config.ts`, `public/`, `src/pages/landing/`
2. **New page** — add under `src/pages/`, register in `src/routes/`, add nav in `src/navigation/` if needed
3. **Theme** — presets in Settings → Appearance; tokens in `src/styles/globals.css`
4. **Data** — replace fixtures in `src/mocks/fixtures/` and wire your API

## Project layout (short)

```text
src/
  components/ui/     # Primitives (Button, Card, Table, …)
  components/patterns/
  layouts/           # app-shell, auth, root
  pages/             # Route screens
  routes/            # Router + urls.ts
  styles/globals.css # Tailwind v4 + design tokens
```

Import alias: `@/` → `src/`. File names: **kebab-case**; exported components: **PascalCase**.

## Scripts

| Script             | Description                     |
| ------------------ | ------------------------------- |
| `npm run dev`      | Vite (port **5173**)            |
| `npm run build`    | `tsc` + production build        |
| `npm run preview`  | Serve `dist/`                   |
| `npm run check`    | typecheck + lint + format check |
| `npm run test:run` | Vitest once                     |
| `npm run test:e2e` | Playwright (starts dev server)  |

Run `npm run check` before pushing. Pre-commit runs Prettier + ESLint on staged files only.

## Deploy

```bash
npm run build
```

Upload `dist/` to any static host (S3, Netlify, Vercel, nginx, …).

## Troubleshooting

| Issue                                   | Try                                                           |
| --------------------------------------- | ------------------------------------------------------------- |
| Loader stretches the shell              | Use `flex-1 min-h-0` inside the app shell, not `min-h-screen` |
| Port 5173 in use                        | Change `server.port` in `vite.config.ts`                      |
| Playwright missing browser              | `npx playwright install chromium`                             |
| `npm run check` fails on CRLF (Windows) | `npm run format` once                                         |
