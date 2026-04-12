import { AUTH_TOKEN_KEY } from '@/constants';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}

export const PublicRoute = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) return <Navigate to="/app" replace />;
  return <Outlet />;
};
