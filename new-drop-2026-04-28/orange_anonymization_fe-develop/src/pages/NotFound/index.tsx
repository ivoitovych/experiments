import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { notFoundImages } from '@/assets/images/not-found';
import { notFoundStyles } from './styles';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Box sx={notFoundStyles.root}>
      <Box sx={notFoundStyles.container}>
        <Box sx={notFoundStyles.logoRow}>
          <Box
            component="img"
            src={notFoundImages.logo}
            alt={t('notFound.branding.logoAlt')}
            sx={notFoundStyles.logoImage}
          />
          <Box sx={notFoundStyles.logoTextBlock}>
            <Typography sx={notFoundStyles.logoTitle}>{t('notFound.branding.name')}</Typography>
            <Typography sx={notFoundStyles.logoSubtitle}>
              {t('notFound.branding.tagline')}
            </Typography>
          </Box>
        </Box>

        <Box sx={notFoundStyles.illustrationWrapper}>
          <Box
            component="img"
            src={notFoundImages.error}
            alt={t('notFound.branding.illustrationAlt')}
            sx={notFoundStyles.illustrationCenter}
          />
        </Box>

        <Box sx={notFoundStyles.content}>
          <Typography sx={notFoundStyles.title}>{t('notFound.title')}</Typography>

          <Typography sx={notFoundStyles.description}>{t('notFound.description')}</Typography>

          <Box component={RouterLink} to={ROUTES.LANDING} sx={notFoundStyles.homeLink}>
            {t('notFound.home')}
          </Box>
        </Box>
      </Box>

      <Box sx={notFoundStyles.mobileGradient} />
    </Box>
  );
};

export default NotFound;
