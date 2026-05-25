import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppProviders } from '@/providers';
import { appRouteObjects } from '@/routes/route-objects';

const router = createBrowserRouter(appRouteObjects);

export default function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}
