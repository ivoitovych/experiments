/**
 * LoadingSpinner — Reusable loading indicator.
 *
 * Props:
 *   fullPage → centers vertically in the viewport (100vh)
 *   message  → custom text below the spinner (defaults to t('common.loading'))
 */
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface LoadingSpinnerProps {
  fullPage?: boolean;
  message?: string;
}

export function LoadingSpinner({ fullPage = false, message }: LoadingSpinnerProps) {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      sx={fullPage ? { minHeight: '100vh' } : { py: 6 }}
    >
      <CircularProgress />
      {message !== undefined && (
        <Typography color="text.secondary" variant="body2">
          {message}
        </Typography>
      )}
      {message === undefined && (
        <Typography color="text.secondary" variant="body2">
          {t('common.loading')}
        </Typography>
      )}
    </Box>
  );
}
