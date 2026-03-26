/**
 * MUI Theme
 *
 * Centralizing design tokens here means:
 * - Colors, typography, and spacing are defined once
 * - Components reference theme values instead of hardcoded hex codes
 * - Switching to a different color scheme only requires editing this file
 *
 * Usage in components:
 *   const theme = useTheme();
 *   sx={{ color: theme.palette.primary.main }}
 *   — or use the sx prop with theme shorthand:
 *   sx={{ color: 'primary.main' }}
 */
import { createTheme } from '@mui/material/styles';

// ─── Design Tokens ────────────────────────────────────────────────────────────
// These match the healthcare/medical color palette: trustworthy blue + clinical teal
const BRAND = {
  primary: {
    lightest: '#E3F2FD',
    light: '#64B5F6',
    main: '#1565C0',   // deep medical blue — primary actions, headers
    dark: '#0D47A1',
    contrastText: '#FFFFFF',
  },
  secondary: {
    lightest: '#E0F2F1',
    light: '#4DB6AC',
    main: '#00897B',   // clinical teal — accents, secondary actions
    dark: '#00695C',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#2E7D32',
    light: '#4CAF50',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#F57F17',
    light: '#FFB300',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#C62828',
    light: '#EF5350',
    contrastText: '#FFFFFF',
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
  // ─── Color Palette ──────────────────────────────────────────────────────────
  palette: {
    mode: 'light',
    primary: BRAND.primary,
    secondary: BRAND.secondary,
    success: BRAND.success,
    warning: BRAND.warning,
    error: BRAND.error,
    background: {
      default: BRAND.grey[50],   // page background: very light grey-blue
      paper: '#FFFFFF',          // cards, dialogs: white
    },
    text: {
      primary: BRAND.grey[900],
      secondary: BRAND.grey[600],
      disabled: BRAND.grey[400],
    },
    divider: BRAND.grey[200],
  },

  // ─── Typography ─────────────────────────────────────────────────────────────
  // Inter is loaded via Google Fonts in index.html
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

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
  },

  // ─── Shape ──────────────────────────────────────────────────────────────────
  shape: {
    borderRadius: 10, // default border radius for components
  },

  // ─── Spacing ────────────────────────────────────────────────────────────────
  // Base unit = 8px. spacing(1) = 8px, spacing(2) = 16px, etc.
  spacing: 8,

  // ─── Component Overrides ────────────────────────────────────────────────────
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
            background: `linear-gradient(135deg, ${BRAND.primary.dark} 0%, #0A3880 100%)`,
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
