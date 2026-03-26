/**
 * StrategySelect — Reusable anonymization strategy dropdown.
 *
 * Renders a MUI Select with all available strategies:
 *   replace · redact · hash · encrypt · synthetic · pseudonymize · generalize
 *
 * Props:
 *   value     → current selected strategy
 *   onChange  → callback fired when user picks a new strategy
 *   disabled  → greys out the dropdown
 */
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ANONYMIZATION_STRATEGIES } from '@/constants';
import type { AnonymizationStrategy } from '@/types';

interface Props {
  value: AnonymizationStrategy;
  onChange: (strategy: AnonymizationStrategy) => void;
  label?: string;
}

export function StrategySelect({ value, onChange, label }: Props) {
  const { t } = useTranslation();
  const resolvedLabel = label ?? t('deIdentify.settings.strategy');

  return (
    <FormControl fullWidth>
      <InputLabel>{resolvedLabel}</InputLabel>
      <Select
        value={value}
        label={resolvedLabel}
        onChange={(e) => onChange(e.target.value as AnonymizationStrategy)}
      >
        {ANONYMIZATION_STRATEGIES.map((s) => (
          <MenuItem key={s} value={s}>
            {t(`deIdentify.step3.strategies.${s}`, { defaultValue: t(`deIdentify.settings.strategies.${s}`) })}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
