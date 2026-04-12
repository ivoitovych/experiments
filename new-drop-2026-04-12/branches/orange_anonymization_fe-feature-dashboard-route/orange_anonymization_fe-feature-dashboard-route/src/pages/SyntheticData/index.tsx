import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const SyntheticData = () => {
  const { t } = useTranslation();

  return <Typography variant="h4">{t('header.syntheticData.title')}</Typography>;
};

export default SyntheticData;
