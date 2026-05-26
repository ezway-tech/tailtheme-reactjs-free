import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applyHtmlAppRouteMode, isAppRoutePath } from '@/lib/document-app-route';

/** Keeps `html[data-app-route]` in sync with the current pathname (avoids logout layout flash). */
export function useSyncHtmlAppRoute(): void {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    applyHtmlAppRouteMode(isAppRoutePath(pathname));
  }, [pathname]);
}
