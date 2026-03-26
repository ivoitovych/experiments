/**
 * AuthLayout
 *
 * Minimal centered layout used by the magic link login and verify pages.
 * Shows the brand logo on top, centered card below.
 *
 * Supports two usage patterns:
 *   1. As a route layout element (used with React Router Outlet):
 *      <Route element={<AuthLayout />}>...</Route>
 *   2. As a wrapper component (used directly in Auth.tsx):
 *      <AuthLayout><SomeComponent /></AuthLayout>
 */
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { LocalHospital as LocalHospitalIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      {/* Brand mark */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <LocalHospitalIcon sx={{ fontSize: 36, color: 'primary.main' }} />
        <Typography variant="h5" fontWeight={800} color="primary.main">
          {t('nav.brand')}
        </Typography>
      </Box>

      {/* Auth card content:
          - children when used as a wrapper (Auth.tsx passes its own <Routes>)
          - <Outlet /> when used as a React Router layout route element */}
      <Container maxWidth="sm">
        {children ?? <Outlet />}
      </Container>
    </Box>
  );
}
