import { Typography, type TypographyProps } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { LANDING_COLORS, LANDING_TYPOGRAPHY } from './constants';

const mergeSx = (base: SxProps<Theme>, override: SxProps<Theme> | undefined): SxProps<Theme> => {
  const baseArray = Array.isArray(base) ? base : [base];
  if (!override) return baseArray;
  const overrideArray = Array.isArray(override) ? override : [override];
  return [...baseArray, ...overrideArray];
};

const H1_SX: SxProps<Theme> = {
  fontSize: LANDING_TYPOGRAPHY.h1.fontSize,
  lineHeight: LANDING_TYPOGRAPHY.h1.lineHeight,
  fontWeight: LANDING_TYPOGRAPHY.h1.fontWeight,
  color: LANDING_COLORS.heading,
};

const H2_SX: SxProps<Theme> = {
  fontSize: LANDING_TYPOGRAPHY.h2.fontSize,
  lineHeight: LANDING_TYPOGRAPHY.h2.lineHeight,
  fontWeight: LANDING_TYPOGRAPHY.h2.fontWeight,
  color: LANDING_COLORS.heading,
};

const H3_SX: SxProps<Theme> = {
  fontSize: LANDING_TYPOGRAPHY.h3.fontSize,
  lineHeight: LANDING_TYPOGRAPHY.h3.lineHeight,
  fontWeight: LANDING_TYPOGRAPHY.h3.fontWeight,
  color: LANDING_COLORS.subheading,
};

const H4_SX: SxProps<Theme> = {
  fontSize: LANDING_TYPOGRAPHY.h4.fontSize,
  lineHeight: LANDING_TYPOGRAPHY.h4.lineHeight,
  fontWeight: LANDING_TYPOGRAPHY.h4.fontWeight,
  color: LANDING_COLORS.subheading,
};

const CARD_TITLE_SX: SxProps<Theme> = {
  fontSize: LANDING_TYPOGRAPHY.cardTitle.fontSize,
  lineHeight: LANDING_TYPOGRAPHY.cardTitle.lineHeight,
  fontWeight: LANDING_TYPOGRAPHY.cardTitle.fontWeight,
  color: LANDING_COLORS.cardTitle,
};

const BODY_SX: SxProps<Theme> = {
  fontSize: LANDING_TYPOGRAPHY.body.fontSize,
  lineHeight: LANDING_TYPOGRAPHY.body.lineHeight,
  fontWeight: LANDING_TYPOGRAPHY.body.fontWeight,
  color: LANDING_COLORS.body,
};

const LABEL_SX: SxProps<Theme> = {
  fontSize: LANDING_TYPOGRAPHY.label.fontSize,
  lineHeight: LANDING_TYPOGRAPHY.label.lineHeight,
  fontWeight: LANDING_TYPOGRAPHY.label.fontWeight,
  color: LANDING_COLORS.body,
};

export const LandingH1 = ({ sx, ...rest }: TypographyProps) => (
  <Typography {...rest} sx={mergeSx(H1_SX, sx)} />
);

export const LandingH2 = ({ sx, ...rest }: TypographyProps) => (
  <Typography {...rest} sx={mergeSx(H2_SX, sx)} />
);

export const LandingH3 = ({ sx, ...rest }: TypographyProps) => (
  <Typography {...rest} sx={mergeSx(H3_SX, sx)} />
);

export const LandingH4 = ({ sx, ...rest }: TypographyProps) => (
  <Typography {...rest} sx={mergeSx(H4_SX, sx)} />
);

export const LandingCardTitle = ({ sx, ...rest }: TypographyProps) => (
  <Typography {...rest} sx={mergeSx(CARD_TITLE_SX, sx)} />
);

export const LandingBody = ({ sx, ...rest }: TypographyProps) => (
  <Typography {...rest} sx={mergeSx(BODY_SX, sx)} />
);

export const LandingLabel = ({ sx, ...rest }: TypographyProps) => (
  <Typography {...rest} sx={mergeSx(LABEL_SX, sx)} />
);
