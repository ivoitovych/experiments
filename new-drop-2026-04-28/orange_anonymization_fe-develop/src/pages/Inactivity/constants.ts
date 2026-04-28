import { FONT_SIZES, LINE_HEIGHTS } from '@/constants';

export const INACTIVITY_COLORS = {
  pageBackground: '#01132F',
  logoText: '#FFFFFF',
  title: '#B2EDE5',
  description: '#9CA3AF',
  buttonText: '#0F213D',
  buttonBg: '#00BFA5',
  buttonBgHover: '#00A68F',
  mobileGradient:
    'linear-gradient(180deg, rgba(1,19,47,0) 0%, rgba(1,19,47,0.25) 35%, rgba(1,19,47,0.45) 100%)',
} as const;

export const INACTIVITY_TYPOGRAPHY = {
  logoTitle: {
    fontSize: FONT_SIZES.xxl,
    lineHeight: `${LINE_HEIGHTS.lg}px`,
  },
  logoSubtitle: {
    fontSize: FONT_SIZES.xs,
    lineHeight: `${LINE_HEIGHTS.xs}px`,
  },
  title: {
    fontSize: { xs: 38, sm: 40, md: FONT_SIZES.h2 },
    lineHeight: { xs: '44px', sm: '46px', md: '44px' },
  },
  description: {
    fontSize: FONT_SIZES.md,
    lineHeight: `${LINE_HEIGHTS.md}px`,
  },
  signInLink: {
    fontSize: FONT_SIZES.sm,
    lineHeight: `${LINE_HEIGHTS.sm}px`,
  },
} as const;
