import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';

export interface UseLandingReturn {
  handleGetStarted: () => void;
}

export function useLanding(): UseLandingReturn {
  const navigate = useNavigate();

  const handleGetStarted = (): void => {
    void navigate(ROUTES.LOGIN);
  };

  return { handleGetStarted };
}
