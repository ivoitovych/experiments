import { Box, ButtonBase, Container, Divider, Grid, SvgIcon, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AppLogo from '@/assets/icons/landingLogo.svg?react';
import { Link } from 'react-router-dom';
import { FONT_SIZES } from '@/constants';

const CURRENT_YEAR = new Date().getFullYear();

const LandingFooter = () => {
  const { t } = useTranslation();

  const linkStyle = {
    fontSize: FONT_SIZES.xs,
    lineHeight: '16px',
    fontWeight: 'fontWeightMedium',
    color: 'neutral.500',
    mb: '12px',
    display: 'block',
    textDecoration: 'none',
    '&:hover': { color: 'primary.main' },
  };

  const titleStyle = {
    ...linkStyle,
    color: 'common.white',
    fontWeight: 'fontWeightSemiBold',
    mb: '16px',
  };

  return (
    <Box
      component="footer"
      sx={(theme) => ({
        bgcolor: theme.palette.primary[800],
        py: 3,
      })}
    >
      <Container maxWidth="lg" disableGutters sx={{ px: '20px' }}>
        <Grid container spacing={{ xs: 4, md: 8 }} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: '20px' }}>
              <SvgIcon component={AppLogo} inheritViewBox sx={{ color: 'common.white' }} />
              <Typography
                fontWeight="fontWeightSemiBold"
                sx={{ fontSize: FONT_SIZES.xl, lineHeight: '28px', color: 'common.white' }}
              >
                {t('nav.landing-brand')}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="neutral.400"
              sx={{ maxWidth: { xs: '100%', md: '300px' } }}
            >
              {t('landing.footer.description')}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={{ xs: 3, sm: 6 }}>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography sx={titleStyle}>{t('landing.footer.sections.product')}</Typography>
                <Typography component={Link} to="#" sx={linkStyle}>
                  {t('landing.footer.links.features')}
                </Typography>
                <Typography component={Link} to="#" sx={linkStyle}>
                  {t('landing.footer.links.pricing')}
                </Typography>
                <Typography component={Link} to="#" sx={linkStyle}>
                  {t('landing.footer.links.integrations')}
                </Typography>
              </Grid>

              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography sx={titleStyle}>{t('landing.footer.sections.resources')}</Typography>
                <Typography component={Link} to="#" sx={linkStyle}>
                  {t('landing.footer.links.documentation')}
                </Typography>
                <Typography component={Link} to="#" sx={linkStyle}>
                  {t('landing.footer.links.guides')}
                </Typography>
                <Typography component={Link} to="#" sx={linkStyle}>
                  {t('landing.footer.links.blog')}
                </Typography>
                <Typography component={Link} to="#" sx={linkStyle}>
                  {t('landing.footer.links.support')}
                </Typography>
              </Grid>

              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography sx={titleStyle}>{t('landing.footer.sections.company')}</Typography>
                <Typography component={Link} to="#" sx={linkStyle}>
                  {t('landing.footer.links.about')}
                </Typography>
                <Typography component={Link} to="#" sx={linkStyle}>
                  {t('landing.footer.links.careers')}
                </Typography>
                <Typography component={Link} to="#" sx={linkStyle}>
                  {t('landing.footer.links.contact')}
                </Typography>
                <Typography component={Link} to="#" sx={linkStyle}>
                  {t('landing.footer.links.legal')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ pt: 3 }}>
          <Typography
            variant="caption"
            sx={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.01em' }}
          >
            {t('landing.footer.copyright', { year: CURRENT_YEAR })}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <ButtonBase
              sx={(theme) => ({
                color: 'rgba(255,255,255,0.35)',
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.caption.fontSize,
                borderRadius: 0.5,
                '&:hover': { color: 'rgba(255,255,255,0.7)' },
                transition: 'color 0.2s',
              })}
            >
              {t('landing.footer.privacy')}
            </ButtonBase>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderColor: 'rgba(255,255,255,0.15)', height: 12, alignSelf: 'center' }}
            />
            <ButtonBase
              sx={(theme) => ({
                color: 'rgba(255,255,255,0.35)',
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.caption.fontSize,
                borderRadius: 0.5,
                '&:hover': { color: 'rgba(255,255,255,0.7)' },
                transition: 'color 0.2s',
              })}
            >
              {t('landing.footer.terms')}
            </ButtonBase>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export { LandingFooter };
