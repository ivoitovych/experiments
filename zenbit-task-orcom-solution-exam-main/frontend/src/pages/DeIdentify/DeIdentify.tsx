/**
 * DeIdentify Page — 4-step stepper
 *
 * Step 0: SelectFramework — choose HIPAA / GDPR / Custom
 * Step 1: InputText       — paste clinical text
 * Step 2: Settings        — strategy, confidence threshold
 * Step 3: Results         — original vs anonymized, entity table, download
 *
 * State is stored in Redux (deIdentificationSlice) so it persists if the user
 * navigates away and comes back during the same session.
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Slider,
  Step,
  StepLabel,
  Stepper,
  Tab,
  Tabs,
  TextField,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
// Note: Radio/RadioGroup/FormControlLabel/Slider/Select/MenuItem/FormControl/InputLabel
// are kept for Step 0 (framework selector) and custom entity/language selects in Step 2.
import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import { formatScore } from '@/utils';
import { FileUpload } from '@/components/FileUpload';
import { HipaaConfig } from '@/components/HipaaConfig';
import { RiskSliderConfig } from '@/components/RiskSliderConfig';
import { StrategySelect } from '@/components/StrategySelect';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  nextStep,
  prevStep,
  setFramework,
  setInputText,
  updateSettings,
} from '@/store/slices/deIdentificationSlice';
import { createJob, updateJob, runJob } from '@/store/slices/jobsSlice';
import { PRESIDIO_ENTITIES, PRESIDIO_LANGUAGES, ROUTES } from '@/constants';
import type { AnonymizationStrategy, ComplianceFramework } from '@/types';

// Sample clinical text for the "Load Sample" button
const SAMPLE_TEXT = `Patient John Carter (DOB: 03/15/1982) was admitted on 12/10/2023 with chest pain.
SSN: 523-45-6789. Address: 142 Maple Street, Austin TX 78701.
Contact: john.carter@email.com / (512) 555-0147.
Attending physician: Dr. Sarah Mitchell, License TX-MD-98234.
Diagnosis: Acute myocardial infarction. Prescribed atorvastatin 40mg.`;

export default function DeIdentify() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [inputTab, setInputTab] = useState<0 | 1>(0);
  const [isRunning, setIsRunning] = useState(false);

  const {
    currentStep,
    framework,
    hipaaMethod,
    riskLevel,
    inputText,
    uploadedFile,
    settings,
    error,
  } = useAppSelector((s) => s.deIdentification);

  const steps = [
    t('deIdentify.steps.selectFramework'),
    t('deIdentify.steps.inputText'),
    t('deIdentify.steps.settings'),
    t('deIdentify.steps.review'),
  ];

  // ── Step handlers ────────────────────────────────────────────────────────

  const handleRunAnalysis = async () => {
    setIsRunning(true);
    try {
      const createResult = await dispatch(createJob({ framework }));
      if (!createJob.fulfilled.match(createResult)) throw new Error('Failed to create job');
      const job = createResult.payload;

      // Flatten settings to root level — backend reads wizardState.language,
      // wizardState.entities, wizardState.strategy directly (not nested under settings).
      const wizardState = {
        framework,
        inputText,
        hipaaMethod,
        riskLevel,
        language: settings.language,
        entities: settings.entities,
        strategy: settings.strategy,
        minScore: settings.minScore,
        uploadedFile: uploadedFile ? { fileName: uploadedFile.fileName, fileSize: uploadedFile.fileSize, rowCount: uploadedFile.rowCount } : null,
      };
      await dispatch(updateJob({ id: job.id, data: { status: 'configured', wizardState, currentStep: 3 } }));

      // Fire-and-forget: backend runs synchronously but saves status to DB along the way.
      // Processing page polls GET /jobs/:id to observe progress.
      void dispatch(runJob(job.id));
      navigate(`${ROUTES.PROCESSING}/${job.id}`);
    } catch {
      setIsRunning(false);
    }
  };

  // Estimated processing time (mock based on text length)
  const estimatedSeconds = Math.max(15, Math.min(60, Math.ceil(inputText.length / 80)));

  // ── Render steps ─────────────────────────────────────────────────────────

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
              {t('deIdentify.framework.title')}
            </Typography>
            <RadioGroup
              value={framework}
              onChange={(e) => dispatch(setFramework(e.target.value as ComplianceFramework))}
            >
              {(
                [
                  { value: 'hipaa', labelKey: 'deIdentify.framework.hipaa.label', descKey: 'deIdentify.framework.hipaa.description' },
                  { value: 'gdpr', labelKey: 'deIdentify.framework.gdpr.label', descKey: 'deIdentify.framework.gdpr.description' },
                  { value: 'uk_dpi', labelKey: 'deIdentify.framework.uk_dpi.label', descKey: 'deIdentify.framework.uk_dpi.description' },
                  { value: 'swiss_fadp', labelKey: 'deIdentify.framework.swiss_fadp.label', descKey: 'deIdentify.framework.swiss_fadp.description' },
                  { value: 'custom', labelKey: 'deIdentify.framework.custom.label', descKey: 'deIdentify.framework.custom.description' },
                ] as const
              ).map((opt) => (
                <Card
                  key={opt.value}
                  onClick={() => dispatch(setFramework(opt.value))}
                  sx={{
                    mb: 2,
                    cursor: 'pointer',
                    border: 2,
                    borderColor: framework === opt.value ? 'primary.main' : 'divider',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FormControlLabel
                      value={opt.value}
                      control={<Radio />}
                      label=""
                      sx={{ m: 0 }}
                    />
                    <Box>
                      <Typography fontWeight={600}>{t(opt.labelKey)}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t(opt.descKey)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t('deIdentify.input.title')}
            </Typography>
            <Tabs
              value={inputTab}
              onChange={(_, v: 0 | 1) => setInputTab(v)}
              sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label={t('deIdentify.step2.pasteTab')} />
              <Tab label={t('deIdentify.step2.uploadTab')} />
            </Tabs>

            {inputTab === 0 && (
              <Box>
                <Button
                  size="small"
                  sx={{ mb: 2 }}
                  onClick={() => dispatch(setInputText(SAMPLE_TEXT))}
                >
                  {t('deIdentify.input.sampleText')}
                </Button>
                <TextField
                  label={t('deIdentify.input.label')}
                  placeholder={t('deIdentify.input.placeholder')}
                  multiline
                  rows={12}
                  fullWidth
                  value={inputText}
                  onChange={(e) => dispatch(setInputText(e.target.value))}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                  {t('deIdentify.input.characterCount', { count: inputText.length })}
                </Typography>
              </Box>
            )}

            {inputTab === 1 && <FileUpload />}
          </Box>
        );

      case 2:
        return (
          <Box>
            {/* Language + Confidence — common for all frameworks */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>{t('deIdentify.settings.language')}</InputLabel>
                  <Select
                    value={settings.language}
                    label={t('deIdentify.settings.language')}
                    onChange={(e) => dispatch(updateSettings({ language: e.target.value }))}
                  >
                    {PRESIDIO_LANGUAGES.map((l) => (
                      <MenuItem key={l.code} value={l.code}>
                        {l.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {t('deIdentify.settings.confidence')}: {formatScore(settings.minScore)}
                </Typography>
                <Slider
                  value={settings.minScore}
                  min={0}
                  max={1}
                  step={0.05}
                  marks
                  onChange={(_, v) => dispatch(updateSettings({ minScore: v as number }))}
                />
              </Grid>
            </Grid>

            {/* Framework-specific entity + strategy config */}
            {framework === 'hipaa' && <HipaaConfig />}

            {(framework === 'gdpr' || framework === 'uk_dpi' || framework === 'swiss_fadp') && (
              <RiskSliderConfig />
            )}

            {framework === 'custom' && (
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <StrategySelect
                    value={settings.strategy as AnonymizationStrategy}
                    onChange={(s) => dispatch(updateSettings({ strategy: s }))}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                </Grid>
              </Grid>
            )}
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
              {t('deIdentify.review.title')}
            </Typography>

            <Card variant="outlined" sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
                  {t('deIdentify.review.summary')}
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      {t('deIdentify.review.frameworkLabel')}
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {t(`deIdentify.framework.${framework}.label`)}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      {t('deIdentify.review.inputLabel')}
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {uploadedFile
                        ? t('deIdentify.review.uploadedFile', { name: uploadedFile.fileName })
                        : t('deIdentify.review.pastedText', { count: inputText.length })}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="text.secondary">
                      {t('deIdentify.review.entitiesLabel')}
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {t('deIdentify.review.entityCount', { count: settings.entities.length })}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="text.secondary">
                      {t('deIdentify.review.strategyLabel')}
                    </Typography>
                    <Chip label={settings.strategy} size="small" color="primary" variant="outlined" />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="text.secondary">
                      {t('deIdentify.review.estimatedLabel')}
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {t('deIdentify.review.estimatedSeconds', { seconds: estimatedSeconds })}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      {t('deIdentify.review.languageLabel')}
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {settings.language.toUpperCase()}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      {t('deIdentify.review.minScoreLabel')}
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {Math.round(settings.minScore * 100)}%
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
              <Button onClick={() => dispatch(prevStep())} disabled={isRunning}>
                {t('common.back')}
              </Button>
              <Button
                variant="contained"
                size="large"
                startIcon={isRunning ? <CircularProgress size={18} color="inherit" /> : <PlayArrowIcon />}
                disabled={isRunning}
                onClick={() => void handleRunAnalysis()}
                sx={{ px: 4 }}
              >
                {isRunning ? t('deIdentify.review.running') : t('deIdentify.review.runAnalysis')}
              </Button>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      if (inputTab === 0) return inputText.trim().length >= 50;
      if (inputTab === 1) return uploadedFile !== null;
    }
    return true;
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>
          {t('deIdentify.title')}
        </Typography>
        <Typography color="text.secondary">{t('deIdentify.subtitle')}</Typography>
      </Box>

      <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent sx={{ p: 4 }}>
          {renderStep()}
        </CardContent>
      </Card>

      {/* Navigation buttons — only shown for steps 0, 1, 2.
          Step 3 (Review & Run) renders its own Back + Run buttons inside the card. */}
      {currentStep < 3 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            onClick={() => currentStep === 0 ? navigate(ROUTES.DASHBOARD) : dispatch(prevStep())}
          >
            {t('common.back')}
          </Button>
          <Button
            variant="contained"
            disabled={!canProceed()}
            onClick={() => dispatch(nextStep())}
          >
            {t('common.next')}
          </Button>
        </Box>
      )}
    </Box>
  );
}
