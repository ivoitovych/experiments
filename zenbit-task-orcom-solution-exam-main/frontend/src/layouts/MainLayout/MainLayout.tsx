/**
 * MainLayout
 *
 * The authenticated app shell: sidebar navigation + top app bar + content area.
 *
 * Structure:
 *   <Box sx={{ display: 'flex' }}>
 *     <Drawer>  ← persistent sidebar (collapsible on mobile)
 *     <Box>
 *       <AppBar>  ← top bar with breadcrumbs + user menu
 *       <main>    ← <Outlet /> renders the current page here
 */
import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  FindInPage as FindInPageIcon,
  DataObject as DataObjectIcon,
  LocalHospital as LocalHospitalIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants';

const DRAWER_WIDTH = 260;

interface NavItem {
  labelKey: string;
  icon: React.ReactNode;
  to: string;
}

const NAV_ITEMS: NavItem[] = [
  { labelKey: 'nav.dashboard', icon: <DashboardIcon />, to: ROUTES.DASHBOARD },
  { labelKey: 'nav.deIdentify', icon: <FindInPageIcon />, to: ROUTES.DE_IDENTIFY },
  { labelKey: 'nav.syntheticData', icon: <DataObjectIcon />, to: ROUTES.SYNTHETIC_DATA },
];

export function MainLayout() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Brand */}
      <Toolbar sx={{ gap: 1.5, py: 1.5 }}>
        <LocalHospitalIcon sx={{ color: 'primary.main', fontSize: 28 }} />
        <Box>
          <Typography variant="subtitle1" fontWeight={700} color="primary.main" noWrap lineHeight={1.2}>
            {t('nav.brand')}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {t('nav.brandSubtitle')}
          </Typography>
        </Box>
      </Toolbar>
      <Divider />

      {/* Nav links */}
      <List sx={{ flex: 1, pt: 2, px: 1 }}>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.to} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={NavLink}
              to={item.to}
              sx={{
                borderRadius: 2,
                '&.active': {
                  bgcolor: 'primary.lightest',
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': { color: 'primary.main' },
                  fontWeight: 600,
                },
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={t(item.labelKey)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />

      {/* Top App Bar */}
      <AppBar
        position="fixed"
        color="inherit"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label={t('nav.menuOpen')}
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* App title — visible on desktop */}
          <Box sx={{ display: { xs: 'none', md: 'block' }, ml: `${DRAWER_WIDTH}px` }}>
            <Typography variant="subtitle1" fontWeight={600} color="text.primary" noWrap>
              {t('nav.appTitle')}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {t('nav.appSubtitle')}
            </Typography>
          </Box>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* User avatar + menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              {user?.email}
            </Typography>
            <Tooltip title={user?.email ?? ''}>
              <IconButton onClick={handleMenuOpen} size="small">
                <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: 14 }}>
                  {user?.firstName?.[0] ?? user?.email?.[0]?.toUpperCase() ?? '?'}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem disabled>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              {user?.email}
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              {t('nav.logout')}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer — responsive */}
      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 2, sm: 3, md: 4 },
          py: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: '64px', // AppBar height
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
