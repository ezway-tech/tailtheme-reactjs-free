import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from 'lucide-react';
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
  { icon: React.ReactNode; iconClass: string; barClass: string }
> = {
  default: {
    icon: <Info className="h-5 w-5" aria-hidden />,
    iconClass: 'text-muted-foreground',
    barClass: 'bg-primary',
  },
  success: {
    icon: <CheckCircle2 className="h-5 w-5" aria-hidden />,
    iconClass: 'text-success-text',
    barClass: 'bg-success-text',
  },
  error: {
    icon: <AlertCircle className="h-5 w-5" aria-hidden />,
    iconClass: 'text-danger-text',
    barClass: 'bg-danger-text',
  },
  warning: {
    icon: <TriangleAlert className="h-5 w-5" aria-hidden />,
    iconClass: 'text-amber-600 dark:text-amber-400',
    barClass: 'bg-amber-500',
  },
  info: {
    icon: <Info className="h-5 w-5" aria-hidden />,
    iconClass: 'text-info',
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
 * Rendered payload for a custom sonner toast: icon, title/description, optional
 * action/cancel buttons, a close button, and a bottom-aligned countdown bar
 * animated across the toast's lifetime (paused while hovered).
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
  const { icon, iconClass, barClass } = TONE_STYLES[tone];
  const showBar = Number.isFinite(duration) && duration > 0;

  return (
    <div
      role="status"
      className={cn(
        'group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-md border border-border bg-popover p-3 pr-9 text-sm text-popover-foreground shadow-lg',
      )}
    >
      <div className={cn('mt-0.5 shrink-0', iconClass)}>{icon}</div>
      <div className="min-w-0 flex-1 space-y-0.5">
        <div className="font-medium leading-tight text-foreground">{message}</div>
        {description ? <div className="text-xs text-muted-foreground">{description}</div> : null}
        {action || cancel ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {action ? (
              <button
                type="button"
                className="rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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
                className="rounded-md border border-border bg-transparent px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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
        className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <X className="h-3.5 w-3.5" aria-hidden />
      </button>
      {showBar ? (
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left group-hover:[animation-play-state:paused]',
            barClass,
          )}
          style={{ animation: `toast-progress ${duration}ms linear forwards` }}
        />
      ) : null}
    </div>
  );
}
