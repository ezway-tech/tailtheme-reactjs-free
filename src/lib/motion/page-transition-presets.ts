import type { TargetAndTransition } from 'motion/react';
import { DURATION, EASE } from '@/lib/motion';

/**
 * Named page enter/exit presets inspired by `.references/animations` (each “screen”
 * used its own `initial` / `animate` / `exit` under `AnimatePresence`).
 */

export const PAGE_TRANSITION_PRESET_IDS = [
  'fadeVertical',
  'fadeScale',
  'slideHorizontal',
  'fade',
  'none',
] as const;

export type PageTransitionPresetId = (typeof PAGE_TRANSITION_PRESET_IDS)[number];

/** User-selectable page transition style (excludes `none`). */
export type PageTransitionStyle = Exclude<PageTransitionPresetId, 'none'>;

/** Order used in theme customizer and in-app transition demos. */
export const PAGE_TRANSITION_STYLE_OPTIONS: readonly PageTransitionStyle[] = [
  'fadeVertical',
  'fadeScale',
  'slideHorizontal',
  'fade',
];

export function isPageTransitionStyle(value: unknown): value is PageTransitionStyle {
  return (
    typeof value === 'string' &&
    (PAGE_TRANSITION_STYLE_OPTIONS as readonly string[]).includes(value)
  );
}

export type PageTransitionPresenceMode = 'wait' | 'sync';

export interface PageTransitionPresetDefinition {
  /** How `AnimatePresence` coordinates exit + enter (`sync` overlaps a bit, less empty frame). */
  presenceMode: PageTransitionPresenceMode;
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
}

/** Preset map (excludes `none` — handled as “no wrapper animation”). */
export const PAGE_TRANSITION_PRESETS: Record<
  Exclude<PageTransitionPresetId, 'none'>,
  PageTransitionPresetDefinition
> = {
  /** Like reference `dashboard`: fade + vertical slide. */
  fadeVertical: {
    presenceMode: 'sync',
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.md, ease: EASE.out },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: DURATION.sm, ease: EASE.in },
    },
  },
  /** Like reference `study`: fade + subtle scale. */
  fadeScale: {
    presenceMode: 'sync',
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: DURATION.md, ease: EASE.out },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: DURATION.sm, ease: EASE.in },
    },
  },
  /** Like reference `game`: horizontal slide. */
  slideHorizontal: {
    presenceMode: 'sync',
    initial: { opacity: 0, x: 20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: DURATION.md, ease: EASE.out },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: DURATION.sm, ease: EASE.in },
    },
  },
  /** Like reference `manage`: opacity only. */
  fade: {
    presenceMode: 'sync',
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: DURATION.md, ease: EASE.out },
    },
    exit: {
      opacity: 0,
      transition: { duration: DURATION.sm, ease: EASE.in },
    },
  },
};

export function isPageTransitionPresetId(value: unknown): value is PageTransitionPresetId {
  return (
    typeof value === 'string' && (PAGE_TRANSITION_PRESET_IDS as readonly string[]).includes(value)
  );
}
