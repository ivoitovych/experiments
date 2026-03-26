/**
 * LandingHeader
 *
 * Public navigation bar shared by all landing pages (Main, About, Contact).
 * Uses React Router NavLink for route-based navigation with active highlighting.
 * Responsive: hamburger menu on mobile.
 */
import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  LocalHospital as LocalHospitalIcon,
} from '@mui/icons-material';
import { ROUTES } from '@/constants';

interface NavItem {
  labelKey: string;
  to: string;
}

const NAV_ITEMS: NavItem[] = [
  { labelKey: 'nav.solutions', to: ROUTES.LANDING },
  { labelKey: 'nav.aboutUs', to: ROUTES.ABOUT },
  { labelKey: 'nav.contactUs', to: ROUTES.CONTACT },
];

export function LandingHeader() {
  const { t } = useTranslation();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ gap: 2 }}>
            {/* Brand — links to home */}
            <Box
              component={RouterLink}
              to={ROUTES.LANDING}
              sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: 0.5 }}
            >
              <LocalHospitalIcon sx={{ color: 'primary.main' }} />
              <Typography variant="h6" fontWeight={800} color="primary.main">
                {t('nav.brand')}
              </Typography>
            </Box>

            {/* Desktop nav links */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 0.5, ml: 4 }}>
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  color="inherit"
                  sx={{
                    fontWeight: isActive(item.to) ? 700 : 500,
                    color: isActive(item.to) ? 'primary.main' : 'text.primary',
                    borderBottom: isActive(item.to) ? 2 : 0,
                    borderColor: 'primary.main',
                    borderRadius: 0,
                    pb: 0.5,
                  }}
                >
                  {t(item.labelKey)}
                </Button>
              ))}
            </Box>

            {/* Spacer for mobile */}
            <Box sx={{ flexGrow: 1, display: { md: 'none' } }} />

            {/* Get Started CTA — desktop */}
            <Button
              variant="contained"
              component={RouterLink}
              to={ROUTES.LOGIN}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              {t('nav.getStarted')}
            </Button>

            {/* Hamburger — mobile */}
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { md: 'none' } }}
              aria-label={t('nav.menuOpen')}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <IconButton onClick={() => setDrawerOpen(false)} aria-label={t('nav.menuClose')}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {NAV_ITEMS.map((item) => (
              <ListItemButton
                key={item.to}
                component={RouterLink}
                to={item.to}
                selected={isActive(item.to)}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={t(item.labelKey)} />
              </ListItemButton>
            ))}
            <Box sx={{ px: 2, mt: 2 }}>
              <Button
                variant="contained"
                fullWidth
                component={RouterLink}
                to={ROUTES.LOGIN}
                onClick={() => setDrawerOpen(false)}
              >
                {t('nav.getStarted')}
              </Button>
            </Box>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
