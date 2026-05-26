import { type PresetPalette } from '@/config';
import type { Preferences } from '@/hooks/use-preferences';

/**
 * Map an 8-channel preset onto the matching `Preferences` keys. Use this helper
 * everywhere instead of spreading the preset object directly so we have a
 * single place to evolve the preset → preferences mapping.
 */
export function applyPresetToPreferences(preset: PresetPalette): Partial<Preferences> {
  return {
    primaryHsl: preset.primaryHsl,
    accentHsl: preset.accentHsl,
    successHsl: preset.successHsl,
    warningHsl: preset.warningHsl,
    infoHsl: preset.infoHsl,
    sidebarPrimaryHsl: preset.sidebarPrimaryHsl,
    chart1Hsl: preset.chart1Hsl,
    chart2Hsl: preset.chart2Hsl,
  };
}

/**
 * Channels rendered as small color dots when previewing a preset card. Order
 * matches the visual layout (left-to-right).
 */
export const PRESET_CHANNEL_DOTS = [
  { key: 'primaryHsl', label: 'primary' },
  { key: 'accentHsl', label: 'accent' },
  { key: 'successHsl', label: 'success' },
  { key: 'warningHsl', label: 'warning' },
  { key: 'infoHsl', label: 'info' },
  { key: 'sidebarPrimaryHsl', label: 'sidebar' },
  { key: 'chart1Hsl', label: 'chart 1' },
  { key: 'chart2Hsl', label: 'chart 2' },
] as const satisfies ReadonlyArray<{ key: keyof PresetPalette; label: string }>;

/**
 * Returns true when every preset channel matches the corresponding preference.
 */
export function isPresetActive(preset: PresetPalette, prefs: Preferences): boolean {
  return (
    preset.primaryHsl === prefs.primaryHsl &&
    preset.accentHsl === prefs.accentHsl &&
    preset.successHsl === prefs.successHsl &&
    preset.warningHsl === prefs.warningHsl &&
    preset.infoHsl === prefs.infoHsl &&
    preset.sidebarPrimaryHsl === prefs.sidebarPrimaryHsl &&
    preset.chart1Hsl === prefs.chart1Hsl &&
    preset.chart2Hsl === prefs.chart2Hsl
  );
}
