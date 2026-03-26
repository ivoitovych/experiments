/**
 * Contact Page (/contact)
 *
 * Full contact page with contact information cards, a working contact form
 * (React Hook Form + Yup), and an FAQ section — matching the Figma design.
 */
import { useState, useMemo } from 'react';
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
import {
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
} from '@mui/icons-material';

// ─── Form field types ─────────────────────────────────────────────────────────
interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

// ─── Validation schema ────────────────────────────────────────────────────────
function buildSchema(t: (key: string) => string) {
  return yup.object({
    firstName: yup.string().required(t('contact.form.validation.firstNameRequired')),
    lastName: yup.string().required(t('contact.form.validation.lastNameRequired')),
    email: yup
      .string()
      .email(t('contact.form.validation.emailInvalid'))
      .required(t('contact.form.validation.emailRequired')),
    company: yup.string().default(''),
    subject: yup.string().required(t('contact.form.validation.subjectRequired')),
    message: yup
      .string()
      .min(20, t('contact.form.validation.messageMin'))
      .required(t('contact.form.validation.messageRequired')),
  });
}

const CONTACT_INFO = [
  {
    icon: <EmailIcon sx={{ fontSize: 28, color: 'primary.main' }} />,
    titleKey: 'contact.info.email.title',
    lines: ['info@clinicaldatastudio.com', 'support@clinicaldatastudio.com'],
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 28, color: 'primary.main' }} />,
    titleKey: 'contact.info.phone.title',
    linesKeys: ['contact.info.phone.number', 'contact.info.phone.hours'],
  },
  {
    icon: <LocationOnIcon sx={{ fontSize: 28, color: 'primary.main' }} />,
    titleKey: 'contact.info.office.title',
    linesKeys: ['contact.info.office.address1', 'contact.info.office.address2'],
  },
] as const;

const FAQ_ITEMS = [
  { qKey: 'contact.faq.q1', aKey: 'contact.faq.a1' },
  { qKey: 'contact.faq.q2', aKey: 'contact.faq.a2' },
  { qKey: 'contact.faq.q3', aKey: 'contact.faq.a3' },
  { qKey: 'contact.faq.q4', aKey: 'contact.faq.a4' },
] as const;

export default function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const schema = useMemo(() => buildSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setSubmitError(null);
    try {
      // POST /contact — for now mock submission
      await new Promise<void>((resolve) => setTimeout(resolve, 1200));
      console.info('[Contact] Form submitted:', data);
      setSubmitted(true);
      reset();
    } catch {
      setSubmitError(t('errors.generic'));
    }
  };

  return (
    <Box>
      {/* Page title */}
      <Box sx={{ pt: { xs: 14, md: 18 }, pb: { xs: 4, md: 6 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="h1" sx={{ mb: 2 }}>
            {t('contact.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
            {t('contact.subtitle')}
          </Typography>
        </Container>
      </Box>

      {/* Contact Info + Form */}
      <Box sx={{ pb: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Left: Contact info cards */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {CONTACT_INFO.map((info) => (
                  <Paper
                    key={info.titleKey}
                    elevation={0}
                    sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 3 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                      {info.icon}
                      <Typography variant="h6" fontWeight={700}>
                        {t(info.titleKey)}
                      </Typography>
                    </Box>
                    {'lines' in info &&
                      info.lines.map((line) => (
                        <Typography key={line} variant="body2" color="text.secondary">
                          {line}
                        </Typography>
                      ))}
                    {'linesKeys' in info &&
                      info.linesKeys.map((key) => (
                        <Typography key={key} variant="body2" color="text.secondary">
                          {t(key)}
                        </Typography>
                      ))}
                  </Paper>
                ))}
              </Box>
            </Grid>

            {/* Right: Contact form */}
            <Grid item xs={12} md={8}>
              <Paper
                elevation={0}
                sx={{ p: { xs: 3, sm: 5 }, border: 1, borderColor: 'divider', borderRadius: 3 }}
              >
                {submitted ? (
                  <Box textAlign="center" py={4}>
                    <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                    <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                      {t('contact.form.success')}
                    </Typography>
                    <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setSubmitted(false)}>
                      {t('common.reset')}
                    </Button>
                  </Box>
                ) : (
                  <>
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
                      {t('contact.form.heading')}
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                      {submitError && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                          {submitError}
                        </Alert>
                      )}

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label={t('contact.form.firstName')}
                            fullWidth
                            required
                            {...register('firstName')}
                            error={Boolean(errors.firstName)}
                            helperText={errors.firstName?.message}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label={t('contact.form.lastName')}
                            fullWidth
                            required
                            {...register('lastName')}
                            error={Boolean(errors.lastName)}
                            helperText={errors.lastName?.message}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label={t('contact.form.email')}
                            type="email"
                            fullWidth
                            required
                            {...register('email')}
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label={t('contact.form.company')}
                            fullWidth
                            {...register('company')}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label={t('contact.form.subject')}
                            fullWidth
                            required
                            {...register('subject')}
                            error={Boolean(errors.subject)}
                            helperText={errors.subject?.message}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label={t('contact.form.message')}
                            placeholder={t('contact.form.messagePlaceholder')}
                            fullWidth
                            required
                            multiline
                            rows={5}
                            {...register('message')}
                            error={Boolean(errors.message)}
                            helperText={errors.message?.message}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={isSubmitting}
                            endIcon={
                              isSubmitting ? (
                                <CircularProgress size={20} color="inherit" />
                              ) : (
                                <SendIcon />
                              )
                            }
                          >
                            {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" sx={{ mb: 6 }}>
            {t('contact.faq.title')}
          </Typography>
          <Grid container spacing={4}>
            {FAQ_ITEMS.map((item) => (
              <Grid item xs={12} sm={6} key={item.qKey}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                  {t(item.qKey)}
                </Typography>
                <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                  {t(item.aKey)}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
