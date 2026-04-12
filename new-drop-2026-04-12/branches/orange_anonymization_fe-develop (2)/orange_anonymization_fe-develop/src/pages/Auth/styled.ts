import { Box, Button, Divider, FormHelperText, OutlinedInput, Typography } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { styled } from '@mui/material/styles';
import { GRADIENTS, SHADOWS } from '@/theme';
import { sizes, fontSizes, lineHeights, paddings } from './constants';

interface SubmitButtonProps {
  isActive?: boolean;
}

export const AuthPageContainer = styled(Box)({
  minHeight: '100vh',
  position: 'relative',
  background: GRADIENTS.authBackground,
});

export const LogoContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(6),
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}));

export const LogoImage = styled('img')({
  width: sizes.logo.width,
  height: sizes.logo.height,
});

export const BrandingContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export const BrandName = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightSemiBold,
  fontSize: fontSizes.large,
  lineHeight: lineHeights.large,
  color: theme.palette.primary.contrastText,
}));

export const BrandTagline = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: fontSizes.xsmall,
  lineHeight: lineHeights.xsmall,
  color: theme.palette.primary.contrastText,
}));

export const AuthFormCard = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: sizes.formCard.topOffset,
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  [theme.breakpoints.up('sm')]: { width: sizes.formCard.width },
  borderRadius: sizes.formCard.borderRadius,
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  boxShadow: SHADOWS.card,
}));

export const FormTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightSemiBold,
  fontSize: fontSizes.large,
  lineHeight: lineHeights.large,
  marginBottom: theme.spacing(1),
  color: theme.palette.text.primary,
}));

export const FormSubtitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: fontSizes.small,
  lineHeight: lineHeights.small,
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

export const FormContainer = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});

export const EmailFieldContainer = styled(Box)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
});

export const FieldLabel = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: fontSizes.xsmall,
  lineHeight: lineHeights.xsmall,
  color: theme.palette.neutral[500],
  backgroundColor: theme.palette.background.paper,
  top: `${sizes.label.topOffset}px`,
  left: `${sizes.label.leftOffset}px`,
  padding: `0 ${sizes.label.paddingX}px`,
  zIndex: sizes.label.zIndex,
}));

export const RequiredAsterisk = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
}));

export const EmailInput = styled(OutlinedInput)(({ theme }) => ({
  height: sizes.input.height,
  borderRadius: sizes.input.borderRadius,
  '& .MuiOutlinedInput-input': {
    padding: `${sizes.input.paddingY}px ${sizes.input.paddingX}px`,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: fontSizes.small,
    lineHeight: lineHeights.small,
    '&::placeholder': {
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: fontSizes.small,
      lineHeight: lineHeights.small,
      color: theme.palette.neutral[400],
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderWidth: sizes.input.borderWidth,
    borderStyle: 'solid',
    borderColor: theme.palette.grey[200],
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[300],
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[300],
  },
  '&.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.error.main,
  },
  '&.Mui-error .MuiOutlinedInput-input': {
    caretColor: theme.palette.error.main,
  },
  '&.Mui-focused .MuiOutlinedInput-input::placeholder': {
    color: theme.palette.grey[900],
  },
}));

export const FieldError = styled(FormHelperText)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: fontSizes.xsmall,
  lineHeight: lineHeights.xsmall,
  color: theme.palette.error.main,
}));

export const ErrorIconContainer = styled(Box)(({ theme }) => ({
  '& svg': {
    width: sizes.icons.sm,
    height: sizes.icons.sm,
    color: theme.palette.error.main,
  },
}));

export const SubmitButton = styled(Button)<SubmitButtonProps>(({ theme, isActive }) => ({
  height: sizes.button.height,
  borderRadius: sizes.button.borderRadius,
  marginTop: theme.spacing(3),
  padding: `${paddings.submitButton.paddingY}px ${paddings.submitButton.paddingX}px`,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: fontSizes.medium,
  lineHeight: lineHeights.medium,
  backgroundColor: isActive ? theme.palette.primary.main : theme.palette.grey[200],
  color: isActive ? theme.palette.primary.contrastText : theme.palette.neutral[400],
  '&:hover': {
    backgroundColor: isActive ? theme.palette.primary.dark : theme.palette.grey[200],
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.neutral[400],
  },
}));

export const BackContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: sizes.backButton.height,
  marginTop: theme.spacing(3),
  cursor: 'pointer',
}));

export const BackIcon = styled('svg')(({ theme }) => ({
  width: sizes.icons.md,
  height: sizes.icons.md,
  fill: theme.palette.neutral[500],
}));

export const BackText = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: fontSizes.small,
  lineHeight: lineHeights.small,
  color: theme.palette.neutral[500],
}));

export const EmailSentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  width: '100%',
});

export const EmailSentIcon = styled(EmailOutlinedIcon)(({ theme }) => ({
  width: sizes.icons.lg,
  height: sizes.icons.lg,
  marginBottom: theme.spacing(3),
  color: theme.palette.accent[500],
}));

export const EmailSentTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightSemiBold,
  fontSize: fontSizes.large,
  lineHeight: lineHeights.large,
  marginBottom: theme.spacing(1),
  color: theme.palette.neutral[900],
}));

export const EmailSentMessage = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: fontSizes.small,
  lineHeight: lineHeights.small,
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.neutral[500],
}));

export const HighlightedEmail = styled('span')(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.neutral[900],
}));

export const EmailSentDivider = styled(Divider)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(3),
  borderColor: theme.palette.divider,
}));

export const EmailSentNotice = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

export const ResendLinkButton = styled(Button)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.primary.main,
  textTransform: 'none',
  padding: 0,
}));

export const BackToSignInButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: theme.spacing(5),
  padding: 0,
  ...theme.typography.body2,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.neutral[500],
  backgroundColor: theme.palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  '& .MuiButton-startIcon': {
    color: theme.palette.neutral[500],
  },
}));
