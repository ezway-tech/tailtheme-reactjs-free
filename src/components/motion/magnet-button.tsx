import * as React from 'react';
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export interface MagnetButtonProps extends Omit<HTMLMotionProps<'button'>, 'style' | 'children'> {
  /** Maximum displacement in pixels when the cursor is at the edge. */
  strength?: number;
  /** Pixel radius around the button that engages the magnet. */
  radius?: number;
  /** Slot for an optional inner element (icon + label). */
  children: React.ReactNode;
}

/**
 * Button-like element that "attracts" the cursor: as the pointer approaches,
 * the button drifts toward it. Useful for hero CTAs and signature actions.
 *
 * Reduced motion users get a plain button without any pointer tracking.
 */
export function MagnetButton({
  strength = 18,
  radius = 110,
  className,
  children,
  ...rest
}: MagnetButtonProps) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18 });
  const springY = useSpring(y, { stiffness: 250, damping: 18 });

  const handleMove = React.useCallback(
    (event: PointerEvent | React.PointerEvent) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const distance = Math.hypot(dx, dy);
      if (distance > radius) {
        x.set(0);
        y.set(0);
        return;
      }
      const ratio = 1 - distance / radius;
      x.set((dx / radius) * strength * ratio);
      y.set((dy / radius) * strength * ratio);
    },
    [reduced, radius, strength, x, y],
  );

  const handleLeave = React.useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      type="button"
      style={reduced ? undefined : { x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
