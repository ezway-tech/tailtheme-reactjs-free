import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface ConfettiProps {
  /** When flipped to true, a single burst plays. Reset externally (e.g. key prop). */
  fire?: boolean;
  /** Number of particles (default 32). */
  particles?: number;
  /** Burst duration seconds (default 1.8). */
  duration?: number;
  /** Particle color pool (CSS colors). */
  colors?: string[];
  className?: string;
}

const DEFAULT_COLORS = [
  'hsl(var(--color-primary))',
  'hsl(var(--color-accent))',
  'hsl(142 72% 45%)',
  'hsl(47 95% 55%)',
  'hsl(330 85% 60%)',
];

interface Particle {
  id: number;
  angle: number;
  distance: number;
  rotate: number;
  size: number;
  color: string;
  shape: 'rect' | 'circle';
}

function createParticles(count: number, colors: string[]): Particle[] {
  const list: Particle[] = [];
  for (let i = 0; i < count; i++) {
    list.push({
      id: i,
      angle: Math.random() * Math.PI * 2,
      distance: 80 + Math.random() * 160,
      rotate: (Math.random() - 0.5) * 540,
      size: 6 + Math.random() * 6,
      color: colors[i % colors.length]!,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    });
  }
  return list;
}

/**
 * One-shot confetti burst centered on its parent. Respects reduced-motion
 * (renders nothing). Use with a `key` or `fire` flag to re-trigger.
 */
export function Confetti({
  fire = true,
  particles = 32,
  duration = 1.8,
  colors = DEFAULT_COLORS,
  className,
}: ConfettiProps) {
  const reduced = useReducedMotion();
  const [bursts, setBursts] = React.useState<Particle[][]>([]);

  React.useEffect(() => {
    if (!fire || reduced) return;
    const next = createParticles(particles, colors);
    setBursts((prev) => [...prev, next]);
    const timer = window.setTimeout(() => {
      setBursts((prev) => prev.slice(1));
    }, duration * 1000);
    return () => window.clearTimeout(timer);
  }, [fire, particles, duration, colors, reduced]);

  if (reduced) return null;

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'visible',
      }}
      aria-hidden
    >
      <AnimatePresence>
        {bursts.map((burst, bi) => (
          <div
            key={bi}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 0,
              height: 0,
            }}
          >
            {burst.map((p) => {
              const dx = Math.cos(p.angle) * p.distance;
              const dy = Math.sin(p.angle) * p.distance;
              return (
                <motion.span
                  key={p.id}
                  initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.6 }}
                  animate={{
                    x: dx,
                    y: dy,
                    opacity: 0,
                    rotate: p.rotate,
                    scale: 1,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: p.size,
                    height: p.shape === 'rect' ? p.size * 0.4 : p.size,
                    background: p.color,
                    borderRadius: p.shape === 'circle' ? '50%' : 2,
                  }}
                />
              );
            })}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
