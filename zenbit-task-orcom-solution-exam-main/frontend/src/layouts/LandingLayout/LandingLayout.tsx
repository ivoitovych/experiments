/**
 * LandingLayout
 *
 * Shared layout for all public landing pages (Main, About, Contact).
 * Renders the LandingHeader at the top, page content via <Outlet />,
 * and LandingFooter at the bottom.
 */
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { LandingHeader } from '@/pages/Landing/sections/LandingHeader';
import { LandingFooter } from '@/pages/Landing/sections/LandingFooter';

export function LandingLayout() {
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <LandingHeader />
      <Outlet />
      <LandingFooter />
    </Box>
  );
}
