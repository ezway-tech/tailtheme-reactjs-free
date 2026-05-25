import * as React from 'react';
import { motion, useAnimationControls } from 'motion/react';
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useSlowMoFactor } from '@/components/showcase/slow-mo-context';

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction of the scrolling translation. */
  direction?: 'left' | 'right';
  /** Animation duration in seconds for one full cycle. */
  speed?: number;
  /** Pause the animation when the user hovers the marquee. */
  pauseOnHover?: boolean;
  /** Apply a fade mask on both edges for a softer look. */
  fade?: boolean;
  /** Repeat the children twice to simulate an infinite loop. */
  repeat?: number;
}

/**
 * Horizontal infinite-scroll wrapper for logo strips, ticker tapes, or
 * background flair. Children are duplicated in-DOM so the translation can loop
 * seamlessly. When the user prefers reduced motion the marquee renders as a
 * static, scrollable row.
 *
 * Animated with `motion/react` instead of CSS keyframes so playback is fully
 * controllable from JS (pause-on-hover, slow-mo, replay) and not affected by
 * any global CSS resets.
 */
export function Marquee({
  children,
  className,
  direction = 'left',
  speed = 28,
  pauseOnHover = true,
  fade = true,
  repeat = 2,
  style,
  ...rest
}: MarqueeProps) {
  const reduced = useReducedMotion();
  const slowFactor = useSlowMoFactor();
  const controls = useAnimationControls();
  const copies = Math.max(1, repeat);

  const start = direction === 'left' ? '0%' : '-50%';
  const end = direction === 'left' ? '-50%' : '0%';
  const duration = speed * slowFactor;

  React.useEffect(() => {
    if (reduced) return;
    controls.start({
      x: [start, end],
      transition: { duration, repeat: Infinity, ease: 'linear' },
    });
  }, [controls, reduced, start, end, duration]);

  if (reduced) {
    return (
      <div
        {...rest}
        className={cn('flex w-full gap-6 overflow-x-auto py-2', className)}
        style={style}
      >
        {children}
      </div>
    );
  }

  const handleHoverStart = () => {
    if (pauseOnHover) controls.stop();
  };
  const handleHoverEnd = () => {
    if (!pauseOnHover) return;
    controls.start({
      x: [start, end],
      transition: { duration, repeat: Infinity, ease: 'linear' },
    });
  };

  return (
    <div
      {...rest}
      className={cn(
        'relative flex w-full overflow-hidden',
        fade && '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className,
      )}
      style={style}
    >
      <motion.div
        className="flex shrink-0 items-center gap-10 pr-10"
        animate={controls}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        {Array.from({ length: copies }).map((_, idx) => (
          <div key={idx} className="flex shrink-0 items-center gap-10">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
