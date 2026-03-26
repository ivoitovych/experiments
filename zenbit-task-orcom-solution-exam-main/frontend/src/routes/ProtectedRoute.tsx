/**
 * ProtectedRoute
 *
 * Wraps any route that requires authentication.
 * If the user is not authenticated, redirects to /auth/login.
 * The `replace` prop replaces the current history entry so the user
 * can't press Back to get back to a protected page after logout.
 */
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/store';
import { ROUTES } from '@/constants';

export function ProtectedRoute() {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Pass the current path as "from" so it could be used to redirect back after login.
    // NOTE: useAuth().verifyToken currently always navigates to ROUTES.DASHBOARD.
    // To enable redirect-back, read location.state.from in the verify flow.
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Outlet renders the matched child route
  return <Outlet />;
}
