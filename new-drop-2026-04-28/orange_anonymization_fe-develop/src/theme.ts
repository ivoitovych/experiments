import { createTheme } from '@mui/material/styles';

interface SidebarPalette {
  background: string;
  activeOverlay: string;
  hoverOverlay: string;
}

interface LandingPalette {
  bg: {
    hero: string;
    dark: string;
    card: string;
    cardActive: string;
  };
  accent: string;
  accentDark: string;
  accentContrast: string;
  border: string;
  divider: string;
}

declare module '@mui/material/styles' {
  interface Palette {
    sidebar: SidebarPalette;
    landing: LandingPalette;
  }
  interface PaletteOptions {
    sidebar?: SidebarPalette;
    landing?: LandingPalette;
  }
  interface PaletteOptions {
    sidebar?: SidebarPalette;
    landing?: LandingPalette;
  }
}

const WHITE = '#FFFFFF';

export const LANDING = {
  bg: {
    hero: '#01132F',
    dark: '#01132F',
    card: '#0D1C35',
    cardActive: '#122240',
  },
  accent: '#4ECDC4',
  accentDark: '#3DBDB5',
  accentContrast: '#07111F',
  border: 'rgba(255, 255, 255, 0.1)',
  divider: 'rgba(255, 255, 255, 0.06)',
} as const;

export const LAYOUT = {
  sidebar: {
    width: 260,
    activeBorderWidth: 3,
    iconMinWidth: 40,
  },
  header: {
    height: 98,
    mobileHeight: 64,
    paddingTop: 40,
    paddingRight: 48,
    paddingBottom: 24,
    paddingLeft: 48,
    mobilePaddingX: 16,
    mobilePaddingY: 12,
    avatarSize: 36,
    avatarIconSize: 32,
    menuIconSize: 28,
  },
} as const;

export const SHADOWS = {
  card: '0px 10px 30px rgba(0, 0, 0, 0.1)',
} as const;

export const GRADIENTS = {
  authBackground: `
    linear-gradient(
      to bottom,
      #01132F 0px,
      #01132F 450px,
      #F8FAFC 450px,
      #F8FAFC 100%
    )
  `,
} as const;

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
    neutral: Palette['primary'];
    dark: string;
    backdrop: string;
    greenOpacity: string;
    whiteOpacity: {
      8: string;
      38: string;
      61: string;
    };
    entities: Record<string, string>;
    gradients: {
      primaryAccent: string;
    };
    sidebar: SidebarPalette;
    state: {
      successBorder: string;
      successBg: string;
      errorBg: string;
    };
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
    neutral?: PaletteOptions['primary'];
    dark?: string;
    backdrop?: string;
    greenOpacity?: string;
    whiteOpacity?: {
      8?: string;
      38?: string;
      61?: string;
    };
    entities?: Record<string, string>;
    gradients?: {
      primaryAccent?: string;
    };
    sidebar?: SidebarPalette;
    state?: {
      successBorder?: string;
      successBg?: string;
      errorBg?: string;
    };
  }
  interface PaletteColor {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    700?: string;
    800?: string;
    900?: string;
    hover?: string;
  }
  interface SimplePaletteColorOptions {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    700?: string;
    800?: string;
    900?: string;
    hover?: string;
  }
  interface Typography {
    fontWeightSemiBold: number;
    fontWeightExtraBold: number;
  }

  interface TypographyOptions {
    fontWeightSemiBold?: number;
    fontWeightExtraBold?: number;
  }

  interface TypographyVariants {
    fontWeightSemiBold: number;
    fontWeightExtraBold: number;
  }

  interface TypographyVariantsOptions {
    fontWeightSemiBold?: number;
    fontWeightExtraBold?: number;
  }
}

