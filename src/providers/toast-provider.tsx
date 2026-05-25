import { Toaster as SonnerToaster } from 'sonner';
import { useTheme } from '@/hooks/useTheme';

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
  return <SonnerToaster position="top-right" theme={resolvedTheme} className="font-sans" />;
}
