import { Box, type SxProps, type Theme } from '@mui/material';

const DECORATION_ASSETS: Record<LandingSectionDecorationProps['variant'], string> = {
  hero: '/Hero section svg.svg',
  cta: '/CTA baner.svg',
};

const VARIANT_SX: Record<LandingSectionDecorationProps['variant'], SxProps<Theme>> = {
  hero: {
    backgroundPosition: 'center bottom',
    backgroundSize: 'cover',
    maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)',
    WebkitMaskImage:
      'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)',
  },
  cta: {
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
    WebkitMaskImage:
      'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
  },
};

interface LandingSectionDecorationProps {
  variant: 'hero' | 'cta';
}

const LandingSectionDecoration = ({ variant }: LandingSectionDecorationProps) => (
  <Box
    role="presentation"
    aria-hidden
    sx={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      backgroundImage: `url("${DECORATION_ASSETS[variant]}")`,
      backgroundRepeat: 'no-repeat',
      ...VARIANT_SX[variant],
    }}
  />
);

export { LandingSectionDecoration };
export type { LandingSectionDecorationProps };
