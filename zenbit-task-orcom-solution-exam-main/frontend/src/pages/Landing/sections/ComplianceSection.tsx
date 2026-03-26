import { useTranslation } from 'react-i18next';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import {
  HealthAndSafety as HealthAndSafetyIcon,
  GppGood as GppGoodIcon,
  Policy as PolicyIcon,
  Verified as VerifiedIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from '@mui/icons-material';

const COMPLIANCE_ITEMS = [
  {
    icon: <HealthAndSafetyIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    titleKey: 'landing.compliance.hipaa.title',
    descKey: 'landing.compliance.hipaa.description',
  },
  {
    icon: <GppGoodIcon sx={{ fontSize: 48, color: 'secondary.main' }} />,
    titleKey: 'landing.compliance.gdpr.title',
    descKey: 'landing.compliance.gdpr.description',
  },
  {
    icon: <PolicyIcon sx={{ fontSize: 48, color: 'success.main' }} />,
    titleKey: 'landing.compliance.hitech.title',
    descKey: 'landing.compliance.hitech.description',
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 48, color: 'info.main' }} />,
    titleKey: 'landing.compliance.uk_dpi.title',
    descKey: 'landing.compliance.uk_dpi.description',
  },
  {
    icon: <AdminPanelSettingsIcon sx={{ fontSize: 48, color: 'warning.main' }} />,
    titleKey: 'landing.compliance.swiss_fadp.title',
    descKey: 'landing.compliance.swiss_fadp.description',
  },
] as const;

export function ComplianceSection() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #0D47A1 0%, #00695C 100%)',
        color: 'white',
      }}
    >
      <Container maxWidth="xl">
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Typography variant="h2" color="white" sx={{ mb: 2 }}>
            {t('landing.compliance.title')}
          </Typography>
          <Typography sx={{ maxWidth: 560, mx: 'auto', opacity: 0.85, fontSize: '1.1rem' }}>
            {t('landing.compliance.subtitle')}
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {COMPLIANCE_ITEMS.map((item) => (
            <Grid item xs={12} md={4} key={item.titleKey}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 3,
                  color: 'white',
                  height: '100%',
                }}
              >
                <Box sx={{ mb: 2 }}>{item.icon}</Box>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5, color: 'white' }}>
                  {t(item.titleKey)}
                </Typography>
                <Typography sx={{ opacity: 0.85, lineHeight: 1.7 }}>
                  {t(item.descKey)}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
