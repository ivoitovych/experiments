/**
 * Route Configuration
 *
 * React Router v6 uses a declarative <Routes> tree.
 * Layout routes (routes with only an element, no path) wrap child routes
 * with a shared layout without adding a URL segment.
 *
 * Route tree:
 *   /                     → Landing (public, LandingLayout)
 *   /auth/login           → Auth/Login (public, AuthLayout)
 *   /auth/verify          → Auth/Verify (public, AuthLayout)
 *   /app/*                → ProtectedRoute → MainLayout (sidebar + AppBar + logout)
 *     /app/dashboard      → Dashboard
 *     /app/de-identify    → DeIdentify stepper
 *     /app/synthetic-data → SyntheticData
 *     /app/processing/:id → Processing (poll loop)
 *     /app/results/:id    → Results (7 interactive features)
 */
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { ProtectedRoute } from './ProtectedRoute';
import { ROUTES } from '@/constants';
import { LandingLayout } from '@/layouts/LandingLayout';
import { MainLayout } from '@/layouts/MainLayout';

// ─── Lazy-loaded pages ────────────────────────────────────────────────────────
// Code splitting: each page is a separate JS chunk loaded on demand.
// This keeps the initial bundle small.
const Main = lazy(() => import('@/pages/Main'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Auth = lazy(() => import('@/pages/Auth'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const DeIdentify = lazy(() => import('@/pages/DeIdentify'));
const SyntheticData = lazy(() => import('@/pages/SyntheticData'));
const Processing = lazy(() => import('@/pages/Processing'));
const Results = lazy(() => import('@/pages/Results'));

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
        {/* Public landing pages — wrapped in LandingLayout (header + footer) */}
        <Route element={<LandingLayout />}>
          <Route path={ROUTES.LANDING} element={<Main />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
        </Route>
        <Route path="/auth/*" element={<Auth />} />

        {/* Protected routes — all nested under /app, wrapped in MainLayout shell */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.DE_IDENTIFY} element={<DeIdentify />} />
            <Route path={ROUTES.SYNTHETIC_DATA} element={<SyntheticData />} />
            <Route path={`${ROUTES.PROCESSING}/:jobId`} element={<Processing />} />
            <Route path={`${ROUTES.RESULTS}/:jobId`} element={<Results />} />
          </Route>
        </Route>

        {/* Catch-all: redirect unknown paths to landing */}
        <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
      </Routes>
    </Suspense>
  );
}
