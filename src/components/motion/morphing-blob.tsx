import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useSlowMoFactor } from '@/components/showcase/slow-mo-context';

export interface MorphingBlobProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Diameter in pixels. */
  size?: number;
  /** First gradient color (CSS color or token). */
  fromColor?: string;
  /** Second gradient color. */
  toColor?: string;
  /** Animation duration for one morph cycle, in seconds. */
  speed?: number;
  /** Apply a soft blur for the classic glow look. */
  blur?: boolean;
}

const PATHS = [
  'M52,-58C66,-46,74,-28,75,-9C76,10,70,30,57,42C44,54,24,58,5,58C-14,58,-28,54,-41,43C-54,32,-66,15,-67,-3C-68,-21,-58,-39,-44,-50C-30,-61,-12,-65,5,-66C22,-67,38,-65,52,-58Z',
  'M48,-55C61,-43,69,-27,71,-9C73,9,69,29,57,42C45,55,25,62,6,61C-13,60,-32,52,-44,40C-56,28,-61,13,-61,-3C-61,-19,-56,-37,-44,-49C-32,-61,-16,-67,2,-68C20,-69,35,-67,48,-55Z',
  'M55,-60C70,-46,77,-23,76,0C75,23,66,47,50,58C34,69,11,67,-9,63C-29,59,-47,53,-58,40C-69,27,-73,7,-69,-12C-65,-31,-53,-49,-37,-58C-21,-67,-1,-67,17,-66C35,-65,40,-74,55,-60Z',
  'M44,-50C56,-39,62,-23,65,-5C68,13,68,33,57,46C46,59,24,65,5,65C-14,65,-29,59,-44,49C-59,39,-74,25,-77,8C-80,-9,-71,-28,-58,-39C-45,-50,-29,-53,-13,-55C3,-57,21,-58,44,-50Z',
];

/**
 * Decorative SVG blob that morphs between curated paths. Useful as hero
 * background flair, empty-state ornaments, or section dividers. Honours
 * reduced motion — the blob renders at the first path with no animation.
 *
 * Driven by `motion/react`'s SVG animation (interpolating the `d` attribute
 * between path strings) instead of SMIL `<animate>`, so behaviour is
 * consistent across browsers and slow-mo / reduced-motion preferences are
 * respected.
 */
export function MorphingBlob({
  className,
  size = 320,
  fromColor = 'hsl(var(--color-primary-500-hsl, 205 70% 48%))',
  toColor = 'hsl(var(--color-accent-500-hsl, 16 86% 48%))',
  speed = 14,
  blur = true,
  style,
  ...rest
}: MorphingBlobProps) {
  const reduced = useReducedMotion();
  const slowFactor = useSlowMoFactor();
  const id = React.useId();

  return (
    <div
      {...rest}
      className={cn('pointer-events-none', className)}
      style={{ width: size, height: size, ...style }}
    >
      <svg
        viewBox="-100 -100 200 200"
        className={cn('h-full w-full', blur && 'opacity-80 blur-2xl')}
        aria-hidden
      >
        <defs>
          <linearGradient id={`tt-blob-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
        </defs>
        <motion.path
          fill={`url(#tt-blob-${id})`}
          initial={{ d: PATHS[0] }}
          animate={!reduced ? { d: [...PATHS, PATHS[0]] } : { d: PATHS[0] }}
          transition={
            !reduced
              ? {
                  duration: speed * slowFactor,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, 0.25, 0.5, 0.75, 1],
                }
              : { duration: 0 }
          }
        />
      </svg>
    </div>
  );
}
