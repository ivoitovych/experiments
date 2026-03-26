/**
 * Processing Page
 *
 * Polls GET /jobs/:id every 1.5 s until the job reaches a terminal state:
 *   - SUCCEEDED → redirect to /app/results/:jobId
 *   - FAILED    → show error alert with retry option
 *
 * Shows a progress indicator and the current job status.
 * Automatically cleans up the polling interval on unmount.
 */
import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { pollJob, runJob } from '@/store/slices/jobsSlice';
import { JobStatus } from '@/types';
import { ROUTES } from '@/constants';

const POLL_INTERVAL_MS = 2000;
const TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

export default function Processing() {
  const { t } = useTranslation();
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentJob = useAppSelector((s) => s.jobs.currentJob);

  const [elapsed, setElapsed] = useState(0);
  const startTimeRef = useRef(Date.now());
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopIntervals = () => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  // Start polling and timer on mount
  useEffect(() => {
    if (!jobId) return;

    // Immediate fetch in case job is already done before mount
    void dispatch(pollJob(jobId));

    pollIntervalRef.current = setInterval(() => {
      void dispatch(pollJob(jobId));
    }, POLL_INTERVAL_MS);

    timerIntervalRef.current = setInterval(() => {
      setElapsed(Date.now() - startTimeRef.current);
    }, 1000);

    return stopIntervals;
  }, [jobId]); // eslint-disable-line react-hooks/exhaustive-deps

  // React to status changes
  useEffect(() => {
    if (!currentJob) return;
    if (currentJob.status === JobStatus.SUCCEEDED) {
      stopIntervals();
      navigate(`${ROUTES.RESULTS}/${currentJob.id}`);
    }
    if (currentJob.status === JobStatus.FAILED) {
      stopIntervals();
    }
  }, [currentJob?.status]); // eslint-disable-line react-hooks/exhaustive-deps

  const progress = currentJob?.progress ?? 0;
  const isTimeout = elapsed > TIMEOUT_MS;

  const getStatusText = () => {
    if (progress < 30) return t('deIdentify.processing.analyzing');
    if (progress < 80) return t('deIdentify.processing.anonymizing');
    return t('deIdentify.processing.finalizing');
  };

  const formatElapsed = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
  };

  const handleRetry = () => {
    if (!jobId) return;
    void dispatch(runJob(jobId));
    // Restart polling
    startTimeRef.current = Date.now();
    setElapsed(0);
    pollIntervalRef.current = setInterval(() => {
      void dispatch(pollJob(jobId));
    }, POLL_INTERVAL_MS);
    timerIntervalRef.current = setInterval(() => {
      setElapsed(Date.now() - startTimeRef.current);
    }, 1000);
  };

  // ── Failed state ────────────────────────────────────────────────────────
  if (currentJob?.status === JobStatus.FAILED) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 8 }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          {t('deIdentify.processing.failed')}
        </Typography>
        <Alert severity="error" sx={{ mb: 3 }}>
          {currentJob.error?.message ?? t('deIdentify.processing.failedMessage')}
        </Alert>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" startIcon={<RefreshIcon />} onClick={handleRetry}>
            {t('deIdentify.processing.retry')}
          </Button>
          <Button
            variant="outlined"
            startIcon={<DashboardIcon />}
            onClick={() => navigate(ROUTES.DASHBOARD)}
          >
            {t('deIdentify.processing.goToDashboard')}
          </Button>
        </Box>
      </Box>
    );
  }

  // ── Processing state ────────────────────────────────────────────────────
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        {t('deIdentify.processing.title')}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        {t('deIdentify.processing.elapsed', { time: formatElapsed(elapsed) })}
      </Typography>

      <Card>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">{getStatusText()}</Typography>
              <Typography variant="body2" fontWeight={600}>{progress}%</Typography>
            </Box>
            <LinearProgress
              variant={progress > 0 ? 'determinate' : 'indeterminate'}
              value={progress}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        </CardContent>
      </Card>

      {isTimeout && (
        <Alert
          severity="info"
          sx={{ mt: 3 }}
          action={
            <Button color="inherit" size="small" onClick={() => navigate(ROUTES.DASHBOARD)}>
              {t('deIdentify.processing.goToDashboard')}
            </Button>
          }
        >
          {t('deIdentify.processing.stillProcessing')}
        </Alert>
      )}
    </Box>
  );
}
