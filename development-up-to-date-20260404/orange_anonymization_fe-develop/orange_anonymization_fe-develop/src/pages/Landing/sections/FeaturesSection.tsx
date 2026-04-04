import { Box, Container, Typography } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import StorageIcon from '@mui/icons-material/Storage';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LockIcon from '@mui/icons-material/Lock';
import type { SvgIconComponent } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface FeatureCard {
  key: string;
  Icon: SvgIconComponent;
  highlighted: boolean;
}

const FEATURE_CARDS: FeatureCard[] = [
  { key: 'detection', Icon: ManageSearchIcon, highlighted: false },
  { key: 'synthetic', Icon: StorageIcon, highlighted: false },
  { key: 'compliance', Icon: AssignmentIcon, highlighted: false },
  { key: 'privacy', Icon: LockIcon, highlighted: true },
];

const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="section"
      id="solutions"
      sx={(theme) => ({
        bgcolor: theme.palette.landing.bg.dark,
        py: { xs: 8, md: 10 },
      })}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 3, md: 6 },
            mb: { xs: 6, md: 8 },
          }}
        >
          <Typography
            variant="h3"
            sx={(theme) => ({
              color: theme.palette.common.white,
              fontWeight: theme.typography.fontWeightBold,
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              flex: 1,
              lineHeight: 1.3,
            })}
          >
            {t('landing.features.title')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.55)',
              flex: 1,
              lineHeight: 1.7,
              alignSelf: 'flex-end',
            }}
          >
            {t('landing.features.subtitle')}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2,
          }}
        >
          {FEATURE_CARDS.map(({ key, Icon, highlighted }) => (
            <Box
              key={key}
              sx={(theme) => ({
                bgcolor: highlighted
                  ? theme.palette.landing.bg.cardActive
                  : theme.palette.landing.bg.card,
                border: `1px solid ${highlighted ? theme.palette.landing.accent + '40' : theme.palette.landing.border}`,
                borderRadius: 3,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 180,
                transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
                cursor: 'default',
                '&:hover': {
                  borderColor: theme.palette.landing.accent + '80',
                  transform: 'translateY(-6px)',
                  boxShadow: '0 16px 48px rgba(78, 205, 196, 0.15)',
                },
              })}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: '75%' }}
                >
                  {t(`landing.features.cards.${key}.description`)}
                </Typography>
                <Box
                  sx={(theme) => ({
                    bgcolor: theme.palette.landing.bg.hero,
                    borderRadius: 2,
                    p: 0.75,
                    ml: 2,
                    flexShrink: 0,
                  })}
                >
                  <Icon sx={(theme) => ({ color: theme.palette.landing.accent, fontSize: 20 })} />
                </Box>
              </Box>

              <Typography
                variant="h6"
                sx={(theme) => ({
                  color: theme.palette.common.white,
                  fontWeight: theme.typography.fontWeightBold,
                  mt: 'auto',
                  fontSize: '1rem',
                })}
              >
                {t(`landing.features.cards.${key}.title`)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export { FeaturesSection };
