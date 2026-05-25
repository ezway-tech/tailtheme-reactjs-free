import * as React from 'react';
import { motion, useAnimation } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface ShakeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Increment this value (e.g. error counter) to trigger a shake. */
  trigger: number | string;
  /** Distance in px (default 6). */
  distance?: number;
  /** Duration seconds (default 0.4). */
  duration?: number;
}

/**
 * Horizontally shakes its children whenever `trigger` changes.
 * No-op when reduced-motion is active.
 */
export function Shake({ trigger, distance = 6, duration = 0.4, children, ...rest }: ShakeProps) {
  const reduced = useReducedMotion();
  const controls = useAnimation();
  const previousTriggerRef = React.useRef<number | string>(trigger);

  React.useEffect(() => {
    if (reduced) return;
    if (previousTriggerRef.current === trigger) {
      return;
    }
    previousTriggerRef.current = trigger;
    controls.start({
      x: [0, -distance, distance, -distance * 0.6, distance * 0.6, 0],
      transition: { duration, ease: 'easeInOut' },
    });
  }, [trigger, controls, distance, duration, reduced]);

  if (reduced) {
    return <div {...rest}>{children}</div>;
  }

  return (
    <motion.div animate={controls} {...(rest as React.ComponentProps<typeof motion.div>)}>
      {children}
    </motion.div>
  );
}
