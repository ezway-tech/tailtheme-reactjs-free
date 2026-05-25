import * as React from 'react';

interface AppHeaderContextValue {
  /** Sticky shell shows the current page title on mobile (hide duplicate PageHeader h1). */
  mobileTitleVisible: boolean;
  setMobileTitleVisible: (visible: boolean) => void;
}

const AppHeaderContext = React.createContext<AppHeaderContextValue | null>(null);

export function AppHeaderProvider({ children }: { children: React.ReactNode }) {
  const [mobileTitleVisible, setMobileTitleVisible] = React.useState(false);
  const value = React.useMemo(
    () => ({ mobileTitleVisible, setMobileTitleVisible }),
    [mobileTitleVisible],
  );
  return <AppHeaderContext.Provider value={value}>{children}</AppHeaderContext.Provider>;
}

// Hook colocated with provider — standard React context pattern.
// eslint-disable-next-line react-refresh/only-export-components -- hook export
export function useAppHeader(): AppHeaderContextValue {
  const ctx = React.useContext(AppHeaderContext);
  if (!ctx) {
    return {
      mobileTitleVisible: false,
      setMobileTitleVisible: () => undefined,
    };
  }
  return ctx;
}
