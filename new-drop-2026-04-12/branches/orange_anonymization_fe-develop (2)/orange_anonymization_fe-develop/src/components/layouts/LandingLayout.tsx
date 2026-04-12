import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import { LandingHeader } from '@/pages/Landing/sections/LandingHeader';
import { LandingFooter } from '@/pages/Landing/sections/LandingFooter';

export function LandingLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        overflowX: 'hidden',
        bgcolor: 'primary.800',
      }}
    >
      <LandingHeader />
      <Toolbar />
      <Box component="main" sx={{ flexGrow: 1, px: '20px' }}>
        <Outlet />
      </Box>
      <LandingFooter />
    </Box>
  );
}
