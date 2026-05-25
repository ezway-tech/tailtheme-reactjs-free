# TailTheme Free — Developer guide

Everything you need to understand the codebase, run the app locally, and work with linting, formatting, and tests.

## Prerequisites

- **Node.js** 20.x or later (18.x may work; 20+ is recommended)
- **npm** 10+ (or a compatible package manager)

For end-to-end tests, install Playwright browsers once:

```bash
npx playwright install chromium
```

## Get started

```bash
git clone https://github.com/ezway-tech/tailtheme-reactjs-free.git
cd tailtheme-reactjs-free
npm install
npm run dev
```

> **Windows:** clone near the drive root (e.g. `C:\dev\tailtheme-reactjs-free`) if you hit long-path or permission issues.

`npm install` runs `prepare` and installs **Husky** hooks:

- **pre-commit** — Prettier + ESLint on staged files (`lint-staged`)
- **pre-push** — full-project ESLint

### Local URLs (default port 5173)

| Route | Purpose |
| ----- | ------- |
| `/landing` | Marketing landing |
| `/app/dashboard` | Main overview dashboard |
| `/app/dashboards/saas` | SaaS dashboard |
| `/app/dashboards/project` | Project dashboard |
| `/app/ui` | UI tokens & component showcase |
| `/auth/login` | Auth screens |

Route constants live in `src/routes/urls.ts` — use them in `Link` and `navigate()` instead of hard-coded strings.

---

## Source overview

TailTheme Free is a **Vite + React 19** SPA. There is no backend; sample data comes from static fixtures under `src/mocks/fixtures/`.

### Top-level layout

```text
├── public/              # Static assets (favicon, tailtheme.png, manifest)
├── src/
│   ├── main.tsx         # App entry — providers + router
│   ├── components/      # Reusable UI (see below)
│   ├── contexts/        # React context (e.g. preferences)
│   ├── hooks/           # Shared hooks (theme, sidebar, media queries)
│   ├── i18n/            # English strings (Lite is EN-only)
│   ├── layouts/         # app-shell, auth layout, root layout
│   ├── lib/             # Utilities (cn, motion helpers)
│   ├── mocks/fixtures/  # Static demo data (no MSW in Free)
│   ├── navigation/      # Sidebar / nav config for Free scope
│   ├── pages/           # Route-level screens
│   ├── providers/       # Theme + app providers
│   ├── routes/          # Route trees + url helpers
│   └── styles/          # globals.css — Tailwind v4 + design tokens
├── e2e/                 # Playwright specs
├── index.html           # HTML shell + early theme/route hints
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
└── eslint.config.js
```

### `src/components/`

| Folder | Role |
| ------ | ---- |
| `ui/` | Primitives (Button, Card, Table, Dialog, …) — Radix + CVA + Tailwind |
| `patterns/` | Composed blocks (PageHeader, AppLogo, data shells) |
| `showcase/` | Docs-style demos for the UI section |
| `motion/` | Page transitions and motion wrappers |
| `auth/` | Auth-specific UI pieces |

Import from barrel files when available, e.g. `@/components/ui`, `@/components/patterns`.

### `src/pages/`

Screens grouped by product area:

- `landing/` — public marketing page
- `dashboard/` & `dashboards/` — dashboard variants
- `pages/saas/`, `pages/project/`, `pages/marketing/` — vertical samples
- `ui/` — token docs and component galleries
- `auth/`, `settings/`, `profile/`, `errors/` — account and system pages

Add a new screen by creating a page under `src/pages/`, registering it in `src/routes/`, and adding a nav item in `src/navigation/` if it should appear in the sidebar.

### `src/layouts/app-shell.tsx`

The authenticated **app shell**: sidebar, header, breadcrumbs, command palette, and the scrollable main column (`#main-content`). App routes render inside this layout. The shell uses `data-app-shell` and internal scrolling — avoid `min-h-screen` on full-page loaders inside the shell (use `flex-1` / `min-h-0` instead).

### Styling and themes

- **Tokens:** `src/styles/globals.css` — semantic CSS variables (`--background`, `--primary`, `--border`, …).
- **Presets:** user-selectable palettes via preferences (see Settings → Appearance).
- **Utilities:** Tailwind v4 with `@import 'tailwindcss'` in `globals.css`.
- **Class names:** use `cn()` from `@/lib/utils` to merge Tailwind classes.

