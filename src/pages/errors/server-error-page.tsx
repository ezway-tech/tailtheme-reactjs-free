import { useTranslation } from 'react-i18next';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui';
import { ErrorState } from '@/components/patterns';

export default function ServerErrorPage() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <ErrorState
        title={t('pages.errors.server.title', '500 — Something broke')}
        description={t(
          'pages.errors.server.description',
          'An unexpected error occurred. Our team has been notified.',
        )}
        action={
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="h-3.5 w-3.5" />
            {t('actions:retry', 'Retry')}
          </Button>
        }
      />
    </div>
  );
}
