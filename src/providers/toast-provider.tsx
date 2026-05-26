import type { CSSProperties } from 'react';
import { Toaster as SonnerToaster } from 'sonner';
import { useTheme } from '@/hooks/use-theme';

/** Matches ProgressToast card width; sonner defaults to 356px and causes right-edge overflow. */
const TOASTER_WIDTH = 'min(100vw - 2rem, 26rem)';

/**
 * Sonner `<Toaster />` wrapped so that `theme` follows our resolved theme.
 * Render once at the app root (see `AppProviders`).
 *
 * Custom toasts fired via `toast` from `@/lib/toast` bring their own markup
 * and a countdown progress bar, so sonner's built-in `richColors` /
 * `closeButton` are disabled to avoid visual duplication.
 */
export function ToastProvider() {
  const { resolvedTheme } = useTheme();
  return (
    <SonnerToaster
      position="top-right"
      theme={resolvedTheme}
      className="font-sans"
      gap={12}
      offset={16}
      mobileOffset={12}
      toastOptions={{ unstyled: true }}
      style={{ '--width': TOASTER_WIDTH } as CSSProperties}
    />
  );
}
