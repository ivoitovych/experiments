import { Box, Container } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import StorageIcon from '@mui/icons-material/Storage';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import type { SvgIconComponent } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import {
  LANDING_COLORS,
  LANDING_GRADIENTS,
  LANDING_SIZES,
  SECTION_IDS,
} from '@/pages/Landing/constants';
import { LandingBody, LandingCardTitle, LandingH2, LandingH4 } from '@/pages/Landing/typography';

interface FeatureCard {
  key: string;
  Icon: SvgIconComponent;
  variant: 'gradient' | 'solid';
  flex: number;
}

const ROW_1: FeatureCard[] = [
  {
    key: 'detection',
    Icon: ManageSearchIcon,
    variant: 'gradient',
    flex: LANDING_SIZES.featureCardFlexSmall,
  },
  {
    key: 'synthetic',
    Icon: StorageIcon,
    variant: 'solid',
    flex: LANDING_SIZES.featureCardFlexLargeAlt,
  },
];

const ROW_2: FeatureCard[] = [
  {
    key: 'compliance',
    Icon: AssignmentIcon,
    variant: 'solid',
    flex: LANDING_SIZES.featureCardFlexLarge,
  },
  {
    key: 'privacy',
    Icon: AdminPanelSettingsIcon,
    variant: 'gradient',
    flex: LANDING_SIZES.featureCardFlexSmall,
  },
];

const CARD_BG = {
  gradient: LANDING_GRADIENTS.featureCard,
  solid: LANDING_COLORS.cardSurface,
} as const;

const CARD_BORDER = {
  gradient: 'none',
  solid: `${LANDING_SIZES.cardBorderWidth} ${LANDING_SIZES.cardBorderStyle} ${LANDING_COLORS.cardBorderTeal}`,
} as const;

const FeatureCardItem = ({ card }: { card: FeatureCard }) => {
  const { t } = useTranslation();
  const { key, Icon, variant, flex } = card;

  return (
    <Box
      sx={{
        flex: { xs: '1 1 100%', md: flex },
        minWidth: 0,
        background: CARD_BG[variant],
        border: CARD_BORDER[variant],
        borderRadius: LANDING_SIZES.cardRadius,
        p: LANDING_SIZES.featureCardPadding,
        display: 'flex',
        flexDirection: 'column',
        gap: LANDING_SIZES.featureCardInnerGap,
        height: { md: LANDING_SIZES.featureCardHeight },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <LandingBody>{t(`landing.features.cards.${key}.description`)}</LandingBody>
        <Icon
          sx={{
            color: LANDING_COLORS.iconAccent,
            fontSize: LANDING_SIZES.iconLg,
            flexShrink: 0,
            ml: LANDING_SIZES.featureCardIconMl,
          }}
        />
      </Box>

      <LandingCardTitle sx={{ textTransform: 'capitalize' }}>
        {t(`landing.features.cards.${key}.title`)}
      </LandingCardTitle>
    </Box>
  );
};

const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="section"
      id={SECTION_IDS.solutions}
      sx={{ py: { xs: LANDING_SIZES.sectionPyXs, md: LANDING_SIZES.sectionPyMd } }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            gap: { xs: LANDING_SIZES.featuresHeaderGapXs, md: LANDING_SIZES.featuresHeaderGapMd },
            mb: { xs: LANDING_SIZES.sectionHeaderMbXs, md: LANDING_SIZES.sectionHeaderMbMd },
          }}
        >
          <LandingH2 component="h2" sx={{ maxWidth: { md: LANDING_SIZES.featuresTitleMaxWidth } }}>
            {t('landing.features.title')}
          </LandingH2>
          <LandingH4
            sx={{
              maxWidth: { md: LANDING_SIZES.featuresSubtitleMaxWidth },
              textAlign: { xs: 'left', md: 'right' },
            }}
          >
            {t('landing.features.subtitle')}
          </LandingH4>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: LANDING_SIZES.featuresRowGap }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: LANDING_SIZES.featuresRowGap,
            }}
          >
            {ROW_1.map((card) => (
              <FeatureCardItem key={card.key} card={card} />
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: LANDING_SIZES.featuresRowGap,
            }}
          >
            {ROW_2.map((card) => (
              <FeatureCardItem key={card.key} card={card} />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export { FeaturesSection };
