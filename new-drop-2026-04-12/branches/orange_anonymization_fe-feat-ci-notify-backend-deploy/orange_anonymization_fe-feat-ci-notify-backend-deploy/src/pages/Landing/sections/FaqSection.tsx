import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';

const FAQ_KEYS = ['industries', 'customSolutions', 'support', 'implementation'] as const;

type FaqKey = (typeof FAQ_KEYS)[number];

export interface FaqSectionProps {
  expandedFaq: string | false;
  onFaqChange: (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => void;
}

const FaqSection = ({ expandedFaq, onFaqChange }: FaqSectionProps) => {
  const { t } = useTranslation();

  return (
    <Box component="section" id="contact" sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: 8 },
            mb: { xs: 6, md: 8 },
          }}
        >
          <Typography
            variant="h3"
            sx={(theme) => ({
              color: theme.palette.common.white,
              fontWeight: theme.typography.fontWeightBold,
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              flex: '0 0 auto',
            })}
          >
            {t('landing.faq.title')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.7,
              alignSelf: { md: 'flex-end' },
            }}
          >
            {t('landing.faq.subtitle')}
          </Typography>
        </Box>

        <Box>
          {FAQ_KEYS.map((key: FaqKey) => (
            <Accordion
              key={key}
              expanded={expandedFaq === key}
              onChange={onFaqChange(key)}
              disableGutters
              elevation={0}
              sx={(theme) => ({
                bgcolor: 'transparent',
                borderTop: `1px solid ${theme.palette.landing.border}`,
                '&:last-child': {
                  borderBottom: `1px solid ${theme.palette.landing.border}`,
                },
                '&::before': { display: 'none' },
              })}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={(theme) => ({
                      color:
                        expandedFaq === key
                          ? theme.palette.landing.accent
                          : 'rgba(255,255,255,0.5)',
                      fontSize: 20,
                    })}
                  />
                }
                sx={{ px: 0, py: 2 }}
              >
                <Typography
                  variant="body1"
                  sx={(theme) => ({
                    color:
                      expandedFaq === key ? theme.palette.common.white : 'rgba(255,255,255,0.75)',
                    fontWeight: theme.typography.fontWeightMedium,
                  })}
                >
                  {t(`landing.faq.items.${key}.question`)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0, pt: 0, pb: 2.5 }}>
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}
                >
                  {t(`landing.faq.items.${key}.answer`)}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export { FaqSection };
