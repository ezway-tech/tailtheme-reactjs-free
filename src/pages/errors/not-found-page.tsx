import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Button } from '@/components/ui';
import { urls } from '@/routes/urls';
import { SPRING } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export default function NotFoundPage() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), SPRING.soft);
  const y = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), SPRING.soft);

  return (
    <div
      className="flex min-h-[60vh] items-center justify-center p-6"
      onMouseMove={(e) => {
        if (reduced) return;
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <motion.div
          className="select-none text-[8rem] font-black leading-none tracking-tighter text-primary/90 md:text-[12rem]"
          style={reduced ? undefined : { x, y }}
          initial={reduced ? false : { opacity: 0, scale: 0.8 }}
          animate={reduced ? undefined : { opacity: 1, scale: 1 }}
          transition={SPRING.soft}
        >
          404
        </motion.div>
        <h1 className="text-2xl font-semibold">
          {t('pages.errors.notFound.title', '404 — Page not found')}
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          {t(
            'pages.errors.notFound.description',
            "We couldn't find the page you were looking for.",
          )}
        </p>
        <Button asChild>
          <Link to={urls.app.dashboard}>
            {t('pages.errors.notFound.back', 'Back to dashboard')}
          </Link>
        </Button>
      </div>
    </div>
  );
}
