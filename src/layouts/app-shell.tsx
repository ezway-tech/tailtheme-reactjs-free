import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ActivePill, PageOutletTransition } from '@/components/motion';
import { APP_TITLE, TEMPLATE_PURCHASE_URL } from '@/config';
import { SPRING } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { ChevronDown, Command as CommandIcon } from 'lucide-react';
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui';
import { AppLogo, BreadcrumbsAuto, SidebarPurchaseBanner, ThemeMenu } from '@/components/patterns';
import { AppHeaderProvider } from '@/contexts/app-header-context';
import { usePreferences } from '@/hooks/use-preferences';
import {
  type NavNode,
  PAGES_TREE,
  TOP_TREE,
  UI_TREE,
  flattenNavLeaves,
  nodeMatchesPath,
} from '@/navigation/app-nav-tree';
import { urls } from '@/routes/urls';
import { cn } from '@/lib/cn';
import { CommandPaletteTrigger } from '@/components/patterns/command-palette';
import { LanguageMenu } from '@/components/patterns/language-menu';
import { NotificationsPopover } from '@/components/patterns/notifications-popover';
import { UserMenu } from '@/components/patterns/user-menu';

/** Top-level sidebar sections. Each section has its own collapsible tree. */
type SectionId = 'pages' | 'ui';

function appHeaderClassName(compact = false) {
  return cn(
    'flex w-full max-w-full items-center',
    compact ? 'min-h-14 gap-3 px-4' : 'min-h-16 gap-4 px-5 md:px-6',
  );
}

type MobileHeaderUtilitiesContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileHeaderUtilitiesContext = React.createContext<MobileHeaderUtilitiesContextValue | null>(
  null,
);

function useMobileHeaderUtilities() {
  const ctx = React.useContext(MobileHeaderUtilitiesContext);
  if (!ctx) {
    throw new Error('useMobileHeaderUtilities must be used within AppHeaderChrome');
  }
  return ctx;
}

/** Full-width chrome row; scroll lives below so the scrollbar does not clip the header border. */
function AppHeaderChrome({ compact, children }: { compact?: boolean; children: React.ReactNode }) {
  const [utilitiesOpen, setUtilitiesOpen] = React.useState(false);
  const utilities = React.useMemo(
    () => ({ open: utilitiesOpen, setOpen: setUtilitiesOpen }),
    [utilitiesOpen],
  );

  return (
    <MobileHeaderUtilitiesContext.Provider value={utilities}>
      <div className="w-full shrink-0 border-b border-input bg-card shadow-sm">
        <header className={appHeaderClassName(compact)}>{children}</header>
        <MobileHeaderUtilityRow />
      </div>
    </MobileHeaderUtilitiesContext.Provider>
  );
}

function headerActionsToolbarClassName() {
  return cn('ml-auto flex shrink-0 items-center gap-1 md:ml-0 md:gap-2');
}

/* -------------------------- Sidebar rendering --------------------- */

function NavProBadge() {
  const { t } = useTranslation();
  return (
    <SidebarMenuBadge
      aria-label={t('nav.proBadge', 'Pro — opens full template')}
      className="min-w-[2rem] bg-primary/15 px-1.5 text-[10px] font-semibold uppercase tracking-wide text-primary"
    >
      Pro
    </SidebarMenuBadge>
  );
}

function isExternalNavTo(to: string): boolean {
  return /^https?:\/\//i.test(to);
}

