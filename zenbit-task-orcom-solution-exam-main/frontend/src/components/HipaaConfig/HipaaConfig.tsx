/**
 * HipaaConfig — Step 3 configuration panel for HIPAA framework.
 *
 * Two modes:
 *   - Safe Harbor:    all 18 PHI identifiers pre-selected (read-only chips),
 *                     strategy dropdown only
 *   - Expert Determ.: manual entity selection with checkboxes,
 *                     expert disclaimer alert, strategy dropdown
 *
 * Connected to Redux deIdentificationSlice via useAppDispatch/useAppSelector.
 */
import {
  Alert,
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setHipaaMethod, updateSettings } from '@/store/slices/deIdentificationSlice';
import { HIPAA_SAFE_HARBOR_LABELS, PRESIDIO_ENTITIES } from '@/constants';
import { StrategySelect } from '@/components/StrategySelect';
import type { AnonymizationStrategy, HipaaMethod } from '@/types';

export function HipaaConfig() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { hipaaMethod, settings } = useAppSelector((s) => s.deIdentification);

  const handleMethodChange = (method: HipaaMethod) => {
    dispatch(setHipaaMethod(method));
  };

  return (
    <Box>
      {/* Method selector */}
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        {t('deIdentify.step3.hipaa.methodLabel')}
      </Typography>
      <RadioGroup
        value={hipaaMethod}
        onChange={(e) => handleMethodChange(e.target.value as HipaaMethod)}
        row
        sx={{ mb: 3, gap: 2 }}
      >
        {(
          [
            { value: 'safe_harbor', labelKey: 'deIdentify.step3.hipaa.safeHarbor', descKey: 'deIdentify.step3.hipaa.safeHarborDesc' },
            { value: 'expert_determination', labelKey: 'deIdentify.step3.hipaa.expertDetermination', descKey: 'deIdentify.step3.hipaa.expertDesc' },
          ] as const
        ).map((opt) => (
          <Card
            key={opt.value}
            onClick={() => handleMethodChange(opt.value)}
            sx={{
              flex: 1,
              cursor: 'pointer',
              border: 2,
              borderColor: hipaaMethod === opt.value ? 'primary.main' : 'divider',
              transition: 'border-color 0.2s',
            }}
          >
            <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, py: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Radio value={opt.value} checked={hipaaMethod === opt.value} size="small" sx={{ mt: 0.25, p: 0 }} />
              <Box>
                <Typography variant="body2" fontWeight={600}>{t(opt.labelKey)}</Typography>
                <Typography variant="caption" color="text.secondary">{t(opt.descKey)}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>

      <Grid container spacing={3}>
        {/* Left: entity list */}
        <Grid item xs={12} md={7}>
          {hipaaMethod === 'safe_harbor' ? (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                {t('deIdentify.settings.entityTypes')}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {HIPAA_SAFE_HARBOR_LABELS.map((label) => (
                  <FormControlLabel
                    key={label}
                    control={<Checkbox checked disabled size="small" />}
                    label={<Typography variant="caption">{label}</Typography>}
                    sx={{ m: 0, mr: 1 }}
                  />
                ))}
              </Box>
            </Box>
          ) : (
            <Box>
              <Alert severity="warning" sx={{ mb: 2 }}>
                {t('deIdentify.step3.hipaa.expertDisclaimer')}
              </Alert>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                {t('deIdentify.settings.entityTypes')}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {PRESIDIO_ENTITIES.map((entity) => {
                  const selected = settings.entities.includes(entity);
                  return (
                    <Chip
                      key={entity}
                      label={entity}
                      clickable
                      size="small"
                      color={selected ? 'primary' : 'default'}
                      onClick={() => {
                        const updated = selected
                          ? settings.entities.filter((e) => e !== entity)
                          : [...settings.entities, entity];
                        dispatch(updateSettings({ entities: updated }));
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          )}
        </Grid>

        {/* Right: strategy */}
        <Grid item xs={12} md={5}>
          <StrategySelect
            value={settings.strategy as AnonymizationStrategy}
            onChange={(s) => dispatch(updateSettings({ strategy: s }))}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
