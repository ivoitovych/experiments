/**
 * SyntheticData Page
 *
 * Left panel: generation settings form (record count, entity types, locale)
 * Right panel: generated records table with CSV/JSON download
 */
import { useTranslation } from 'react-i18next';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Download as DownloadIcon, AutoFixHigh as AutoFixHighIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { generateSyntheticData, updateSettings } from '@/store/slices/syntheticDataSlice';
import { PRESIDIO_ENTITIES } from '@/constants';
import { downloadAsFile, toCSV } from '@/utils';
import type { SyntheticGenerationSettings } from '@/types';

const LOCALE_CODES = ['en_US', 'en_GB', 'es_ES', 'de_DE', 'fr_FR'] as const;

function buildSchema(t: (key: string) => string) {
  return yup.object({
    recordCount: yup
      .number()
      .min(1, t('syntheticData.settings.validation.recordCountMin'))
      .max(1000, t('syntheticData.settings.validation.recordCountMax'))
      .required(t('syntheticData.settings.validation.recordCountRequired')),
    locale: yup.string().required(),
    entityTypes: yup.array().of(yup.string().required()).min(1).required(),
  });
}

export default function SyntheticData() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { records, settings, isGenerating, error } = useAppSelector((s) => s.syntheticData);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SyntheticGenerationSettings>({
    resolver: yupResolver(buildSchema(t)),
    defaultValues: settings,
  });

  const onSubmit: SubmitHandler<SyntheticGenerationSettings> = async (data) => {
    dispatch(updateSettings(data));
    await dispatch(generateSyntheticData(data));
  };

  const handleDownloadCSV = () => {
    const csv = toCSV(records.map((r) => ({ '#': r.id, 'Entity Type': r.entityType, 'Value': r.value, 'Locale': r.locale })));
    downloadAsFile(csv, 'synthetic-data.csv', 'text/csv');
  };

  const handleDownloadJSON = () => {
    downloadAsFile(JSON.stringify(records, null, 2), 'synthetic-data.json', 'application/json');
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>{t('syntheticData.title')}</Typography>
        <Typography color="text.secondary">{t('syntheticData.subtitle')}</Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Settings panel */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                {t('syntheticData.settings.title')}
              </Typography>

              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <TextField
                  label={t('syntheticData.settings.recordCount')}
                  type="number"
                  fullWidth
                  sx={{ mb: 3 }}
                  helperText={errors.recordCount?.message ?? t('syntheticData.settings.recordCountHelper')}
                  error={Boolean(errors.recordCount)}
                  {...register('recordCount', { valueAsNumber: true })}
                />

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>{t('syntheticData.settings.locale')}</InputLabel>
                  <Select
                    label={t('syntheticData.settings.locale')}
                    defaultValue={settings.locale}
                    {...register('locale')}
                  >
                    {LOCALE_CODES.map((code) => (
                      <MenuItem key={code} value={code}>
                        {t(`syntheticData.settings.locales.${code}`)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                  {t('syntheticData.settings.entityTypes')}
                </Typography>
                <Controller
                  name="entityTypes"
                  control={control}
                  render={({ field }) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 3 }}>
                      {PRESIDIO_ENTITIES.map((entity) => {
                        const selected = field.value.includes(entity);
                        return (
                          <Chip
                            key={entity}
                            label={entity}
                            size="small"
                            clickable
                            color={selected ? 'primary' : 'default'}
                            onClick={() => {
                              field.onChange(
                                selected
                                  ? field.value.filter((e) => e !== entity)
                                  : [...field.value, entity],
                              );
                            }}
                          />
                        );
                      })}
                    </Box>
                  )}
                />

                <Divider sx={{ mb: 3 }} />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={isGenerating}
                  startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> : <AutoFixHighIcon />}
                >
                  {isGenerating ? t('syntheticData.settings.generating') : t('syntheticData.settings.generate')}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Results panel */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  {t('syntheticData.results.title')}
                  {records.length > 0 && (
                    <Chip label={records.length} size="small" color="primary" sx={{ ml: 1 }} />
                  )}
                </Typography>
                {records.length > 0 && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" startIcon={<DownloadIcon />} onClick={handleDownloadCSV}>
                      {t('syntheticData.results.download')}
                    </Button>
                    <Button size="small" startIcon={<DownloadIcon />} onClick={handleDownloadJSON}>
                      {t('syntheticData.results.downloadJson')}
                    </Button>
                  </Box>
                )}
              </Box>

              {records.length === 0 ? (
                <Box textAlign="center" py={8}>
                  <AutoFixHighIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                  <Typography color="text.secondary">{t('syntheticData.results.noData')}</Typography>
                </Box>
              ) : (
                <TableContainer sx={{ maxHeight: 500 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>{t('syntheticData.results.columns.index')}</TableCell>
                        <TableCell>{t('syntheticData.results.columns.entityType')}</TableCell>
                        <TableCell>{t('syntheticData.results.columns.value')}</TableCell>
                        <TableCell>{t('syntheticData.results.columns.locale')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {records.map((record, i) => (
                        <TableRow key={record.id} hover>
                          <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                            {i + 1}
                          </TableCell>
                          <TableCell>
                            <Chip label={record.entityType} size="small" variant="outlined" />
                          </TableCell>
                          <TableCell sx={{ fontFamily: 'monospace' }}>{record.value}</TableCell>
                          <TableCell>{record.locale}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
