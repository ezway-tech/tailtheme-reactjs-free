import * as React from 'react';
import { useAppHeader } from '@/contexts/app-header-context';
import { cn } from '@/lib/cn';

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Nodes rendered on the right side (e.g. primary/secondary buttons). */
  actions?: React.ReactNode;
  /** Optional breadcrumb slot rendered above the title. */
  breadcrumb?: React.ReactNode;
}

export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, description, actions, breadcrumb, className, ...props }, ref) => {
    const { mobileTitleVisible } = useAppHeader();

    return (
      <header
        ref={ref}
        className={cn('flex flex-col gap-4 border-b border-border pb-4', className)}
        {...props}
      >
        {breadcrumb ? <div className="-mb-1">{breadcrumb}</div> : null}
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1 space-y-1">
            <h1
              className={cn(
                'text-2xl font-semibold leading-tight text-foreground',
                mobileTitleVisible && 'max-md:sr-only',
              )}
            >
              {title}
            </h1>
            {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
          </div>
          {actions ? (
            <div className="flex flex-shrink-0 flex-wrap items-center gap-2">{actions}</div>
          ) : null}
        </div>
      </header>
    );
  },
);
PageHeader.displayName = 'PageHeader';
