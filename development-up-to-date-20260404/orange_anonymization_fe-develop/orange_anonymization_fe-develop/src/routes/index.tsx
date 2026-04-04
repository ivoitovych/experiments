import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { ROUTES } from '@/constants';
import Auth from '@/pages/Auth';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import Dashboard from '@/pages/Dashboard';
import MainLayout from '@/components/layouts/MainLayout';
import AuthLayout from '@/components/layouts/AuthLayout';

const Landing = lazy(() => import('@/pages/Landing'));
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
        <Route path="/" element={<Landing />} />

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
