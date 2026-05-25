import { describe, expect, it, beforeEach } from 'vitest';
import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { PreferencesProvider } from '@/providers/preferences-provider';
import { DEFAULT_PREFERENCES, usePreferences } from '../usePreferences';
import type { ReactNode } from 'react';

function wrapper({ children }: { children: ReactNode }) {
  return <PreferencesProvider>{children}</PreferencesProvider>;
}

describe('usePreferences', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('style');
    document.documentElement.removeAttribute('data-layout');
    document.documentElement.dir = 'ltr';
  });

  it('exposes default preferences', () => {
    const { result } = renderHook(() => usePreferences(), { wrapper });
    expect(result.current.preferences).toEqual(DEFAULT_PREFERENCES);
  });

  it('updates preferences via setPreferences and persists to localStorage', () => {
    const { result } = renderHook(() => usePreferences(), { wrapper });
    act(() => {
      result.current.setPreferences({ uiScale: 110 });
    });
    expect(result.current.preferences.layout).toBe('sidebar');
    expect(result.current.preferences.uiScale).toBe(110);
    const stored = JSON.parse(window.localStorage.getItem('tailtheme-prefs') ?? '{}');
    expect(stored.layout).toBe('sidebar');
    expect(stored.uiScale).toBe(110);
  });

  it('toggles the sidebar state', () => {
    const { result } = renderHook(() => usePreferences(), { wrapper });
    expect(result.current.preferences.sidebarState).toBe('expanded');
    act(() => result.current.toggleSidebar());
    expect(result.current.preferences.sidebarState).toBe('collapsed');
    act(() => result.current.toggleSidebar());
    expect(result.current.preferences.sidebarState).toBe('expanded');
  });

  it('applies RTL direction when rtl=true', () => {
    const { result } = renderHook(() => usePreferences(), { wrapper });
    act(() => result.current.setPreferences({ rtl: true }));
    expect(document.documentElement.dir).toBe('rtl');
    act(() => result.current.setPreferences({ rtl: false }));
    expect(document.documentElement.dir).toBe('ltr');
  });

  it('resets preferences back to defaults', () => {
    const { result } = renderHook(() => usePreferences(), { wrapper });
    act(() => result.current.setPreferences({ radius: 0 }));
    act(() => result.current.resetPreferences());
    expect(result.current.preferences).toEqual(DEFAULT_PREFERENCES);
  });
});