const BRAND = {
  white: '#FFFFFF',
  backdrop: '#01132F80',
  whiteOpacity: {
    8: '#FFFFFF08',
    38: '#FFFFFF61',
    61: '#FFFFFF9C',
  },
  dark: '#021430',
  greenOpacity: '#66D9C84D',
  accent: {
    100: '#B2EDE5',
    400: '#00BFA5',
    500: '#00A68F',
  },
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    400: '#9CA3AF',
    500: '#6B7280',
    700: '#374151',
    900: '#111827',
  },
  primary: {
    50: '#E8EFF7',
    300: '#4F7FB8',
    500: '#1B3A6B',
    600: '#152D54',
    800: '#01132F',
    lightest: '#E3F2FD',
    light: '#64B5F6',
    main: '#1565C0',
    dark: '#0D47A1',
    contrastText: WHITE,
  },
  state: {
    successBorder: '#16A34A99',
    successBg: '#16A34A05',
    errorBg: '#DC262605',
  },
  entities: {
    PERSON: '#1565C0',
    EMAIL_ADDRESS: '#6A1B9A',
    PHONE_NUMBER: '#00695C',
    US_SSN: '#B71C1C',
    LOCATION: '#E65100',
    DATE_TIME: '#283593',
    CREDIT_CARD: '#880E4F',
    IP_ADDRESS: '#1B5E20',
    MEDICAL_LICENSE: '#0D47A1',
    URL: '#4E342E',
    IBAN_CODE: '#2E7D32',
    US_DRIVER_LICENSE: '#C62828',
    MEDICAL_RECORD_NUMBER: '#0277BD',
    US_PASSPORT: '#1565C0',
    US_ZIP_CODE: '#AD1457',
    DEFAULT: '#37474F',
  },
  secondary: {
    lightest: '#E0F2F1',
    light: '#4DB6AC',
    main: '#00897B',
    dark: '#00695C',
    contrastText: WHITE,
  },
  success: {
    main: '#16A34A',
    light: '#4CAF50',
    contrastText: WHITE,
  },
  warning: {
    main: '#B45309',
    light: '#FFB300',
    contrastText: WHITE,
  },
  error: {
    main: '#DC2626',
    light: '#EF5350',
    contrastText: WHITE,
  },
  grey: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    dark: BRAND.dark,
    backdrop: BRAND.backdrop,
    greenOpacity: BRAND.greenOpacity,
    whiteOpacity: BRAND.whiteOpacity,
    accent: {
      main: BRAND.accent[500],
      ...BRAND.accent,
    },
    neutral: {
      main: BRAND.neutral[700],
      ...BRAND.neutral,
    },
    primary: BRAND.primary,
    secondary: BRAND.secondary,
    entities: BRAND.entities,
    success: BRAND.success,
    warning: BRAND.warning,
    error: BRAND.error,
    background: {
      default: BRAND.grey[50],
      paper: WHITE,
    },
    text: {
      primary: BRAND.grey[900],
      secondary: BRAND.grey[600],
      disabled: BRAND.grey[400],
    },
    divider: BRAND.grey[200],
    gradients: {
      primaryAccent: `linear-gradient( 95deg, ${BRAND.primary[500]} 0%, ${BRAND.accent[500]} 100%)`,
    },
    sidebar: {
      background: '#0A1628',
      activeOverlay: 'rgba(255, 255, 255, 0.08)',
      hoverOverlay: 'rgba(255, 255, 255, 0.06)',
    },
    landing: {
      bg: { ...LANDING.bg },
      accent: LANDING.accent,
      accentDark: LANDING.accentDark,
      accentContrast: LANDING.accentContrast,
      border: LANDING.border,
      divider: LANDING.divider,
    },
  },

  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontWeightSemiBold: 600,
    fontWeightExtraBold: 800,

    h1: { fontSize: '3rem', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em' },
    h2: { fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.015em' },
    h3: { fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.35 },
    h4: { fontSize: '1.375rem', fontWeight: 600, lineHeight: 1.4 },
    h5: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.45 },
    h6: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.5 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.57 },
    caption: { fontSize: '0.75rem', lineHeight: 1.5 },
    button: { fontWeight: 600, letterSpacing: '0.02em', textTransform: 'none' },
  } as import('@mui/material/styles').TypographyOptions,

  shape: {
    borderRadius: 10,
  },

  spacing: 8,

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${BRAND.primary.main} 0%, ${BRAND.primary.dark} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${BRAND.primary.dark} 0%, ${BRAND.primary.main} 100%)`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.05)',
          border: `1px solid ${BRAND.grey[200]}`,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'medium',
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

export type AppTheme = typeof theme;
