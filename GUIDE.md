# Developer guide

Install, run, customize, test, and deploy **TailTheme React Free**. Overview and changelog → **[README.md](./README.md)** · **[CHANGELOG.md](./CHANGELOG.md)**.

## Prerequisites

- **Node.js** 20+ and **npm** 10+
- E2E (optional): `npx playwright install chromium`

## Quick start

```bash
git clone https://github.com/ezway-tech/tailtheme-reactjs-free.git
cd tailtheme-reactjs-free
npm install
npm run dev
```

Open **http://localhost:5173** (`/landing` → **Open app** → `/app/dashboard`).

Hosted preview: [tailtheme-demo.ezway.tech](https://tailtheme-demo.ezway.tech)

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

Use paths from `src/routes/urls.ts` in `Link` / `navigate()` — avoid hard-coded strings.

## Customize

1. **Branding** — `src/config.ts`, `public/`, `src/pages/landing/`
2. **New page** — `src/pages/` → register in `src/routes/` → nav in `src/navigation/` if needed
3. **Theme** — Settings → Appearance; tokens in `src/styles/globals.css`
4. **Data** — `src/mocks/fixtures/` then your API

## Project layout

```text
src/
  components/ui/       # Primitives
  components/patterns/   # Composed blocks
  layouts/               # app-shell, auth, root
  pages/                 # Screens
  routes/                # Router + urls.ts
  styles/globals.css     # Tailwind v4 + tokens
```

`@/` → `src/`. Files: **kebab-case**; exports: **PascalCase**.

## Scripts

| Script             | Description                            |
| ------------------ | -------------------------------------- |
| `npm run dev`      | Dev server (port **5173**)             |
| `npm run build`    | Typecheck + production build → `dist/` |
| `npm run preview`  | Serve `dist/`                          |
| `npm run check`    | typecheck + lint + format check        |
| `npm run test:run` | Vitest (single run)                    |
| `npm run test:e2e` | Playwright smoke                       |

Run `npm run check` before pushing. Pre-commit: Prettier + ESLint on staged files only.

## Deploy

```bash
npm run build
```

Upload `dist/` to any static host (S3, Netlify, Vercel, Cloudflare Pages, nginx, …).

## Troubleshooting

| Issue                         | Try                                                   |
| ----------------------------- | ----------------------------------------------------- |
| Loader stretches the shell    | `flex-1 min-h-0` inside app shell, not `min-h-screen` |
| Port 5173 in use              | `server.port` in `vite.config.ts`                     |
| Playwright browser missing    | `npx playwright install chromium`                     |
| `npm run check` fails on CRLF | `npm run format` once (Windows)                       |
