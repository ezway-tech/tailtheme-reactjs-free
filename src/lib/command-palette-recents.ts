import { COMMAND_PALETTE_RECENTS_STORAGE_KEY } from '@/config';

const MAX_RECENTS = 10;

function safeParse(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === 'string');
  } catch {
    return [];
  }
}

/** Read recent nav leaf ids from `localStorage` (newest first). */
export function loadCommandPaletteRecentIds(): string[] {
  if (typeof window === 'undefined') return [];
  return safeParse(window.localStorage.getItem(COMMAND_PALETTE_RECENTS_STORAGE_KEY));
}

function persist(ids: string[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(
    COMMAND_PALETTE_RECENTS_STORAGE_KEY,
    JSON.stringify(ids.slice(0, MAX_RECENTS)),
  );
}

/**
 * Promote `id` to the front of recents, dedupe, cap length, persist, and return the new list.
 */
export function appendCommandPaletteRecentId(id: string): string[] {
  const prev = loadCommandPaletteRecentIds();
  const next = [id, ...prev.filter((x) => x !== id)].slice(0, MAX_RECENTS);
  persist(next);
  return next;
}
