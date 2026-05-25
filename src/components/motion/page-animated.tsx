import * as React from 'react';
import { motion } from 'motion/react';
import {
  PAGE_TRANSITION_PRESETS,
  type PageTransitionPresetId,
} from '@/lib/motion/page-transition-presets';
import { cn } from '@/lib/cn';

export interface PageAnimatedProps {
  children: React.ReactNode;
  className?: string;
  /** When `'none'`: static wrapper div. Otherwise mount preset on this node. */
  preset: PageTransitionPresetId;
}

/**
 * Manual wrapper for one-off enter animation (route `element` or demo content). Applies `initial` /
 * `animate` from {@link PAGE_TRANSITION_PRESETS} once on mount — no exit tween (not keyed by path).
 *
 * **Prefer** declaring `handle.pageTransition` on the route and letting {@link PageOutletTransition}
 * animate the whole outlet on navigation. Use `PageAnimated` only when you cannot attach `handle`
 * (e.g. nested marketing block) — never combine both for the same visible surface or you'll double
 * up motion.
 */
export function PageAnimated({ children, className, preset }: PageAnimatedProps) {
  if (preset === 'none') {
    return <div className={cn(className)}>{children}</div>;
  }

  const def = PAGE_TRANSITION_PRESETS[preset];

  return (
    <motion.div className={cn(className)} initial={def.initial} animate={def.animate}>
      {children}
    </motion.div>
  );
}
