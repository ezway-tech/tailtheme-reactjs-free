import { useEffect, useState, type RefObject } from 'react';

function findScrollParent(node: HTMLElement | null): HTMLElement | Window {
  let parent = node?.parentElement ?? null;
  while (parent) {
    const { overflowY } = getComputedStyle(parent);
    if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') {
      return parent;
    }
    parent = parent.parentElement;
  }
  return window;
}

function readScrollTop(scrollTarget: HTMLElement | Window): number {
  return scrollTarget instanceof Window ? scrollTarget.scrollY : scrollTarget.scrollTop;
}

/**
 * Returns true when the nearest scroll container (or `window`) has scrolled past `thresholdPx`.
 * Used for transparent → solid marketing headers inside app shells and standalone pages.
 */
export function useScrollPast(
  thresholdPx = 20,
  anchorRef?: RefObject<HTMLElement | null>,
): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const scrollTarget = findScrollParent(anchorRef?.current ?? null);
    const onScroll = () => setPast(readScrollTop(scrollTarget) > thresholdPx);
    onScroll();
    scrollTarget.addEventListener('scroll', onScroll, { passive: true });
    return () => scrollTarget.removeEventListener('scroll', onScroll);
  }, [thresholdPx, anchorRef]);

  return past;
}
