import { useTranslation } from 'react-i18next';
import {
  RadioButtonCheckedOutlined as RadioButtonCheckedOutlinedIcon,
  RadioButtonUncheckedOutlined as RadioButtonUncheckedOutlinedIcon,
  ReportProblemOutlined as ReportProblemOutlinedIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import type { HIPAAMethodUI, IJob } from '@/pages/DeIdentify/types';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { alpha, Box, Grid, Typography } from '@mui/material';
import { setJobAC } from '@/store/slices/jobsSlice';
import { jobsService } from '@/services/jobsService';
import { FONT_SIZES } from '@/constants';
import IdentifiersAccordion from './IdentifiersAccordion';
import StrategyDropdown from './StrategyDropdown';
import LanguageSelect from './LanguageSelect';

const HIPAAMethods: HIPAAMethodUI[] = [
  {
    id: 1,
    title: 'Safe Harbor',
    titleKey: 'deIdentify.settings.method.safeHarbor.title',
    descKey: 'deIdentify.settings.method.safeHarbor.description',
    commentKey: 'deIdentify.settings.method.safeHarbor.comment',
  },
  {
    id: 2,
    title: 'Expert Determination',
    titleKey: 'deIdentify.settings.method.expertDetermination.title',
    descKey: 'deIdentify.settings.method.expertDetermination.description',
    commentKey: 'deIdentify.settings.method.expertDetermination.comment',
  },
];

const thresholds = [
  {
    id: 1,
    titleKey: 'deIdentify.settings.detection.thresholds.conservative.title',
    descKey: 'deIdentify.settings.detection.thresholds.conservative.description',
    infoKey: 'deIdentify.settings.detection.thresholds.conservative.info',
    score: 0.3,
  },
  {
    id: 2,
    titleKey: 'deIdentify.settings.detection.thresholds.balanced.title',
    descKey: 'deIdentify.settings.detection.thresholds.balanced.description',
    infoKey: 'deIdentify.settings.detection.thresholds.balanced.info',
    score: 0.5,
  },
  {
    id: 3,
    titleKey: 'deIdentify.settings.detection.thresholds.aggressive.title',
    descKey: 'deIdentify.settings.detection.thresholds.aggressive.description',
    infoKey: 'deIdentify.settings.detection.thresholds.aggressive.info',
    score: 0.7,
  },
];

const HIPAAConfiguration = () => {
  const { t } = useTranslation();
  const { currentJob } = useAppSelector((state) => state.jobs);
  const dispatch = useAppDispatch();

  const updateJob = async (jobId: string, updateData: Partial<IJob>) => {
    const response = await jobsService.updateJob(jobId, updateData);
    dispatch(setJobAC(response));
  };

  const selectMethod = async (method: HIPAAMethodUI) => {
    if (!currentJob?.wizardState) return;

    const entities = [
      'NAME',
      'DATE',
      'SSN',
      'PHONE',
      'FAX',
      'EMAIL',
      'ADDRESS',
      'ACCOUNT',
      'LICENSE',
      'VEHICLE',
      'URL',
      'IP',
      'BIOMETRIC',
      'PHOTO',
      'DEVICE',
      'MRN',
      'BENEFICIARY',
      'CERTIFICATE',
    ];

    const data: Partial<IJob> = {
      wizardState: {
        ...currentJob?.wizardState,
        configSettings: {
          ...currentJob?.wizardState?.configSettings,
          method: method.title,
          language: currentJob?.wizardState?.configSettings.language || 'en',
          strategies: method.id === 1 ? Object.fromEntries(entities.map((e) => [e, 'Redact'])) : {},
          entities: entities,
        },
      },
    };
    await updateJob(currentJob?.id as string, data);
  };

  const selectThreshold = async (threshold: number) => {
    if (!currentJob?.wizardState) return;

    const data: Partial<IJob> = {
      wizardState: {
        ...currentJob?.wizardState,
        configSettings: {
          ...currentJob?.wizardState?.configSettings,
          threshold,
        },
      },
    };
    await updateJob(currentJob?.id as string, data);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: '48px', width: '100%' }}>
        <Typography
          sx={{
            color: 'neutral.900',
            fontWeight: 'fontWeightMedium',
            mb: '10px',
            fontSize: FONT_SIZES.xxl,
          }}
        >
          {t('deIdentify.settings.sections.method')}
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{ borderLeft: '4px solid', borderColor: 'accent.100', paddingLeft: '16px' }}
        >
          {HIPAAMethods.map((method) => {
            const isActive = currentJob?.wizardState?.configSettings.method === method.title;

            return (
              <Grid size={{ xs: 12, md: 6 }} key={method.id}>
                <Box
                  onClick={() => selectMethod(method)}
                  sx={{
                    border: `${isActive ? 2 : 1}px solid`,
                    borderColor: `${isActive ? 'primary.500' : 'neutral.200'}`,
                    borderRadius: '12px',
                    backgroundColor: `${isActive ? 'primary.50' : 'common.white'}`,
                    boxShadow: '0px 1px 3px rgba(0,0,0,0.08)',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: '24px' }}>
                      {isActive ? (
                        <RadioButtonCheckedOutlinedIcon />
                      ) : (
                        <RadioButtonUncheckedOutlinedIcon sx={{ color: 'neutral.400' }} />
                      )}
                      <Typography
                        sx={{
                          color: 'primary.500',
                          fontWeight: 'fontWeightSemiBold',
                          fontSize: FONT_SIZES.lg,
                        }}
                      >
                        {t(method.titleKey)}
                      </Typography>
                    </Box>
                    {method.id === 1 && (
                      <Box
                        sx={{
                          padding: '4px 12px',
                          borderRadius: '999px',
                          bgcolor: 'accent.100',
                          color: 'accent.500',
                          border: '1px solid',
                          borderColor: 'accent.500',
                          fontSize: FONT_SIZES.xs,
                          fontWeight: 'fontWeightMedium',
                        }}
                      >
                        {t('deIdentify.settings.method.recommended')}
                      </Box>
                    )}
                  </Box>
                  <Typography sx={{ color: 'neutral.700', fontSize: FONT_SIZES.md }}>
                    {t(method.descKey)}
                  </Typography>
                  {method?.id === 1 ? (
                    <Typography sx={{ color: 'neutral.500', fontSize: FONT_SIZES.sm }}>
                      {t(method.commentKey)}
                    </Typography>
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'warning.main',
                      }}
                    >
                      <ReportProblemOutlinedIcon sx={{ width: '16px', height: '16px' }} />
                      <Typography sx={{ fontSize: FONT_SIZES.sm }}>
                        {t(method.commentKey)}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Box sx={{ mb: '48px', width: '100%' }}>
        <Typography
          sx={{
            color: `${currentJob?.wizardState?.configSettings.method ? 'neutral.900' : 'neutral.400'}`,
            fontWeight: 'fontWeightMedium',
            mb: '10px',
            fontSize: FONT_SIZES.xxl,
          }}
        >
          {t('deIdentify.settings.sections.identifiers')}
        </Typography>

        <Box
          sx={{
            borderLeft: '4px solid',
            borderColor: 'accent.100',
            paddingLeft: '16px',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckIcon sx={{ color: 'success.main', height: '16px', width: '16px' }} />
            <Typography
              sx={{ color: 'neutral.900', fontWeight: 'fontWeightMedium', fontSize: FONT_SIZES.md }}
            >
              {t('deIdentify.settings.identifiers.title')}
            </Typography>
          </Box>

          <Typography sx={{ color: 'neutral.500', fontSize: FONT_SIZES.sm, mb: '20px' }}>
            {t('deIdentify.settings.identifiers.description')}
          </Typography>

          <IdentifiersAccordion
            isExpertMode={currentJob?.wizardState?.configSettings.method === 'Expert Determination'}
            updateJob={updateJob}
            currentJob={currentJob}
          />
        </Box>
      </Box>

      <Box sx={{ mb: '48px' }}>
        <Typography
          sx={{
            color: `${currentJob?.wizardState?.configSettings.method ? 'neutral.900' : 'neutral.400'}`,
            fontWeight: 'fontWeightMedium',
            mb: '10px',
            fontSize: FONT_SIZES.xxl,
          }}
        >
          {t('deIdentify.settings.sections.output')}
        </Typography>

        <Box
          sx={{
            borderLeft: '4px solid',
            borderColor: 'accent.100',
            paddingLeft: '16px',
            width: '100%',
          }}
        >
          <Typography
            sx={{ color: 'neutral.900', fontWeight: 'fontWeightMedium', fontSize: FONT_SIZES.md }}
          >
            {t('deIdentify.settings.strategies.title')}
          </Typography>

          <Typography sx={{ color: 'neutral.500', fontSize: FONT_SIZES.sm, mb: '20px' }}>
            {t('deIdentify.settings.subtitle')}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: '16px',
              pb: '24px',
              alignItems: 'flex-start',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box sx={{ flex: { xs: '1 1 auto', md: 2 }, width: '100%' }}>
              <StrategyDropdown updateJob={updateJob} currentJob={currentJob} />
            </Box>

            <Box sx={{ flex: { xs: '1 1 auto', md: 1 }, width: '100%' }}>
              <LanguageSelect updateJob={updateJob} currentJob={currentJob} />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            borderLeft: '4px solid',
            borderColor: 'accent.100',
            paddingLeft: '16px',
            width: '100%',
          }}
        >
          <Typography
            sx={{ color: 'neutral.900', fontWeight: 'fontWeightMedium', fontSize: FONT_SIZES.md }}
          >
            {t('deIdentify.settings.detection.title')}
          </Typography>

          <Typography sx={{ color: 'neutral.500', fontSize: FONT_SIZES.sm, mb: '20px' }}>
            {t('deIdentify.settings.detection.subtitle')}
          </Typography>

          <Grid container spacing={2} sx={{ mb: '24px' }}>
            {thresholds.map((threshold) => {
              const isActive =
                Number(currentJob?.wizardState?.configSettings.threshold) === threshold.score;

              return (
                <Grid size={{ xs: 12, md: 6, lg: 12, xl: 4 }} key={threshold.id}>
                  <Box
                    onClick={() => selectThreshold(threshold.score)}
                    sx={{
                      border: `${isActive ? 2 : 1}px solid`,
                      borderColor: (theme) =>
                        isActive ? theme.palette.primary[500] : theme.palette.neutral[200],
                      borderRadius: '12px',
                      backgroundColor: (theme) =>
                        isActive ? theme.palette.primary[50] : theme.palette.common.white,
                      boxShadow: (theme) =>
                        `0px 1px 3px ${alpha(theme.palette.common.black, 0.08)}`,
                      padding: '20px',
                      cursor: 'pointer',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: '24px' }}>
                        {isActive ? (
                          <RadioButtonCheckedOutlinedIcon />
                        ) : (
                          <RadioButtonUncheckedOutlinedIcon sx={{ color: 'neutral.400' }} />
                        )}
                        <Typography
                          sx={{
                            color: 'primary.500',
                            fontWeight: 'fontWeightSemiBold',
                            fontSize: FONT_SIZES.lg,
                          }}
                        >
                          {t(threshold.titleKey)}
                        </Typography>
                      </Box>
                      {threshold.id === 2 && (
                        <Box
                          sx={{
                            padding: '4px 12px',
                            borderRadius: '999px',
                            bgcolor: 'accent.100',
                            color: 'accent.500',
                            border: '1px solid',
                            borderColor: 'accent.500',
                            fontSize: FONT_SIZES.xs,
                            fontWeight: 'fontWeightMedium',
                          }}
                        >
                          {t('deIdentify.settings.detection.recommended')}
                        </Box>
                      )}
                    </Box>
                    <Typography sx={{ color: 'neutral.700', fontSize: FONT_SIZES.md }}>
                      {t(threshold.descKey)}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>

          {currentJob?.wizardState?.configSettings.threshold === 0.5 && (
            <Typography sx={{ color: 'neutral.700', fontSize: FONT_SIZES.md }}>
              {t('deIdentify.settings.detection.recommendedNote')}
            </Typography>
          )}

          <Typography sx={{ color: 'neutral.500', fontSize: FONT_SIZES.xs }}>
            {currentJob?.wizardState?.configSettings.threshold === 0.5 && (
              <>{t('deIdentify.settings.detection.thresholds.balanced.info')}</>
            )}
            {currentJob?.wizardState?.configSettings.threshold === 0.3 && (
              <>{t('deIdentify.settings.detection.thresholds.conservative.info')}</>
            )}
            {currentJob?.wizardState?.configSettings.threshold === 0.7 && (
              <>{t('deIdentify.settings.detection.thresholds.aggressive.info')}</>
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HIPAAConfiguration;
