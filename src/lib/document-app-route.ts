const APP_ROUTE_PREFIX = '/app';

/** True for `/app` and nested app shell routes. */
export function isAppRoutePath(pathname: string): boolean {
  return pathname === APP_ROUTE_PREFIX || pathname.startsWith(`${APP_ROUTE_PREFIX}/`);
}

/**
 * Mirrors the inline bootstrap in `index.html` so client navigations do not flash
 * scrollbar / overflow styles when crossing app ↔ auth layouts.
 */
export function applyHtmlAppRouteMode(isApp: boolean): void {
  if (typeof document === 'undefined') return;

  const docEl = document.documentElement;
  const appRoot = document.getElementById('root');

  if (isApp) {
    docEl.setAttribute('data-app-route', '');
    docEl.style.overflow = 'hidden';
    docEl.style.height = '100%';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    if (appRoot) {
      appRoot.style.height = '100%';
      appRoot.style.minHeight = '100%';
    }
    return;
  }

  docEl.removeAttribute('data-app-route');
  docEl.style.removeProperty('overflow');
  docEl.style.removeProperty('height');
  document.body.style.removeProperty('overflow');
  document.body.style.removeProperty('height');
  if (appRoot) {
    appRoot.style.removeProperty('height');
    appRoot.style.removeProperty('min-height');
  }
}
