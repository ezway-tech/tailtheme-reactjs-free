import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface ThreeColumnLayoutProps {
  /** Narrow list column (inbox, file tree). */
  list: ReactNode;
  /** Primary content (thread, preview). */
  main: ReactNode;
  /** Optional right rail (metadata, actions). */
  detail?: ReactNode;
  className?: string;
  listClassName?: string;
  mainClassName?: string;
  detailClassName?: string;
}

/**
 * Three-column shell: list | main | optional detail.
 * Stacks on mobile (list hidden when detail-only patterns apply at page level).
 */
export function ThreeColumnLayout({
  list,
  main,
  detail,
  className,
  listClassName,
  mainClassName,
  detailClassName,
}: ThreeColumnLayoutProps) {
  return (
    <div
      className={cn(
        'grid min-h-[min(70vh,720px)] gap-0 overflow-hidden rounded-lg border border-border bg-card',
        detail ? 'lg:grid-cols-[280px_1fr_300px]' : 'lg:grid-cols-[280px_1fr]',
        className,
      )}
    >
      <aside className={cn('border-b border-border lg:border-b-0 lg:border-r', listClassName)}>
        {list}
      </aside>
      <section className={cn('min-w-0 flex flex-col', mainClassName)}>{main}</section>
      {detail ? (
        <aside
          className={cn(
            'hidden border-t border-border lg:block lg:border-t-0 lg:border-l',
            detailClassName,
          )}
        >
          {detail}
        </aside>
      ) : null}
    </div>
  );
}
