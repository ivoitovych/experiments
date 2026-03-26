/**
 * HeroSection
 *
 * Full-width hero with gradient background, headline, subtitle, CTAs.
 * Right side shows a code-snippet illustration of what Presidio detects.
 */
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  MenuBook as MenuBookIcon,
  VerifiedUser as VerifiedUserIcon,
} from '@mui/icons-material';
import { ROUTES } from '@/constants';
import { entityColor } from '@/utils';

// Illustrative sample showing Presidio entity highlighting
const SAMPLE_SNIPPET = [
  { text: 'Patient ', highlight: false },
  { text: 'John Carter', highlight: true, type: 'PERSON' },
  { text: ' (DOB: ', highlight: false },
  { text: '03/15/1982', highlight: true, type: 'DATE_TIME' },
  { text: ') was admitted\nwith SSN ', highlight: false },
  { text: '523-45-6789', highlight: true, type: 'US_SSN' },
  { text: '.\nAddress: ', highlight: false },
  { text: '142 Maple Street, Austin TX', highlight: true, type: 'LOCATION' },
  { text: '\nContact: ', highlight: false },
  { text: 'john.carter@email.com', highlight: true, type: 'EMAIL_ADDRESS' },
];

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #EBF3FF 0%, #F0FAF8 100%)',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center">
          {/* ── Left: Text content ────────────────────────────────────── */}
          <Grid item xs={12} md={6}>
            <Chip
              icon={<VerifiedUserIcon />}
              label={t('landing.hero.badge')}
              color="primary"
              variant="outlined"
              sx={{ mb: 3, fontWeight: 600 }}
            />

            <Typography variant="h1" sx={{ mb: 3, maxWidth: 560 }}>
              {t('landing.hero.title')}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 520, fontSize: '1.125rem', lineHeight: 1.7 }}
            >
              {t('landing.hero.subtitle')}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to={ROUTES.LOGIN}
                endIcon={<ArrowForwardIcon />}
              >
                {t('landing.hero.cta.primary')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<MenuBookIcon />}
                href="#features"
              >
                {t('landing.hero.cta.secondary')}
              </Button>
            </Box>
          </Grid>

          {/* ── Right: Code snippet illustration ──────────────────────── */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                bgcolor: '#0F172A',
                borderRadius: 3,
                p: 3,
                border: '1px solid',
                borderColor: '#1E293B',
                maxWidth: 520,
                mx: 'auto',
              }}
            >
              {/* Window chrome */}
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {['#FF5F57', '#FFBD2E', '#28C840'].map((color) => (
                  <Box
                    key={color}
                    sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: color }}
                  />
                ))}
                <Typography variant="caption" color="#64748B" sx={{ ml: 1 }}>
                  {t('landing.hero.codeChrome')}
                </Typography>
              </Box>

              {/* Annotated text */}
              <Typography
                component="pre"
                sx={{
                  fontFamily: '"Fira Code", "Consolas", monospace',
                  fontSize: '0.8rem',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  m: 0,
                }}
              >
                {SAMPLE_SNIPPET.map((span, i) =>
                  span.highlight ? (
                    <Box
                      key={i}
                      component="span"
                      sx={{
                        bgcolor: `${entityColor(span.type ?? '')}33`,
                        color: entityColor(span.type ?? ''),
                        border: `1px solid ${entityColor(span.type ?? '')}66`,
                        borderRadius: '3px',
                        px: '3px',
                        fontWeight: 600,
                      }}
                    >
                      {span.text}
                    </Box>
                  ) : (
                    <Box key={i} component="span" sx={{ color: '#94A3B8' }}>
                      {span.text}
                    </Box>
                  ),
                )}
              </Typography>

              {/* Entity legend */}
              <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {(['PERSON', 'DATE_TIME', 'US_SSN', 'LOCATION', 'EMAIL_ADDRESS'] as const).map(
                  (type) => (
                    <Chip
                      key={type}
                      label={type}
                      size="small"
                      sx={{
                        bgcolor: `${entityColor(type)}22`,
                        color: entityColor(type),
                        border: `1px solid ${entityColor(type)}44`,
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        fontFamily: 'monospace',
                      }}
                    />
                  ),
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
