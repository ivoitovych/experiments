import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';

export interface UseLandingReturn {
  expandedFaq: string | false;
  handleFaqChange: (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => void;
  handleGetStarted: () => void;
  handleScrollToSection: (id: string) => void;
}

export function useLanding(): UseLandingReturn {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<string | false>(false);

  const handleFaqChange =
    (panel: string) =>
    (_event: SyntheticEvent, isExpanded: boolean): void => {
      setExpandedFaq(isExpanded ? panel : false);
    };

  const handleGetStarted = (): void => {
    void navigate(ROUTES.LOGIN);
  };

  const handleScrollToSection = (id: string): void => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return { expandedFaq, handleFaqChange, handleGetStarted, handleScrollToSection };
}
