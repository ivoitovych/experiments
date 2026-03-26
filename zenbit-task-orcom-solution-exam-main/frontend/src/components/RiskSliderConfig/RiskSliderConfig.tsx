/**
 * RiskSliderConfig — Step 3 configuration panel for GDPR / UK_DPI / Swiss FADP.
 *
 * Renders a 3-position slider (Low / Medium / High) that controls which
 * entity types are included in de-identification:
 *   - Low:    direct identifiers (PERSON, EMAIL, PHONE, SSN)
 *   - Medium: all PII (+ DATE, LOCATION, IP, URL, ACCOUNT)
 *   - High:   including quasi-identifiers (+ NRP, MEDICAL_LICENSE, UK_NHS)
 *
 * Entity chips auto-update as the slider moves.
 * Connected to Redux deIdentificationSlice.
 */
import { Box, Chip, Grid, Slider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setRiskLevel, updateSettings } from '@/store/slices/deIdentificationSlice';
import { RISK_LEVEL_ENTITIES } from '@/constants';
import { StrategySelect } from '@/components/StrategySelect';
import type { AnonymizationStrategy, RiskLevel } from '@/types';

const RISK_LEVELS: RiskLevel[] = ['low', 'medium', 'high'];

const SLIDER_MARKS = [
  { value: 0, label: '' },
  { value: 1, label: '' },
  { value: 2, label: '' },
];

export function RiskSliderConfig() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { riskLevel, settings } = useAppSelector((s) => s.deIdentification);

  const sliderIndex = RISK_LEVELS.indexOf(riskLevel);

  const handleSliderChange = (_: Event, value: number | number[]) => {
    const level = RISK_LEVELS[value as number];
    dispatch(setRiskLevel(level));
  };

  const activeEntities = RISK_LEVEL_ENTITIES[riskLevel];

  const riskColor: Record<RiskLevel, 'success' | 'warning' | 'error'> = {
    low: 'success',
    medium: 'warning',
    high: 'error',
  };

  return (
    <Box>
      {/* Risk level slider */}
      <Grid container spacing={3} alignItems="flex-start">
        <Grid item xs={12} md={7}>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            {t('deIdentify.step3.riskLevel.label')}
          </Typography>

          {/* Level labels row */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            {RISK_LEVELS.map((level) => (
              <Typography
                key={level}
                variant="caption"
                fontWeight={riskLevel === level ? 700 : 400}
                color={riskLevel === level ? `${riskColor[level]}.main` : 'text.secondary'}
              >
                {t(`deIdentify.step3.riskLevel.${level}`)}
              </Typography>
            ))}
          </Box>

          <Slider
            value={sliderIndex}
            min={0}
            max={2}
            step={1}
            marks={SLIDER_MARKS}
            onChange={handleSliderChange}
            color={riskColor[riskLevel]}
            sx={{ mb: 0.5 }}
          />

          {/* Description */}
          <Typography variant="caption" color="text.secondary">
            {t(`deIdentify.step3.riskLevel.${riskLevel}Desc`)}
          </Typography>

          {/* Auto-filtered entity chips (read-display, informational) */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('deIdentify.settings.entityTypes')}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {activeEntities.map((entity) => {
                const selected = settings.entities.includes(entity);
                return (
                  <Chip
                    key={entity}
                    label={entity}
                    size="small"
                    color={selected ? riskColor[riskLevel] : 'default'}
                    variant={selected ? 'filled' : 'outlined'}
                    clickable={false}
                  />
                );
              })}
            </Box>
          </Box>
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
