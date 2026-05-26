import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppLogo } from '@/components/patterns';
import { APP_TITLE } from '@/config';
import { urls } from '@/routes/urls';

export default function AuthLayout() {
  const { t } = useTranslation();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/5 p-4">
      <header className="absolute left-0 right-0 top-0 flex items-center justify-between px-6 py-4">
        <Link to={urls.landing} className="flex items-center gap-2.5">
          <AppLogo className="h-8 w-8 min-h-8 min-w-8" alt={APP_TITLE} />
          <span className="text-sm font-semibold">{APP_TITLE}</span>
        </Link>
        <Link
          to={urls.landing}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {t('pages.auth.backToLanding', 'Back to landing')}
        </Link>
      </header>
      <main id="main-content" className="w-full max-w-md">
        <Outlet />
      </main>
      <footer className="absolute bottom-4 text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {APP_TITLE}
      </footer>
    </div>
  );
}
