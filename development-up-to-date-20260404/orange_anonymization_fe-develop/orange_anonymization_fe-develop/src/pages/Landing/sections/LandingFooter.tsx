import { Box, ButtonBase, Container, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const CURRENT_YEAR = new Date().getFullYear();

const LandingFooter = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={(theme) => ({
        bgcolor: theme.palette.landing.bg.hero,
        borderTop: `1px solid ${theme.palette.landing.divider}`,
        py: 3,
      })}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
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
