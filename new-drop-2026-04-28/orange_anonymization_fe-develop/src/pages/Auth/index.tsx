import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { InputAdornment } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';
import { useAuthForm } from './useAuthForm';
import { authText } from './constants';
import {
  AuthPageContainer,
  LogoContainer,
  LogoImage,
  BrandingContainer,
  BrandName,
  BrandTagline,
  AuthFormCard,
  FormTitle,
  FormSubtitle,
  FormContainer,
  EmailFieldContainer,
  FieldLabel,
  RequiredAsterisk,
  EmailInput,
  FieldError,
  ErrorIconContainer,
  SubmitButton,
  BackContainer,
  BackIcon,
  BackText,
  EmailSentContainer,
  EmailSentIcon,
  EmailSentTitle,
  EmailSentMessage,
  EmailSentNotice,
  EmailSentDivider,
  ResendLinkButton,
  BackToSignInButton,
  HighlightedEmail,
} from './styled';

const AuthForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    onSubmit,
    clearErrors,
    trigger,
    watch,
  } = useAuthForm();

  const emailValue = watch('email');
  const hasError = !!errors.email;
  const isDisabled = !isValid || isSubmitting;
  const isActive = isValid && !isSubmitting;

  const handleFormSubmit = async (data: { email: string }) => {
    const isSuccess = await onSubmit(data);
    if (isSuccess) {
      setEmailSent(true);
      return;
    }

    setEmailSent(false);
  };

  return (
    <AuthPageContainer>
      <LogoContainer>
        <LogoImage src="/logo.svg" alt={t('auth.branding.name')} />
        <BrandingContainer>
          <BrandName variant="h3">{t('auth.branding.name')}</BrandName>
          <BrandTagline variant="body2">{t('auth.branding.tagline')}</BrandTagline>
        </BrandingContainer>
      </LogoContainer>

      <AuthFormCard>
        {!emailSent ? (
          <>
            <FormTitle variant="h3">{t(authText.title)}</FormTitle>
            <FormSubtitle variant="body2">{t(authText.subtitle)}</FormSubtitle>

            <FormContainer onSubmit={handleSubmit(handleFormSubmit)} noValidate>
              <EmailFieldContainer>
                <FieldLabel>
                  {t(authText.email)}
                  <RequiredAsterisk>*</RequiredAsterisk>
                </FieldLabel>

                <EmailInput
                  {...register('email', { onBlur: () => trigger('email') })}
                  placeholder={t(authText.emailPlaceholder)}
                  fullWidth
                  error={hasError}
                  onFocus={() => clearErrors('email')}
                  endAdornment={
                    hasError && (
                      <InputAdornment position="end">
                        <ErrorIconContainer>
                          <ErrorOutlineIcon />
                        </ErrorIconContainer>
                      </InputAdornment>
                    )
                  }
                />

                {hasError && <FieldError>{t(errors.email?.message || '')}</FieldError>}
              </EmailFieldContainer>

              <SubmitButton type="submit" fullWidth disabled={isDisabled} isActive={isActive}>
                {isSubmitting ? t(authText.submitting) : t(authText.submit)}
              </SubmitButton>
            </FormContainer>

            <BackContainer onClick={() => navigate('/', { replace: true })}>
              <BackIcon as={ArrowBackIcon} fontSize="small" />
              <BackText>{t('auth.back')}</BackText>
            </BackContainer>
          </>
        ) : (
          <EmailSentContainer>
            <EmailSentIcon />
            <EmailSentTitle variant="h5">{t('auth.checkEmail')}</EmailSentTitle>

            <EmailSentMessage variant="body1">
              <Trans
                i18nKey="auth.linkSent"
                components={{ email: <HighlightedEmail /> }}
                values={{ email: emailValue }}
              />
            </EmailSentMessage>

            <EmailSentDivider />

            <EmailSentNotice variant="body2">
              {t('auth.didntReceive')}{' '}
              <ResendLinkButton
                variant="text"
                onClick={() => handleFormSubmit({ email: emailValue })}
              >
                {t('auth.resend')}
              </ResendLinkButton>
            </EmailSentNotice>

            <BackToSignInButton
              startIcon={<ArrowBackIcon />}
              onClick={() => setEmailSent(false)}
              fullWidth
            >
              {t('auth.backToSignIn')}
            </BackToSignInButton>
          </EmailSentContainer>
        )}
      </AuthFormCard>
    </AuthPageContainer>
  );
};

export default AuthForm;
