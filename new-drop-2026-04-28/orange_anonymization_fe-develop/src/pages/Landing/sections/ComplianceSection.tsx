import { Box, Chip, Container, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  LANDING_CLASS_NAMES,
  LANDING_COLORS,
  LANDING_SHADOWS,
  LANDING_SIZES,
  LANDING_TRANSITIONS,
  LANDING_TRANSFORMS,
  LANDING_TYPOGRAPHY,
} from '@/pages/Landing/constants';
import { LandingH1, LandingH2, LandingH3, LandingH4 } from '@/pages/Landing/typography';

const FRAMEWORK_KEYS = ['gdpr', 'hipaa', 'ukDpa', 'swissDsg'] as const;

const ComplianceSection = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="section"
      sx={{ py: { xs: LANDING_SIZES.sectionPyXs, md: LANDING_SIZES.sectionPyMd } }}
    >
      <Container maxWidth="lg">
        <Divider
          sx={{
            borderColor: LANDING_COLORS.dividerTeal,
            borderBottomWidth: '1px',
          }}
        />
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: LANDING_SIZES.complianceInnerPyXs, md: LANDING_SIZES.complianceSectionPy },
            mb: { xs: LANDING_SIZES.sectionHeaderMbXs, md: LANDING_SIZES.sectionHeaderMbMd },
          }}
        >
          <LandingH1
            component="h2"
            sx={{ maxWidth: { md: LANDING_SIZES.complianceTitleMaxWidth }, mx: 'auto', mb: 2 }}
          >
            {t('landing.dataIntelligence.title')}
          </LandingH1>
          <LandingH3
            sx={{
              maxWidth: LANDING_SIZES.complianceSubtitleMaxWidth,
              mx: 'auto',
              textAlign: 'center',
            }}
          >
            {t('landing.dataIntelligence.subtitle')}
          </LandingH3>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            gap: LANDING_SIZES.complianceFrameworksHeaderGap,
            mb: LANDING_SIZES.complianceFrameworksHeaderMb,
          }}
        >
          <LandingH2 component="h3">{t('landing.complianceFrameworks.title')}</LandingH2>
          <LandingH4
            sx={{
              maxWidth: { md: LANDING_SIZES.complianceFrameworksSubtitleMaxWidth },
              textAlign: { xs: 'left', md: 'right' },
            }}
          >
            {t('landing.complianceFrameworks.subtitle')}
          </LandingH4>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
            gap: LANDING_SIZES.complianceGridGap,
            alignItems: 'start',
          }}
        >
          {FRAMEWORK_KEYS.map((key) => (
            <Box
              key={key}
              sx={{
                bgcolor: LANDING_COLORS.cardSurface,
                border: `1px solid ${LANDING_COLORS.cardBorder}`,
                borderRadius: LANDING_SIZES.cardRadius,
                pt: LANDING_SIZES.frameworkCardPaddingY,
                pb: LANDING_SIZES.frameworkCardPaddingY,
                pl: LANDING_SIZES.frameworkCardPaddingX,
                pr: LANDING_SIZES.frameworkCardPaddingX,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: LANDING_SIZES.frameworkCardGap,
                minHeight: LANDING_SIZES.frameworkCardMinHeight,
                transformOrigin: 'center',
                willChange: 'transform',
                transition: LANDING_TRANSITIONS.cardHover,
                cursor: 'default',
                [`& .${LANDING_CLASS_NAMES.frameworkCardTitle}`]: {
                  color: LANDING_COLORS.cardTitle,
                  fontSize: LANDING_TYPOGRAPHY.frameworkTitle.fontSize,
                  lineHeight: LANDING_TYPOGRAPHY.frameworkTitle.lineHeight,
                  fontWeight: LANDING_TYPOGRAPHY.frameworkTitle.fontWeight,
                  transition: LANDING_TRANSITIONS.colorFast,
                },
                '&:hover': {
                  transform: LANDING_TRANSFORMS.cardHover,
                  borderColor: 'transparent',
                  boxShadow: LANDING_SHADOWS.frameworkCardHover,
                  zIndex: 1,
                  [`& .${LANDING_CLASS_NAMES.frameworkCardTitle}`]: {
                    color: LANDING_COLORS.accentText,
                  },
                },
              }}
            >
              <Chip
                label={t(`landing.complianceFrameworks.frameworks.${key}.badge`)}
                size="small"
                sx={{
                  alignSelf: 'flex-end',
                  height: LANDING_SIZES.chipHeight,
                  borderRadius: LANDING_SIZES.chipBorderRadius,
                  px: LANDING_SIZES.chipPaddingX,
                  py: LANDING_SIZES.chipPaddingY,
                  bgcolor: LANDING_COLORS.chipBg,
                  color: LANDING_COLORS.chipText,
                  fontWeight: LANDING_TYPOGRAPHY.chipLabel.fontWeight,
                  fontSize: LANDING_TYPOGRAPHY.chipLabel.fontSize,
                  lineHeight: LANDING_TYPOGRAPHY.chipLabel.lineHeight,
                  border: `1px solid ${LANDING_COLORS.chipBorder}`,
                  '& .MuiChip-label': {
                    px: 0,
                  },
                }}
              />
              <Typography className={LANDING_CLASS_NAMES.frameworkCardTitle}>
                {t(`landing.complianceFrameworks.frameworks.${key}.title`)}
              </Typography>
              <Typography
                component="span"
                sx={{
                  color: LANDING_COLORS.body,
                  fontSize: LANDING_TYPOGRAPHY.entityText.fontSize,
                  lineHeight: LANDING_TYPOGRAPHY.entityText.lineHeight,
                  fontWeight: LANDING_TYPOGRAPHY.entityText.fontWeight,
                }}
              >
                {t(`landing.complianceFrameworks.frameworks.${key}.entities`)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export { ComplianceSection };
