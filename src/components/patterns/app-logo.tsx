import { cn } from '@/lib/utils';

export type AppLogoProps = {
  className?: string;
  alt?: string;
};

/**
 * Brand mark from `public/tailtheme.png` (served as `/tailtheme.png`).
 * Fixed intrinsic size avoids flex layout collapsing the image to 0×0.
 */
export function AppLogo({ className, alt = 'TailTheme' }: AppLogoProps) {
  return (
    <img
      src="/tailtheme.png"
      alt={alt}
      width={32}
      height={32}
      draggable={false}
      className={cn('h-8 w-8 min-h-8 min-w-8 shrink-0 object-contain', className)}
    />
  );
}
