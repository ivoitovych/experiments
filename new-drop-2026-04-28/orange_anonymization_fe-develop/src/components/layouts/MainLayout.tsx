import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/layouts/Sidebar';
import { Header } from '@/components/layouts/Header';
import { useMainLayout } from '@/components/layouts/useMainLayout';
import {
  AUTH_SESSION_MAX_AGE_MS,
  AUTH_SESSION_STARTED_AT_KEY,
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  ROUTES,
} from '@/constants';
import { LAYOUT } from '@/theme';
import { useAppSelector } from '@/store/store';
import { API_TIMEOUT } from '@/constants/api-config';

const MainLayout = () => {
  const navigate = useNavigate();
  const userEmail = useAppSelector((state) => state.auth.user?.email ?? '');
  const { isMobile, drawerOpen, handleDrawerOpen, handleDrawerClose } = useMainLayout();

  useEffect(() => {
    const checkSessionExpiration = () => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) {
        return;
      }

      const sessionStartedAt = localStorage.getItem(AUTH_SESSION_STARTED_AT_KEY);
      const parsedSessionStartedAt = sessionStartedAt ? Number(sessionStartedAt) : NaN;
      const hasValidSessionStart =
        Number.isFinite(parsedSessionStartedAt) && parsedSessionStartedAt > 0;
      const isSessionExpired =
        !hasValidSessionStart || Date.now() - parsedSessionStartedAt >= AUTH_SESSION_MAX_AGE_MS;

      if (isSessionExpired) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        localStorage.removeItem(AUTH_SESSION_STARTED_AT_KEY);
        navigate(ROUTES.SESSION_EXPIRED, { replace: true });
      }
    };

    checkSessionExpiration();
    const intervalId = window.setInterval(checkSessionExpiration, API_TIMEOUT);

    return () => window.clearInterval(intervalId);
  }, [navigate]);

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
