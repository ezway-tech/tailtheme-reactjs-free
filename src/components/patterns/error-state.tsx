import * as React from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface ErrorStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ icon, title, description, action, className, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-lg border border-danger-border bg-danger-bg px-6 py-10 text-center',
        className,
      )}
      {...props}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-danger-text">
        {icon ?? <AlertTriangle className="h-6 w-6" aria-hidden />}
      </div>
      <div className="space-y-1">
        <p className="text-base font-semibold text-danger-text">{title}</p>
        {description ? <p className="max-w-sm text-sm text-danger-text/80">{description}</p> : null}
      </div>
      {action ? <div className="mt-2 flex items-center gap-2">{action}</div> : null}
    </div>
  ),
);
ErrorState.displayName = 'ErrorState';
