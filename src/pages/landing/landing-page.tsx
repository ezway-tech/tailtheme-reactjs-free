import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Palette, Sparkles } from 'lucide-react';
import { Badge, Button } from '@/components/ui';
import { AppLogo, SkipLink } from '@/components/patterns';
import { urls } from '@/routes/urls';
import { TAILTHEME_DEMO_URL, TAILTHEME_WEB_URL, TEMPLATE_PURCHASE_URL } from '@/config';

const FEATURES = [
  {
    icon: Palette,
    title: 'Design tokens',
    description: 'Semantic CSS variables with four preset palettes in Lite.',
  },
  {
    icon: Layers,
    title: 'Dashboards & pages',
    description: 'Three dashboards plus SaaS and Project vertical samples.',
  },
  {
    icon: Sparkles,
    title: '30 UI primitives',
    description: 'Radix + CVA + Tailwind v4 — enough to ship a real product shell.',
  },
] as const;

/** Lite marketing landing — hero, three features, upgrade footer. */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SkipLink />
      <header className="border-b border-input bg-card/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
          <Link to={urls.landing} className="flex items-center gap-2">
            <AppLogo />
            <span className="text-sm font-semibold">TailTheme Free</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to={urls.auth.login}>Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link to={urls.app.dashboard}>
                Open app
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="border-b border-input bg-primary px-4 py-16 text-primary-foreground md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-4 border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground"
            >
              MIT · React 19 · Tailwind v4
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              Ship faster with TailTheme Free
            </h1>
            <p className="mt-4 text-base text-primary-foreground/90 md:text-lg">
              Open-source starter with dashboards, sample pages, styling tokens, core components,
              and example layouts. Upgrade to Pro for every vertical and commercial license.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to={urls.app.dashboard}>Open app</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href={TAILTHEME_DEMO_URL} target="_blank" rel="noreferrer">
                  Live demo
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href={TEMPLATE_PURCHASE_URL} target="_blank" rel="noreferrer">
                  Get Pro
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-center text-2xl font-semibold text-foreground">
            What&apos;s included
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-lg border border-input bg-card p-6 shadow-sm">
                <span
                  aria-hidden
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-input bg-muted/30 px-4 py-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <h2 className="text-xl font-semibold text-foreground">Need the full template?</h2>
            <p className="text-sm text-muted-foreground">
              Pro adds 9+ dashboards, every vertical, 40+ primitives, i18n, and lifetime updates.
            </p>
            <Button asChild>
              <a href={TEMPLATE_PURCHASE_URL} target="_blank" rel="noreferrer">
                View TailTheme Pro
              </a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-input px-4 py-8 text-center text-xs text-muted-foreground">
        TailTheme Free · MIT ·{' '}
        <a href={TAILTHEME_WEB_URL} className="underline hover:text-foreground">
          tailtheme.ezway.tech
        </a>
      </footer>
    </div>
  );
}
