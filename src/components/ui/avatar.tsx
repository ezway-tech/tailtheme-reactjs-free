import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

export const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full bg-muted text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'h-7 w-7 text-xs',
        default: 'h-9 w-9 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
      },
    },
    defaultVariants: { size: 'default' },
  },
);

export interface AvatarProps
  extends
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

export const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, size, ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  ),
);
Avatar.displayName = 'Avatar';

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full object-cover', className)}
    {...props}
  />
));
AvatarImage.displayName = 'AvatarImage';

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted font-medium uppercase',
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = 'AvatarFallback';

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Max avatars shown before +N overflow. */
  limit?: number;
  size?: VariantProps<typeof avatarVariants>['size'];
}

/**
 * Overlapping avatar stack with optional +N overflow badge.
 */
export function AvatarGroup({
  children,
  limit = 4,
  size = 'default',
  className,
  ...props
}: AvatarGroupProps) {
  const items = React.Children.toArray(children);
  const visible = items.slice(0, limit);
  const overflow = items.length - limit;

  return (
    <div className={cn('flex items-center', className)} {...props}>
      {visible.map((child, index) => (
        <div
          key={index}
          className={cn('relative ring-2 ring-background', index > 0 && '-ml-2')}
          style={{ zIndex: visible.length - index }}
        >
          {React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size })
            : child}
        </div>
      ))}
      {overflow > 0 ? (
        <Avatar size={size} className="-ml-2 ring-2 ring-background">
          <AvatarFallback>+{overflow}</AvatarFallback>
        </Avatar>
      ) : null}
    </div>
  );
}
