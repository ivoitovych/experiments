import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { useAppDispatch } from '@/store/store';
import { verifyMagicLink } from '@/store/auth';
import { PageLoader } from '@/components/common/PageLoader';

const TokenPage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const run = async () => {
      try {
        if (!token) {
          navigate(ROUTES.LOGIN, { replace: true });
          return;
        }

        await dispatch(verifyMagicLink(token)).unwrap();

        navigate(ROUTES.DASHBOARD, { replace: true });
      } catch {
        navigate(ROUTES.LOGIN, { replace: true });
      }
    };

    run();
  }, [token, navigate, dispatch]);

  return <PageLoader />;
};

export default TokenPage;
