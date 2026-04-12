import { useState, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export function useMainLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const handleDrawerToggle = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  return {
    isMobile,
    drawerOpen,
    handleDrawerOpen,
    handleDrawerClose,
    handleDrawerToggle,
  };
}
