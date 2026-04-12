import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import { LandingHeader } from '@/pages/Landing/sections/LandingHeader';
import { LandingFooter } from '@/pages/Landing/sections/LandingFooter';

export function LandingLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
      <LandingHeader />
      <Toolbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <LandingFooter />
    </Box>
  );
}
