import * as React from 'react';
import { Link, useMatches } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MoreHorizontal } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui';
import { useAppHeader } from '@/contexts/app-header-context';
import { cn } from '@/lib/cn';

type BreadcrumbResolver = string | ((data: unknown, params: Record<string, string>) => string);

interface RouteHandle {
  breadcrumb?: BreadcrumbResolver;
}

type Crumb = { to: string; label: string };

type DisplaySegment =
  | { kind: 'link'; crumb: Crumb }
  | { kind: 'page'; crumb: Crumb }
  | { kind: 'ellipsis-menu'; hidden: Crumb[] };

function resolveLabel(
  breadcrumb: BreadcrumbResolver | undefined,
  data: unknown,
  params: Record<string, string>,
): string | null {
  if (!breadcrumb) return null;
  if (typeof breadcrumb === 'string') return breadcrumb;
  try {
    return breadcrumb(data, params);
  } catch {
    return null;
  }
}

function toSegments(crumbs: Crumb[]): DisplaySegment[] {
  return crumbs.map((crumb, idx) =>
    idx === crumbs.length - 1 ? { kind: 'page' as const, crumb } : { kind: 'link' as const, crumb },
  );
}

function collapsedSegments(crumbs: Crumb[]): DisplaySegment[] {
  if (crumbs.length <= 3) return toSegments(crumbs);
  return [
    { kind: 'link', crumb: crumbs[0] },
    { kind: 'ellipsis-menu', hidden: crumbs.slice(1, -1) },
    { kind: 'page', crumb: crumbs[crumbs.length - 1] },
  ];
}

function BreadcrumbCollapsedMenu({ hidden }: { hidden: Crumb[] }) {
  const { t } = useTranslation();

  if (hidden.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0"
          aria-label={t('breadcrumb.showHidden', 'Show hidden breadcrumb levels')}
        >
          <MoreHorizontal className="h-4 w-4" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[10rem]">
        {hidden.map((crumb) => (
          <DropdownMenuItem key={crumb.to} asChild>
            <Link to={crumb.to} className="cursor-pointer">
              {crumb.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Trail({ segments, truncate }: { segments: DisplaySegment[]; truncate?: boolean }) {
  return (
    <>
      {segments.map((segment, idx) => {
        const isLast = idx === segments.length - 1;
        const key =
          segment.kind === 'ellipsis-menu'
            ? 'ellipsis-menu'
            : `${segment.crumb.to}-${segment.kind}`;

        return (
          <React.Fragment key={key}>
            <BreadcrumbItem className={cn(truncate && 'min-w-0 shrink')}>
              {segment.kind === 'ellipsis-menu' ? (
                <BreadcrumbCollapsedMenu hidden={segment.hidden} />
              ) : segment.kind === 'page' ? (
                <BreadcrumbPage className={cn(truncate && 'block truncate')}>
                  {segment.crumb.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  asChild
                  className={cn(truncate && 'block min-w-0 max-w-[9rem] truncate')}
                >
                  <Link to={segment.crumb.to}>{segment.crumb.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!isLast ? <BreadcrumbSeparator /> : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

function HeaderMobileTitle({ crumbs }: { crumbs: Crumb[] }) {
  const { t } = useTranslation();
  const { setMobileTitleVisible } = useAppHeader();
  const current = crumbs[crumbs.length - 1];
  const ancestors = crumbs.slice(0, -1);

  React.useEffect(() => {
    setMobileTitleVisible(true);
    return () => setMobileTitleVisible(false);
  }, [setMobileTitleVisible]);

  return (
    <nav
      className="flex min-w-0 flex-1 items-center gap-1 md:hidden"
      aria-label={t('common:breadcrumb', 'Breadcrumb')}
    >
      {ancestors.length > 0 ? <BreadcrumbCollapsedMenu hidden={ancestors} /> : null}
      <span className="min-w-0 truncate text-sm font-medium text-foreground" aria-current="page">
        {current.label}
      </span>
    </nav>
  );
}

function HeaderDesktopTrail({ crumbs, className }: { crumbs: Crumb[]; className?: string }) {
  const listClassName = 'min-w-0 flex-nowrap overflow-hidden';
  const collapse = crumbs.length > 3;

  return (
    <Breadcrumb className={cn('hidden min-w-0 flex-1 md:block', className)}>
      {collapse ? (
        <>
          <BreadcrumbList className={cn(listClassName, 'xl:hidden')}>
            <Trail segments={collapsedSegments(crumbs)} />
          </BreadcrumbList>
          <BreadcrumbList className={cn(listClassName, 'hidden xl:flex')}>
            <Trail segments={toSegments(crumbs)} truncate />
          </BreadcrumbList>
        </>
      ) : (
        <BreadcrumbList className={listClassName}>
          <Trail segments={toSegments(crumbs)} truncate />
        </BreadcrumbList>
      )}
    </Breadcrumb>
  );
}

export interface BreadcrumbsAutoProps {
  className?: string;
  /** Header bar: mobile title/back; tablet+ collapsed trail; xl full trail. */
  variant?: 'default' | 'header';
}

/**
 * Breadcrumbs derived from `react-router-dom` matches. Only shows routes that
 * declare `handle: { breadcrumb: string | fn }` in their route object.
 *
 * Intentionally static (no per-crumb motion): route transitions may animate the main outlet;
 * re-animating crumbs caused visible flicker when matches updated.
 */
export function BreadcrumbsAuto({ className, variant = 'default' }: BreadcrumbsAutoProps) {
  const matches = useMatches();
  const isHeader = variant === 'header';

  const crumbs = matches
    .map((m) => {
      const handle = m.handle as RouteHandle | undefined;
      const label = resolveLabel(handle?.breadcrumb, m.data, m.params as Record<string, string>);
      if (!label) return null;
      return { to: m.pathname, label };
    })
    .filter(Boolean) as Crumb[];

  if (crumbs.length === 0) return null;

  if (!isHeader) {
    return (
      <Breadcrumb className={className}>
        <BreadcrumbList>
          <Trail segments={toSegments(crumbs)} />
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <>
      <HeaderMobileTitle crumbs={crumbs} />
      <HeaderDesktopTrail crumbs={crumbs} className={className} />
    </>
  );
}
