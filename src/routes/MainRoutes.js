import {lazy} from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import Support from "../pages/extra-pages/Support";
import AuthGuard from "../pages/authentication/AuthGuard";

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SupportPage = Loadable(lazy(() => import('pages/extra-pages/Support')));

// render - utilities
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));

// ==============================|| MAIN ROUTING ||============================== //


const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout/>
    </AuthGuard>
  ),
  children: [
    {
      path: '/',
      element: <DashboardDefault/>
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault/>
        }
      ]
    },
    {
      path: 'support',
      element: <Support/>
    }
  ]
};


export default MainRoutes;
