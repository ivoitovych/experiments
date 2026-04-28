import { Box } from '@mui/material';
import { useLanding } from '@/pages/Landing/useLanding';
import { HeroSection } from '@/pages/Landing/sections/HeroSection';
import { StatsSection } from '@/pages/Landing/sections/StatsSection';
import { FeaturesSection } from '@/pages/Landing/sections/FeaturesSection';
import { ComplianceSection } from '@/pages/Landing/sections/ComplianceSection';
import { CtaSection } from '@/pages/Landing/sections/CtaSection';
import { FaqSection } from '@/pages/Landing/sections/FaqSection';

const Landing = () => {
  const { handleGetStarted } = useLanding();

  return (
    <Box sx={(theme) => ({ bgcolor: theme.palette.primary[800], minHeight: '100vh' })}>
      <HeroSection onGetStarted={handleGetStarted} />
      <StatsSection />
      <FeaturesSection />
      <ComplianceSection />
      <CtaSection onGetStarted={handleGetStarted} />
      <FaqSection />
    </Box>
  );
};

export default Landing;
