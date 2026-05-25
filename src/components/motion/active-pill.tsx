import * as React from 'react';
import { motion } from 'motion/react';
import { SPRING } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

export interface ActivePillProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shared layout namespace — identical ids animate between each other. */
  layoutId: string;
  /** Optional render only when `active` is true (use inside the active item). */
  active?: boolean;
}

/**
 * Shared-layout pill background. Place inside the currently-active nav item
 * and pass a stable `layoutId` across siblings for a smooth sliding indicator.
 */
export function ActivePill({
  layoutId,
  active = true,
  className,
  style,
  ...rest
}: ActivePillProps) {
  const reduced = useReducedMotion();
  if (!active) return null;

  const cls = cn(
    'absolute inset-0 -z-10 rounded-md bg-primary/10 ring-1 ring-primary/20',
    className,
  );

  if (reduced) {
    return <div className={cls} style={style} aria-hidden {...rest} />;
  }

  return (
    <motion.div
      layoutId={layoutId}
      className={cls}
      style={style}
      transition={SPRING.layout}
      aria-hidden
      {...(rest as React.ComponentProps<typeof motion.div>)}
    />
  );
}
