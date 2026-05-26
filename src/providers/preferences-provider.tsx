import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { PREFERENCES_STORAGE_KEY } from '@/config';
import {
  DEFAULT_PREFERENCES,
  PreferencesContext,
  type Preferences,
  type PreferencesContextValue,
} from '@/hooks/use-preferences';
import { generateScaleFromString } from '@/lib/color-scale';

/**
 * Static fallback for the destructive (danger) ramp anchor. The shell currently
 * does not expose a danger HSL preference, so we generate the danger scale from
 * a well-known crimson hue and let components consume `--color-danger-*`.
 */
const DANGER_ANCHOR = '0 78% 45%';

/**
 * Write a Tailwind-style 50–950 scale to the document root. Each shade is set
 * as a `hsl(...)` CSS variable plus a `*-hsl` alias holding the raw triple,
 * so consumers can compose the two with `hsl(var(--color-x-100-hsl) / 0.5)`.
 */
function applyScale(root: HTMLElement, family: string, anchor: string): void {
  const scale = generateScaleFromString(anchor);
  if (!scale) return;
  for (const [shade, triple] of Object.entries(scale)) {
    root.style.setProperty(`--color-${family}-${shade}-hsl`, triple);
    root.style.setProperty(`--color-${family}-${shade}`, `hsl(${triple})`);
  }
}

export interface PreferencesProviderProps {
  children: ReactNode;
}

function readStored(): Preferences {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
  try {
    const raw = window.localStorage.getItem(PREFERENCES_STORAGE_KEY);
    if (!raw) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(raw) as Partial<Preferences> & Record<string, unknown>;
    delete parsed.motionIntensity;
    delete parsed.pageTransitionStyle;
    delete parsed.reducedMotion;
    const layout = parsed.layout;
    if (layout !== 'sidebar' && layout !== 'top-nav' && layout !== 'compact') {
      parsed.layout = DEFAULT_PREFERENCES.layout;
    }
    return { ...DEFAULT_PREFERENCES, ...parsed };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

function applyToRoot(prefs: Preferences) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  root.style.setProperty('--color-primary', `hsl(${prefs.primaryHsl})`);
  root.style.setProperty('--color-brand', `hsl(${prefs.primaryHsl})`);
  root.style.setProperty('--color-ring', `hsl(${prefs.primaryHsl})`);
  root.style.setProperty('--color-accent', `hsl(${prefs.accentHsl})`);

  // Status channels — every preset retints success/warning/info so badges,
  // alerts, and status ramps respond when the customizer changes preset.
  root.style.setProperty('--color-success', `hsl(${prefs.successHsl})`);
  root.style.setProperty('--color-success-text', `hsl(${prefs.successHsl})`);
  root.style.setProperty('--color-warning', `hsl(${prefs.warningHsl})`);
  root.style.setProperty('--color-info', `hsl(${prefs.infoHsl})`);

  // Sidebar primary follows preset (defaults to brand if preset omits it).
  root.style.setProperty('--color-sidebar-primary', `hsl(${prefs.sidebarPrimaryHsl})`);
  root.style.setProperty('--color-sidebar-ring', `hsl(${prefs.sidebarPrimaryHsl})`);

  // Chart series — first two slots track presets, remaining slots stay on the
  // static palette so chart legends keep enough variety.
  root.style.setProperty('--color-chart-1', `hsl(${prefs.chart1Hsl})`);
  root.style.setProperty('--color-chart-2', `hsl(${prefs.chart2Hsl})`);

  // Generate Tailwind-style 50–950 scales for the brand and status families.
  // Components can opt into them via `--color-primary-100`, `--color-success-200`, etc.
  applyScale(root, 'primary', prefs.primaryHsl);
  applyScale(root, 'accent', prefs.accentHsl);
  applyScale(root, 'success', prefs.successHsl);
  applyScale(root, 'warning', prefs.warningHsl);
  applyScale(root, 'info', prefs.infoHsl);
  applyScale(root, 'danger', DANGER_ANCHOR);

  // Backwards-compatible aliases — the legacy single-tone tokens point at the
  // freshly-generated scale stops so existing components keep rendering while
  // new components can target the granular shade variables.
  root.style.setProperty('--color-success-bg', `hsl(var(--color-success-50-hsl))`);
  root.style.setProperty('--color-success-border', `hsl(var(--color-success-100-hsl))`);
  root.style.setProperty('--color-success-text', `hsl(var(--color-success-700-hsl))`);
  root.style.setProperty('--color-danger-bg', `hsl(var(--color-danger-50-hsl))`);
  root.style.setProperty('--color-danger-border', `hsl(var(--color-danger-100-hsl))`);
  root.style.setProperty('--color-danger-text', `hsl(var(--color-danger-700-hsl))`);

  root.style.setProperty('--radius', `${prefs.radius}rem`);

  const fontMap: Record<Preferences['fontFamily'], string> = {
    inter: "'Inter', ui-sans-serif, system-ui, sans-serif",
    outfit: "'Outfit', ui-sans-serif, system-ui, sans-serif",
    system: 'ui-sans-serif, system-ui, sans-serif',
  };
  root.style.setProperty('--font-sans', fontMap[prefs.fontFamily]);

  // UI scale: update the html base font-size so every rem in the app scales
  // proportionally. 100% → 16px baseline.
  const scale = Math.max(75, Math.min(150, prefs.uiScale || 100));
  root.style.setProperty('--ui-scale', String(scale / 100));
  root.style.fontSize = `${(scale / 100) * 16}px`;

  root.dataset.layout = prefs.layout;
  root.dir = prefs.rtl ? 'rtl' : 'ltr';
}

export function PreferencesProvider({ children }: PreferencesProviderProps) {
  const [preferences, setPreferencesState] = useState<Preferences>(readStored);

  useEffect(() => {
    applyToRoot(preferences);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
    }
  }, [preferences]);

  const setPreferences = useCallback((partial: Partial<Preferences>) => {
    setPreferencesState((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferencesState(DEFAULT_PREFERENCES);
  }, []);

  const toggleSidebar = useCallback(() => {
    setPreferencesState((prev) => ({
      ...prev,
      sidebarState: prev.sidebarState === 'expanded' ? 'collapsed' : 'expanded',
    }));
  }, []);

  const value = useMemo<PreferencesContextValue>(
    () => ({ preferences, setPreferences, resetPreferences, toggleSidebar }),
    [preferences, setPreferences, resetPreferences, toggleSidebar],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}
