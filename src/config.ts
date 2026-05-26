/**
 * TailTheme Free — static configuration.
 */

import type { Theme } from '@/hooks/use-theme';
import type { PageTransitionPresetId } from '@/lib/motion/page-transition-presets';

export const APP_TITLE = 'TailTheme Free';

/** Lite build — no header language switcher or notifications popover. */
export const TEMPLATE_TIER = 'free' as const;

/** Product site — purchase, docs, changelog. */
export const TAILTHEME_WEB_URL = 'https://tailtheme.ezway.tech';

/** Hosted full-template demo (sidebar “Pro” items open this origin with the same route paths). */
export const TAILTHEME_DEMO_URL = 'https://tailtheme-demo.ezway.tech';

export const TEMPLATE_PURCHASE_URL = TAILTHEME_WEB_URL;

export const PRO_DEMO_URL = TAILTHEME_DEMO_URL;

export const PREFERENCES_STORAGE_KEY = 'tailtheme-prefs';
export const COLOR_MODE_STORAGE_KEY = 'tailtheme-theme';
export const COMMAND_PALETTE_RECENTS_STORAGE_KEY = 'tailtheme-cmdk-recents';

export const DEFAULT_COLOR_MODE: Theme = 'system';
export const APP_PAGE_TRANSITIONS_ENABLED = true;
export const APP_PAGE_DEFAULT_TRANSITION: PageTransitionPresetId = 'none';

export const DEFAULT_PREFERENCES_VALUES = {
  layout: 'sidebar',
  radius: 0.75,
  fontFamily: 'inter',
  uiScale: 100,
  primaryHsl: '205 70% 37%',
  accentHsl: '16 86% 54%',
  successHsl: '142 70% 38%',
  warningHsl: '38 92% 50%',
  infoHsl: '200 84% 50%',
  sidebarPrimaryHsl: '205 70% 37%',
  chart1Hsl: '205 70% 37%',
  chart2Hsl: '173 70% 45%',
  rtl: false,
  sidebarState: 'expanded',
} as const;

export const UI_SCALE_STEPS: { value: number; label: string }[] = [
  { value: 90, label: 'S' },
  { value: 100, label: 'M' },
  { value: 110, label: 'L' },
  { value: 125, label: 'XL' },
];

export interface PresetPalette {
  id: string;
  name: string;
  primaryHsl: string;
  accentHsl: string;
  successHsl: string;
  warningHsl: string;
  infoHsl: string;
  sidebarPrimaryHsl: string;
  chart1Hsl: string;
  chart2Hsl: string;
}

/** Free ships four presets; Pro includes 16. */
export const PRESET_PALETTES: PresetPalette[] = [
  {
    id: 'tailtheme',
    name: 'TailTheme Blue',
    primaryHsl: '205 70% 37%',
    accentHsl: '16 86% 54%',
    successHsl: '142 70% 38%',
    warningHsl: '38 92% 50%',
    infoHsl: '200 84% 50%',
    sidebarPrimaryHsl: '205 70% 37%',
    chart1Hsl: '205 70% 37%',
    chart2Hsl: '173 70% 45%',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    primaryHsl: '160 72% 36%',
    accentHsl: '260 80% 55%',
    successHsl: '160 72% 38%',
    warningHsl: '36 95% 55%',
    infoHsl: '200 84% 50%',
    sidebarPrimaryHsl: '160 72% 36%',
    chart1Hsl: '160 72% 36%',
    chart2Hsl: '212 90% 58%',
  },
  {
    id: 'slate-pro',
    name: 'Slate',
    primaryHsl: '215 25% 27%',
    accentHsl: '199 89% 48%',
    successHsl: '160 72% 36%',
    warningHsl: '36 95% 55%',
    infoHsl: '199 89% 48%',
    sidebarPrimaryHsl: '215 25% 27%',
    chart1Hsl: '215 25% 27%',
    chart2Hsl: '199 89% 48%',
  },
  {
    id: 'rose',
    name: 'Rose',
    primaryHsl: '350 82% 55%',
    accentHsl: '20 90% 55%',
    successHsl: '142 70% 38%',
    warningHsl: '36 95% 55%',
    infoHsl: '212 90% 58%',
    sidebarPrimaryHsl: '350 82% 55%',
    chart1Hsl: '350 82% 55%',
    chart2Hsl: '20 90% 55%',
  },
];
