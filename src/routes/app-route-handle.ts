import type { PageTransitionPresetId } from '@/lib/motion/page-transition-presets';

/**
 * Optional fields merged into React Router route `handle` objects in `route-objects.tsx`.
 * Existing keys like `breadcrumb` remain supported.
 *
 * **Page transitions:** `pageTransition` is opt-in. Only routes that set it are animated by
 * `PageOutletTransition` in the shell. Valid values are `PageTransitionPresetId` in
 * `src/lib/motion/page-transition-presets.ts`. Omit the field (or use `'none'`) for instant
 * navigation. Per-route (or `APP_PAGE_DEFAULT_TRANSITION` in config) only — not user theme prefs.
 */
export interface AppRouteHandle {
  breadcrumb?: string;
  /** Enter/exit preset id for this route branch; optional — see interface JSDoc. */
  pageTransition?: PageTransitionPresetId;
}
