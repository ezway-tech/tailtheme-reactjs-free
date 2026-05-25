import * as React from 'react';
import { cn } from '@/lib/cn';

/** Max-width presets for app page body wrappers inside `AppShell`. */
export type PageContentWidth = 'full' | 'feed' | 'content' | 'narrow';

export const pageContentWidthClassName: Record<PageContentWidth, string> = {
  /** Dashboards, data tables, multi-column layouts. */
  full: 'w-full',
  /** Social timelines and card stacks — centered, readable (~768px). */
  feed: 'mx-auto w-full max-w-3xl',
  /** Chat threads and long-form reading (~896px). */
  content: 'mx-auto w-full max-w-4xl',
  /** Settings panels and wizards (~768px, same rhythm as feed). */
  narrow: 'mx-auto w-full max-w-3xl',
};

export interface PageContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Horizontal layout preset.
   * @default 'full'
   */
  width?: PageContentWidth;
}

/**
 * Standard wrapper for themed app pages. Prefer presets over ad-hoc `max-w-*`
 * so feed-style pages stay moderately narrow inside `AppShell`.
 */
export const PageContent = React.forwardRef<HTMLDivElement, PageContentProps>(
  ({ width = 'full', className, ...props }, ref) => (
    <div ref={ref} className={cn(pageContentWidthClassName[width], className)} {...props} />
  ),
);
PageContent.displayName = 'PageContent';
