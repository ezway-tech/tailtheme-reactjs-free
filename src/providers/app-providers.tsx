import type { ReactNode } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { COLOR_MODE_STORAGE_KEY, DEFAULT_COLOR_MODE } from '@/config';
import { PreferencesProvider } from './preferences-provider';
import { ThemeProvider } from './theme-provider';
import { ToastProvider } from './toast-provider';
import '@/i18n';

export interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Root-level provider composition. Order (top → bottom):
 * PreferencesProvider → ThemeProvider → Tooltip → children → ToastProvider.
 * The CommandPaletteProvider is mounted inside the router in `App.tsx`
 * because it needs access to `useNavigate`.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <PreferencesProvider>
      <ThemeProvider defaultTheme={DEFAULT_COLOR_MODE} storageKey={COLOR_MODE_STORAGE_KEY}>
        <TooltipPrimitive.Provider delayDuration={200}>
          {children}
          <ToastProvider />
        </TooltipPrimitive.Provider>
      </ThemeProvider>
    </PreferencesProvider>
  );
}
