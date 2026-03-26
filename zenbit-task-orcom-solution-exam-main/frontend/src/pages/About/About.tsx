/**
 * About Page (/about)
 *
 * Full "About Us" page with mission statement, leadership team overview,
 * stats, and investor backing section — matching the Figma design.
 */
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
} from '@mui/material';

const STATS = [
  { value: '2.4M+', labelKey: 'about.stats.documents' },
  { value: '18.7M+', labelKey: 'about.stats.entities' },
  { value: '340+', labelKey: 'about.stats.organizations' },
  { value: '99.9%', labelKey: 'about.stats.compliance' },
] as const;

export default function About() {
  const { t } = useTranslation();

  return (
    <Box>
      {/* Hero / Title */}
      <Box
        sx={{
          pt: { xs: 14, md: 18 },
          pb: { xs: 6, md: 10 },
          bgcolor: 'background.default',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h1" sx={{ mb: 3 }}>
            {t('about.hero.title')}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: '1.15rem', lineHeight: 1.7, maxWidth: 640, mx: 'auto' }}
          >
            {t('about.hero.subtitle')}
          </Typography>
        </Container>
      </Box>

      {/* Investor / backing banner */}
      <Box sx={{ bgcolor: '#EBF3FF', py: { xs: 4, md: 5 } }}>
        <Container maxWidth="md">
          <Typography
            variant="body1"
            align="center"
            sx={{ fontSize: '1.05rem', lineHeight: 1.7 }}
          >
            {t('about.backing')}
          </Typography>
        </Container>
      </Box>

      {/* Mission */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" sx={{ mb: 2 }}>
                {t('about.mission.title')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
                {t('about.mission.description')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {t('about.mission.description2')}
              </Typography>
            </Grid>
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

      {/* Why Us */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" sx={{ mb: 2 }}>
            {t('about.whyUs.title')}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mb: 8, maxWidth: 600, mx: 'auto', fontSize: '1.05rem' }}
          >
            {t('about.whyUs.subtitle')}
          </Typography>
          <Grid container spacing={3}>
            {(['expertise', 'privacy', 'compliance', 'openSource'] as const).map((key) => (
              <Grid item xs={12} sm={6} md={3} key={key}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    textAlign: 'center',
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 3,
                  }}
                >
                  <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5 }}>
                    {t(`about.whyUs.cards.${key}.title`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                    {t(`about.whyUs.cards.${key}.description`)}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
