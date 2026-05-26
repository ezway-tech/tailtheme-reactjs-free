const APP_ROUTE_PATTERN = /^\/app(\/|$)/;

/** Whether the pathname is under the authenticated app shell (`/app/*`). */
export function isAppRoutePathname(pathname: string): boolean {
  return APP_ROUTE_PATTERN.test(pathname);
}

function themeSurfaceColor(): string {
  return document.documentElement.classList.contains('dark') ? '#0f1419' : '#f9fafb';
}

/**
 * Lock document scroll for app routes. Matches the inline bootstrap in `index.html`
 * so F5 and client navigations share one scroll container (the shell main pane).
 */
export function syncDocumentAppRoute(pathname: string): void {
  const docEl = document.documentElement;
  const appRoot = document.getElementById('root');
  const onAppRoute = isAppRoutePathname(pathname);

  if (onAppRoute) {
    const surface = themeSurfaceColor();
    docEl.setAttribute('data-app-route', '');
    docEl.style.overflow = 'hidden';
    docEl.style.height = '100%';
    docEl.style.backgroundColor = surface;
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.body.style.backgroundColor = surface;
    if (appRoot) {
      appRoot.style.height = '100%';
      appRoot.style.minHeight = '100%';
      appRoot.style.backgroundColor = surface;
    }
    return;
  }

  docEl.removeAttribute('data-app-route');
  docEl.style.overflow = '';
  docEl.style.height = '';
  docEl.style.backgroundColor = '';
  document.body.style.overflow = '';
  document.body.style.height = '';
  document.body.style.backgroundColor = '';
  if (appRoot) {
    appRoot.style.height = '';
    appRoot.style.minHeight = '';
    appRoot.style.backgroundColor = '';
  }
}
