import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { ROUTES } from '@/constants';
import Auth from '@/pages/Auth';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import Dashboard from '@/pages/Dashboard';
import MainLayout from '@/components/layouts/MainLayout';
import AuthLayout from '@/components/layouts/AuthLayout';
import { LandingLayout } from '@/components/layouts/LandingLayout';
import Contact from '@/pages/Contact';
import Landing from '@/pages/Landing';

const DeIdentify = lazy(() => import('@/pages/DeIdentify'));
const SyntheticData = lazy(() => import('@/pages/SyntheticData'));

function PageLoader() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<LandingLayout />}>
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.LANDING} element={<Landing />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/*" element={<Auth />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.DE_IDENTIFY} element={<DeIdentify />} />
            <Route path={ROUTES.SYNTHETIC_DATA} element={<SyntheticData />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
