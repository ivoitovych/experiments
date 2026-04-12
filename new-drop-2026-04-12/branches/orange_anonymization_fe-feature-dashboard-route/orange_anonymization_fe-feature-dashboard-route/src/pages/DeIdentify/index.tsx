import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const DeIdentify = () => {
  const { t } = useTranslation();

  return <Typography variant="h4">{t('deIdentify.title')}</Typography>;
};

export default DeIdentify;
