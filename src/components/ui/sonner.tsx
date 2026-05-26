import type { CSSProperties } from 'react';
import { Toaster as SonnerToaster } from 'sonner';
import { useTheme } from '@/hooks/useTheme';
import { toast } from '@/lib/toast';

const TOASTER_WIDTH = 'min(100vw - 2rem, 26rem)';

export type { ToasterProps } from 'sonner';
export type { ToastOptions, ToastTone, ToastAction } from '@/lib/toast';

/**
 * Drop-in `<Toaster />` that reads the resolved theme from context so colors follow light/dark mode.
 * Custom toasts from `@/lib/toast` provide their own styling and progress bar, so we disable
 * sonner's default rich colors / close button to avoid visual duplication.
 * Prefer `ToastProvider` from `@/providers` at the app root; this one is exposed here for standalone usage / docs.
 */
export function Toaster({ style, ...props }: React.ComponentProps<typeof SonnerToaster>) {
  const { resolvedTheme } = useTheme();
  return (
    <SonnerToaster
      position="top-right"
      theme={resolvedTheme}
      gap={12}
      offset={16}
      mobileOffset={12}
      toastOptions={{ unstyled: true }}
      style={{ '--width': TOASTER_WIDTH, ...style } as CSSProperties}
      {...props}
    />
  );
}

export { toast };
