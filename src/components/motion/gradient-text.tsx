import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useSlowMoFactor } from '@/components/showcase/slow-mo-context';

export interface GradientTextProps extends Omit<HTMLMotionProps<'span'>, 'children'> {
  /** Tailwind utility classes describing the gradient (e.g. `from-primary via-accent to-info-500`). */
  gradient?: string;
  /** Animation duration for one gradient cycle, in seconds. */
  speed?: number;
  /** Disable the moving sheen and render a static gradient. */
  staticOnly?: boolean;
  children?: React.ReactNode;
}

/**
 * Display text with a linear gradient that slides horizontally for a subtle
 * shimmer. Reduced motion preferences disable the slide and leave the static
 * gradient in place.
 *
 * Driven by `motion/react` so the slide is JS-animated and not affected by
 * any global CSS keyframes/reduced-motion CSS resets.
 */
export function GradientText({
  children,
  className,
  gradient = 'from-primary-500 via-accent-500 to-info-500',
  speed = 6,
  staticOnly = false,
  style,
  ...rest
}: GradientTextProps) {
  const reduced = useReducedMotion();
  const slowFactor = useSlowMoFactor();
  const animated = !reduced && !staticOnly;

  return (
    <motion.span
      {...rest}
      className={cn(
        'inline-block bg-gradient-to-r bg-clip-text text-transparent',
        gradient,
        className,
      )}
      style={{
        backgroundSize: animated ? '200% 100%' : '100% 100%',
        ...style,
      }}
      animate={animated ? { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] } : undefined}
      transition={
        animated ? { duration: speed * slowFactor, repeat: Infinity, ease: 'easeInOut' } : undefined
      }
    >
      {children}
    </motion.span>
  );
}
