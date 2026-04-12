import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TaskAlt as TaskAltIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import type { FC } from 'react';
import { FONT_SIZES } from '@/constants';

interface IProps {
  setSubmitted: (submitted: boolean) => void;
}

export const SubmittedState: FC<IProps> = ({ setSubmitted }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TaskAltIcon sx={{ fontSize: FONT_SIZES.huge, color: 'success.main', mb: 2 }} />
        <Typography
          fontWeight="fontWeightBold"
          sx={{ mb: 1, color: 'common.white', fontSize: FONT_SIZES.xxl }}
        >
          {t('landing.contact.form.sent')}
        </Typography>
        <Typography sx={{ color: 'neutral.500', fontSize: FONT_SIZES.sm, mb: 2 }}>
          {t('landing.contact.form.success')}
        </Typography>
        <Typography sx={{ color: 'neutral.500', fontSize: FONT_SIZES.sm }}>
          {t('landing.contact.form.successSubtitle')}
        </Typography>
      </Box>
      <Button
        variant="text"
        sx={{ mt: 2, color: 'neutral.500', textTransform: 'none' }}
        startIcon={<ArrowBackIcon />}
        onClick={() => setSubmitted(false)}
      >
        {t('landing.contact.form.backToForm')}
      </Button>
    </Box>
  );
};
