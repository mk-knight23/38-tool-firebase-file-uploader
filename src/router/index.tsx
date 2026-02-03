import { createBrowserRouter, RouterProvider } from 'react-router';
import App from '../App';
import Home from '../pages/Home';
import Settings from '../pages/Settings';
import Analytics from '../pages/Analytics';
import Shared from '../pages/Shared';
import Favorites from '../pages/Favorites';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'shared',
        element: <Shared />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
