import { Outlet } from 'react-router-dom';
import { CommandPaletteProvider, SkipLink } from '@/components/patterns';
import { ConfirmProvider } from '@/components/patterns/confirm-dialog';

/** Lite root layout — no cookie banner, demo mode, or shortcuts overlay. */
export default function RootLayout() {
  return (
    <CommandPaletteProvider>
      <ConfirmProvider>
        <SkipLink />
        <Outlet />
      </ConfirmProvider>
    </CommandPaletteProvider>
  );
}
