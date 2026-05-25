export { cn } from './cn';

/** Return the first non-empty string in the list, else `fallback`. */
export function firstNonEmpty(values: Array<string | undefined | null>, fallback = ''): string {
  for (const v of values) {
    if (typeof v === 'string' && v.length > 0) return v;
  }
  return fallback;
}

/** Turn a full name into up to 2 uppercase initials (for avatar fallbacks). */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
  if (parts.length === 0) return '';
  return parts.map((p) => p[0]?.toUpperCase() ?? '').join('');
}
