/**
 * useAuth — convenience hook for reading auth state and dispatching auth actions.
 *
 * Why a custom hook?
 * Components shouldn't import useAppSelector + useAppDispatch + action creators
 * all at once. This hook bundles them so components stay lean:
 *
 *   const { user, isAuthenticated, logout } = useAuth();
 */
import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  logout as logoutAction,
  requestMagicLink,
  verifyMagicLink,
} from '@/store/slices/authSlice';
import { ROUTES } from '@/constants';

export function useAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const isLoading = useAppSelector((s) => s.auth.isLoading);
  const error = useAppSelector((s) => s.auth.error);
  const errorCode = useAppSelector((s) => s.auth.errorCode);
  const magicLinkSent = useAppSelector((s) => s.auth.magicLinkSent);
  const magicLinkEmail = useAppSelector((s) => s.auth.magicLinkEmail);

  const sendMagicLink = useCallback(
    async (email: string) => {
      await dispatch(requestMagicLink(email));
    },
    [dispatch],
  );

  const verifyToken = useCallback(
    async (token: string) => {
      const result = await dispatch(verifyMagicLink(token));
      if (verifyMagicLink.fulfilled.match(result)) {
        // Check for a returnUrl from session expiry redirect
        const returnUrl =
          searchParams.get('returnUrl') ?? localStorage.getItem('returnUrl');
        localStorage.removeItem('returnUrl');

        if (returnUrl && returnUrl.startsWith('/')) {
          void navigate(returnUrl);
        } else {
          void navigate(ROUTES.DASHBOARD);
        }
      }
    },
    [dispatch, navigate, searchParams],
  );

  const logout = useCallback(() => {
    dispatch(logoutAction());
    void navigate(ROUTES.LANDING);
  }, [dispatch, navigate]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    errorCode,
    magicLinkSent,
    magicLinkEmail,
    sendMagicLink,
    verifyToken,
    logout,
  };
}
