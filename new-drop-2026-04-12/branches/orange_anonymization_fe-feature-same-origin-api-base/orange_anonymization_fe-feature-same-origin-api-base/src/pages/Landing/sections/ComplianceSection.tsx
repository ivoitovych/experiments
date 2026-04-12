import { Box, Chip, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface FrameworkConfig {
  key: string;
  chipColor: string;
  featured: boolean;
}

const FRAMEWORKS: FrameworkConfig[] = [
  { key: 'gdpr', chipColor: '#22C55E', featured: false },
  { key: 'hipaa', chipColor: '#4ECDC4', featured: true },
  { key: 'ukDpa', chipColor: '#22C55E', featured: false },
  { key: 'swissDsg', chipColor: '#EF4444', featured: false },
];

const ComplianceSection = () => {
  const { t } = useTranslation();

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h3"
            sx={(theme) => ({
              color: theme.palette.common.white,
              fontWeight: theme.typography.fontWeightBold,
              fontSize: { xs: '1.5rem', md: '2rem' },
              mb: 2,
            })}
          >
            {t('landing.dataIntelligence.title')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.55)',
              maxWidth: 560,
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            {t('landing.dataIntelligence.subtitle')}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            gap: 2,
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={(theme) => ({
              color: theme.palette.common.white,
              fontWeight: theme.typography.fontWeightBold,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
            })}
          >
            {t('landing.complianceFrameworks.title')}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255,255,255,0.5)',
              maxWidth: 360,
              textAlign: { xs: 'left', md: 'right' },
              lineHeight: 1.6,
            }}
          >
            {t('landing.complianceFrameworks.subtitle')}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
            gap: 2,
          }}
        >
          {FRAMEWORKS.map(({ key, chipColor, featured }) => (
            <Box
              key={key}
              sx={(theme) => ({
                bgcolor: theme.palette.landing.bg.card,
                border: `1px solid ${
                  featured ? theme.palette.landing.accent : theme.palette.landing.border
                }`,
                borderRadius: 3,
                p: 2.5,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
                cursor: 'default',
                '&:hover': {
                  borderColor: featured
                    ? theme.palette.landing.accent
                    : theme.palette.landing.accent + '70',
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 40px rgba(78, 205, 196, 0.13)',
                },
              })}
            >
              <Chip
                label={t(`landing.complianceFrameworks.frameworks.${key}.badge`)}
                size="small"
                sx={{
                  alignSelf: 'flex-start',
                  bgcolor: chipColor + '22',
                  color: chipColor,
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  height: 22,
                  border: `1px solid ${chipColor}44`,
                }}
              />
              <Typography
                variant="body2"
                sx={(theme) => ({
                  color: theme.palette.common.white,
                  fontWeight: theme.typography.fontWeightMedium,
                  lineHeight: 1.5,
                  fontSize: '0.875rem',
                })}
              >
                {t(`landing.complianceFrameworks.frameworks.${key}.title`)}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
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
