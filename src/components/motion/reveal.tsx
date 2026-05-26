import * as React from 'react';
import { motion, type Variants, type HTMLMotionProps } from 'motion/react';
import { DURATION, EASE } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'animate'> {
  /** Seconds before the animation starts (useful for staggered reveals). */
  delay?: number;
  /** Direction to slide from. */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Distance in px. */
  distance?: number;
  /** How far the element must enter the viewport before triggering. */
  margin?: string;
  /** Play only once (default true). */
  once?: boolean;
}

/**
 * Animate a block into view the first time it crosses the viewport.
 * Respects reduced-motion: renders children without animation.
 */
export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 12,
  margin = '-10%',
  once = true,
  className,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children as React.ReactNode}</div>;
  }

  const offset =
    direction === 'none'
      ? { x: 0, y: 0 }
      : direction === 'up'
        ? { x: 0, y: distance }
        : direction === 'down'
          ? { x: 0, y: -distance }
          : direction === 'left'
            ? { x: distance, y: 0 }
            : { x: -distance, y: 0 };

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: DURATION.md, ease: EASE.out, delay },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: margin as `${number}%` | `-${number}%` }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
