import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { COLOR_MODE_STORAGE_KEY, DEFAULT_COLOR_MODE } from '@/config';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  ThemeContext,
  type ResolvedTheme,
  type Theme,
  type ThemeContextValue,
} from '@/hooks/useTheme';

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  /** Attribute to toggle on the root element. Defaults to `class`. */
  attribute?: 'class' | 'data-theme';
}

function readStoredTheme(storageKey: string, fallback: Theme): Theme {
  if (typeof window === 'undefined') return fallback;
  const stored = window.localStorage.getItem(storageKey);
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  return fallback;
}

function applyTheme(next: ResolvedTheme): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(next);
  root.setAttribute('data-theme', next);
}

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_COLOR_MODE,
  storageKey = COLOR_MODE_STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => readStoredTheme(storageKey, defaultTheme));
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const systemTheme: ResolvedTheme = prefersDark ? 'dark' : 'light';
  const resolvedTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = useCallback(
    (next: Theme) => {
      const persist = () => {
        setThemeState(next);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(storageKey, next);
        }
      };

      const docAny =
        typeof document === 'undefined'
          ? null
          : (document as Document & {
              startViewTransition?: (cb: () => void) => {
                ready: Promise<void>;
                finished: Promise<void>;
                updateCallbackDone: Promise<void>;
              };
            });

      const reducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (docAny?.startViewTransition && !reducedMotion) {
        docAny.startViewTransition(persist);
      } else {
        persist();
      }
    },
    [storageKey],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
