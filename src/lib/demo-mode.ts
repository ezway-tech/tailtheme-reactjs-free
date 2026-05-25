const STORAGE_KEY = 'tailtheme-demo-mode';

/** True when MSW browser worker should intercept API calls. */
export function isDemoModeEnabled(): boolean {
  if (typeof window === 'undefined') return false;

  const params = new URLSearchParams(window.location.search);
  const mockParam = params.get('mock');
  if (mockParam === '1') return true;
  if (mockParam === '0') return false;

  if (import.meta.env.VITE_USE_API_MOCK === 'true') return true;
  return window.localStorage.getItem(STORAGE_KEY) === '1';
}

/** Persist `?mock=1` / `?mock=0` from the URL into localStorage. */
export function persistDemoModeFromUrl(): void {
  if (typeof window === 'undefined') return;
  const mock = new URLSearchParams(window.location.search).get('mock');
  if (mock === '1') window.localStorage.setItem(STORAGE_KEY, '1');
  if (mock === '0') window.localStorage.removeItem(STORAGE_KEY);
}

export function setDemoModeEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  if (enabled) window.localStorage.setItem(STORAGE_KEY, '1');
  else window.localStorage.removeItem(STORAGE_KEY);
}
