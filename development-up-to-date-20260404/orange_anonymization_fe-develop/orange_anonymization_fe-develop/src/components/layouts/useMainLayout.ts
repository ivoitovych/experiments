import { useState, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export function useMainLayout() {
  const theme = useTheme();
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('lg'));
  const isLandscapePhone = useMediaQuery('(orientation: landscape) and (max-height: 600px)');
  const isMobile = isSmallWidth || isLandscapePhone;
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
