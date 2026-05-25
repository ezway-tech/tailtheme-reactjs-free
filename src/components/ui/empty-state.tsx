import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  AlertTriangle,
  CheckCircle2,
  Inbox,
  Info,
  Lock,
  SearchX,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Visual presets for the EmptyState icon ring. Each variant maps to a
 * semantic theme color and a default lucide icon — override with `icon`
 * if you need something specific to your domain.
 */
export const emptyStateVariants = cva('flex h-12 w-12 items-center justify-center rounded-full', {
  variants: {
    variant: {
      'no-data': 'bg-muted text-muted-foreground',
      'no-results': 'bg-muted text-muted-foreground',
      'no-permission': 'bg-warning-100 text-warning-700',
      error: 'bg-danger-100 text-danger-700',
      success: 'bg-success-100 text-success-700',
      info: 'bg-info-100 text-info-700',
    },
  },
  defaultVariants: { variant: 'no-data' },
});

export type EmptyStateVariant = NonNullable<VariantProps<typeof emptyStateVariants>['variant']>;

const DEFAULT_ICONS: Record<EmptyStateVariant, LucideIcon> = {
  'no-data': Inbox,
  'no-results': SearchX,
  'no-permission': Lock,
  error: AlertTriangle,
  success: CheckCircle2,
  info: Info,
};

/** Lucide icon component (forward-ref). */
type IconComponent = LucideIcon;

export interface EmptyStateProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof emptyStateVariants> {
  /** Headline shown directly under the icon. */
  title: React.ReactNode;
  /** Optional helper paragraph between the title and actions. */
  description?: React.ReactNode;
  /**
   * Override the default lucide icon. Accepts either a Lucide component
   * (e.g. `icon={Inbox}`) or a custom React node (e.g. `icon={<MyIcon />}`).
   */
  icon?: IconComponent | React.ReactNode;
  /** Primary + secondary CTAs row — usually `<Button>` instances. */
  actions?: React.ReactNode;
  /**
   * Single CTA. Backward-compatible alias for `actions` so existing
   * `<EmptyState action={<Button/>}>` callers keep working.
   */
  action?: React.ReactNode;
  /** Wrap the icon ring with a custom node (escape hatch for illustrations). */
  illustration?: React.ReactNode;
  /**
   * Render a dashed border around the whole block. Defaults to `true` when
   * no variant is provided — preserves the legacy patterns/empty-state look.
   */
  bordered?: boolean;
}

/**
 * Reusable empty / status placeholder. Drop inside cards, tables or full
 * pages when there is no data, no results, missing permission, an error or
 * a celebratory success.
 *
 * Backward-compatible with the legacy `EmptyState` from `@/components/patterns`
 * — old call sites using `icon={<MyIcon />}` and `action={<Button/>}` keep
 * working without any changes.
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      variant,
      title,
      description,
      icon,
      actions,
      action,
      illustration,
      bordered,
      className,
      ...rest
    },
    ref,
  ) => {
    const resolvedVariant: EmptyStateVariant = variant ?? 'no-data';
    const showBorder = bordered ?? variant === undefined;
    const iconNode = renderIcon(icon, DEFAULT_ICONS[resolvedVariant]);
    const cta = actions ?? action;

    return (
      <div
        ref={ref}
        role="status"
        className={cn(
          'flex flex-col items-center justify-center gap-3 rounded-lg px-6 py-10 text-center',
          showBorder && 'border border-dashed border-border bg-surface',
          className,
        )}
        {...rest}
      >
        {illustration ?? (
          <div className={cn(emptyStateVariants({ variant: resolvedVariant }))}>{iconNode}</div>
        )}
        <div className="space-y-1">
          <p className="text-base font-semibold text-foreground">{title}</p>
          {description ? (
            <p className="mx-auto max-w-md text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {cta ? (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">{cta}</div>
        ) : null}
      </div>
    );
  },
);
EmptyState.displayName = 'EmptyState';

function renderIcon(
  icon: IconComponent | React.ReactNode | undefined,
  Fallback: IconComponent,
): React.ReactNode {
  if (icon === undefined || icon === null) {
    return <Fallback className="h-6 w-6" aria-hidden />;
  }
  if (typeof icon === 'function' || (typeof icon === 'object' && 'render' in (icon as object))) {
    const Icon = icon as IconComponent;
    return <Icon className="h-6 w-6" aria-hidden />;
  }
  return icon;
}
