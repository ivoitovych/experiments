import { Box, ButtonBase, Container, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { useTranslation } from 'react-i18next';
import { NetworkWave } from '@/components/NetworkWave';

export interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const { t } = useTranslation();

  return (
    <Box
      id="hero"
      component="section"
      sx={(theme) => ({
        position: 'relative',
        bgcolor: theme.palette.landing.bg.hero,
        pt: { xs: 12, md: 18 },
        pb: { xs: 18, md: 28 },
        overflow: 'hidden',
      })}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <Typography
          variant="h1"
          sx={(theme) => ({
            color: theme.palette.common.white,
            fontWeight: theme.typography.fontWeightBold,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            lineHeight: 1.15,
            mb: 3,
          })}
        >
          {t('landing.hero.title')}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 480,
            mx: 'auto',
            mb: 5,
            lineHeight: 1.7,
          }}
        >
          {t('landing.hero.subtitle')}
        </Typography>

        <ButtonBase
          onClick={onGetStarted}
          sx={(theme) => ({
            bgcolor: theme.palette.landing.accent,
            color: theme.palette.landing.accentContrast,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.body1.fontSize,
            fontWeight: theme.typography.fontWeightBold,
            borderRadius: 2,
            px: 4,
            py: 1.5,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            mb: 6,
            transition: 'background-color 0.2s',
            '&:hover': { bgcolor: theme.palette.landing.accentDark },
          })}
        >
          {t('landing.hero.cta')}
          <ArrowForwardIcon sx={{ fontSize: 18 }} />
        </ButtonBase>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 2, md: 4 },
            flexWrap: 'wrap',
          }}
        >
          {(['hipaa', 'gdpr', 'accuracy'] as const).map((badge) => (
            <Box key={badge} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <VerifiedOutlinedIcon sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 16 }} />
              <Typography
                variant="caption"
                sx={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '0.03em' }}
              >
                {t(`landing.hero.trustBadges.${badge}`)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      <NetworkWave seed={42} idPrefix="hero" />
    </Box>
  );
};

export { HeroSection };