Prefer semantic tokens (`border-input`, `bg-card`, `text-foreground`) over raw grays so light/dark and presets stay consistent.

### Path alias

`@/` maps to `src/` (configured in `vite.config.ts` and `tsconfig`). Example:

```ts
import { Button } from '@/components/ui';
import { urls } from '@/routes/urls';
```

### File naming

Physical files and folders use **kebab-case** (`app-shell.tsx`, `use-preferences.ts`). Exported React components use **PascalCase** in code.

---

## Customization workflow

1. **New page** — add `src/pages/.../my-page.tsx`, wire route in `src/routes/app-routes.tsx` (or the relevant route module), export path in `urls.ts`.
2. **Sidebar** — update `src/navigation/` (Lite nav is trimmed vs Pro).
3. **Branding** — `src/config.ts`, `public/`, landing page copy.
4. **Theme** — extend presets in preferences / `globals.css`; test light and dark.
5. **Upgrade to Pro** — [tailtheme.dev/pro](https://tailtheme.dev/pro) for full verticals, i18n, MSW demo mode, and Figma kit.

---

## NPM scripts

| Script | Description |
| ------ | ----------- |
| `npm run dev` | Vite dev server (port **5173**) |
| `npm run build` | `tsc --noEmit` + production build → `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run typecheck` | TypeScript only |
| `npm run lint` | ESLint (max warnings **0**) |
| `npm run lint:fix` | ESLint with auto-fix |
| `npm run format` | Prettier — write |
| `npm run format:check` | Prettier — check (CI) |
| `npm run check` | `typecheck` + `lint` + `format:check` |
| `npm run test` | Vitest watch mode |
| `npm run test:run` | Vitest single run |
| `npm run test:coverage` | Vitest with coverage |
| `npm run test:related` | Vitest only for files related to staged changes |
| `npm run test:e2e` | Playwright headless |
| `npm run test:e2e:ui` | Playwright UI mode |

Run **`npm run check`** before opening a pull request.

---

## Formatting code

**Prettier** owns formatting. Scope includes `src/`, `e2e/`, config files, and `index.html` (see `format` script in `package.json`).

```bash
npm run format        # fix all tracked patterns
npm run format:check  # fail if anything needs formatting
```

On commit, **lint-staged** runs Prettier then ESLint on staged `.ts`/`.tsx` files.

**ESLint** (flat config) enforces React, hooks, TypeScript, and **kebab-case file names** (`eslint-plugin-check-file`). Fix auto-fixable issues:

```bash
npm run lint:fix
```

---

## Testing

### Unit tests (Vitest + jsdom)

- Config: `vitest.config.ts`
- Setup: `src/test/setup.ts` (polyfills; **no MSW** in Free)
- Examples: `src/components/ui/__tests__/`, `src/hooks/__tests__/`

```bash
npm run test
npm run test:run
npm run test:coverage
```

### End-to-end (Playwright)

- Specs: `e2e/smoke.spec.ts`, `e2e/a11y.spec.ts`
- Config starts the dev server on `http://127.0.0.1:4173` unless already running

```bash
npx playwright install chromium   # first time only
npm run test:e2e
npm run test:e2e:ui
```

---

## Production build

```bash
npm run build
npm run preview
```

`build` fails on TypeScript errors before Vite emits assets. Deploy the `dist/` folder to any static host (S3, Netlify, Vercel, nginx, etc.).

---

## Troubleshooting

| Issue | What to try |
| ----- | ----------- |
| Layout flash or horizontal seam on refresh | Pull latest; app routes use internal scroll — loaders should use `flex-1 min-h-0`, not `min-h-screen` inside the shell. |
| Husky hooks not running | Re-run `npm install`; confirm `.husky/pre-commit` exists. |
| Playwright browser missing | `npx playwright install chromium` |
| `npm run check` fails on CRLF | `npm run format` once on Windows. |
| Port 5173 in use | Stop the other process or change `server.port` in `vite.config.ts`. |

---

## Metadata

Version and feature flags for tooling: `metadata.json` at the repo root.

For marketing copy and Pro comparison, see **[README.md](./README.md)**.
