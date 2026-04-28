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
  SvgIcon,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { ROUTES, FONT_SIZES } from '@/constants';
import AppLogo from '@/assets/icons/landingLogo.svg?react';

interface NavItem {
  labelKey: string;
  to: string;
}

const NAV_ITEMS: NavItem[] = [
  { labelKey: 'nav.solutions', to: ROUTES.LANDING },
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
        sx={{ borderBottom: 1, borderColor: 'greenOpacity', bgcolor: 'primary.800' }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box
              component={RouterLink}
              to={ROUTES.LANDING}
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                gap: 1,
                minWidth: { md: '200px' },
              }}
            >
              <SvgIcon component={AppLogo} inheritViewBox sx={{ color: 'common.white' }} />
              <Typography
                variant="h6"
                fontWeight="fontWeightSemiBold"
                color="common.white"
                sx={{ fontSize: FONT_SIZES.xl }}
              >
                {t('nav.landing-brand')}
              </Typography>
            </Box>

            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 1,
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  sx={{
                    color: 'common.white',
                    bgcolor: isActive(item.to) ? 'sidebar.activeOverlay' : 'transparent',
                    fontSize: FONT_SIZES.sm,
                    minWidth: 'auto',
                    '&:hover': { backgroundColor: 'transparent', opacity: 0.8 },
                  }}
                >
                  {t(item.labelKey)}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                minWidth: { md: '200px' },
                justifyContent: 'flex-end',
              }}
            >
              <Button
                variant="contained"
                component={RouterLink}
                to={ROUTES.LOGIN}
                endIcon={<ArrowForwardIcon />}
                size="small"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  paddingX: '24px',
                  paddingY: '12px',
                  fontSize: FONT_SIZES.sm,
                  textTransform: 'none',
                  color: 'primary.800',
                  bgcolor: 'accent.400',
                  background: (theme) => theme.palette.accent[400],
                  '&:hover': {
                    background: (theme) => theme.palette.accent[500],
                  },
                }}
              >
                {t('nav.getStarted')}
              </Button>

              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{ display: { md: 'none' }, color: 'common.white' }}
                aria-label={t('nav.menuOpen')}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box
          sx={{
            width: 280,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            bgcolor: 'primary.800',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <IconButton onClick={() => setDrawerOpen(false)} aria-label={t('nav.menuClose')}>
              <CloseIcon sx={{ color: 'common.white' }} />
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
                sx={{
                  color: isActive(item.to) ? 'accent.500' : 'common.white',
                  fontSize: FONT_SIZES.sm,
                  minWidth: 'auto',
                  borderRadius: 1,
                  '&:hover': { backgroundColor: 'transparent', opacity: 0.8 },
                }}
              >
                <ListItemText primary={t(item.labelKey)} />
              </ListItemButton>
            ))}
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                fullWidth
                component={RouterLink}
                to={ROUTES.LOGIN}
                onClick={() => setDrawerOpen(false)}
                endIcon={<ArrowForwardIcon />}
                size="small"
                sx={{
                  paddingX: '24px',
                  paddingY: '12px',
                  fontSize: FONT_SIZES.sm,
                  textTransform: 'none',
                  background: (theme) => theme.palette.accent[400],
                  '&:hover': {
                    background: (theme) => theme.palette.accent[500],
                  },
                }}
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
