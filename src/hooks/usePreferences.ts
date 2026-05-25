import { createContext, useContext } from 'react';
import { DEFAULT_PREFERENCES_VALUES, PRESET_PALETTES, UI_SCALE_STEPS } from '@/config';

export type LayoutVariant = 'sidebar' | 'top-nav' | 'compact';
export type FontFamily = 'inter' | 'outfit' | 'system';
export type SidebarState = 'expanded' | 'collapsed' | 'offcanvas';
/** Decorative motion tier for consumers of {@link useMotionPrefs} (not tied to route transitions). */
export type MotionIntensity = 'subtle' | 'standard' | 'expressive';

export interface Preferences {
  layout: LayoutVariant;
  /** Base radius in rem. */
  radius: number;
  fontFamily: FontFamily;
  /** UI scale as percentage (90 = 90%, 100 = 100%, 125 = 125%). Scales the html base font-size, which affects every rem-based value. */
  uiScale: number;
  /** Brand / interactive base — drives buttons, focus rings, primary surfaces. */
  primaryHsl: string;
  /** Secondary highlight — used for accents and complementary fills. */
  accentHsl: string;
  /** Success status hue. */
  successHsl: string;
  /** Warning status hue. */
  warningHsl: string;
  /** Info status hue. */
  infoHsl: string;
  /** Sidebar primary tint — defaults to `primaryHsl` but presets can diverge. */
  sidebarPrimaryHsl: string;
  /** Primary chart series color. */
  chart1Hsl: string;
  /** Secondary chart series color. */
  chart2Hsl: string;
  rtl: boolean;
  sidebarState: SidebarState;
}

export interface PreferencesContextValue {
  preferences: Preferences;
  setPreferences: (partial: Partial<Preferences>) => void;
  resetPreferences: () => void;
  toggleSidebar: () => void;
}

/** Defaults live in `@/config` — single place to fork white-label builds. */
export const DEFAULT_PREFERENCES: Preferences = { ...DEFAULT_PREFERENCES_VALUES };

export { UI_SCALE_STEPS, PRESET_PALETTES };

export const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function usePreferences(): PreferencesContextValue {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error('usePreferences must be used inside <PreferencesProvider>');
  }
  return ctx;
}
