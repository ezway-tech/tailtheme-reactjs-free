import { ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TEMPLATE_PURCHASE_URL } from '@/config';
import { Button, SidebarGroup } from '@/components/ui';

const EXTERNAL_URL_PATTERN = /^https?:\/\//i;

export function SidebarPurchaseBanner() {
  const { t } = useTranslation();
  const isExternal = EXTERNAL_URL_PATTERN.test(TEMPLATE_PURCHASE_URL);

  const title = t('sidebar.purchase.title', 'Get the full template');
  const description = t(
    'sidebar.purchase.description',
    'Unlock all pages, components, and lifetime updates.',
  );
  const ctaLabel = t('sidebar.purchase.cta', 'Purchase plan');

  return (
    <SidebarGroup data-section="purchase">
      <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-3 group-data-[sidebar-state=collapsed]/sidebar:mx-auto group-data-[sidebar-state=collapsed]/sidebar:w-9 group-data-[sidebar-state=collapsed]/sidebar:border-transparent group-data-[sidebar-state=collapsed]/sidebar:bg-transparent group-data-[sidebar-state=collapsed]/sidebar:p-0">
        <div className="flex items-start gap-2 group-data-[sidebar-state=collapsed]/sidebar:hidden">
          <span
            aria-hidden
            className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary"
          >
            <ShoppingBag className="h-4 w-4" />
          </span>
          <div className="min-w-0 group-data-[sidebar-state=collapsed]/sidebar:hidden">
            <p className="text-sm font-semibold text-sidebar-foreground">{title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          </div>
        </div>

        <div className="mt-3 group-data-[sidebar-state=collapsed]/sidebar:hidden">
          <Button asChild size="sm" className="w-full">
            {isExternal ? (
              <a href={TEMPLATE_PURCHASE_URL} target="_blank" rel="noreferrer">
                {ctaLabel}
              </a>
            ) : (
              <Link to={TEMPLATE_PURCHASE_URL}>{ctaLabel}</Link>
            )}
          </Button>
        </div>

        <div className="hidden justify-center group-data-[sidebar-state=collapsed]/sidebar:flex">
          <Button
            asChild
            size="icon"
            variant="ghost"
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            aria-label={ctaLabel}
            title={ctaLabel}
          >
            {isExternal ? (
              <a href={TEMPLATE_PURCHASE_URL} target="_blank" rel="noreferrer">
                <ShoppingBag className="h-4 w-4" />
              </a>
            ) : (
              <Link to={TEMPLATE_PURCHASE_URL}>
                <ShoppingBag className="h-4 w-4" />
              </Link>
            )}
          </Button>
        </div>
      </div>
    </SidebarGroup>
  );
}
