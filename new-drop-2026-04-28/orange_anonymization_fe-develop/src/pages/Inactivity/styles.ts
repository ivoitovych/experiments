import type { SxProps, Theme } from '@mui/material';
import { INACTIVITY_COLORS, INACTIVITY_TYPOGRAPHY } from './constants';

const FIGMA_CANVAS_WIDTH = 1440;
const FIGMA_ILLUSTRATION_WIDTH = 533.426;
const FIGMA_ILLUSTRATION_HEIGHT = 247.787;

export const inactivityStyles: Record<string, SxProps<Theme>> = {
  root: {
    minHeight: '100dvh',
    bgcolor: INACTIVITY_COLORS.pageBackground,
    color: 'common.white',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    width: '100%',
    maxWidth: `${FIGMA_CANVAS_WIDTH}px`,
    minHeight: '100dvh',
    mx: 'auto',
    position: 'relative',
    px: { xs: 2, sm: 0 },
  },
  logoRow: {
    position: 'absolute',
    top: 'clamp(1px, 2.2dvh, 24px)',
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: {
      xs: '250%',
      sm: '250%',
      md: 'min(100%, 1440px)',
    },
    maxWidth: 'none',
    height: 'auto',
    display: 'block',
    objectFit: 'contain',
  },
  logoTextBlock: {
    display: 'none',
    flexDirection: 'column',
    alignItems: 'center',
    lineHeight: 1,
  },

  illustrationWrapper: {
    position: 'absolute',
    left: '50%',
    top: { xs: '36%', sm: '38%', md: '37%' },
    transform: 'translate(-50%, -50%)',
    width: {
      xs: 'min(88vw, 320px)',
      sm: 'min(86vw, 460px)',
      md: FIGMA_ILLUSTRATION_WIDTH,
    },
    height: 'auto',
    aspectRatio: `${FIGMA_ILLUSTRATION_WIDTH} / ${FIGMA_ILLUSTRATION_HEIGHT}`,
  },
  illustration: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    display: 'block',
  },
  content: {
    position: 'absolute',
    left: '50%',
    top: { xs: '75%', sm: '76.5%', md: '74%' },
    transform: 'translate(-50%, -50%)',
    width: { xs: 'min(92vw, 320px)', sm: 420, md: 480 },
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: { xs: '21px', md: '33px' },
  },
  title: {
    fontSize: INACTIVITY_TYPOGRAPHY.title.fontSize,
    lineHeight: INACTIVITY_TYPOGRAPHY.title.lineHeight,
    fontWeight: 700,
    color: INACTIVITY_COLORS.title,
  },
  description: {
    fontSize: INACTIVITY_TYPOGRAPHY.description.fontSize,
    lineHeight: INACTIVITY_TYPOGRAPHY.description.lineHeight,
    fontWeight: 500,
    color: INACTIVITY_COLORS.description,
  },
  signInLink: {
    minWidth: '132px',
    height: 40,
    borderRadius: '6px',
    px: '24px',
    py: '10px',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: INACTIVITY_TYPOGRAPHY.signInLink.fontSize,
    lineHeight: INACTIVITY_TYPOGRAPHY.signInLink.lineHeight,
    fontWeight: 500,
    color: INACTIVITY_COLORS.buttonText,
    bgcolor: INACTIVITY_COLORS.buttonBg,
    transition: 'background-color 120ms ease',
    '&:hover': {
      bgcolor: INACTIVITY_COLORS.buttonBgHover,
    },
  },
  mobileGradient: {
    display: { xs: 'block', lg: 'none' },
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    background: INACTIVITY_COLORS.mobileGradient,
  },
};
