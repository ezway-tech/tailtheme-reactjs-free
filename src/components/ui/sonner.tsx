import { Toaster as SonnerToaster } from 'sonner';
import { useTheme } from '@/hooks/useTheme';
import { toast } from '@/lib/toast';

export type { ToasterProps } from 'sonner';
export type { ToastOptions, ToastTone, ToastAction } from '@/lib/toast';

/**
 * Drop-in `<Toaster />` that reads the resolved theme from context so colors follow light/dark mode.
 * Custom toasts from `@/lib/toast` provide their own styling and progress bar, so we disable
 * sonner's default rich colors / close button to avoid visual duplication.
 * Prefer `ToastProvider` from `@/providers` at the app root; this one is exposed here for standalone usage / docs.
 */
export function Toaster(props: React.ComponentProps<typeof SonnerToaster>) {
  const { resolvedTheme } = useTheme();
  return <SonnerToaster position="top-right" theme={resolvedTheme} {...props} />;
}

export { toast };
