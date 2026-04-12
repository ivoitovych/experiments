import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FindReplaceOutlinedIcon from '@mui/icons-material/FindReplaceOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import { AUTH_TOKEN_KEY, ROUTES } from '@/constants';

interface NavItem {
  labelKey: string;
  path: string;
  icon: typeof DashboardOutlinedIcon;
}

const NAV_ITEMS: NavItem[] = [
  { labelKey: 'nav.dashboard', path: ROUTES.DASHBOARD, icon: DashboardOutlinedIcon },
  { labelKey: 'nav.deIdentify', path: ROUTES.DE_IDENTIFY, icon: FindReplaceOutlinedIcon },
  { labelKey: 'nav.syntheticData', path: ROUTES.SYNTHETIC_DATA, icon: StorageOutlinedIcon },
];

export function useSidebar(onNavigate?: () => void) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string): boolean => location.pathname === path;

  const handleNavigate = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  const handleSignOut = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    navigate(ROUTES.LOGIN);
    onNavigate?.();
  };

  return {
    t,
    navItems: NAV_ITEMS,
    isActive,
    handleNavigate,
    handleSignOut,
  };
}
