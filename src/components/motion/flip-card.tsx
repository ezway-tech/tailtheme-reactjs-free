import * as React from 'react';
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Front face content (visible by default). */
  front: React.ReactNode;
  /** Back face content (revealed on hover or click). */
  back: React.ReactNode;
  /** What triggers the flip. */
  trigger?: 'hover' | 'click' | 'both';
  /** Axis around which the flip happens. */
  axis?: 'x' | 'y';
  /** Animation duration in milliseconds. */
  duration?: number;
}

/**
 * Two-faced card with a 3D flip transition. Hovering or clicking the wrapper
 * toggles between the front and back faces. Reduced motion users see only the
 * front face but can still toggle to the back via click without animation.
 */
export function FlipCard({
  front,
  back,
  trigger = 'hover',
  axis = 'y',
  duration = 600,
  className,
  onClick,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: FlipCardProps) {
  const reduced = useReducedMotion();
  const [flipped, setFlipped] = React.useState(false);
  const supportsHover = trigger === 'hover' || trigger === 'both';
  const supportsClick = trigger === 'click' || trigger === 'both';

  const rotation = flipped ? (axis === 'y' ? 'rotateY(180deg)' : 'rotateX(180deg)') : 'none';
  const backRotation = axis === 'y' ? 'rotateY(180deg)' : 'rotateX(180deg)';

  return (
    <div
      {...rest}
      role={supportsClick ? 'button' : undefined}
      tabIndex={supportsClick ? 0 : undefined}
      onClick={(event) => {
        if (supportsClick) setFlipped((prev) => !prev);
        onClick?.(event);
      }}
      onKeyDown={(event) => {
        if (supportsClick && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          setFlipped((prev) => !prev);
        }
        onKeyDown?.(event);
      }}
      onMouseEnter={(event) => {
        if (supportsHover && !reduced) setFlipped(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        if (supportsHover && !reduced) setFlipped(false);
        onMouseLeave?.(event);
      }}
      className={cn('group relative perspective-1000', className)}
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative h-full w-full"
        style={{
          transformStyle: 'preserve-3d',
          transition: reduced ? 'none' : `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          transform: reduced ? 'none' : rotation,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {front}
        </div>
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: backRotation,
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
