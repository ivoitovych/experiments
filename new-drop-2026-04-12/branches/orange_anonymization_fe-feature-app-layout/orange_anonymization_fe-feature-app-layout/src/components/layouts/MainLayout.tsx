import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layouts/Sidebar';
import { Header } from '@/components/layouts/Header';
import { LAYOUT } from '@/theme';

const PLACEHOLDER_EMAIL = 'demo@clinic.com';

const MainLayout = () => {
  // TODO: replace with actual user email from auth state
  const userEmail = PLACEHOLDER_EMAIL;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          ml: `${LAYOUT.sidebar.width}px`,
        }}
      >
        <Header userEmail={userEmail} />

        <Box
          component="main"
          sx={(theme) => ({
            flex: 1,
            p: 4,
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
