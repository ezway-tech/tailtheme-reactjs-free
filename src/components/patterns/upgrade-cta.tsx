import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TEMPLATE_PURCHASE_URL } from '@/config';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { urls } from '@/routes/urls';

const EXTERNAL_URL_PATTERN = /^https?:\/\//i;

export interface UpgradeCtaProps {
  title?: string;
  description?: string;
  className?: string;
}

/** Reusable Lite upgrade card linking to Pro purchase or in-app comparison. */
export function UpgradeCta({
  title = 'Upgrade to TailTheme Pro',
  description = 'Unlock every dashboard, vertical, UI primitive, i18n, and lifetime updates.',
  className,
}: UpgradeCtaProps) {
  const isExternal = EXTERNAL_URL_PATTERN.test(TEMPLATE_PURCHASE_URL);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-start gap-3 space-y-0">
        <span
          aria-hidden
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
        >
          <Sparkles className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription className="mt-1">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Button asChild>
          {isExternal ? (
            <a href={TEMPLATE_PURCHASE_URL} target="_blank" rel="noreferrer">
              Get Pro
            </a>
          ) : (
            <Link to={TEMPLATE_PURCHASE_URL}>Get Pro</Link>
          )}
        </Button>
        <Button asChild variant="outline">
          <Link to={urls.app.upgrade}>Compare Free vs Pro</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
