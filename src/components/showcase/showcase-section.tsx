import * as React from 'react';
import { cn } from '@/lib/cn';

export interface ShowcaseSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
  code?: string;
  /** Stack demo children full-width (tables, forms). Omit for chip/button strip showcases. */
  block?: boolean;
}

/**
 * Single gallery section: title + optional description + example area + optional code snippet.
 * Used across every showcase page for consistent visual rhythm.
 */
export const ShowcaseSection = React.forwardRef<HTMLElement, ShowcaseSectionProps>(
  ({ title, description, code, className, children, block, ...props }, ref) => (
    <section
      ref={ref}
      className={cn('space-y-3 rounded-lg border border-border bg-card p-5 shadow-sm', className)}
      {...props}
    >
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      <div
        className={cn(
          'min-w-0 rounded-md border border-border bg-muted/40 p-4',
          block ? 'space-y-4' : 'flex flex-wrap items-start gap-3',
        )}
      >
        {children}
      </div>
      {code ? (
        <details className="group rounded-md border border-border bg-muted/30 text-xs">
          <summary className="cursor-pointer select-none px-3 py-2 font-medium text-muted-foreground group-open:text-foreground">
            Code
          </summary>
          <pre className="overflow-x-auto px-3 pb-3 pt-0 font-mono leading-relaxed">
            <code>{code}</code>
          </pre>
        </details>
      ) : null}
    </section>
  ),
);
ShowcaseSection.displayName = 'ShowcaseSection';
