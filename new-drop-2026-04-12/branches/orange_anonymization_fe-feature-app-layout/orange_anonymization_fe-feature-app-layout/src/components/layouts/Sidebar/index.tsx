import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { LAYOUT } from '@/theme';
import { useSidebar } from '@/components/layouts/Sidebar/useSidebar';

const Sidebar = () => {
  const { t, navItems, isActive, handleNavigate, handleSignOut } = useSidebar();

  return (
    <Box
      component="nav"
      sx={(theme) => ({
        width: LAYOUT.sidebar.width,
        minHeight: '100vh',
        bgcolor: theme.palette.sidebar.background,
        display: 'flex',
        flexDirection: 'column',
        pb: 3,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: theme.zIndex.drawer,
      })}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Typography
          variant="h6"
          sx={(theme) => ({
            color: theme.palette.primary.contrastText,
            fontWeight: theme.typography.fontWeightBold,
          })}
        >
          {t('sidebar.brand')}
        </Typography>
        <Typography
          variant="caption"
          sx={(theme) => ({
            color: theme.palette.grey[400],
          })}
        >
          {t('sidebar.brandSubtitle')}
        </Typography>
      </Box>

      <List sx={{ flex: 1, px: 1.5 }}>
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <ListItemButton
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              sx={(theme) => ({
                borderRadius: 1.5,
                mb: 0.5,
                bgcolor: active ? theme.palette.sidebar.activeOverlay : 'transparent',
                borderLeft: active
                  ? `${LAYOUT.sidebar.activeBorderWidth}px solid ${theme.palette.primary.light}`
                  : `${LAYOUT.sidebar.activeBorderWidth}px solid transparent`,
                '&:hover': {
                  bgcolor: theme.palette.sidebar.hoverOverlay,
                },
              })}
            >
              <ListItemIcon
                sx={(theme) => ({
                  color: active ? theme.palette.primary.contrastText : theme.palette.grey[400],
                  minWidth: LAYOUT.sidebar.iconMinWidth,
                })}
              >
                <item.icon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={t(item.labelKey)}
                primaryTypographyProps={{
                  variant: 'body2',
                  sx: (theme) => ({
                    color: active ? theme.palette.primary.contrastText : theme.palette.grey[400],
                    fontWeight: active
                      ? theme.typography.fontWeightMedium
                      : theme.typography.fontWeightRegular,
                  }),
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ px: 1.5 }}>
        <ListItemButton
          onClick={handleSignOut}
          sx={(theme) => ({
            borderRadius: 1.5,
            '&:hover': {
              bgcolor: theme.palette.sidebar.hoverOverlay,
            },
          })}
        >
          <ListItemIcon
            sx={(theme) => ({
              color: theme.palette.grey[400],
              minWidth: LAYOUT.sidebar.iconMinWidth,
            })}
          >
            <LogoutOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={t('sidebar.signOut')}
            primaryTypographyProps={{
              variant: 'body2',
              sx: (theme) => ({
                color: theme.palette.grey[400],
              }),
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export { Sidebar };
