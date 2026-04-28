export const LANDING_TYPOGRAPHY = {
  h1: {
    fontSize: 48,
    lineHeight: '56px',
    fontWeight: 700,
  },
  h2: {
    fontSize: 36,
    lineHeight: '44px',
    fontWeight: 700,
  },
  h3: {
    fontSize: 24,
    lineHeight: '32px',
    fontWeight: 500,
  },
  h4: {
    fontSize: 18,
    lineHeight: '26px',
    fontWeight: 600,
  },
  cardTitle: {
    fontSize: 24,
    lineHeight: '32px',
    fontWeight: 600,
  },
  body: {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 400,
  },
  label: {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 500,
  },
  chipLabel: {
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 500,
  },
  frameworkTitle: {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 600,
  },
  entityText: {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 500,
  },
  brand: {
    fontSize: 20,
    lineHeight: '28px',
    fontWeight: 600,
  },
  looseLineHeight: 1.7,
  letterSpacingWide: '0.03em',
  letterSpacingNarrow: '0.01em',
} as const;

export const LANDING_COLORS = {
  heading: 'rgba(255, 255, 255, 1)',
  subheading: 'rgba(107, 114, 128, 1)',
  body: 'rgba(156, 163, 175, 1)',
  cardTitle: 'rgba(255, 255, 255, 1)',
  mutedWhite: 'rgba(255, 255, 255, 0.55)',
  subtleWhite: 'rgba(255, 255, 255, 0.5)',
  faintWhite: 'rgba(255, 255, 255, 0.4)',
  ghostWhite: 'rgba(255, 255, 255, 0.35)',
  questionWhite: 'rgba(255, 255, 255, 0.75)',
  cardSurface: 'rgba(15, 33, 61, 1)',
  cardBorder: 'rgba(249, 250, 251, 0.1)',
  cardBorderHover: 'rgba(249, 250, 251, 0.3)',
  cardBorderTeal: 'rgba(102, 217, 200, 0.2)',
  iconAccent: 'rgba(0, 191, 165, 0.7)',
  dividerTealSoft: 'rgba(102, 217, 200, 0.2)',
  dividerTeal: 'rgba(51, 201, 180, 0.3)',
  chipBg: 'rgba(0, 191, 165, 0.6)',
  chipBorder: 'rgba(78, 205, 196, 0.27)',
  chipText: 'rgba(15, 33, 61, 1)',
  accentText: 'rgba(0, 191, 165, 1)',
  maskOpaque: '#fff',
} as const;

export const LANDING_GRADIENTS = {
  featureCard:
    'linear-gradient(119.3deg, rgba(0, 0, 0, 0) 23.34%, rgba(0, 191, 165, 0.2) 96.36%), rgba(21, 45, 84, 0.7)',
  ctaPanel:
    'linear-gradient(0deg, rgba(1, 19, 47, 0.7), rgba(1, 19, 47, 0.7)), linear-gradient(93.94deg, rgba(0, 0, 0, 0) 17.09%, rgba(0, 191, 165, 0.2) 123.06%)',
  ctaPanelBorder:
    'linear-gradient(178.99deg, rgba(102, 217, 200, 0.7) 3.4%, rgba(0, 115, 97, 0.7) 103.5%)',
} as const;

export const LANDING_SHADOWS = {
  frameworkCardHover: '0 0 12.9px 3px rgba(51, 201, 180, 0.2)',
} as const;

export const LANDING_TRANSITIONS = {
  cardHover: 'transform 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out',
  colorFast: 'color 200ms ease-out',
  colorQuick: 'color 150ms ease-in-out',
  transformQuick: 'transform 150ms ease-in-out',
} as const;

export const LANDING_TRANSFORMS = {
  cardHover: 'translateY(-4px) scale(1.06)',
} as const;

export const LANDING_SIZES = {
  primaryCtaWidth: 188,
  primaryCtaHeight: 48,
  cardRadius: '16px',
  iconSm: 16,
  iconMd: 20,
  iconLg: 24,
  featureCardHeight: 170.72,
  featureCardFlexSmall: 486,
  featureCardFlexLarge: 690,
  featureCardFlexLargeAlt: 689,
  frameworkCardMinHeight: 200,
  frameworkCardPaddingX: '24px',
  frameworkCardPaddingY: '20px',
  frameworkCardGap: '12px',
  chipHeight: 24,
  chipBorderRadius: '9999px',
  chipPaddingX: '8px',
  chipPaddingY: '4px',
  complianceSectionPy: '64px',
  complianceTitleMaxWidth: 780,
  complianceSubtitleMaxWidth: 760,
  ctaPanelMaxWidth: 860,
  ctaPanelBlur: '0.9px',
  ctaPanelBorderWidth: '1px',
  ctaSubtitleMaxWidth: 480,
  faqSubtitleMaxWidth: 520,
  heroCtaMarginBottom: 6,
  footerContainerPaddingX: '20px',
  footerContainerGap: 3,
  sectionPyXs: 8,
  sectionPyMd: 10,
  sectionHeaderMbXs: 6,
  sectionHeaderMbMd: 8,
  buttonEndIconMl: '12px',
  cardBorderWidth: '1.25px',
  cardBorderStyle: 'solid',
  heroPtXs: 12,
  heroPtMd: '200px',
  heroPbXs: 18,
  heroPbMd: '340px',
  heroTitleMb: 3,
  heroSubtitleMaxWidth: 480,
  heroSubtitleMb: 5,
  heroBadgesGapXs: 2,
  heroBadgesGapMd: 4,
  heroBadgeIconGap: 0.75,
  featuresHeaderGapXs: 3,
  featuresHeaderGapMd: 6,
  featuresTitleMaxWidth: 560,
  featuresSubtitleMaxWidth: 480,
  featuresRowGap: 2,
  featureCardPadding: '16px',
  featureCardInnerGap: '36px',
  featureCardIconMl: 2,
  complianceInnerPyXs: 6,
  complianceFrameworksHeaderGap: 2,
  complianceFrameworksHeaderMb: 4,
  complianceFrameworksSubtitleMaxWidth: 480,
  complianceGridGap: 2,
  ctaSectionPtXs: 10,
  ctaSectionPtMd: 14,
  ctaSectionPbXs: 16,
  ctaSectionPbMd: 22,
  ctaPanelPaddingY: '32px',
  ctaPanelPaddingXXs: 3,
  ctaPanelPaddingXMd: 5,
  ctaPanelInnerGap: '32px',
  faqHeaderGapXs: 4,
  faqHeaderGapMd: 8,
  faqButtonPaddingY: 2,
  faqButtonContentGap: 1,
  faqCollapsePaddingBottom: 2.5,
  statsSectionPyXs: 6,
  statsSectionPyMd: '96px',
  statsHeaderGapXs: 4,
  statsHeaderHeight: 88,
  statsItemGap: '16px',
  statsDividerWidth: '1px',
  footerPy: 3,
  footerLogoGap: 1,
  footerLogoMb: '12px',
  footerDescriptionMaxWidth: '300px',
} as const;

export const SECTION_IDS = {
  hero: 'hero',
  solutions: 'solutions',
  contact: 'contact',
} as const;

export const LANDING_CLASS_NAMES = {
  frameworkCardTitle: 'framework-card-title',
} as const;
