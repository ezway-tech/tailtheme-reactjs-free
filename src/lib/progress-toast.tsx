import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Check, Info, TriangleAlert, X } from 'lucide-react';
import { toast as sonnerToast } from 'sonner';
import { cn } from './cn';

/** Semantic tones for the progress toast UI. */
export type ToastTone = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface ToastAction {
  label: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const TONE_STYLES: Record<
  ToastTone,
  {
    icon: React.ReactNode;
    iconWrapClass: string;
    titleClass: string;
    barClass: string;
  }
> = {
  default: {
    icon: <Info className="size-[18px]" strokeWidth={2.5} aria-hidden />,
    iconWrapClass: 'bg-primary text-primary-foreground',
    titleClass: 'text-foreground',
    barClass: 'bg-primary',
  },
  success: {
    icon: <Check className="size-[18px]" strokeWidth={2.75} aria-hidden />,
    iconWrapClass: 'bg-success-text text-primary-foreground',
    titleClass: 'text-success-text',
    barClass: 'bg-success-text',
  },
  error: {
    icon: <AlertCircle className="size-[18px]" strokeWidth={2.5} aria-hidden />,
    iconWrapClass: 'bg-danger-text text-primary-foreground',
    titleClass: 'text-danger-text',
    barClass: 'bg-danger-text',
  },
  warning: {
    icon: <TriangleAlert className="size-[18px]" strokeWidth={2.5} aria-hidden />,
    iconWrapClass: 'bg-warning-600 text-primary-foreground',
    titleClass: 'text-warning-700 dark:text-warning-400',
    barClass: 'bg-warning-600',
  },
  info: {
    icon: <Info className="size-[18px]" strokeWidth={2.5} aria-hidden />,
    iconWrapClass: 'bg-info text-primary-foreground',
    titleClass: 'text-info',
    barClass: 'bg-info',
  },
};

export interface ProgressToastProps {
  id: string | number;
  tone: ToastTone;
  message: React.ReactNode;
  description?: React.ReactNode;
  duration: number;
  action?: ToastAction;
  cancel?: ToastAction;
}

/**
 * Custom sonner toast: white card, filled tone icon, colored title, optional
 * actions, dismiss control, and a visible bottom progress track (pauses on hover).
 */
export function ProgressToast({
  id,
  tone,
  message,
  description,
  duration,
  action,
  cancel,
}: ProgressToastProps) {
  const { t } = useTranslation();
  const { icon, iconWrapClass, titleClass, barClass } = TONE_STYLES[tone];
  const showBar = Number.isFinite(duration) && duration > 0;
  const hasFooterActions = Boolean(action || cancel);

  return (
    <div
      role="status"
      className="group pointer-events-auto flex w-full max-w-full flex-col overflow-hidden rounded-lg border border-input bg-card shadow-md"
    >
      <div
        className={cn(
          'relative flex gap-3.5 px-4 py-3.5 pr-10',
          hasFooterActions ? 'items-start' : 'items-center',
        )}
      >
        <div
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-full shadow-sm',
            iconWrapClass,
            hasFooterActions && 'mt-0.5',
          )}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className={cn('text-sm font-semibold leading-tight', titleClass)}>{message}</div>
          {description ? (
            <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</div>
          ) : null}
          {hasFooterActions ? (
            <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
              {action ? (
                <button
                  type="button"
                  className="rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  onClick={(event) => {
                    action.onClick(event);
                    sonnerToast.dismiss(id);
                  }}
                >
                  {action.label}
                </button>
              ) : null}
              {cancel ? (
                <button
                  type="button"
                  className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  onClick={(event) => {
                    cancel.onClick(event);
                    sonnerToast.dismiss(id);
                  }}
                >
                  {cancel.label}
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
        <button
          type="button"
          aria-label={t('actions.close', 'Close')}
          onClick={() => sonnerToast.dismiss(id)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <X className="size-3.5" strokeWidth={2} aria-hidden />
        </button>
      </div>
      {showBar ? (
        <div
          className="toast-progress-track border-t border-border/80"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t('toast.timeRemaining', 'Time remaining')}
        >
          <span
            className={cn('toast-progress-fill', barClass)}
            style={{ '--toast-duration': `${duration}ms` } as React.CSSProperties}
          />
        </div>
      ) : null}
    </div>
  );
}
