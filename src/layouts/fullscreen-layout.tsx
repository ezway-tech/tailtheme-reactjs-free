import { Outlet } from 'react-router-dom';

export default function FullscreenLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main id="main-content" className="flex min-h-screen flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
}
