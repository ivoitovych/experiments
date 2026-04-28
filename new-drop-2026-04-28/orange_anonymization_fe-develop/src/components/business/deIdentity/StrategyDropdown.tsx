import { useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Block as RedactIcon,
  Cached as ReplaceIcon,
  AutoAwesome as SyntheticIcon,
  VisibilityOff as MaskIcon,
  LockClock as HashIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import type { IJob, RedactOption } from '@/pages/DeIdentify/types';
import { FONT_SIZES } from '@/constants';

const OPTIONS: RedactOption[] = [
  {
    id: 'Redact',
    category: 'REMOVE',
    categoryLabel: 'deIdentify.settings.strategies.categories.remove',
    titleKey: 'deIdentify.settings.strategies.redact.title',
    descKey: 'deIdentify.settings.strategies.redact.description',
    icon: <RedactIcon />,
  },
  {
    id: 'Replace',
    category: 'REPLACE',
    categoryLabel: 'deIdentify.settings.strategies.categories.replace',
    titleKey: 'deIdentify.settings.strategies.replace.title',
    descKey: 'deIdentify.settings.strategies.replace.description',
    icon: <ReplaceIcon />,
  },
  {
    id: 'Synthetic',
    category: 'REPLACE',
    categoryLabel: 'deIdentify.settings.strategies.categories.replace',
    titleKey: 'deIdentify.settings.strategies.synthetic.title',
    descKey: 'deIdentify.settings.strategies.synthetic.description',
    icon: <SyntheticIcon />,
  },
  {
    id: 'Mask',
    category: 'PROTECT',
    categoryLabel: 'deIdentify.settings.strategies.categories.protect',
    titleKey: 'deIdentify.settings.strategies.mask.title',
    descKey: 'deIdentify.settings.strategies.mask.description',
    icon: <MaskIcon />,
  },
  {
    id: 'Hash',
    category: 'PROTECT',
    categoryLabel: 'deIdentify.settings.strategies.categories.protect',
    titleKey: 'deIdentify.settings.strategies.hash.title',
    descKey: 'deIdentify.settings.strategies.hash.description',
    icon: <HashIcon />,
  },
];

interface IProps {
  updateJob: (jobId: string, updateData: Partial<IJob>) => Promise<void>;
  currentJob: IJob | null;
}

const StrategyDropdown: FC<IProps> = ({ updateJob, currentJob }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const firstEntity = currentJob?.wizardState?.configSettings.entities?.[0];
  const strategies = currentJob?.wizardState?.configSettings.strategies as
    | Record<string, string>
    | undefined;
  const selectedId = (firstEntity && strategies?.[firstEntity]) || 'Redact';
  const selectedOption = OPTIONS.find((opt) => opt.id === selectedId);

  const handleSelect = async (id: string) => {
    if (!currentJob?.wizardState) return;
    setExpanded(false);

    const entities = currentJob.wizardState.configSettings.entities || [];
    const newStrategies = entities.reduce<Record<string, string>>((acc, entity) => {
      acc[entity] = id;
      return acc;
    }, {});

    await updateJob(currentJob.id, {
      wizardState: {
        ...currentJob.wizardState,
        configSettings: {
          ...currentJob.wizardState.configSettings,
          strategies: newStrategies,
        },
      },
    });
  };

  const renderGroup = (category: string) => {
    const groupOptions = OPTIONS.filter((opt) => opt.category === category);
    const categoryLabel = groupOptions[0]?.categoryLabel;

    return (
      <Box key={category}>
        <Box sx={{ px: 2, py: 1, bgcolor: 'neutral.50' }}>
          <Typography
            sx={{ fontSize: FONT_SIZES.sm, fontWeight: 'fontWeightMedium', color: 'neutral.400' }}
          >
            {categoryLabel ? t(categoryLabel) : category}
          </Typography>
        </Box>
        <List sx={{ p: 0 }}>
          {groupOptions.map((opt) => {
            const isSelected = selectedId === opt.id;
            return (
              <ListItemButton
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                sx={{
                  py: 1.5,
                  bgcolor: isSelected ? 'primary.50' : 'transparent',
                  '&:hover': { bgcolor: isSelected ? 'primary.50' : 'action.hover' },
                }}
              >
                <ListItemIcon
                  sx={{ minWidth: 40, color: isSelected ? 'primary.600' : 'neutral.500' }}
                >
                  {opt.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontSize: FONT_SIZES.md,
                        fontWeight: isSelected ? 'fontWeightMedium' : 'fontWeightRegular',
                        color: isSelected ? 'primary.500' : 'neutral.900',
                      }}
                    >
                      {t(opt.titleKey)}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      sx={{
                        fontSize: FONT_SIZES.xs,
                        color: isSelected ? 'neutral.700' : 'neutral.400',
                      }}
                    >
                      {t(opt.descKey)}
                    </Typography>
                  }
                />
                {isSelected && <CheckIcon sx={{ color: 'primary.600', fontSize: FONT_SIZES.xl }} />}
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '8px',
        overflow: 'hidden',
        bgcolor: 'common.white',
      }}
    >
      <Accordion
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        elevation={0}
        disableGutters
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            borderBottom: expanded ? '1px solid' : 'none',
            borderColor: 'divider',
            minHeight: '72px',
            '& .MuiAccordionSummary-content': { margin: 0 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ color: 'neutral.800', display: 'flex' }}>{selectedOption?.icon}</Box>
            <Box>
              <Typography sx={{ fontWeight: 'fontWeightMedium', color: 'neutral.800' }}>
                {selectedOption ? t(selectedOption.titleKey) : ''}
              </Typography>
              <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.400' }}>
                {selectedOption ? t(selectedOption.descKey) : ''}
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={{ p: 0 }}>
          {renderGroup('REMOVE')}
          {renderGroup('REPLACE')}
          {renderGroup('PROTECT')}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default StrategyDropdown;
