import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigation } from 'react-router-dom';

const ROUTE_LOADING_SELECTOR = '[data-route-loading]';

/** Frames without a loading marker before treating a route as sync (no Suspense fallback). */
const SYNC_ROUTE_IDLE_FRAMES = 3;

/**
 * True once the current route is painted (no Suspense fallback / router loading).
 * Avoids a cookie flash before the lazy-route splash mounts.
 */
export function usePageContentReady(): boolean {
  const { pathname, key } = useLocation();
  const navigation = useNavigation();
  const routeId = `${key}:${pathname}`;
  const navStateRef = useRef(navigation.state);

  const [readyRouteId, setReadyRouteId] = useState<string | null>(null);
  const ready = readyRouteId === routeId;

  useEffect(() => {
    navStateRef.current = navigation.state;
  }, [navigation.state]);

  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;

    let cancelled = false;
    let sawRouteLoading = false;
    let syncCheckScheduled = false;
    let rafId = 0;

    const isNavLoading = () => navStateRef.current === 'loading';
    const hasRouteLoading = () => Boolean(root.querySelector(ROUTE_LOADING_SELECTOR));

    const cancelRaf = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const markNotReady = () => {
      cancelRaf();
      setReadyRouteId(null);
    };

    const markReadyAfterPaint = () => {
      cancelRaf();
      rafId = window.requestAnimationFrame(() => {
        if (cancelled) return;
        if (isNavLoading() || hasRouteLoading()) {
          if (hasRouteLoading()) sawRouteLoading = true;
          markNotReady();
          return;
        }
        setReadyRouteId(routeId);
      });
    };

    const scheduleSyncRouteCheck = () => {
      if (syncCheckScheduled) return;
      syncCheckScheduled = true;
      cancelRaf();

      let framesLeft = SYNC_ROUTE_IDLE_FRAMES;

      const step = () => {
        if (cancelled) return;
        if (isNavLoading() || hasRouteLoading()) {
          if (hasRouteLoading()) sawRouteLoading = true;
          syncCheckScheduled = false;
          markNotReady();
          return;
        }
        framesLeft -= 1;
        if (framesLeft <= 0) {
          setReadyRouteId(routeId);
          return;
        }
        rafId = window.requestAnimationFrame(step);
      };

      rafId = window.requestAnimationFrame(step);
    };

    const evaluate = () => {
      if (cancelled) return;

      if (isNavLoading() || hasRouteLoading()) {
        if (hasRouteLoading()) sawRouteLoading = true;
        syncCheckScheduled = false;
        markNotReady();
        return;
      }

      if (sawRouteLoading) {
        syncCheckScheduled = false;
        markReadyAfterPaint();
        return;
      }

      scheduleSyncRouteCheck();
    };

    evaluate();
    const observer = new MutationObserver(evaluate);
    observer.observe(root, { childList: true, subtree: true });

    return () => {
      cancelled = true;
      observer.disconnect();
      cancelRaf();
    };
  }, [routeId]);

  return ready;
}
