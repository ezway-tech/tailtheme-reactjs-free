import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useSlowMoFactor } from '@/components/showcase/slow-mo-context';

export interface SkeletonShimmerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Sweep duration in seconds for one shimmer cycle. */
  speed?: number;
  /** Border radius preset matching shadcn-ish surfaces. */
  shape?: 'rect' | 'pill' | 'circle';
  /** Render the inner shimmer band (defaults to true). */
  shimmer?: boolean;
}

/**
 * Loading skeleton with an animated shimmer band. Falls back to a static
 * muted block when the user prefers reduced motion. Designed to drop in
 * anywhere a `<Skeleton />` would go but with a more "alive" feel.
 *
 * Driven by `motion/react` so the sweep is JS-animated and immune to global
 * CSS resets / `prefers-reduced-motion` overrides.
 */
export function SkeletonShimmer({
  className,
  speed = 1.6,
  shape = 'rect',
  shimmer = true,
  style,
  ...rest
}: SkeletonShimmerProps) {
  const reduced = useReducedMotion();
  const slowFactor = useSlowMoFactor();
  const radius =
    shape === 'pill' ? 'rounded-full' : shape === 'circle' ? 'rounded-full' : 'rounded-md';

  return (
    <div
      {...rest}
      className={cn('relative overflow-hidden bg-muted', radius, className)}
      style={style}
    >
      {shimmer && !reduced && (
        <motion.span
          className="absolute inset-0 block bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10"
          animate={{ x: ['-100%', '100%'] }}
          transition={{
            duration: speed * slowFactor,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          aria-hidden
        />
      )}
    </div>
  );
}
