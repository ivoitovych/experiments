import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { logout } from '@/store/auth';
import { useAppDispatch } from '@/store/store';
import { inactivityImages } from '@/assets/images/inactivity';
import { inactivityStyles } from './styles';

const Inactivity = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Box sx={inactivityStyles.root}>
      <Box sx={inactivityStyles.container}>
        <Box sx={inactivityStyles.logoRow}>
          <Box
            component="img"
            src={inactivityImages.logo}
            alt={t('inactivity.branding.logoAlt')}
            sx={inactivityStyles.logoImage}
          />
          <Box sx={inactivityStyles.logoTextBlock}>
            <Typography sx={inactivityStyles.logoTitle}>{t('inactivity.branding.name')}</Typography>
            <Typography sx={inactivityStyles.logoSubtitle}>
              {t('inactivity.branding.tagline')}
            </Typography>
          </Box>
        </Box>

        <Box sx={inactivityStyles.illustrationWrapper}>
          <Box
            component="img"
            src={inactivityImages.clock}
            alt={t('inactivity.branding.illustrationAlt')}
            sx={inactivityStyles.illustration}
          />
        </Box>

        <Box sx={inactivityStyles.content}>
          <Typography sx={inactivityStyles.title}>{t('inactivity.title')}</Typography>

          <Typography sx={inactivityStyles.description}>
            {t('inactivity.descriptionLineOne')}
            <br />
            {t('inactivity.descriptionLineTwo')}
          </Typography>

          <Box component={RouterLink} to={ROUTES.LOGIN} sx={inactivityStyles.signInLink}>
            {t('inactivity.signInAgain')}
          </Box>
        </Box>
      </Box>

      <Box sx={inactivityStyles.mobileGradient} />
    </Box>
  );
};

export default Inactivity;
