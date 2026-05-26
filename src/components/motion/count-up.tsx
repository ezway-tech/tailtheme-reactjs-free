import * as React from 'react';
import { animate, useInView, useMotionValue } from 'motion/react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export interface CountUpProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  value: number;
  /** Optional start value (default 0). */
  from?: number;
  /** Seconds (default 1.2). */
  duration?: number;
  /** Number of fraction digits (default 0). */
  decimals?: number;
  /** Prefix/suffix text (e.g. "$", " USD"). */
  prefix?: string;
  suffix?: string;
  /** Use thousand separators (default true). */
  format?: boolean;
}

function fmt(value: number, decimals: number, format: boolean): string {
  const rounded = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  if (!format) return rounded;
  const [intPart, fracPart] = rounded.split('.');
  const withSeparators = intPart!.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return fracPart ? `${withSeparators}.${fracPart}` : withSeparators;
}

/** Animate a number from `from` to `value` once it enters the viewport. */
export function CountUp({
  value,
  from = 0,
  duration = 1.2,
  decimals = 0,
  prefix = '',
  suffix = '',
  format = true,
  ...rest
}: CountUpProps) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const mv = useMotionValue(reduced ? value : from);
  const [display, setDisplay] = React.useState<string>(() =>
    fmt(reduced ? value : from, decimals, format),
  );

  React.useEffect(() => {
    if (reduced) {
      mv.set(value);
      setDisplay(fmt(value, decimals, format));
      return;
    }
    if (!inView) return;
    const controls = animate(mv, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(fmt(v, decimals, format)),
    });
    return () => controls.stop();
  }, [inView, value, from, duration, decimals, format, reduced, mv]);

  return (
    <span ref={ref} {...rest}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
