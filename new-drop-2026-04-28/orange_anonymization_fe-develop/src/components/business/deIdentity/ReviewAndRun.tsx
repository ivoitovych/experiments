import { JobStatus, type EntityDetection, type JobResults } from '@/pages/DeIdentify/types';
import { jobsService } from '@/services/jobsService';
import { resultsService } from '@/services/resultsService';
import { ContentCopy, Download } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  Grid,
  Paper,
  Stack,
  alpha,
  Snackbar,
  Alert,
} from '@mui/material';
import { useEffect, useState, type FC, useRef, type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { FONT_SIZES } from '@/constants';
import { useAppSelector } from '@/store/store';

const getEntityColor = (type: string) => {
  const map: Record<string, string> = {
    PERSON: 'PERSON',
    EMAIL_ADDRESS: 'EMAIL_ADDRESS',
    PHONE_NUMBER: 'PHONE_NUMBER',
    FAX: 'PHONE_NUMBER',
    US_SSN: 'US_SSN',
    LOCATION: 'LOCATION',
    DATE_TIME: 'DATE_TIME',
    URL: 'URL',
    IP_ADDRESS: 'IP_ADDRESS',
    MEDICAL_LICENSE: 'MEDICAL_LICENSE',
    CREDIT_CARD: 'CREDIT_CARD',
    ACCOUNT: 'IBAN_CODE',
    LICENSE: 'US_DRIVER_LICENSE',
    MRN: 'MEDICAL_RECORD_NUMBER',
    ZIP: 'US_ZIP_CODE',
    VEHICLE: 'US_PASSPORT',
    IBAN_CODE: 'IBAN_CODE',
    US_DRIVER_LICENSE: 'US_DRIVER_LICENSE',
    MEDICAL_RECORD_NUMBER: 'MEDICAL_RECORD_NUMBER',
  };

  const paletteKey = map[type] || 'DEFAULT';

  return `entities.${paletteKey}`;
};

interface IProps {
  jobId: string;
}

const ReviewAndRun: FC<IProps> = ({ jobId }) => {
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(true);
  const [isError, setIsError] = useState(false);
  const [results, setResults] = useState<JobResults | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const localOriginalText = useAppSelector((state) => state.jobs.localOriginalTexts[jobId]);

  const textToDisplay = localOriginalText || '';

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleError = (defaultKey: string) => {
    setErrorMessage(t(defaultKey));
  };

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const getResults = async () => {
    try {
      const response = await resultsService.getResults(jobId);
      setResults(response);
      setIsProcessing(false);
      stopPolling();
    } catch {
      setIsError(true);
      stopPolling();
    }
  };

  const checkStatus = async () => {
    try {
      const job = await jobsService.getJobById(jobId);

      if (job.status === JobStatus.SUCCEEDED) {
        await getResults();
      } else if (job.status === JobStatus.FAILED) {
        setIsError(true);
        stopPolling();
      }
    } catch {
      handleError('errors.network');
    }
  };

  useEffect(() => {
    const startPolling = () => {
      checkStatus();

      intervalRef.current = setInterval(checkStatus, 2000);
    };

    startPolling();

    return () => stopPolling();
  }, [jobId]);

  if (isProcessing) {
    return (
      <Box sx={{ textAlign: 'center', p: 10 }}>
        <CircularProgress sx={{ mb: 2, color: 'primary.500' }} />
        <Typography sx={{ color: 'neutral.500' }}>{t('deIdentify.results.analyzing')}</Typography>
      </Box>
    );
  }

  const onDownload = async () => {
    await resultsService.exportPdf(jobId);
  };

  const onCopy = () => {
    if (results?.mainContent.anonymizedText) {
      navigator.clipboard.writeText(results.mainContent.anonymizedText);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const renderHighlightedText = (text: string, entities: EntityDetection[]) => {
    if (!entities.length) return text;

    const sortedEntities = [...entities].sort((a, b) => a.start - b.start);

    const result: JSX.Element[] = [];
    let lastIndex = 0;

    sortedEntities.forEach((entity, index) => {
      result.push(<span key={`text-${index}`}>{text.substring(lastIndex, entity.start)}</span>);

      result.push(
        <Box
          component="span"
          key={`entity-${index}`}
          sx={{
            backgroundColor: (theme) => {
              const colorPath = getEntityColor(entity.entity_type);
              return alpha(theme.palette.entities[colorPath.split('.')[1]] || 'neutral.100', 0.15);
            },
            padding: '2px 4px',
            borderRadius: '4px',
            border: '1px solid',
            borderColor: 'inherit',
            mx: '2px',
            fontSize: FONT_SIZES.xs,
          }}
        >
          {text.substring(entity.start, entity.end)}
        </Box>,
      );
      lastIndex = entity.end;
    });

    result.push(<span key="text-end">{text.substring(lastIndex)}</span>);
    return result;
  };

  if (isError) {
    return (
      <Box sx={{ textAlign: 'center', p: 5 }}>
        <Typography color="error" variant="h6">
          {t('deIdentify.results.failed')}
        </Typography>
        <Typography sx={{ mb: 2 }}>{t('errors.network')}</Typography>
        <Button variant="outlined" onClick={() => window.location.reload()}>
          {t('common.retry')}
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6">{t('deIdentify.results.original')}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t('deIdentify.results.originalSubtitle')}
            </Typography>
            <Box
              sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1, fontFamily: 'monospace' }}
            >
              {renderHighlightedText(textToDisplay, results?.entityTable ?? [])}
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6">{t('deIdentify.results.anonymized')}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t('deIdentify.results.anonymizedSubtitle')}
            </Typography>
            <Box
              sx={{
                bgcolor: 'background.default',
                p: 2,
                borderRadius: 1,
                fontFamily: 'monospace',
                minHeight: '200px',
              }}
            >
              {results?.mainContent.anonymizedText}
            </Box>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Button startIcon={<ContentCopy />} onClick={onCopy}>
                {t('common.copy')}
              </Button>
              <Button startIcon={<Download />} onClick={onDownload}>
                {t('common.download')}
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {t('common.copied')}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setErrorMessage(null)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReviewAndRun;
