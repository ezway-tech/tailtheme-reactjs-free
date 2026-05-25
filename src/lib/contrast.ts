/**
 * Color helpers for accessibility contrast checking.
 * Implements the WCAG 2.1 relative luminance formula and AA / AAA grading.
 */

/** Parsed RGB triple in 0–255 space. */
export interface Rgb {
  r: number;
  g: number;
  b: number;
}

/** WCAG grade for a contrast ratio at a given text size. */
export type ContrastGrade = 'AAA' | 'AA' | 'AA Large' | 'Fail';

const HEX_RE = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

/**
 * Parse a CSS color string into an `{ r, g, b }` triple.
 * Supports `#rgb`, `#rrggbb`, `rgb(r, g, b)` and `hsl(h s% l%)` (CSS Level 4
 * space-separated form). Returns `null` for unsupported inputs.
 */
export function parseColor(input: string): Rgb | null {
  const value = input.trim();
  if (!value) return null;

  if (HEX_RE.test(value)) return parseHex(value);

  const rgbMatch = /^rgba?\s*\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)/i.exec(value);
  if (rgbMatch) {
    return {
      r: clampByte(Number(rgbMatch[1])),
      g: clampByte(Number(rgbMatch[2])),
      b: clampByte(Number(rgbMatch[3])),
    };
  }

  const hslMatch = /^hsla?\s*\(\s*([\d.]+)(?:deg)?[ ,]+([\d.]+)%[ ,]+([\d.]+)%/i.exec(value);
  if (hslMatch) {
    return hslToRgb(Number(hslMatch[1]), Number(hslMatch[2]), Number(hslMatch[3]));
  }

  return null;
}

function parseHex(hex: string): Rgb {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function clampByte(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

/** Convert HSL (0–360, 0–100, 0–100) to an `{ r, g, b }` triple. */
export function hslToRgb(h: number, s: number, l: number): Rgb {
  const hue = (((h % 360) + 360) % 360) / 360;
  const sat = Math.max(0, Math.min(100, s)) / 100;
  const lit = Math.max(0, Math.min(100, l)) / 100;
  if (sat === 0) {
    const v = clampByte(lit * 255);
    return { r: v, g: v, b: v };
  }
  const q = lit < 0.5 ? lit * (1 + sat) : lit + sat - lit * sat;
  const p = 2 * lit - q;
  return {
    r: clampByte(hueToChannel(p, q, hue + 1 / 3) * 255),
    g: clampByte(hueToChannel(p, q, hue) * 255),
    b: clampByte(hueToChannel(p, q, hue - 1 / 3) * 255),
  };
}

function hueToChannel(p: number, q: number, t: number): number {
  let nt = t;
  if (nt < 0) nt += 1;
  if (nt > 1) nt -= 1;
  if (nt < 1 / 6) return p + (q - p) * 6 * nt;
  if (nt < 1 / 2) return q;
  if (nt < 2 / 3) return p + (q - p) * (2 / 3 - nt) * 6;
  return p;
}

/** Format an `{ r, g, b }` triple as a 6-digit lowercase hex string. */
export function rgbToHex({ r, g, b }: Rgb): string {
  return `#${[r, g, b].map((v) => clampByte(v).toString(16).padStart(2, '0')).join('')}`;
}

/** WCAG relative luminance for sRGB colors. */
export function relativeLuminance({ r, g, b }: Rgb): number {
  const linear = [r, g, b].map((v) => {
    const channel = v / 255;
    return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

/** Contrast ratio between two parsed RGB colors. Always ≥ 1. */
export function contrastRatio(a: Rgb, b: Rgb): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Grade a contrast ratio per WCAG 2.1:
 * - `AAA` ≥ 7
 * - `AA` ≥ 4.5
 * - `AA Large` ≥ 3 (only for ≥ 18pt or ≥ 14pt bold)
 * - `Fail` otherwise
 */
export function gradeContrast(ratio: number): ContrastGrade {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA Large';
  return 'Fail';
}

/**
 * Resolve a CSS variable such as `--color-primary` against the current
 * document root and return the parsed RGB triple. Returns `null` when the
 * variable isn't set or isn't a parseable color.
 */
export function resolveCssVarColor(name: string, root?: HTMLElement): Rgb | null {
  if (typeof window === 'undefined') return null;
  const target = root ?? document.documentElement;
  const raw = window.getComputedStyle(target).getPropertyValue(name).trim();
  if (!raw) return null;
  return parseColor(raw);
}
