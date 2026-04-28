import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { PageLoader } from '@/components/common/PageLoader';
import {
  AUTH_SESSION_MAX_AGE_MS,
  AUTH_SESSION_STARTED_AT_KEY,
  AUTH_TOKEN_KEY,
  ROUTES,
} from '@/constants';
import { logout, selectAuthInitialized, selectIsAuthenticated } from '@/store/auth';
import { useAppDispatch, useAppSelector } from '@/store/store';

const getSessionStatus = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (!token) {
    return { hasToken: false, isExpired: false };
  }

  const sessionStartedAt = localStorage.getItem(AUTH_SESSION_STARTED_AT_KEY);
  const parsedSessionStartedAt = sessionStartedAt ? Number(sessionStartedAt) : NaN;
  const hasValidSessionStart =
    Number.isFinite(parsedSessionStartedAt) && parsedSessionStartedAt > 0;
  const isExpired =
    !hasValidSessionStart || Date.now() - parsedSessionStartedAt >= AUTH_SESSION_MAX_AGE_MS;

  return { hasToken: true, isExpired };
};

export function ProtectedRoute() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const initialized = useAppSelector(selectAuthInitialized);
  const [isSessionExpired, setIsSessionExpired] = useState<boolean | null>(null);

  useEffect(() => {
    const { hasToken, isExpired } = getSessionStatus();

    if (hasToken && isExpired) {
      dispatch(logout());
    }

    const timeoutId = window.setTimeout(() => {
      setIsSessionExpired(hasToken ? isExpired : false);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [dispatch]);

  if (!initialized) {
    return <PageLoader />;
  }

  if (isSessionExpired === null) {
    return <PageLoader />;
  }

  if (isSessionExpired) {
    return <Navigate to={ROUTES.SESSION_EXPIRED} replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}

export const PublicRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const initialized = useAppSelector(selectAuthInitialized);
  const location = useLocation();
  const isVerifyRoute = location.pathname.startsWith(ROUTES.VERIFY_BASE);
  const { hasToken, isExpired } = getSessionStatus();

  if (!initialized) {
    return <PageLoader />;
  }

  if (hasToken && isExpired) {
    return <Navigate to={ROUTES.SESSION_EXPIRED} replace />;
  }

  if (isAuthenticated && !isVerifyRoute) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};
