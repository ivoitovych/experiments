import { useTranslation } from 'react-i18next';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import {
  VerifiedUser as VerifiedUserIcon,
  Security as SecurityIcon,
  Insights as InsightsIcon,
  CloudDone as CloudDoneIcon,
} from '@mui/icons-material';

const BADGES = [
  {
    icon: <VerifiedUserIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    titleKey: 'landing.trust.hipaa.label',
    descKey: 'landing.trust.hipaa.description',
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
    titleKey: 'landing.trust.gdpr.label',
    descKey: 'landing.trust.gdpr.description',
  },
  {
    icon: <InsightsIcon sx={{ fontSize: 40, color: 'success.main' }} />,
    titleKey: 'landing.trust.accuracy.label',
    descKey: 'landing.trust.accuracy.description',
  },
  {
    icon: <CloudDoneIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
    titleKey: 'landing.trust.uptime.label',
    descKey: 'landing.trust.uptime.description',
  },
] as const;

export function TrustBadges() {
  const { t } = useTranslation();

  return (
    <Box sx={{ py: 4, bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="xl">
        <Typography
          variant="overline"
          color="text.secondary"
          align="center"
          display="block"
          sx={{ mb: 3, letterSpacing: 2 }}
        >
          {t('landing.trust.title')}
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {BADGES.map((badge) => (
            <Grid item xs={12} sm={6} md={3} key={badge.titleKey}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 3,
                  transition: 'box-shadow 0.2s',
                  '&:hover': { boxShadow: 3 },
                }}
              >
                <Box sx={{ mb: 1 }}>{badge.icon}</Box>
                <Typography variant="h6" fontWeight={700}>
                  {t(badge.titleKey)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t(badge.descKey)}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
