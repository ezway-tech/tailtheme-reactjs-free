import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { APP_TITLE } from '@/config';

/**
 * Full-screen splash / bootstrap screen. Swap out the static copy for your
 * own loading state when integrating with data fetching.
 */
export default function LoadingSplashPage() {
  const { t } = useTranslation();
  return (
    <div
      data-route-loading
      className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-br from-primary/10 via-background to-accent/5 p-6 text-center"
    >
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
