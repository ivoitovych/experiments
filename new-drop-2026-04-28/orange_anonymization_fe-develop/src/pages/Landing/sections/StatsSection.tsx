import { Box, Container, Divider } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { LANDING_COLORS, LANDING_SIZES } from '@/pages/Landing/constants';
import { LandingH1, LandingLabel } from '@/pages/Landing/typography';

const STAT_KEYS = ['accuracy', 'identifiers', 'processingTime', 'compliance'] as const;

type StatKey = (typeof STAT_KEYS)[number];

const StatsSection = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="section"
      sx={{ py: { xs: LANDING_SIZES.statsSectionPyXs, md: LANDING_SIZES.statsSectionPyMd } }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: { md: 'space-between' },
            gap: { xs: LANDING_SIZES.statsHeaderGapXs, md: 0 },
            height: { md: LANDING_SIZES.statsHeaderHeight },
          }}
        >
          {STAT_KEYS.map((key: StatKey, index) => {
            const isLast = index === STAT_KEYS.length - 1;
            const showDivider = index < STAT_KEYS.length - 1;
            return (
              <Fragment key={key}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', md: isLast ? 'flex-end' : 'center' },
                    justifyContent: 'center',
                    gap: LANDING_SIZES.statsItemGap,
                  }}
                >
                  <LandingH1 component="p">{t(`landing.stats.${key}.value`)}</LandingH1>
                  <LandingLabel>{t(`landing.stats.${key}.label`)}</LandingLabel>
                </Box>

                {showDivider && (
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      width: LANDING_SIZES.statsDividerWidth,
                      borderColor: LANDING_COLORS.dividerTealSoft,
                      display: { xs: 'none', md: 'block' },
                    }}
                  />
                )}
              </Fragment>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export { StatsSection };
