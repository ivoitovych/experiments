import { Box } from '@mui/material';
import { useLanding } from '@/pages/Landing/useLanding';
import { LandingNav } from '@/pages/Landing/sections/LandingNav';
import { HeroSection } from '@/pages/Landing/sections/HeroSection';
import { StatsSection } from '@/pages/Landing/sections/StatsSection';
import { FeaturesSection } from '@/pages/Landing/sections/FeaturesSection';
import { ComplianceSection } from '@/pages/Landing/sections/ComplianceSection';
import { CtaSection } from '@/pages/Landing/sections/CtaSection';
import { FaqSection } from '@/pages/Landing/sections/FaqSection';
import { LandingFooter } from '@/pages/Landing/sections/LandingFooter';

const Landing = () => {
  const { expandedFaq, handleFaqChange, handleGetStarted, handleScrollToSection } = useLanding();

  return (
    <Box sx={(theme) => ({ bgcolor: theme.palette.landing.bg.hero, minHeight: '100vh' })}>
      <LandingNav onGetStarted={handleGetStarted} onScrollToSection={handleScrollToSection} />
      <HeroSection onGetStarted={handleGetStarted} />
      <StatsSection />
      <FeaturesSection />
      <ComplianceSection />
      <CtaSection onGetStarted={handleGetStarted} />
      <FaqSection expandedFaq={expandedFaq} onFaqChange={handleFaqChange} />
      <LandingFooter />
    </Box>
  );
};

export default Landing;
