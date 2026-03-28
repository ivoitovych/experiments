# Фронтенд: Layouts

[← Компоненти](./18-frontend-components.md) | [Hooks та утиліти →](./20-frontend-hooks-utils.md)

---

## Три layout'и додатку

```
Layout                  Де використовується           Автентифікація
──────────────────────  ────────────────────────────  ──────────────
LandingLayout           /, /about, /contact           Ні
AuthLayout              /auth/login, /auth/verify     Ні
MainLayout              /app/* (dashboard, wizard...) Так (JWT)
```

### LandingLayout

```typescript
// Публічний layout: Header + контент + Footer
function LandingLayout() {
  return (
    <Box>
      <LandingHeader />      {/* Навігація + Login кнопка */}
      <Outlet />              {/* Контент сторінки (React Router) */}
      <LandingFooter />
    </Box>
  );
}
```

### AuthLayout

```typescript
// Центрована картка для auth форм
function AuthLayout({ children }: { children?: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card sx={{ maxWidth: 480, width: '100%', p: 4 }}>
        <Typography variant="h4" align="center">Clinical Data Studio</Typography>
        {children ?? <Outlet />}
      </Card>
    </Box>
  );
}
```

### MainLayout — захищений layout

```typescript
// Sidebar навігація + AppBar + Drawer (responsive)
function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAppSelector(s => s.auth);

  const navItems = [
    { label: t('nav.dashboard'), path: ROUTES.DASHBOARD, icon: <DashboardIcon /> },
    { label: t('nav.deIdentify'), path: ROUTES.DE_IDENTIFY, icon: <SecurityIcon /> },
    { label: t('nav.syntheticData'), path: ROUTES.SYNTHETIC_DATA, icon: <DatasetIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar з меню кнопкою та user info */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton onClick={() => setMobileOpen(!mobileOpen)}>
            <MenuIcon />
          </IconButton>
          <Typography>Clinical Data Studio</Typography>
          <Box sx={{ ml: 'auto' }}>
            <Typography>{user?.email}</Typography>
            <Button onClick={handleLogout}>{t('nav.logout')}</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar: Drawer (temporary на mobile, permanent на desktop) */}
      <Drawer variant={isMobile ? 'temporary' : 'permanent'} open={mobileOpen}>
        <List>
          {navItems.map(item => (
            <ListItemButton component={NavLink} to={item.path} key={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Контент сторінки */}
      <Box component="main" sx={{ flexGrow: 1, mt: '64px', p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
```
