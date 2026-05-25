import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Command as CommandIcon, CreditCard, Layers, LayoutDashboard, Search } from 'lucide-react';
import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui';
import { TEMPLATE_PURCHASE_URL } from '@/config';
import { cn } from '@/lib/cn';
import {
  appendCommandPaletteRecentId,
  loadCommandPaletteRecentIds,
} from '@/lib/command-palette-recents';
import {
  PAGES_TREE,
  TOP_TREE,
  UI_TREE,
  type FlatNavLeaf,
  flattenNavLeaves,
} from '@/navigation/app-nav-tree';
import { urls } from '@/routes/urls';

interface CommandPaletteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

const CommandPaletteContext = React.createContext<CommandPaletteContextValue | null>(null);

export function useCommandPalette(): CommandPaletteContextValue {
  const ctx = React.useContext(CommandPaletteContext);
  if (!ctx) throw new Error('useCommandPalette must be used inside <CommandPaletteProvider>');
  return ctx;
}

const PALETTE_UI_HUB_LEAF: FlatNavLeaf = {
  id: 'palette.ui.root',
  labelKey: 'nav.groups.ui',
  fallback: 'UI Elements',
  to: urls.app.ui.tokens.colors,
  icon: Layers,
};

const PALETTE_PURCHASE_LEAF: FlatNavLeaf = {
  id: 'palette.purchase',
  labelKey: 'nav.purchase',
  fallback: 'Purchase plan',
  to: TEMPLATE_PURCHASE_URL,
  icon: CreditCard,
};

interface PaletteSection {
  id: string;
  headingKey: string;
  headingFallback: string;
  leaves: FlatNavLeaf[];
}

interface PaletteItem {
  id: string;
  Icon: React.ElementType;
  label: string;
  /** Distinct per rendered row — cmdk uses `value` for selection; duplicates highlight together. */
  cmdkValue: string;
  to: string;
  action: () => void;
}

/**
 * Global `Cmd/Ctrl+K` palette provider. Renders a `CommandDialog` with the same
 * routes as the app sidebar (plus UI hub and purchase). Theme appearance is
 * adjusted from the header theme control, not here.
 */
export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [recentIds, setRecentIds] = React.useState<string[]>(() => loadCommandPaletteRecentIds());

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    setRecentIds(loadCommandPaletteRecentIds());
  }, [open]);

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  const value = React.useMemo<CommandPaletteContextValue>(
    () => ({ open, setOpen, toggle: () => setOpen((v) => !v) }),
    [open],
  );

  const paletteSections = React.useMemo((): PaletteSection[] => {
    return [
      {
        id: 'overview',
        headingKey: 'nav.groups.overview',
        headingFallback: 'Overview',
        leaves: [...flattenNavLeaves(TOP_TREE), PALETTE_PURCHASE_LEAF],
      },
      {
        id: 'pages',
        headingKey: 'nav.groups.pages',
        headingFallback: 'Pages',
        leaves: flattenNavLeaves(PAGES_TREE),
      },
      {
        id: 'ui',
        headingKey: 'nav.groups.ui',
        headingFallback: 'UI Elements',
        leaves: [PALETTE_UI_HUB_LEAF, ...flattenNavLeaves(UI_TREE)],
      },
    ];
  }, []);

  const leafById = React.useMemo(() => {
    const map = new Map<string, FlatNavLeaf>();
    for (const section of paletteSections) {
      for (const leaf of section.leaves) {
        map.set(leaf.id, leaf);
      }
    }
    return map;
  }, [paletteSections]);

  const buildPaletteItem = React.useCallback(
    (leaf: FlatNavLeaf, valueScope: string): PaletteItem => {
      const label = t(leaf.labelKey, leaf.fallback);
      const Icon = leaf.icon ?? LayoutDashboard;
      const cmdkValue = `${valueScope} ${leaf.id} ${label} ${leaf.to}`.trim();
      return {
        id: leaf.id,
        Icon,
        label,
        cmdkValue,
        to: leaf.to,
        action: () => {
          setRecentIds(appendCommandPaletteRecentId(leaf.id));
          if (/^https?:\/\//i.test(leaf.to)) {
            window.open(leaf.to, '_blank', 'noopener,noreferrer');
            return;
          }
          navigate(leaf.to);
        },
      };
    },
    [navigate, t],
  );

  const recentItems = React.useMemo(() => {
    return recentIds
      .map((id) => leafById.get(id))
      .filter((leaf): leaf is FlatNavLeaf => leaf != null)
      .map((leaf) => buildPaletteItem(leaf, 'recent'));
  }, [buildPaletteItem, leafById, recentIds]);

  const paletteSectionsWithItems = React.useMemo(() => {
    return paletteSections.map((section) => ({
      ...section,
      heading: t(section.headingKey, section.headingFallback),
      items: section.leaves.map((leaf) => buildPaletteItem(leaf, section.id)),
    }));
  }, [buildPaletteItem, paletteSections, t]);

  const renderItemRow = (item: PaletteItem, keyPrefix: string) => (
    <CommandItem
      key={`${keyPrefix}${item.id}`}
      value={item.cmdkValue}
      onSelect={() => run(item.action)}
    >
      <item.Icon className="h-4 w-4" />
      {item.label}
    </CommandItem>
  );

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t('command.placeholder', 'Type a command or search…')} />
        <CommandList>
          <CommandEmpty>{t('command.empty', 'No results found.')}</CommandEmpty>
          {recentItems.length > 0 ? (
            <>
              <CommandGroup heading={t('command.recent', 'Recent')}>
                {recentItems.map((item) => renderItemRow(item, 'recent:'))}
              </CommandGroup>
              <CommandSeparator />
            </>
          ) : null}
          {paletteSectionsWithItems.map((section, index) => (
            <React.Fragment key={section.id}>
              {index > 0 ? <CommandSeparator /> : null}
              <CommandGroup heading={section.heading}>
                {section.items.map((item) => renderItemRow(item, ''))}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </CommandPaletteContext.Provider>
  );
}

/**
 * Button that opens the command palette. Use inside headers.
 */
export function CommandPaletteTrigger() {
  const { t } = useTranslation();
  const { setOpen } = useCommandPalette();
  return (
    <Button
      variant="ghost"
      onClick={() => setOpen(true)}
      className={cn(
        'h-8 w-8 shrink-0 text-muted-foreground',
        'lg:h-8 lg:w-auto lg:justify-start lg:gap-2 lg:px-3 lg:pl-2 lg:pr-1 lg:text-sm',
      )}
      aria-label={t('command.open', 'Open command palette')}
    >
      <Search className="h-4 w-4 shrink-0" />
      <span className="hidden lg:inline">{t('command.search', 'Search…')}</span>
      <CommandShortcut className="hidden xl:inline">
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono">
          <CommandIcon className="inline h-3 w-3" />K
        </kbd>
      </CommandShortcut>
    </Button>
  );
}
