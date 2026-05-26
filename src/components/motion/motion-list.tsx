import * as React from 'react';
import { motion, type Variants, type HTMLMotionProps } from 'motion/react';
import { DURATION, EASE, STAGGER } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

type StaggerLevel = 'tight' | 'normal' | 'loose';

export interface MotionListProps extends HTMLMotionProps<'div'> {
  stagger?: StaggerLevel;
  /** Delay before the whole sequence starts (seconds). */
  delayChildren?: number;
  /** Trigger on mount (default) or when entering viewport. */
  trigger?: 'mount' | 'inView';
}

export type MotionListItemProps = HTMLMotionProps<'div'>;

function buildContainer(stagger: number, delayChildren: number): Variants {
  return {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.md, ease: EASE.out },
  },
};

/**
 * Staggered list container. Pair with <MotionListItem/> children.
 * Respects reduced-motion: renders a plain div.
 */
export function MotionList({
  stagger = 'normal',
  delayChildren = 0.02,
  trigger = 'mount',
  className,
  children,
  ...rest
}: MotionListProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children as React.ReactNode}</div>;
  }

  const variants = buildContainer(STAGGER[stagger], delayChildren);
  const inViewProps =
    trigger === 'inView'
      ? { whileInView: 'show' as const, viewport: { once: true, margin: '-10%' as const } }
      : { animate: 'show' as const };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      {...inViewProps}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function MotionListItem({ className, children, ...rest }: MotionListItemProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children as React.ReactNode}</div>;
  }

  return (
    <motion.div className={className} variants={itemVariants} {...rest}>
      {children}
    </motion.div>
  );
}
