import { useTranslation } from 'react-i18next';
import { Box, Container, Grid, Typography } from '@mui/material';

const STATS = [
  { value: '2.4M+', labelKey: 'landing.about.stats.documents' },
  { value: '18.7M+', labelKey: 'landing.about.stats.entities' },
  { value: '340+', labelKey: 'landing.about.stats.organizations' },
  { value: '99.9%', labelKey: 'landing.about.stats.compliance' },
] as const;

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <Box id="about" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="xl">
        <Grid container spacing={8} alignItems="center">
          {/* Text */}
          <Grid item xs={12} md={6}>
            <Typography variant="h2" sx={{ mb: 2 }}>
              {t('landing.about.title')}
            </Typography>
            <Typography variant="h5" color="text.secondary" fontWeight={400} sx={{ mb: 3 }}>
              {t('landing.about.subtitle')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {t('landing.about.description')}
            </Typography>
          </Grid>

          {/* Stats grid */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {STATS.map((stat) => (
                <Grid item xs={6} key={stat.labelKey}>
                  <Box
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      bgcolor: 'background.default',
                      borderRadius: 3,
                      border: 1,
                      borderColor: 'divider',
                    }}
                  >
                    <Typography variant="h3" fontWeight={800} color="primary.main">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {t(stat.labelKey)}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