function NavLeaf({ node }: { node: NavNode }) {
  const { t } = useTranslation();
  const label = t(node.labelKey, node.fallback);
  const Icon = node.icon;
  const href = node.to!;
  const external = node.proOnly || isExternalNavTo(href);

  if (external) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          tooltip={t('nav.proPreview', 'Preview in TailTheme Pro')}
          className="data-[active=true]:bg-transparent data-[active=true]:hover:bg-transparent"
        >
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className={cn(
              'relative flex w-full items-center gap-2 text-sidebar-foreground transition-colors',
              'hover:text-primary',
            )}
          >
            {Icon ? <Icon className="relative h-4 w-4 shrink-0 opacity-80" aria-hidden /> : null}
            <span data-sidebar-label className="relative flex-1 truncate">
              {label}
            </span>
            <NavProBadge />
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        tooltip={label}
        className="data-[active=true]:bg-transparent data-[active=true]:hover:bg-transparent"
      >
        <NavLink
          to={href}
          end={node.end}
          className={({ isActive }) =>
            cn('relative', isActive ? 'font-medium text-primary' : 'text-sidebar-foreground')
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <span
                  data-sidebar-active-indicator
                  aria-hidden
                  className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-brand-hover"
                />
              ) : null}
              {Icon ? <Icon className="relative h-4 w-4 shrink-0" aria-hidden /> : null}
              <span data-sidebar-label className="relative">
                {label}
              </span>
            </>
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function NavBranch({ node }: { node: NavNode }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { state: sidebarState, toggle } = useSidebar();
  const active = nodeMatchesPath(node, pathname);
  const [open, setOpen] = React.useState(active);

  React.useEffect(() => {
    if (active) setOpen(true);
  }, [active]);

  const label = t(node.labelKey, node.fallback);
  const Icon = node.icon;
  const handleBranchClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (sidebarState !== 'collapsed') return;
      // In collapsed mode, first expand the sidebar, then show this branch.
      event.preventDefault();
      event.stopPropagation();
      setOpen(true);
      toggle();
    },
    [sidebarState, toggle],
  );

  return (
    <SidebarMenuItem>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={label}
            aria-expanded={open}
            data-active={active ? true : undefined}
            className={cn('justify-between', sidebarState === 'collapsed' && 'justify-center')}
            onClick={handleBranchClick}
          >
            <span className="flex min-w-0 items-center gap-2">
              {Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden /> : null}
              <span data-sidebar-label className="truncate">
                {label}
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-1.5">
              {node.proOnly ? (
                <NavProBadge />
              ) : node.badge != null ? (
                <SidebarMenuBadge
                  aria-label={t('nav.badgeCount', '{{count}} new', { count: node.badge })}
                >
                  {node.badge > 99 ? '99+' : node.badge}
                </SidebarMenuBadge>
              ) : null}
              <ChevronDown
                data-sidebar-caret
                className={cn(
                  'h-3.5 w-3.5 shrink-0 transition-transform',
                  open ? 'rotate-0' : '-rotate-90',
                )}
                aria-hidden
              />
            </span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <ul className="ml-4 mt-0.5 flex flex-col gap-0.5 border-l border-input pl-2">
            {(node.children ?? []).map((child) => (
              <NavRenderNode key={child.id} node={child} />
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

function NavRenderNode({ node }: { node: NavNode }) {
  if (node.children && node.children.length > 0) return <NavBranch node={node} />;
  return <NavLeaf node={node} />;
}

function Section({
  id,
  labelKey,
  fallback,
  tree,
}: {
  id: SectionId | 'top';
  labelKey: string;
  fallback: string;
  tree: NavNode[];
}) {
  const { t } = useTranslation();
  return (
    <SidebarGroup data-section={id}>
      <SidebarGroupLabel>{t(labelKey, fallback)}</SidebarGroupLabel>
      <SidebarMenu>
        {tree.map((node) => (
          <NavRenderNode key={node.id} node={node} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function Brand() {
  const reduced = useReducedMotion();
  const Logo = <AppLogo />;
  return (
    <NavLink to={urls.app.dashboard} className="flex min-w-0 items-center gap-2">
      {reduced ? (
        Logo
      ) : (
        <motion.span
          whileHover={{ rotate: -6, scale: 1.05 }}
          whileTap={{ scale: 0.95, rotate: 0 }}
          transition={SPRING.press}
          className="flex"
        >
          {Logo}
        </motion.span>
      )}
      <span className="min-w-0 truncate text-sm font-semibold group-data-[sidebar-state=collapsed]/sidebar:hidden">
        {APP_TITLE}
      </span>
    </NavLink>
  );
}

function SidebarNav() {
  return (
    <SidebarContent>
      <Section id="top" labelKey="nav.groups.overview" fallback="Overview" tree={TOP_TREE} />
      <Section id="pages" labelKey="nav.groups.pages" fallback="Pages" tree={PAGES_TREE} />
      {UI_TREE.length > 0 ? (
        <Section id="ui" labelKey="nav.groups.ui" fallback="UI Elements" tree={UI_TREE} />
      ) : null}
      <SidebarPurchaseBanner />
    </SidebarContent>
  );
}

/* -------------------------- Header ------------------------------ */

function TopNavLink({ to, end, label }: { to: string; end?: boolean; label: string }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
          isActive
            ? 'text-primary-foreground'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive ? (
            <ActivePill layoutId="topnav-active" className="!bg-primary !ring-0" />
          ) : null}
          <span className="relative">{label}</span>
        </>
      )}
    </NavLink>
  );
}

function TopNav() {
  const { t } = useTranslation();
  const items = React.useMemo(
    () => [
      ...flattenNavLeaves(TOP_TREE),
      ...flattenNavLeaves(PAGES_TREE),
      ...flattenNavLeaves(UI_TREE),
    ],
    [],
  );
  const purchaseLabel = t('nav.purchase', 'Purchase plan');
  const isExternalPurchaseLink = /^https?:\/\//i.test(TEMPLATE_PURCHASE_URL);
  return (
    <nav className="hidden min-w-0 flex-1 items-center lg:flex">
      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto whitespace-nowrap pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <TopNavLink
            key={item.id}
            to={item.to}
            end={item.end}
            label={t(item.labelKey, item.fallback)}
          />
        ))}
        <TopNavLink to={urls.app.ui.tokens.colors} label={t('nav.groups.ui', 'UI Elements')} />
        {isExternalPurchaseLink ? (
          <a
            href={TEMPLATE_PURCHASE_URL}
            target="_blank"
            rel="noreferrer"
            className="relative rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {purchaseLabel}
          </a>
        ) : (
          <TopNavLink to={TEMPLATE_PURCHASE_URL} label={purchaseLabel} />
        )}
      </div>
    </nav>
  );
}

function TopNavMobileMenu() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const items = React.useMemo(
    () => [
      ...flattenNavLeaves(TOP_TREE),
      ...flattenNavLeaves(PAGES_TREE),
      ...flattenNavLeaves(UI_TREE),
    ],
    [],
  );
  const purchaseLabel = t('nav.purchase', 'Purchase plan');
  const isExternalPurchaseLink = /^https?:\/\//i.test(TEMPLATE_PURCHASE_URL);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={t('nav.openMenu', 'Open navigation menu')}
        >
          <CommandIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85%] max-w-[22rem] p-0">
        <SheetHeader className="border-b border-border px-4 py-3 text-left">
          <SheetTitle>{APP_TITLE}</SheetTitle>
          <SheetDescription>
            {t('nav.mobileDescription', 'Navigate to pages and UI sections.')}
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-1 overflow-y-auto p-3">
          {items.map((item) =>
            isExternalNavTo(item.to) ? (
              <a
                key={item.id}
                href={item.to}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
              >
                <span>{t(item.labelKey, item.fallback)}</span>
                <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-primary">
                  Pro
                </span>
              </a>
            ) : (
              <NavLink
                key={item.id}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted',
                  )
                }
              >
                {t(item.labelKey, item.fallback)}
              </NavLink>
            ),
          )}
          {isExternalPurchaseLink ? (
            <a
              href={TEMPLATE_PURCHASE_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
            >
              {purchaseLabel}
            </a>
          ) : (
            <NavLink
              to={TEMPLATE_PURCHASE_URL}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted',
                )
              }
            >
              {purchaseLabel}
            </NavLink>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function HeaderUtilityActions() {
  return (
    <>
      <CommandPaletteTrigger />
      <NotificationsPopover />
      <LanguageMenu />
      <ThemeMenu />
    </>
  );
}

function MobileHeaderUtilitiesToggle() {
  const { t } = useTranslation();
  const { open, setOpen } = useMobileHeaderUtilities();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="h-9 w-9 md:hidden"
      aria-expanded={open}
      aria-label={
        open
          ? t('nav.collapseHeaderTools', 'Hide header tools')
          : t('nav.expandHeaderTools', 'Show header tools')
      }
      onClick={() => setOpen((prev) => !prev)}
    >
      <ChevronDown
        className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
        aria-hidden
      />
    </Button>
  );
}

