import * as React from 'react';
import { motion, type Variants } from 'motion/react';
import { DURATION, EASE, STAGGER } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export interface StaggerGridProps extends React.HTMLAttributes<HTMLDivElement> {
  stagger?: 'tight' | 'normal' | 'loose';
  /** Trigger on mount (default) or when entering viewport. */
  trigger?: 'mount' | 'inView';
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DURATION.md, ease: EASE.out },
  },
};

/**
 * Grid whose direct children are animated with a staggered scale+fade-up.
 * Any `<motion.div/>` child will automatically pick up the container variants.
 */
export function StaggerGrid({
  stagger = 'normal',
  trigger = 'mount',
  className,
  children,
  ...rest
}: StaggerGridProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  const container: Variants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: STAGGER[stagger], delayChildren: 0.02 },
    },
  };

  const inViewProps =
    trigger === 'inView'
      ? { whileInView: 'show' as const, viewport: { once: true, margin: '-10%' as const } }
      : { animate: 'show' as const };

  const wrapped = React.Children.map(children, (child, idx) => {
    if (!React.isValidElement(child)) return child;
    return (
      <motion.div key={(child as React.ReactElement).key ?? idx} variants={itemVariants}>
        {child}
      </motion.div>
    );
  });

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      {...inViewProps}
      {...(rest as React.ComponentProps<typeof motion.div>)}
    >
      {wrapped}
    </motion.div>
  );
}
