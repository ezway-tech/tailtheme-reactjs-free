import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { syncDocumentAppRoute } from '@/lib/document-app-route';

/** Keeps `html[data-app-route]` in sync when navigating without a full reload. */
export function useSyncDocumentAppRoute(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    syncDocumentAppRoute(pathname);
  }, [pathname]);
}