function HeaderActionsToolbar() {
  return (
    <div className={headerActionsToolbarClassName()}>
      <div className="hidden items-center gap-1 md:flex md:gap-2">
        <HeaderUtilityActions />
      </div>
      <MobileHeaderUtilitiesToggle />
      <UserMenu />
    </div>
  );
}

/** Utility strip below the header on small screens (search, alerts, locale, theme). */
function MobileHeaderUtilityRow() {
  const { open } = useMobileHeaderUtilities();

  if (!open) return null;

  return (
    <div className="border-t border-input md:hidden">
      <div className="flex items-center justify-center gap-1 px-4 py-2">
        <HeaderUtilityActions />
      </div>
    </div>
  );
}

function SidebarHeaderBar({ compact = false }: { compact?: boolean }) {
  return (
    <AppHeaderChrome compact={compact}>
      <SidebarTrigger className="shrink-0" />
      <BreadcrumbsAuto variant="header" className="min-w-0 flex-1" />
      <HeaderActionsToolbar />
    </AppHeaderChrome>
  );
}

function TopNavHeader() {
  return (
    <AppHeaderChrome>
      <div className="lg:hidden">
        <TopNavMobileMenu />
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <AppLogo />
        <span className="min-w-0 truncate text-sm font-semibold">{APP_TITLE}</span>
      </div>
      <TopNav />
      <HeaderActionsToolbar />
    </AppHeaderChrome>
  );
}

export default function AppShell() {
  const { preferences } = usePreferences();
  const layout = preferences.layout;
  const isCompactLayout = layout === 'compact';
  const desktopStateOverride =
    isCompactLayout && preferences.sidebarState === 'expanded' ? 'collapsed' : undefined;

  if (layout === 'top-nav') {
    return (
      <div className="flex h-svh min-h-0 flex-col overflow-hidden bg-background text-foreground">
        <TopNavHeader />
        <main
          id="main-content"
          className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6"
        >
          <PageOutletTransition />
        </main>
      </div>
    );
  }

  return (
    <AppHeaderProvider>
      <SidebarProvider desktopStateOverride={desktopStateOverride}>
        <Sidebar>
          <SidebarHeader className={isCompactLayout ? 'h-14 min-h-14' : undefined}>
            <Brand />
          </SidebarHeader>
          <SidebarNav />
          <SidebarFooter>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground group-data-[sidebar-state=collapsed]/sidebar:hidden">
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">
                <CommandIcon className="inline h-3 w-3" /> K
              </kbd>{' '}
              to search
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <SidebarHeaderBar compact={isCompactLayout} />
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <main
              id="main-content"
              className={cn('flex-1 p-4 md:p-6', isCompactLayout && 'p-3 md:p-4')}
            >
              <PageOutletTransition />
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AppHeaderProvider>
  );
}
