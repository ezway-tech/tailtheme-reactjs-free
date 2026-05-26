import * as React from 'react';
import { Outlet, useLocation, useMatches } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { APP_PAGE_DEFAULT_TRANSITION, APP_PAGE_TRANSITIONS_ENABLED } from '@/config';
import {
  PAGE_TRANSITION_PRESETS,
  type PageTransitionPresetId,
} from '@/lib/motion/page-transition-presets';
import type { AppRouteHandle } from '@/routes/app-route-handle';

/**
 * Walks `useMatches()` from leaf to root and returns the first `handle.pageTransition` defined on
 * an {@link AppRouteHandle}. Falls back to {@link APP_PAGE_DEFAULT_TRANSITION} (usually `'none'`).
 * When {@link APP_PAGE_TRANSITIONS_ENABLED} is false, always returns `'none'`.
 */
function resolvePageTransitionPreset(
  matches: ReturnType<typeof useMatches>,
): PageTransitionPresetId {
  if (!APP_PAGE_TRANSITIONS_ENABLED) return 'none';

  for (let i = matches.length - 1; i >= 0; i--) {
    const h = matches[i]?.handle as AppRouteHandle | undefined;
    if (h?.pageTransition !== undefined) {
      return h.pageTransition;
    }
  }
  return APP_PAGE_DEFAULT_TRANSITION;
}

export interface PageOutletTransitionProps {
  className?: string;
}

/**
 * Wraps the app `<Outlet />` with enter/exit motion when the active route opts in.
 *
 * Resolves the preset by walking matched routes from leaf to root (deepest `handle.pageTransition`
 * wins), then {@link APP_PAGE_DEFAULT_TRANSITION}. If the resolved preset is `'none'` or
 * {@link APP_PAGE_TRANSITIONS_ENABLED} is false, renders a plain `<Outlet />` inside a div — no
 * wrapper animation.
 *
 * Set `handle.pageTransition` per route in `route-objects.tsx` (see `AppRouteHandle`).
 */
export function PageOutletTransition({ className }: PageOutletTransitionProps) {
  const location = useLocation();
  const matches = useMatches();
  const pathname = location.pathname;
  const presetId = resolvePageTransitionPreset(matches);

  if (presetId === 'none') {
    return (
      <div className={className}>
        <Outlet />
      </div>
    );
  }

  const def = PAGE_TRANSITION_PRESETS[presetId];

  return (
    <AnimatePresence mode={def.presenceMode} initial={false}>
      <motion.div
        key={pathname}
        className={className}
        initial={def.initial}
        animate={def.animate}
        exit={def.exit}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
