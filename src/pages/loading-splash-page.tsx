import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { APP_TITLE } from '@/config';

/**
 * Route-level Suspense fallback inside {@link AppShell}. Fills the main column
 * (`flex-1 min-h-0`) — do not use `min-h-screen` here or the splash overflows the
 * shell scrollport and can flash a horizontal seam on refresh.
 */
export default function LoadingSplashPage() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 bg-background p-6 text-center">
      <div className="flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-background shadow-lg ring-1 ring-border">
        <img src="/tailtheme.png" alt={`${APP_TITLE} logo`} className="h-10 w-10 object-contain" />
      </div>
      <div>
        <h1 className="text-xl font-semibold">{APP_TITLE}</h1>
        <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          {t('common:loading', 'Loading…')}
        </p>
      </div>
    </div>
  );
}
