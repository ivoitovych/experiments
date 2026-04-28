import { useState, useMemo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  InputAdornment,
  Chip,
  alpha,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Language as LanguageIcon,
  Search as SearchIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import type { IJob, Language } from '@/pages/DeIdentify/types';
import { ALL_LANGUAGES, RECENTLY_USED } from '@/constants';
import { FONT_SIZES } from '@/constants';

interface IProps {
  updateJob: (jobId: string, updateData: Partial<IJob>) => Promise<void>;
  currentJob: IJob | null;
}

const LanguageSelect: FC<IProps> = ({ currentJob, updateJob }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    code: 'en',
    name: 'English',
    isAutoDetected: true,
  });

  const filteredAll = useMemo(
    () => ALL_LANGUAGES.filter((l) => l.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  const handleSelect = async (lang: Language) => {
    if (!currentJob?.wizardState) return;
    setSelectedLanguage(lang);
    setExpanded(false);
    setSearch('');
    await updateJob(currentJob.id, {
      wizardState: {
        ...currentJob.wizardState,
        configSettings: {
          ...currentJob.wizardState.configSettings,
          language: lang.code,
        },
      },
    });
  };

  const renderLanguageItem = (lang: Language) => {
    const isSelected = selectedLanguage.code === lang.code;
    return (
      <ListItemButton
        key={lang.code}
        onClick={() => handleSelect(lang)}
        sx={{
          py: 1,
          bgcolor: isSelected ? 'primary.50' : 'transparent',
          '&:hover': { bgcolor: isSelected ? 'primary.50' : 'action.hover' },
        }}
      >
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography
                sx={{
                  fontSize: FONT_SIZES.md,
                  fontWeight: isSelected ? 'fontWeightMedium' : 'fontWeightRegular',
                  color: isSelected ? 'primary.500' : 'neutral.900',
                }}
              >
                {lang.name}
              </Typography>
              {isSelected && lang.isAutoDetected && (
                <Chip
                  icon={
                    <CheckIcon
                      sx={{
                        fontSize: FONT_SIZES.md,
                        color: (theme) => `${theme.palette.accent[400]} !important`,
                      }}
                    />
                  }
                  label={t('deIdentify.languageSelect.autoDetected')}
                  size="small"
                  sx={{
                    bgcolor: (theme) => alpha(theme.palette.accent[400]!, 0.08),
                    color: (theme) => theme.palette.accent[400],
                    border: 'none',
                    fontWeight: 'fontWeightMedium',
                    fontSize: FONT_SIZES.xs,
                  }}
                />
              )}
            </Box>
          }
        />
      </ListItemButton>
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
            '& .MuiAccordionSummary-content': { margin: 0, alignItems: 'center' },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LanguageIcon sx={{ color: 'neutral.400' }} />
            <Typography sx={{ fontWeight: 'fontWeightMedium', color: 'neutral.800' }}>
              {selectedLanguage.name}
            </Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={{ p: 0 }}>
          <Box sx={{ p: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
            <TextField
              fullWidth
              size="small"
              placeholder={t('deIdentify.languageSelect.search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'neutral.400', fontSize: FONT_SIZES.xl }} />
                  </InputAdornment>
                ),
                sx: { px: 1, py: 0.5, fontSize: FONT_SIZES.sm },
              }}
            />
          </Box>

          <Box sx={{ maxHeight: 300, overflowY: 'auto' }} className="scrollbar-md">
            {selectedLanguage.isAutoDetected && !search && (
              <Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                {renderLanguageItem(selectedLanguage)}
              </Box>
            )}

            {!search && (
              <>
                <Box sx={{ px: 2, py: 1, bgcolor: 'neutral.50' }}>
                  <Typography
                    sx={{
                      fontSize: FONT_SIZES.sm,
                      fontWeight: 'fontWeightMedium',
                      color: 'neutral.400',
                    }}
                  >
                    {t('deIdentify.languageSelect.recentlyUsed')}
                  </Typography>
                </Box>
                <List sx={{ p: 0 }}>{RECENTLY_USED.map(renderLanguageItem)}</List>
              </>
            )}

            <Box sx={{ px: 2, py: 1, bgcolor: 'neutral.50' }}>
              <Typography
                sx={{
                  fontSize: FONT_SIZES.sm,
                  fontWeight: 'fontWeightMedium',
                  color: 'neutral.400',
                }}
              >
                {t('deIdentify.languageSelect.allLanguages')}
              </Typography>
            </Box>
            <List sx={{ p: 0 }}>
              {filteredAll.length > 0 ? (
                filteredAll.map(renderLanguageItem)
              ) : (
                <Typography
                  sx={{ p: 2, textAlign: 'center', color: 'neutral.400', fontSize: FONT_SIZES.xs }}
                >
                  {t('deIdentify.languageSelect.noLanguages')}
                </Typography>
              )}
            </List>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default LanguageSelect;
