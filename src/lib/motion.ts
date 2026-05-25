import type { Transition, Variants } from 'motion/react';

/**
 * Duration tokens (seconds) used across motion primitives.
 * - xs/sm: micro-interactions (hover, press, focus)
 * - md:    small state swaps (tabs, popovers)
 * - lg:    layout / enter-exit
 * - xl:    signature moments
 */
export const DURATION = {
  xs: 0.12,
  sm: 0.18,
  md: 0.24,
  lg: 0.32,
  xl: 0.5,
} as const;

export type DurationToken = keyof typeof DURATION;

/** Easing curves as cubic-bezier tuples. */
export const EASE = {
  out: [0.22, 1, 0.36, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
  in: [0.64, 0, 0.78, 0] as [number, number, number, number],
  linear: 'linear' as const,
} as const;

/** Spring presets. */
export const SPRING = {
  soft: { type: 'spring', stiffness: 220, damping: 26 } satisfies Transition,
  press: { type: 'spring', stiffness: 400, damping: 30 } satisfies Transition,
  layout: { type: 'spring', stiffness: 260, damping: 24 } satisfies Transition,
  bouncy: { type: 'spring', stiffness: 320, damping: 14 } satisfies Transition,
} as const;

/** Stagger delay per child (seconds). */
export const STAGGER = {
  tight: 0.03,
  normal: 0.05,
  loose: 0.08,
} as const;

/** Cap how many children get individual stagger to avoid pathological cases. */
export const MAX_STAGGER = 8;

// -------- Shared variants ---------------------------------------------------

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.md, ease: EASE.out } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.md, ease: EASE.out } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: DURATION.md, ease: EASE.out } },
};

export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.md, ease: EASE.out },
  },
  exit: { opacity: 0, y: -4, transition: { duration: DURATION.sm, ease: EASE.in } },
};

export const listContainer: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER.normal,
      delayChildren: 0.02,
    },
  },
};

export const listItem: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.md, ease: EASE.out },
  },
};

/** Return a variants object where all durations are 0 (reduced-motion override). */
export function toInstantVariants<V extends Variants>(variants: V): V {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(variants)) {
    if (!value || typeof value !== 'object') {
      out[key] = value;
      continue;
    }
    const clone: Record<string, unknown> = { ...(value as Record<string, unknown>) };
    const t = (value as Record<string, unknown>).transition as Record<string, unknown> | undefined;
    clone.transition = { ...(t ?? {}), duration: 0, delay: 0, staggerChildren: 0 };
    out[key] = clone;
  }
  return out as V;
}
