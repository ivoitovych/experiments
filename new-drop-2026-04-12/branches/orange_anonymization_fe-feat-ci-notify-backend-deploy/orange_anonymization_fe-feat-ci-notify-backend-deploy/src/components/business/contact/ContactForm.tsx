import { emailService } from '@/services/emailService';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import type { ContactFormValues } from '@/pages/Contact/types';
import { SubmittedState } from './SubmittedState';
import { FONT_SIZES } from '@/constants';

const helperTextStyles = {
  position: 'absolute',
  bottom: '-22px',
  left: 0,
  margin: 0,
  whiteSpace: 'nowrap',
  fontSize: FONT_SIZES.xs,
};

const textFieldStyles = {
  '& .MuiInputBase-input': {
    color: 'common.white',
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px transparent inset',
      WebkitTextFillColor: (theme: import('@mui/material/styles').Theme) =>
        theme.palette.common.white,
      transition: 'background-color 5000s ease-in-out 0s',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'common.white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      backgroundColor: 'whiteOpacity.8',
      borderRadius: 1,
      borderColor: 'neutral.500',
    },
    '&:hover fieldset': {
      borderColor: 'neutral.500',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'common.white',
    },
  },
  '& .MuiOutlinedInput-root.Mui-error fieldset': {
    borderColor: 'error.main',
  },
};

function buildSchema(t: (key: string) => string) {
  return yup.object({
    firstName: yup.string().required(t('landing.contact.form.validation.firstNameRequired')),
    lastName: yup.string().required(t('landing.contact.form.validation.lastNameRequired')),
    email: yup
      .string()
      .email(t('landing.contact.form.validation.emailInvalid'))
      .required(t('landing.contact.form.validation.emailRequired')),
    company: yup.string().default(''),
    message: yup
      .string()
      .min(20, t('landing.contact.form.validation.messageMin'))
      .max(5000)
      .required(t('landing.contact.form.validation.messageRequired')),
  });
}

export const ContactForm = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const schema = useMemo(() => buildSchema(t), [t]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid, touchedFields },
    reset,
  } = useForm<ContactFormValues>({
    resolver: yupResolver(schema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      message: '',
    },
  });

  const messageValue = watch('message') || '';
  const charCount = messageValue.length;

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setSubmitError(null);
    try {
      await emailService.sendContactUsEmail({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        company: data.company,
        message: data.message,
      });
      setSubmitted(true);
      reset();
    } catch {
      setSubmitError(t('errors.generic'));
    }
  };

  return (
    <Grid size={{ xs: 12, md: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          border: 1,
          borderColor: 'greenOpacity',
          borderRadius: 3,
          minHeight: '600px',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'primary.800',
        }}
      >
        {submitted ? (
          <SubmittedState setSubmitted={setSubmitted} />
        ) : (
          <>
            <Typography
              fontWeight="fontWeightSemiBold"
              sx={{ fontSize: FONT_SIZES.xl, color: 'common.white' }}
            >
              {t('landing.contact.form.title')}
            </Typography>
            <Typography sx={{ mb: '40px', fontSize: FONT_SIZES.sm, color: 'neutral.500' }}>
              {t('landing.contact.form.description')}
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              {submitError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {submitError}
                </Alert>
              )}

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ position: 'relative', mb: 1 }}>
                    <TextField
                      id="firstName"
                      label={t('landing.contact.form.firstName')}
                      fullWidth
                      size="medium"
                      {...register('firstName')}
                      error={Boolean(touchedFields.firstName && errors.firstName)}
                      helperText={
                        touchedFields.firstName && errors.firstName ? errors.firstName.message : ''
                      }
                      FormHelperTextProps={{ sx: helperTextStyles }}
                      sx={textFieldStyles}
                    />
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ position: 'relative', mb: 1 }}>
                    <TextField
                      id="lastName"
                      label={t('landing.contact.form.lastName')}
                      fullWidth
                      size="medium"
                      sx={textFieldStyles}
                      {...register('lastName')}
                      error={Boolean(touchedFields.lastName && errors.lastName)}
                      helperText={
                        touchedFields.lastName && errors.lastName ? errors.lastName.message : ''
                      }
                      FormHelperTextProps={{ sx: helperTextStyles }}
                    />
                  </Box>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Box sx={{ mb: 1 }}>
                    <TextField
                      id="company"
                      label={t('landing.contact.form.organization')}
                      fullWidth
                      size="medium"
                      sx={textFieldStyles}
                      {...register('company')}
                    />
                  </Box>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Box sx={{ position: 'relative', mb: 1 }}>
                    <TextField
                      id="email"
                      label={t('landing.contact.form.email')}
                      fullWidth
                      size="medium"
                      sx={textFieldStyles}
                      {...register('email')}
                      error={Boolean(touchedFields.email && errors.email)}
                      helperText={touchedFields.email && errors.email ? errors.email.message : ''}
                      FormHelperTextProps={{ sx: helperTextStyles }}
                    />
                  </Box>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Box sx={{ position: 'relative', mb: 1 }}>
                    <TextField
                      id="message"
                      label={t('landing.contact.form.message')}
                      placeholder={t('landing.contact.form.messagePlaceholder')}
                      fullWidth
                      multiline
                      rows={5}
                      size="medium"
                      sx={textFieldStyles}
                      {...register('message')}
                      error={Boolean(touchedFields.message && errors.message)}
                      helperText={
                        <Box
                          component="span"
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                          }}
                        >
                          <Box component="span" sx={{ position: 'absolute', left: 0 }}>
                            {errors.message?.message || ''}
                          </Box>
                          <Box component="span" sx={{ ml: 'auto', color: 'neutral.400' }}>
                            {charCount.toLocaleString()} / 5,000
                          </Box>
                        </Box>
                      }
                      FormHelperTextProps={{
                        sx: { ...helperTextStyles, right: 0, width: 'auto' },
                      }}
                    />
                  </Box>
                </Grid>

                <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting || !isValid}
                    endIcon={
                      isSubmitting ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <ArrowForwardIcon />
                      )
                    }
                    sx={{
                      px: '24px',
                      py: '12px',
                      textTransform: 'none',
                      fontWeight: 'fontWeightSemiBold',
                      color: 'primary.800',
                      background: (theme) => theme.palette.accent[400],

                      '&:hover': {
                        background: (theme) => theme.palette.accent[500],
                      },
                      '&:disabled': {
                        bgcolor: 'whiteOpacity.8',
                        color: 'whiteOpacity.38',
                        cursor: 'not-allowed',
                        border: 1,
                        borderColor: 'whiteOpacity.38',
                      },
                    }}
                  >
                    {isSubmitting
                      ? t('landing.contact.form.submitting')
                      : t('landing.contact.form.submit')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Paper>
    </Grid>
  );
};
