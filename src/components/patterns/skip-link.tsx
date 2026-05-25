import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/cn';

export interface SkipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  targetId?: string;
}

/**
 * Accessibility skip-link: visually hidden until focused. First focusable element
 * on every layout. Takes the user straight to the `<main>` content.
 */
export function SkipLink({ targetId = 'main-content', className, ...props }: SkipLinkProps) {
  const { t } = useTranslation();
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        'sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg focus:outline-none',
        className,
      )}
      {...props}
    >
      {t('a11y.skipToMain', 'Skip to main content')}
    </a>
  );
}
