import * as React from 'react';

/**
 * Multiplier applied to a `motion/react` animation's duration when "slow-mo"
 * mode is active inside a `<MotionPlayground />`. `1` is full speed; primitives
 * consume this value to multiply their `transition.duration`.
 */
export const SlowMoContext = React.createContext<number>(1);

/**
 * Read the current slow-mo factor for `motion/react` driven primitives.
 * Returns `1` outside any `<MotionPlayground />` provider.
 *
 * Consumers should multiply their transition.duration by this value:
 *
 *   const slowFactor = useSlowMoFactor();
 *   <motion.div
 *     animate={...}
 *     transition={{ duration: speed * slowFactor }}
 *   />
 */
export function useSlowMoFactor(): number {
  return React.useContext(SlowMoContext);
}
