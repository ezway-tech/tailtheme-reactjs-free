import { AppLogo } from '@/components/patterns';
import { APP_TITLE } from '@/config';
import { cn } from '@/lib/utils';

/** Centered brand mark for auth card headers (`/tailtheme.png`). */
export function AuthFormBrand({ className }: { className?: string }) {
  return (
    <div className={cn('flex justify-center', className)}>
      <AppLogo className="h-10 w-10 min-h-10 min-w-10" alt={APP_TITLE} />
    </div>
  );
}
