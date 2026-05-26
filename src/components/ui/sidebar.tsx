import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { PanelLeft } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { usePreferences, type SidebarState } from '@/hooks/usePreferences';
import { Button } from './button';
import { Sheet, SheetContent } from './sheet';

interface SidebarContextValue {
  state: SidebarState;
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  toggle: () => void;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function useSidebar(): SidebarContextValue {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within <SidebarProvider>');
  return ctx;
}

export interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpenMobile?: boolean;
  desktopStateOverride?: SidebarState;
}

export const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  (
    { className, style, children, defaultOpenMobile = false, desktopStateOverride, ...props },
    ref,
  ) => {
    const { preferences, toggleSidebar } = usePreferences();
    const isMobile = useMediaQuery('(max-width: 767px)');
    const [openMobile, setOpenMobile] = React.useState(defaultOpenMobile);

    const desktopState: SidebarState = desktopStateOverride ?? preferences.sidebarState;
    const state: SidebarState = isMobile ? 'offcanvas' : desktopState;

    const toggle = React.useCallback(() => {
      if (isMobile) {
        setOpenMobile((v) => !v);
      } else {
        toggleSidebar();
      }
    }, [isMobile, toggleSidebar]);

    React.useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
          e.preventDefault();
          toggle();
        }
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, [toggle]);

    const value = React.useMemo<SidebarContextValue>(
      () => ({ state, isMobile, openMobile, setOpenMobile, toggle }),
      [state, isMobile, openMobile, toggle],
    );

    return (
      <SidebarContext.Provider value={value}>
        <div
          ref={ref}
          data-sidebar-state={state}
          style={
            {
              '--sidebar-width': state === 'collapsed' ? '3.5rem' : '16rem',
              ...style,
            } as React.CSSProperties
          }
          className={cn('group/sidebar flex h-svh min-h-0 w-full overflow-hidden', className)}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    );
  },
);
SidebarProvider.displayName = 'SidebarProvider';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  side?: 'left' | 'right';
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, children, side = 'left', ...props }, ref) => {
    const { state, isMobile, openMobile, setOpenMobile } = useSidebar();

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          {/* Keep mobile sidebar within ~70-75% viewport. */}
          <SheetContent side={side} className="w-[75%] max-w-[20rem] p-0">
            <aside
              ref={ref}
              className={cn(
                'flex h-full w-full flex-col bg-card text-sidebar-foreground',
                className,
              )}
              {...props}
            >
              {children}
            </aside>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <aside
        ref={ref}
        data-state={state}
        className={cn(
          'hidden h-full min-h-0 shrink-0 flex-col border-r border-input bg-card text-sidebar-foreground transition-[width] duration-200 md:flex',
          side === 'right' && 'order-last border-l border-r-0',
          className,
        )}
        style={{ width: 'var(--sidebar-width)' }}
        {...props}
      >
        {children}
      </aside>
    );
  },
);
Sidebar.displayName = 'Sidebar';

export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex h-16 min-h-16 shrink-0 items-center gap-2 border-b border-input px-3',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex-1 overflow-y-auto overflow-x-hidden px-2 py-3', className)}
      {...props}
    />
  );
}

export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('border-t border-input px-2 py-2', className)} {...props} />;
}

export function SidebarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-3 flex flex-col gap-0.5', className)} {...props} />;
}

export function SidebarGroupLabel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { state } = useSidebar();
  if (state === 'collapsed') return null;
  return (
    <div
      className={cn(
        'px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn('flex flex-col gap-0.5', className)} {...props} />;
}

export function SidebarMenuItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn('relative', className)} {...props} />;
}

const sidebarMenuButtonVariants = cva(
  'group/menu-btn peer/menu-btn flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-sidebar-foreground outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:hover:bg-primary',
  {
    variants: {
      size: {
        sm: 'h-8 text-sm',
        default: 'h-9',
      },
    },
    defaultVariants: { size: 'default' },
  },
);

export interface SidebarMenuButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string;
}

export const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, asChild, isActive, size, tooltip, children, ...props }, ref) => {
    const { state } = useSidebar();
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        data-active={isActive}
        data-state={state}
        title={state === 'collapsed' ? tooltip : undefined}
        className={cn(
          sidebarMenuButtonVariants({ size }),
          state === 'collapsed' &&
            '!h-9 !w-9 !min-w-9 !justify-center !gap-0 !px-0 mx-auto overflow-hidden [&_[data-sidebar-label]]:hidden [&_[data-sidebar-badge]]:hidden [&_[data-sidebar-caret]]:hidden [&_[data-sidebar-active-indicator]]:hidden',
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
SidebarMenuButton.displayName = 'SidebarMenuButton';

/** Compact count pill for sidebar branch rows (hidden when the sidebar is collapsed). */
export function SidebarMenuBadge({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-sidebar-badge
      className={cn(
        'flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1 text-[10px] font-semibold leading-none tabular-nums',
        'bg-primary/15 text-primary',
        'group-data-[active=true]/menu-btn:bg-primary-foreground/20 group-data-[active=true]/menu-btn:text-primary-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export type SidebarTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ className, onClick, ...props }, ref) => {
    const { toggle } = useSidebar();
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        aria-label="Toggle sidebar"
        className={cn('h-8 w-8', className)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) toggle();
        }}
        {...props}
      >
        <PanelLeft className="h-4 w-4" />
      </Button>
    );
  },
);
SidebarTrigger.displayName = 'SidebarTrigger';

export function SidebarInset({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-background',
        className,
      )}
      {...props}
    />
  );
}
