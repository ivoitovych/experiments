import { AUTH_TOKEN_KEY, ROUTES } from '@/constants';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TokenPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(AUTH_TOKEN_KEY, token!);
    navigate(ROUTES.DASHBOARD);
  }, [navigate, token]);

  return null;
};

export default TokenPage;
