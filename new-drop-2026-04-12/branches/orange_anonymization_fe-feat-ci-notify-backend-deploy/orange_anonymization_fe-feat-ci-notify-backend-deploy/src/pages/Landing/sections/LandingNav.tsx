import { Box, ButtonBase, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import { useTranslation } from 'react-i18next';

export interface LandingNavProps {
  onGetStarted: () => void;
  onScrollToSection: (id: string) => void;
}

const LandingNav = ({ onGetStarted, onScrollToSection }: LandingNavProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="nav"
      sx={(theme) => ({
        position: 'sticky',
        top: 0,
        zIndex: theme.zIndex.appBar,
        bgcolor: theme.palette.primary[800],
        borderBottom: `1px solid ${theme.palette.landing.divider}`,
        py: isMobile ? 1 : 1.5,
      })}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MedicalInformationOutlinedIcon
              sx={(theme) => ({
                color: theme.palette.landing.accent,
                fontSize: isMobile ? 22 : 26,
              })}
            />
            <Typography
              variant="h6"
              sx={(theme) => ({
                color: theme.palette.common.white,
                fontWeight: theme.typography.fontWeightBold,
                letterSpacing: '-0.01em',
                fontSize: isMobile ? '0.875rem' : undefined,
              })}
            >
              {t('landing.nav.brand')}
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <ButtonBase
                onClick={() => {
                  onScrollToSection('hero');
                }}
                sx={(theme) => ({
                  color: 'rgba(255,255,255,0.75)',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.fontWeightMedium,
                  borderRadius: 1,
                  px: 0.5,
                  transition: 'color 0.2s',
                  '&:hover': { color: theme.palette.landing.accent },
                })}
              >
                {t('landing.nav.solutions')}
              </ButtonBase>
              <ButtonBase
                onClick={() => {
                  onScrollToSection('contact');
                }}
                sx={(theme) => ({
                  color: theme.palette.landing.accent,
                  fontFamily: theme.typography.fontFamily,
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.fontWeightMedium,
                  borderRadius: 1,
                  px: 0.5,
                })}
              >
                {t('landing.nav.contactUs')}
              </ButtonBase>
            </Box>
          )}

          <ButtonBase
            onClick={onGetStarted}
            sx={(theme) => ({
              bgcolor: theme.palette.landing.accent,
              color: theme.palette.landing.accentContrast,
              fontFamily: theme.typography.fontFamily,
              fontSize: isMobile
                ? theme.typography.caption.fontSize
                : theme.typography.body2.fontSize,
              fontWeight: theme.typography.fontWeightBold,
              borderRadius: 2,
              px: isMobile ? 1.5 : 2.5,
              py: isMobile ? 0.75 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              transition: 'background-color 0.2s',
              '&:hover': { bgcolor: theme.palette.landing.accentDark },
            })}
          >
            {t('landing.nav.getStarted')}
            <ArrowForwardIcon sx={{ fontSize: isMobile ? 14 : 16 }} />
          </ButtonBase>
        </Box>
      </Container>
    </Box>
  );
};

export { LandingNav };
