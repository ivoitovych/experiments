import { useTranslation } from 'react-i18next';
import { Box, Container, Divider, Link, Typography } from '@mui/material';

export function LandingFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth="xl">
        <Divider />
        <Box
          sx={{
            py: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {t('landing.footer.copyright', { year })}
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" variant="body2" color="text.secondary" underline="hover">
              {t('landing.footer.privacy')}
            </Link>
            <Link href="#" variant="body2" color="text.secondary" underline="hover">
              {t('landing.footer.terms')}
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
