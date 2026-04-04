import { Box, ButtonBase, Container, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'react-i18next';
import { NetworkWave } from '@/components/NetworkWave';

export interface CtaSectionProps {
  onGetStarted: () => void;
}

const CtaSection = ({ onGetStarted }: CtaSectionProps) => {
  const { t } = useTranslation();

  return (
    <Box
      component="section"
      sx={(theme) => ({
        position: 'relative',
        bgcolor: theme.palette.landing.bg.dark,
        pt: { xs: 10, md: 14 },
        pb: { xs: 16, md: 22 },
        overflow: 'hidden',
      })}
    >
      <NetworkWave seed={137} idPrefix="cta" />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <Typography
          variant="h3"
          sx={(theme) => ({
            color: theme.palette.common.white,
            fontWeight: theme.typography.fontWeightBold,
            fontSize: { xs: '1.5rem', md: '2rem' },
            mb: 2.5,
          })}
        >
          {t('landing.cta.title')}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 480,
            mx: 'auto',
            mb: 5,
            lineHeight: 1.7,
          }}
        >
          {t('landing.cta.subtitle')}
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
            transition: 'background-color 0.2s',
            '&:hover': { bgcolor: theme.palette.landing.accentDark },
          })}
        >
          {t('landing.cta.button')}
          <ArrowForwardIcon sx={{ fontSize: 18 }} />
        </ButtonBase>
      </Container>
    </Box>
  );
};

export { CtaSection };
