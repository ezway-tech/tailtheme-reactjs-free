import * as React from 'react';
import { motion, useScroll, useTransform, type HTMLMotionProps } from 'motion/react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export interface ParallaxProps extends Omit<HTMLMotionProps<'div'>, 'style'> {
  /** Translation distance in pixels at the edge of the scroll range. */
  offset?: number;
  /** Axis along which the parallax is applied. */
  axis?: 'y' | 'x';
  /** Scroll direction relative to the parent (`negative` = move opposite). */
  direction?: 'positive' | 'negative';
  /** Optional CSS style merged with the parallax transform. */
  style?: React.CSSProperties;
}

/** Detect Tailwind / arbitrary position utilities on `className` (e.g. `absolute`, `md:!fixed`). */
function hasExplicitPositionClass(className?: string): boolean {
  if (!className) return false;
  for (const raw of className.split(/\s+/).filter(Boolean)) {
    const withoutImportant = raw.replace(/^!+/, '');
    const token = withoutImportant.includes(':')
      ? (withoutImportant.split(':').pop() ?? withoutImportant)
      : withoutImportant;
    if (token === 'absolute' || token === 'fixed' || token === 'sticky' || token === 'relative') {
      return true;
    }
  }
  return false;
}

function hasNonStaticPosition(style?: React.CSSProperties, className?: string): boolean {
  const p = style?.position;
  if (p && p !== 'static') return true;
  return hasExplicitPositionClass(className);
}

/**
 * Scroll-bound translation wrapper. Useful for hero decorations, slow-moving
 * background blocks, and depth cues. Uses `useScroll` against the wrapper
 * itself so the effect tracks document scroll by default.
 *
 * Defaults to `position: relative` only when you do not pass another non-static
 * position via `style` or Tailwind (`absolute`, `fixed`, etc.). Forcing
 * `relative` inline would override `absolute` from class names (inline wins over
 * classes), which broke layered demos and triggered confusing layout.
 *
 * Honours the user's reduced-motion preference by rendering a static block.
 */
export function Parallax({
  children,
  offset = 60,
  axis = 'y',
  direction = 'positive',
  className,
  style,
  ...rest
}: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const sign = direction === 'positive' ? 1 : -1;
  const translation = useTransform(scrollYProgress, [0, 1], [sign * -offset, sign * offset]);

  const baseStyle: React.CSSProperties = { ...style };
  if (!hasNonStaticPosition(style, className)) {
    baseStyle.position = 'relative';
  }

  if (reduced) {
    return (
      <div ref={ref} className={className} style={baseStyle}>
        {children as React.ReactNode}
      </div>
    );
  }

  const motionStyle = axis === 'y' ? { y: translation } : { x: translation };

  return (
    <motion.div ref={ref} className={className} style={{ ...baseStyle, ...motionStyle }} {...rest}>
      {children}
    </motion.div>
  );
}
