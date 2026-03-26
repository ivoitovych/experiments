/**
 * DocumentDetailDialog
 *
 * Modal dialog that displays full details of a de-identified document:
 * original text, anonymized text, status, framework, entity count, timing.
 * Fetches full document data by ID when opened.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { deIdentificationService } from '@/services/deIdentificationService';
import { formatDate } from '@/utils';
import type { Document } from '@/types';

interface DocumentDetailDialogProps {
  documentId: string | null;
  onClose: () => void;
}

export function DocumentDetailDialog({ documentId, onClose }: DocumentDetailDialogProps) {
  const { t } = useTranslation();
  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!documentId) {
      setDocument(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    deIdentificationService
      .getDocument(documentId)
      .then(setDocument)
      .catch(() => setError(t('documentDetail.loadError')))
      .finally(() => setIsLoading(false));
  }, [documentId, t]);

  const open = documentId !== null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight={600}>
          {t('documentDetail.title')}
        </Typography>
        <IconButton onClick={onClose} size="small" aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography color="error" sx={{ py: 3, textAlign: 'center' }}>
            {error}
          </Typography>
        )}

        {document && !isLoading && (
          <Box>
            {/* Meta row */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3, alignItems: 'center' }}>
              <Chip
                label={document.status}
                size="small"
                color={
                  document.status === 'completed'
                    ? 'success'
                    : document.status === 'failed'
                    ? 'error'
                    : 'default'
                }
              />
              <Chip label={document.framework.toUpperCase()} size="small" variant="outlined" />
              <Typography variant="body2" color="text.secondary">
                {t('documentDetail.entities')}: {document.entityCount}
              </Typography>
              {document.processingTimeMs !== null && (
                <Typography variant="body2" color="text.secondary">
                  {t('documentDetail.processingTime', { time: document.processingTimeMs })}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                {formatDate(document.createdAt)}
              </Typography>
            </Box>

            {/* Text panels */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {t('documentDetail.originalText')}
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    p: 2,
                    bgcolor: 'background.default',
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 2,
                    fontFamily: 'monospace',
                    fontSize: '0.82rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    minHeight: 200,
                    maxHeight: 400,
                    overflow: 'auto',
                  }}
                >
                  {document.originalText}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {t('documentDetail.anonymizedText')}
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    p: 2,
                    bgcolor: '#F0FFF4',
                    border: 1,
                    borderColor: 'success.light',
                    borderRadius: 2,
                    fontFamily: 'monospace',
                    fontSize: '0.82rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    minHeight: 200,
                    maxHeight: 400,
                    overflow: 'auto',
                    color: 'success.dark',
                  }}
                >
                  {document.anonymizedText ?? t('documentDetail.noAnonymizedText')}
                </Box>
              </Grid>
            </Grid>

            {/* ID for reference */}
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
              ID: {document.id}
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
