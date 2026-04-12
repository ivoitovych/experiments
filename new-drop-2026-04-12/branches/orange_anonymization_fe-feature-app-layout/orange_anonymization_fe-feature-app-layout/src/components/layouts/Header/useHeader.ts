import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants';

interface PageMeta {
  titleKey: string;
  subtitleKey: string;
}

const PAGE_META: Record<string, PageMeta> = {
  [ROUTES.DASHBOARD]: {
    titleKey: 'header.dashboard.title',
    subtitleKey: 'header.dashboard.subtitle',
  },
  [ROUTES.DE_IDENTIFY]: {
    titleKey: 'header.deIdentify.title',
    subtitleKey: 'header.deIdentify.subtitle',
  },
  [ROUTES.SYNTHETIC_DATA]: {
    titleKey: 'header.syntheticData.title',
    subtitleKey: 'header.syntheticData.subtitle',
  },
};

const DEFAULT_META: PageMeta = {
  titleKey: 'header.dashboard.title',
  subtitleKey: 'header.dashboard.subtitle',
};

export interface HeaderProps {
  userEmail: string;
}

export function useHeader(userEmail: string) {
  const { t } = useTranslation();
  const location = useLocation();

  const meta = PAGE_META[location.pathname] ?? DEFAULT_META;

  return {
    t,
    title: t(meta.titleKey),
    subtitle: t(meta.subtitleKey),
    userEmail,
  };
}
