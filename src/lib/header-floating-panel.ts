import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/cn';

/** Matches `Sidebar` mobile breakpoint and TailTheme `md` layout split. */
export const HEADER_FLOATING_PANEL_MOBILE_QUERY = '(max-width: 767px)';

const MOBILE_PANEL_WIDTH = 'w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)]';

/**
 * Radix popover/dropdown props for header toolbars on narrow viewports:
 * center under the trigger and span the viewport minus horizontal inset.
 */
export function useHeaderFloatingPanel() {
  const isMobile = useMediaQuery(HEADER_FLOATING_PANEL_MOBILE_QUERY);

  return {
    isMobile,
    align: isMobile ? ('center' as const) : ('end' as const),
    sideOffset: isMobile ? 10 : 4,
    collisionPadding: isMobile ? 16 : undefined,
    contentClassName: isMobile ? MOBILE_PANEL_WIDTH : undefined,
  };
}

/** Width classes for header panels; pass desktop width when not mobile. */
export function headerFloatingPanelWidthClassName(
  isMobile: boolean,
  desktopClassName: string,
): string {
  return cn(isMobile ? MOBILE_PANEL_WIDTH : desktopClassName);
}
