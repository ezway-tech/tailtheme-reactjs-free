/**
 * Generate Tailwind-style 50–950 color scales from a single HSL "anchor".
 * Used by the preferences provider to materialise CSS variables such as
 * `--color-primary-50` … `--color-primary-950` when the user picks a theme.
 *
 * The scale keeps the original hue and saturation (with a small saturation
 * dip at the lightest stops to avoid neon-pastel surfaces) and varies the
 * lightness using a fixed curve. The curve is intentionally fixed across
 * brand and status colors so that `success-100`, `primary-100`, `warning-100`
 * all read at the same visual depth.
 */

/** 11 Tailwind shade keys from `50` (lightest) to `950` (darkest). */
export const SHADE_KEYS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

export type Shade = (typeof SHADE_KEYS)[number];

/**
 * Lightness curve in percent. The 500 stop sits near the input lightness, the
 * upper stops drift toward 97 and the lower stops drift toward 12.
 */
const LIGHTNESS_CURVE: number[] = [97, 93, 86, 75, 62, 48, 38, 30, 24, 18, 12];

/**
 * Slight saturation falloff at the extreme stops keeps darkest swatches from
 * looking bruised and lightest swatches from looking neon. Each entry is a
 * multiplier applied to the input saturation before clamping to `[0, 100]`.
 */
const SATURATION_DAMPENING: number[] = [0.55, 0.6, 0.7, 0.85, 0.95, 1, 1, 0.96, 0.92, 0.88, 0.85];

interface HslTriple {
  h: number;
  s: number;
  l: number;
}

/**
 * Parse an HSL triple expressed as `"H S% L%"` (the format used by
 * `Preferences.primaryHsl`, `Preferences.successHsl`, etc.). Returns `null`
 * when the input cannot be parsed so callers can fall back to defaults.
 */
export function parseHsl(value: string): HslTriple | null {
  const match = /^\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*$/.exec(value);
  if (!match) return null;
  return { h: Number(match[1]), s: Number(match[2]), l: Number(match[3]) };
}

/** Format an HSL triple into the space-separated `"H S% L%"` form. */
export function formatHsl({ h, s, l }: HslTriple): string {
  return `${roundTo(h, 2)} ${roundTo(s, 2)}% ${roundTo(l, 2)}%`;
}

function roundTo(value: number, decimals: number): number {
  const m = 10 ** decimals;
  return Math.round(value * m) / m;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Build an 11-stop scale from an HSL anchor. The output keys mirror Tailwind
 * shade names so they can be plugged directly into CSS variable templates.
 */
export function generateScale(anchor: HslTriple): Record<Shade, string> {
  const result = {} as Record<Shade, string>;
  for (let i = 0; i < SHADE_KEYS.length; i += 1) {
    const shade = SHADE_KEYS[i];
    const lightness = LIGHTNESS_CURVE[i];
    const saturation = clamp(anchor.s * SATURATION_DAMPENING[i], 0, 100);
    result[shade] = formatHsl({ h: anchor.h, s: saturation, l: lightness });
  }
  return result;
}

/**
 * Convenience wrapper that takes a `"H S% L%"` string, returning the scale or
 * `null` when the anchor is unparseable.
 */
export function generateScaleFromString(value: string): Record<Shade, string> | null {
  const anchor = parseHsl(value);
  if (!anchor) return null;
  return generateScale(anchor);
}
