import * as React from 'react';
import { motion } from 'motion/react';
import { SPRING } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

export interface MotionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Disable the hover/press interaction (default false). */
  interactive?: boolean;
  /** Override hover lift amount in px (default 2). */
  lift?: number;
}

/**
 * Lightweight wrapper that adds a subtle lift + press feedback.
 * Designed to wrap a <Card> or any block — doesn't change layout.
 */
export const MotionCard = React.forwardRef<HTMLDivElement, MotionCardProps>(function MotionCard(
  { interactive = true, lift = 2, className, children, ...rest },
  ref,
) {
  const reduced = useReducedMotion();

  if (reduced || !interactive) {
    return (
      <div ref={ref} className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn('will-change-transform', className)}
      whileHover={{ y: -lift, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={SPRING.press}
      {...(rest as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
});
