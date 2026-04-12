import { useTranslation } from 'react-i18next';
import { Box, Container, Grid, SvgIcon, Typography } from '@mui/material';
import { MailOutline as MailOutlineIcon } from '@mui/icons-material';
import AppLogo from '@/assets/icons/landingLogo.svg?react';
import AdminPanelSettings from '@/assets/icons/admin_panel_settings.svg?react';
import { ContactForm } from '@/components/business/contact/ContactForm';
import { FONT_SIZES } from '@/constants';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <Box>
      <Box
        sx={{
          pt: { xs: '32px', md: '48px' },
          pb: { xs: '24px', md: '40px' },
          px: { xs: '16px', md: '64px' },
          bgcolor: 'primary.800',
        }}
      >
        <Container maxWidth="lg" disableGutters>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'center' },
              gap: 2,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 'fontWeightBold',
                fontSize: { xs: FONT_SIZES.xxxl, md: FONT_SIZES.h1 },
                color: 'common.white',
              }}
            >
              {t('landing.contact.title')}
            </Typography>
            <Box sx={{ textAlign: { xs: 'left', md: 'right' }, color: 'neutral.500' }}>
              <Typography variant="body1">{t('landing.contact.info.question')}</Typography>
              <Typography variant="body1">{t('landing.contact.info.hereToHelp')}</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box sx={{ paddingY: '16px', bgcolor: 'primary.800' }}>
        <Box
          maxWidth="lg"
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            border: 1,
            mx: 'auto',
          }}
        >
          <Grid container spacing={4} alignItems="stretch">
            <Grid
              size={{ xs: 12, md: 4 }}
              sx={{
                color: 'common.white',
                display: 'flex',
                flexDirection: 'column',
                pl: { xs: 3, md: 5 },
              }}
            >
              <Box sx={{ flexGrow: 1, pt: { xs: 3, sm: 5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: '43px' }}>
                  <SvgIcon component={AppLogo} inheritViewBox />
                  <Typography fontWeight="fontWeightSemiBold" sx={{ fontSize: FONT_SIZES.xl }}>
                    {t('nav.landing-brand')}
                  </Typography>
                </Box>
                <Typography
                  fontWeight="fontWeightSemiBold"
                  sx={{ fontSize: FONT_SIZES.xl, mb: '12px' }}
                >
                  {t('landing.contact.info.question')}
                </Typography>
                <Typography
                  sx={{ fontSize: FONT_SIZES.sm, opacity: 0.8, color: 'neutral.500', mb: 5 }}
                >
                  {t('landing.contact.info.description')}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <MailOutlineIcon sx={{ color: 'secondary.main' }} />
                  <Typography sx={{ fontSize: FONT_SIZES.sm }}>
                    {t('landing.contact.info.email')}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: { md: '20px' }, pt: 4 }}
              >
                <SvgIcon
                  component={AdminPanelSettings}
                  inheritViewBox
                  sx={{ color: 'secondary.main' }}
                />
                <Typography sx={{ fontSize: FONT_SIZES.sm, opacity: 0.7 }}>
                  {t('landing.contact.info.responseTime')}
                </Typography>
              </Box>
            </Grid>

            <ContactForm />
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
