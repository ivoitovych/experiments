import { Box, type SxProps, type Theme } from '@mui/material';

const DECORATION_ASSETS: Record<LandingSectionDecorationProps['variant'], string> = {
  hero: '/Hero section svg.svg',
  cta: '/CTA baner.svg',
};

const VARIANT_SX: Record<LandingSectionDecorationProps['variant'], SxProps<Theme>> = {
  hero: {
    backgroundPosition: 'center bottom',
    backgroundSize: '100% auto',
  },
  cta: {
    backgroundPosition: 'center center',
    backgroundSize: '100% auto',
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
