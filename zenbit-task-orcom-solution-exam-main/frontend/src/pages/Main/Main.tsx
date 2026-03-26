/**
 * Main Page (/)
 *
 * Public landing home page with hero, trust badges, features, and compliance sections.
 */
import { Box } from '@mui/material';
import { HeroSection } from '@/pages/Landing/sections/HeroSection';
import { TrustBadges } from '@/pages/Landing/sections/TrustBadges';
import { FeaturesSection } from '@/pages/Landing/sections/FeaturesSection';
import { ComplianceSection } from '@/pages/Landing/sections/ComplianceSection';

export default function Main() {
  return (
    <Box>
      <HeroSection />
      <TrustBadges />
      <FeaturesSection />
      <ComplianceSection />
    </Box>
  );
}
