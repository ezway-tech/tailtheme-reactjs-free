import * as React from 'react';
import { Gauge, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { SlowMoContext } from './slow-mo-context';

/** Multiplier applied to durations when "Slow-mo" is enabled. */
const SLOW_MO_FACTOR = 2.5;

export interface MotionPlaygroundProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  /**
   * Render the slot you want to replay. Receives the current animation key
   * (incremented on every Replay click) so the consumer can pass it through to
   * `<Component key={animKey}>` to force a remount.
   */
  children: (state: { animKey: number; slowMo: boolean }) => React.ReactNode;
  /** Optional caption rendered above the playground actions. */
  caption?: React.ReactNode;
}

/**
 * A standardised wrapper used inside showcase pages to demonstrate motion.
 * Provides:
 *   - "Replay" button — bumps a key to remount the demo.
 *   - "Slow-mo" toggle — exposes a slow-mo factor through `SlowMoContext` so
 *     `motion/react` primitives can multiply their `transition.duration`, and
 *     applies the legacy `.tt-slow-mo` utility class so any descendant
 *     CSS-based animations (Radix UI primitives still using `tw-animate-css`)
 *     also slow down.
 *
 * Children receive the current `animKey` + `slowMo` flag and can compose them
 * however they need (e.g. `<Component key={animKey} />`).
 */
export function MotionPlayground({ children, caption, className, ...rest }: MotionPlaygroundProps) {
  const [animKey, setAnimKey] = React.useState<number>(0);
  const [slowMo, setSlowMo] = React.useState<boolean>(false);

  const factor = slowMo ? SLOW_MO_FACTOR : 1;

  return (
    <div {...rest} className={cn('w-full space-y-3', className)}>
      {caption ? <p className="text-xs text-muted-foreground">{caption}</p> : null}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setAnimKey((prev) => prev + 1)}
          className="gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Replay
        </Button>
        <Button
          size="sm"
          variant={slowMo ? 'default' : 'outline'}
          onClick={() => setSlowMo((prev) => !prev)}
          className="gap-1.5"
        >
          <Gauge className="h-3.5 w-3.5" />
          {slowMo ? `Slow-mo on (${(1 / SLOW_MO_FACTOR).toFixed(2)}×)` : 'Slow-mo'}
        </Button>
      </div>
      <SlowMoContext.Provider value={factor}>
        <div className={cn('relative', slowMo && 'tt-slow-mo')}>
          {children({ animKey, slowMo })}
        </div>
      </SlowMoContext.Provider>
    </div>
  );
}
