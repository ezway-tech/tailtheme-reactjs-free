import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  size?: 'sm' | 'default' | 'lg';
}

const sizeMap = {
  sm: 'h-4 w-4',
  default: 'h-6 w-6',
  lg: 'h-8 w-8',
} as const;

export const LoadingState = React.forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ label, size = 'default', className, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className={cn(
        'flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground',
        className,
      )}
      {...props}
    >
      <Loader2 className={cn('animate-spin text-foreground', sizeMap[size])} aria-hidden />
      {label ? <p className="text-sm">{label}</p> : null}
    </div>
  ),
);
LoadingState.displayName = 'LoadingState';
