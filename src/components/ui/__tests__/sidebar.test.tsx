import { describe, expect, it, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PreferencesProvider } from '@/providers/preferences-provider';
import { Sidebar, SidebarContent, SidebarInset, SidebarProvider, SidebarTrigger } from '../sidebar';

function Harness() {
  return (
    <PreferencesProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>nav</SidebarContent>
        </Sidebar>
        <SidebarInset>
          <SidebarTrigger aria-label="toggle" />
          <span>main</span>
        </SidebarInset>
      </SidebarProvider>
    </PreferencesProvider>
  );
}

describe('Sidebar', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the navigation and main content', () => {
    render(<Harness />);
    expect(screen.getByText('nav')).toBeInTheDocument();
    expect(screen.getByText('main')).toBeInTheDocument();
  });

  it('toggles the sidebar state when the trigger is clicked', async () => {
    render(<Harness />);
    const wrapper = document.querySelector('[data-sidebar-state]');
    expect(wrapper?.getAttribute('data-sidebar-state')).toBe('expanded');
    await userEvent.click(screen.getByRole('button', { name: 'toggle' }));
    expect(document.querySelector('[data-sidebar-state]')?.getAttribute('data-sidebar-state')).toBe(
      'collapsed',
    );
  });

  it('toggles the sidebar via Ctrl+B hotkey', () => {
    render(<Harness />);
    expect(document.querySelector('[data-sidebar-state]')?.getAttribute('data-sidebar-state')).toBe(
      'expanded',
    );
    fireEvent.keyDown(window, { key: 'b', ctrlKey: true });
    expect(document.querySelector('[data-sidebar-state]')?.getAttribute('data-sidebar-state')).toBe(
      'collapsed',
    );
  });
});
