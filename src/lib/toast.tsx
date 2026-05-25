import * as React from 'react';
import { toast as sonnerToast, type ExternalToast } from 'sonner';
import { ProgressToast, type ToastAction, type ToastTone } from './progress-toast';

export type { ToastAction, ToastTone } from './progress-toast';

/**
 * Options accepted by `toast(...)` and its variants. Mirrors the subset of
 * sonner's `ExternalToast` we care about, but with stronger typing on
 * `action` / `cancel` (sonner also allows raw JSX which we don't use here).
 */
export interface ToastOptions extends Omit<ExternalToast, 'description' | 'action' | 'cancel'> {
  description?: React.ReactNode;
  action?: ToastAction;
  cancel?: ToastAction;
}

const DEFAULT_DURATION = 4000;

function fireProgressToast(tone: ToastTone, message: React.ReactNode, options?: ToastOptions) {
  const duration = options?.duration ?? DEFAULT_DURATION;
  const { description, action, cancel, ...rest } = options ?? {};
  return sonnerToast.custom(
    (id) => (
      <ProgressToast
        id={id}
        tone={tone}
        message={message}
        description={description}
        duration={duration}
        action={action}
        cancel={cancel}
      />
    ),
    { duration, ...rest },
  );
}

type ToastFn = (message: React.ReactNode, options?: ToastOptions) => string | number;

const baseToast: ToastFn = (message, options) => fireProgressToast('default', message, options);

/**
 * Drop-in replacement for sonner's `toast` that renders a polished card with a
 * countdown progress bar at the bottom (pauses on hover). Same call signature
 * as sonner — `toast(msg)`, `toast.success(msg, { description })`, etc.
 *
 * Pass-through methods (`loading`, `promise`, `dismiss`, `custom`, `getToasts`,
 * `getHistory`) delegate directly to sonner so existing flows keep working.
 */
export const toast = Object.assign(baseToast, {
  message: baseToast,
  default: baseToast,
  success: ((message, options) => fireProgressToast('success', message, options)) as ToastFn,
  error: ((message, options) => fireProgressToast('error', message, options)) as ToastFn,
  warning: ((message, options) => fireProgressToast('warning', message, options)) as ToastFn,
  info: ((message, options) => fireProgressToast('info', message, options)) as ToastFn,
  loading: sonnerToast.loading,
  promise: sonnerToast.promise,
  dismiss: sonnerToast.dismiss,
  custom: sonnerToast.custom,
  getToasts: sonnerToast.getToasts,
  getHistory: sonnerToast.getHistory,
});

export type Toast = typeof toast;
