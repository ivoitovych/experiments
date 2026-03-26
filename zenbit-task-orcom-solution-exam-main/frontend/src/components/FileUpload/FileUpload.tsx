/**
 * FileUpload — Drag-and-drop file uploader component.
 *
 * Accepts CSV, JSON, and TXT files (max 5 MB).
 * Uses a hidden <input type="file"> + drag area with visual feedback.
 * On successful upload, calls the onUpload callback with file metadata.
 * Shows file preview, row count, and content type after upload.
 */
import { useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { uploadFile, clearUpload } from '@/store/slices/deIdentificationSlice';
import type { UploadFileResult } from '@/services/deIdentificationService';

interface FileUploadProps {
  onUploaded?: (result: UploadFileResult) => void;
}

export function FileUpload({ onUploaded }: FileUploadProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { uploadedFile, isUploading, uploadError } = useAppSelector(
    (s) => s.deIdentification,
  );

  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const result = await dispatch(uploadFile(file));
    if (uploadFile.fulfilled.match(result)) {
      onUploaded?.(result.payload);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) void handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void handleFile(file);
    // Reset so the same file can be re-selected after removal
    e.target.value = '';
  };

  const handleRemove = () => {
    dispatch(clearUpload());
  };

  return (
    <Box>
      {!uploadedFile && (
        <Box
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !isUploading && inputRef.current?.click()}
          sx={{
            border: '2px dashed',
            borderColor: isDragging ? 'primary.main' : 'divider',
            borderRadius: 2,
            p: 5,
            textAlign: 'center',
            cursor: isUploading ? 'default' : 'pointer',
            bgcolor: isDragging ? 'action.hover' : 'background.default',
            transition: 'border-color 0.2s, background-color 0.2s',
            '&:hover': { borderColor: 'primary.light', bgcolor: 'action.hover' },
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".csv,.json,.txt,.tsv"
            style={{ display: 'none' }}
            onChange={handleInputChange}
          />

          {isUploading ? (
            <>
              <CircularProgress size={36} sx={{ mb: 1.5 }} />
              <Typography color="text.secondary">{t('deIdentify.step2.uploading')}</Typography>
            </>
          ) : (
            <>
              <CloudUploadIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1.5 }} />
              <Typography fontWeight={500} sx={{ mb: 0.5 }}>
                {t('deIdentify.step2.dragDrop')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('deIdentify.step2.supportedFormats')}
              </Typography>
            </>
          )}
        </Box>
      )}

      {uploadError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {uploadError}
        </Alert>
      )}

      {uploadedFile && (
        <Box sx={{ mt: 1 }}>
          <Alert
            severity="success"
            action={
              <Button
                size="small"
                color="inherit"
                startIcon={<DeleteIcon />}
                onClick={handleRemove}
              >
                {t('deIdentify.step2.removeFile')}
              </Button>
            }
            sx={{ mb: 2 }}
          >
            {t('deIdentify.step2.uploadSuccess')} — <strong>{uploadedFile.fileName}</strong>{' '}
            ({uploadedFile.rowCount} rows, {Math.round(uploadedFile.fileSize / 1024)} KB)
          </Alert>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {t('deIdentify.step2.preview')}
          </Typography>
          {uploadedFile.contentType === 'txt' ? (
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
                wordBreak: 'break-all',
                maxHeight: 400,
                overflow: 'auto',
              }}
            >
              {uploadedFile.preview[0]}
            </Box>
          ) : (
            <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 400 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Content</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {uploadedFile.preview.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell sx={{ color: 'text.disabled', width: 40 }}>{i + 1}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{row}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}
    </Box>
  );
}
