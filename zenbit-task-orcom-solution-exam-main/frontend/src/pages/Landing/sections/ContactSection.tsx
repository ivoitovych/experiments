/**
 * ContactSection — fully implemented contact form
 *
 * Uses:
 *   - React Hook Form for form state + submission
 *   - Yup for schema validation (all error messages from i18n)
 *   - react-i18next for ALL user-visible strings
 *   - MUI components for the UI
 *
 * The form calls a hypothetical POST /contact endpoint via axios.
 * For this learning project it shows a mock success state.
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Send as SendIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';

// ─── Form field types ─────────────────────────────────────────────────────────
interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  message: string;
}

// ─── Validation schema ────────────────────────────────────────────────────────
// Note: we build the schema inside the component so t() is available.
// The i18n keys match landing.contact.form.validation.* in translation.json.
function buildSchema(t: (key: string) => string) {
  return yup.object({
    firstName: yup.string().required(t('landing.contact.form.validation.firstNameRequired')),
    lastName: yup.string().required(t('landing.contact.form.validation.lastNameRequired')),
    email: yup
      .string()
      .email(t('landing.contact.form.validation.emailInvalid'))
      .required(t('landing.contact.form.validation.emailRequired')),
    organization: yup.string().default(''),
    message: yup
      .string()
      .min(20, t('landing.contact.form.validation.messageMin'))
      .required(t('landing.contact.form.validation.messageRequired')),
  });
}

export function ContactSection() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: yupResolver(buildSchema(t)),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      organization: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setSubmitError(null);
    try {
      // In a real app: await api.post('/contact', data)
      // Simulating an async operation for learning purposes:
      await new Promise<void>((resolve) => setTimeout(resolve, 1200));
      console.warn('[ContactSection] Form submitted (mock):', data);
      setSubmitted(true);
      reset();
    } catch {
      setSubmitError(t('errors.generic'));
    }
  };

  return (
    <Box id="contact" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Box textAlign="center" sx={{ mb: 6 }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            {t('landing.contact.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
            {t('landing.contact.subtitle')}
          </Typography>
        </Box>

        <Paper elevation={0} sx={{ p: { xs: 3, sm: 5 }, border: 1, borderColor: 'divider', borderRadius: 3 }}>
          {submitted ? (
            // ── Success state ──────────────────────────────────────────────
            <Box textAlign="center" py={4}>
              <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                {t('landing.contact.form.success')}
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => setSubmitted(false)}
              >
                {t('common.reset')}
              </Button>
            </Box>
          ) : (
            // ── Form ──────────────────────────────────────────────────────
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              {submitError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {submitError}
                </Alert>
              )}

              <Grid container spacing={2}>
                {/* First Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('landing.contact.form.firstName')}
                    fullWidth
                    required
                    {...register('firstName')}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName?.message}
                  />
                </Grid>

                {/* Last Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('landing.contact.form.lastName')}
                    fullWidth
                    required
                    {...register('lastName')}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName?.message}
                  />
                </Grid>

                {/* Email */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('landing.contact.form.email')}
                    type="email"
                    fullWidth
                    required
                    {...register('email')}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                </Grid>

                {/* Organization */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('landing.contact.form.organization')}
                    fullWidth
                    {...register('organization')}
                    error={Boolean(errors.organization)}
                    helperText={errors.organization?.message}
                  />
                </Grid>

                {/* Message */}
                <Grid item xs={12}>
                  <TextField
                    label={t('landing.contact.form.message')}
                    placeholder={t('landing.contact.form.messagePlaceholder')}
                    fullWidth
                    required
                    multiline
                    rows={5}
                    {...register('message')}
                    error={Boolean(errors.message)}
                    helperText={errors.message?.message}
                  />
                </Grid>

                {/* Submit */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isSubmitting}
                    endIcon={
                      isSubmitting ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <SendIcon />
                      )
                    }
                  >
                    {isSubmitting
                      ? t('landing.contact.form.submitting')
                      : t('landing.contact.form.submit')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
