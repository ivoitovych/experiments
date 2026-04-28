import { Box, Container, SvgIcon, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AppLogo from '@/assets/icons/landingLogo.svg?react';
import { LANDING_COLORS, LANDING_SIZES, LANDING_TYPOGRAPHY } from '@/pages/Landing/constants';

const LandingFooter = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={(theme) => ({
        bgcolor: theme.palette.primary[800],
        py: LANDING_SIZES.footerPy,
      })}
    >
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          px: LANDING_SIZES.footerContainerPaddingX,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: LANDING_SIZES.footerContainerGap,
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: LANDING_SIZES.footerLogoGap,
              mb: LANDING_SIZES.footerLogoMb,
            }}
          >
            <SvgIcon component={AppLogo} inheritViewBox sx={{ color: 'common.white' }} />
            <Typography
              sx={{
                fontSize: LANDING_TYPOGRAPHY.brand.fontSize,
                lineHeight: LANDING_TYPOGRAPHY.brand.lineHeight,
                fontWeight: LANDING_TYPOGRAPHY.brand.fontWeight,
                color: 'common.white',
              }}
            >
              {t('nav.landing-brand')}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="neutral.400"
            sx={{ maxWidth: { xs: '100%', md: LANDING_SIZES.footerDescriptionMaxWidth } }}
          >
            {t('landing.footer.description')}
          </Typography>
        </Box>

        <Typography
          variant="caption"
          sx={{
            color: LANDING_COLORS.ghostWhite,
            letterSpacing: LANDING_TYPOGRAPHY.letterSpacingNarrow,
            flexShrink: 0,
          }}
        >
          {t('landing.footer.copyright')}
        </Typography>
      </Container>
    </Box>
  );
};

export { LandingFooter };
