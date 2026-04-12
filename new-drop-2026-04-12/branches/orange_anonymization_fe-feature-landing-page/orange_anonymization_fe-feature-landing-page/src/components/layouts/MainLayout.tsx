import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layouts/Sidebar';
import { Header } from '@/components/layouts/Header';
import { useMainLayout } from '@/components/layouts/useMainLayout';
import { LAYOUT } from '@/theme';

const PLACEHOLDER_EMAIL = 'demo@clinic.com';

const MainLayout = () => {
  // TODO: replace with actual user email from auth state
  const userEmail = PLACEHOLDER_EMAIL;
  const { isMobile, drawerOpen, handleDrawerOpen, handleDrawerClose } = useMainLayout();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar isMobile={isMobile} drawerOpen={drawerOpen} onDrawerClose={handleDrawerClose} />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          ml: isMobile ? 0 : `${LAYOUT.sidebar.width}px`,
        }}
      >
        <Header userEmail={userEmail} isMobile={isMobile} onMenuOpen={handleDrawerOpen} />

        <Box
          component="main"
          sx={(theme) => ({
            flex: 1,
            p: isMobile ? 2 : 4,
            bgcolor: theme.palette.background.default,
          })}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
