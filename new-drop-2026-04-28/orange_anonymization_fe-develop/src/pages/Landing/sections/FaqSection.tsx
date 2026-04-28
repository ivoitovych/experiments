import { Box, Button, Collapse, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LANDING_COLORS,
  LANDING_SIZES,
  LANDING_TRANSITIONS,
  LANDING_TYPOGRAPHY,
  SECTION_IDS,
} from '@/pages/Landing/constants';
import { LandingH2, LandingH4 } from '@/pages/Landing/typography';

const FAQ_KEYS = ['industries', 'customSolutions', 'support', 'implementation'] as const;

type FaqKey = (typeof FAQ_KEYS)[number];

interface FaqItemProps {
  faqKey: FaqKey;
  isExpanded: boolean;
  onClick: () => void;
}

const FaqItem = memo(({ faqKey, isExpanded, onClick }: FaqItemProps) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ borderTop: `1px solid ${LANDING_COLORS.dividerTeal}` }}>
      <Button
        onClick={onClick}
        fullWidth
        sx={{
          px: 0,
          py: LANDING_SIZES.faqButtonPaddingY,
          justifyContent: 'flex-start',
          textTransform: 'none',
          color: isExpanded ? 'white' : LANDING_COLORS.questionWhite,
          fontSize: LANDING_TYPOGRAPHY.label.fontSize,
          fontWeight: LANDING_TYPOGRAPHY.label.fontWeight,
          transition: LANDING_TRANSITIONS.colorQuick,
          '&:hover': {
            bgcolor: 'transparent',
            color: 'white',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            gap: LANDING_SIZES.faqButtonContentGap,
          }}
        >
          <Typography
            sx={{
              flex: 1,
              textAlign: 'left',
            }}
          >
            {t(`landing.faq.items.${faqKey}.question`)}
          </Typography>
          <ExpandMoreIcon
            sx={{
              fontSize: LANDING_SIZES.iconMd,
              color: isExpanded ? 'landing.accent' : LANDING_COLORS.subtleWhite,
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: LANDING_TRANSITIONS.transformQuick,
              flexShrink: 0,
            }}
          />
        </Box>
      </Button>
      <Collapse in={isExpanded}>
        <Box sx={{ pb: LANDING_SIZES.faqCollapsePaddingBottom }}>
          <Typography
            variant="body2"
            sx={{
              color: LANDING_COLORS.subtleWhite,
              lineHeight: LANDING_TYPOGRAPHY.looseLineHeight,
            }}
          >
            {t(`landing.faq.items.${faqKey}.answer`)}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
});

FaqItem.displayName = 'FaqItem';

const FaqSection = () => {
  const { t } = useTranslation();
  const [expandedFaq, setExpandedFaq] = useState<Set<string>>(new Set());

  const handleToggle = (key: FaqKey) => {
    setExpandedFaq((prev) => {
      const updated = new Set(prev);
      if (updated.has(key)) {
        updated.delete(key);
      } else {
        updated.add(key);
      }
      return updated;
    });
  };

  return (
    <Box
      component="section"
      id={SECTION_IDS.contact}
      sx={{ py: { xs: LANDING_SIZES.sectionPyXs, md: LANDING_SIZES.sectionPyMd } }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: LANDING_SIZES.faqHeaderGapXs, md: LANDING_SIZES.faqHeaderGapMd },
            mb: { xs: LANDING_SIZES.sectionHeaderMbXs, md: LANDING_SIZES.sectionHeaderMbMd },
          }}
        >
          <LandingH2 component="h2" sx={{ flex: '0 0 auto' }}>
            {t('landing.faq.title')}
          </LandingH2>
          <LandingH4
            sx={{
              maxWidth: { md: LANDING_SIZES.faqSubtitleMaxWidth },
              textAlign: { xs: 'left', md: 'right' },
              alignSelf: { md: 'flex-end' },
              ml: { md: 'auto' },
            }}
          >
            {t('landing.faq.subtitle')}
          </LandingH4>
        </Box>

        <Box>
          {FAQ_KEYS.map((key: FaqKey) => (
            <FaqItem
              key={key}
              faqKey={key}
              isExpanded={expandedFaq.has(key)}
              onClick={() => handleToggle(key)}
            />
          ))}
          <Box sx={{ borderTop: `1px solid ${LANDING_COLORS.dividerTeal}` }} />
        </Box>
      </Container>
    </Box>
  );
};

export { FaqSection };
