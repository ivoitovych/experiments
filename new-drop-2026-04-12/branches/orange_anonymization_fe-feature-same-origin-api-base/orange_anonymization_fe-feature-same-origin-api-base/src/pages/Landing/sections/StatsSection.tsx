import { Box, Container, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const STAT_KEYS = ['accuracy', 'identifiers', 'processingTime', 'compliance'] as const;

type StatKey = (typeof STAT_KEYS)[number];

const StatsSection = () => {
  const { t } = useTranslation();

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'center',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            gap: { xs: 4, md: 0 },
          }}
        >
          {STAT_KEYS.map((key: StatKey, index) => (
            <Box key={key} sx={{ display: 'flex', alignItems: 'stretch', flex: 1 }}>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', md: 'flex-start' },
                  px: { md: 5 },
                }}
              >
                <Typography
                  variant="h3"
                  sx={(theme) => ({
                    color: theme.palette.landing.accent,
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    lineHeight: 1.1,
                    mb: 0.75,
                  })}
                >
                  {t(`landing.stats.${key}.value`)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.01em' }}
                >
                  {t(`landing.stats.${key}.label`)}
                </Typography>
              </Box>

              {index < STAT_KEYS.length - 1 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={(theme) => ({
                    borderColor: theme.palette.landing.border,
                    display: { xs: 'none', md: 'block' },
                  })}
                />
              )}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export { StatsSection };
