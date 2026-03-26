import { useTranslation } from 'react-i18next';
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import {
  FindInPage as FindInPageIcon,
  Tune as TuneIcon,
  DataObject as DataObjectIcon,
  History as HistoryIcon,
} from '@mui/icons-material';

const FEATURE_CARDS = [
  {
    icon: <FindInPageIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    titleKey: 'landing.features.cards.detection.title',
    descKey: 'landing.features.cards.detection.description',
    gradient: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
  },
  {
    icon: <TuneIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
    titleKey: 'landing.features.cards.anonymization.title',
    descKey: 'landing.features.cards.anonymization.description',
    gradient: 'linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 100%)',
  },
  {
    icon: <DataObjectIcon sx={{ fontSize: 40, color: 'success.main' }} />,
    titleKey: 'landing.features.cards.synthetic.title',
    descKey: 'landing.features.cards.synthetic.description',
    gradient: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
  },
  {
    icon: <HistoryIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
    titleKey: 'landing.features.cards.audit.title',
    descKey: 'landing.features.cards.audit.description',
    gradient: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)',
  },
] as const;

export function FeaturesSection() {
  const { t } = useTranslation();

  return (
    <Box id="features" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="xl">
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            {t('landing.features.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, mx: 'auto', fontSize: '1.1rem' }}>
            {t('landing.features.subtitle')}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {FEATURE_CARDS.map((card) => (
            <Grid item xs={12} sm={6} key={card.titleKey}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: 3,
                      background: card.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5 }}>
                    {t(card.titleKey)}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                    {t(card.descKey)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
