import { Box, Button, Container, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { useTranslation } from 'react-i18next';
import { LandingSectionDecoration } from '@/components/LandingSectionDecoration';
import { FONT_SIZES } from '@/constants';
import {
  LANDING_COLORS,
  LANDING_SIZES,
  LANDING_TYPOGRAPHY,
  SECTION_IDS,
} from '@/pages/Landing/constants';
import { LandingH1, LandingH4 } from '@/pages/Landing/typography';

export interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const { t } = useTranslation();

  return (
    <Box
      id={SECTION_IDS.hero}
      component="section"
      sx={{
        position: 'relative',
        pt: { xs: LANDING_SIZES.heroPtXs, md: LANDING_SIZES.heroPtMd },
        pb: { xs: LANDING_SIZES.heroPbXs, md: LANDING_SIZES.heroPbMd },
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <LandingH1 component="h1" sx={{ mb: LANDING_SIZES.heroTitleMb }}>
          {t('landing.hero.title')}
        </LandingH1>

        <LandingH4
          sx={{
            maxWidth: LANDING_SIZES.heroSubtitleMaxWidth,
            mx: 'auto',
            mb: LANDING_SIZES.heroSubtitleMb,
            textAlign: 'center',
          }}
        >
          {t('landing.hero.subtitle')}
        </LandingH4>

        <Button
          variant="contained"
          onClick={onGetStarted}
          endIcon={<ArrowForwardIcon />}
          sx={{
            width: LANDING_SIZES.primaryCtaWidth,
            height: LANDING_SIZES.primaryCtaHeight,
            mb: LANDING_SIZES.heroCtaMarginBottom,
            fontSize: FONT_SIZES.sm,
            textTransform: 'none',
            color: 'primary.800',
            background: (theme) => theme.palette.accent[400],
            '& .MuiButton-endIcon': { ml: LANDING_SIZES.buttonEndIconMl },
            '&:hover': {
              background: (theme) => theme.palette.accent[500],
            },
          }}
        >
          {t('landing.hero.cta')}
        </Button>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: LANDING_SIZES.heroBadgesGapXs, md: LANDING_SIZES.heroBadgesGapMd },
            flexWrap: 'wrap',
          }}
        >
          {(['hipaa', 'gdpr', 'accuracy'] as const).map((badge) => (
            <Box
              key={badge}
              sx={{ display: 'flex', alignItems: 'center', gap: LANDING_SIZES.heroBadgeIconGap }}
            >
              <VerifiedOutlinedIcon
                sx={{ color: LANDING_COLORS.faintWhite, fontSize: LANDING_SIZES.iconSm }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: LANDING_COLORS.mutedWhite,
                  letterSpacing: LANDING_TYPOGRAPHY.letterSpacingWide,
                }}
              >
                {t(`landing.hero.trustBadges.${badge}`)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      <LandingSectionDecoration variant="hero" />
    </Box>
  );
};

export { HeroSection };
