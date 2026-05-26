import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

export const alertVariants = cva(
  'relative grid w-full grid-cols-[auto_1fr] items-start gap-x-3 gap-y-1 rounded-lg border px-4 py-3.5 text-sm [&>svg]:row-span-2 [&>svg]:box-content [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:self-center [&>svg]:rounded-full [&>svg]:p-2.5',
  {
    variants: {
      variant: {
        info: 'border-info-200 bg-info-50 text-info-900 [&>svg]:bg-info-100 [&>svg]:text-info-700',
        success:
          'border-success-200 bg-success-50 text-success-900 [&>svg]:bg-success-100 [&>svg]:text-success-700',
        warning:
          'border-warning-200 bg-warning-50 text-warning-900 [&>svg]:bg-warning-100 [&>svg]:text-warning-700',
        danger:
          'border-danger-200 bg-danger-50 text-danger-900 [&>svg]:bg-danger-100 [&>svg]:text-danger-700',
        neutral:
          'border-input bg-card text-foreground shadow-sm [&>svg]:bg-muted [&>svg]:text-foreground',
      },
    },
    defaultVariants: { variant: 'info' },
  },
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  ),
);
Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm leading-relaxed opacity-90 [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';
