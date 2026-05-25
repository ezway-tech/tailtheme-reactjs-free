import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui';
import { ErrorState } from '@/components/patterns';
import { urls } from '@/routes/urls';

export default function ForbiddenPage() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <ErrorState
        icon={<ShieldAlert className="h-6 w-6" />}
        title={t('pages.errors.forbidden.title', '403 — Access denied')}
        description={t(
          'pages.errors.forbidden.description',
          "You don't have permission to view this page.",
        )}
        action={
          <Button asChild variant="outline">
            <Link to={urls.app.dashboard}>Back to dashboard</Link>
          </Button>
        }
      />
    </div>
  );
}
