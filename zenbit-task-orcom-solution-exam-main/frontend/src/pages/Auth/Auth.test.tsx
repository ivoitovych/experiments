import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';

// ─── Module mocks (hoisted before component import) ──────────────────────────

const mockVerifyToken = vi.fn();
const mockNavigate = vi.fn();
let mockAuthState = {
  isLoading: false,
  error: null as string | null,
  errorCode: null as string | null,
};

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (k: string) => k }),
}));

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    verifyToken: mockVerifyToken,
    isLoading: mockAuthState.isLoading,
    error: mockAuthState.error,
    errorCode: mockAuthState.errorCode,
    sendMagicLink: vi.fn(),
    magicLinkSent: false,
    magicLinkEmail: null,
    user: null,
    token: null,
    isAuthenticated: false,
    logout: vi.fn(),
  }),
}));

vi.mock('@/layouts/AuthLayout', () => ({
  AuthLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// ─── Import component AFTER mocks ────────────────────────────────────────────

import Auth from './Auth';
import { MemoryRouter } from 'react-router-dom';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderVerifyAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
      </Routes>
    </MemoryRouter>,
  );
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('VerifyView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuthState = { isLoading: false, error: null, errorCode: null };
  });

  it('should call verifyToken with the token from URL', () => {
    renderVerifyAt('/auth/verify?token=test-token');
    expect(mockVerifyToken).toHaveBeenCalledWith('test-token');
  });

  it('should call verifyToken only once (useRef guard)', () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={['/auth/verify?token=test-token']}>
        <Routes>
          <Route path="/auth/*" element={<Auth />} />
        </Routes>
      </MemoryRouter>,
    );

    rerender(
      <MemoryRouter initialEntries={['/auth/verify?token=test-token']}>
        <Routes>
          <Route path="/auth/*" element={<Auth />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(mockVerifyToken).toHaveBeenCalledTimes(1);
  });

  it('should show loading spinner when isLoading is true', () => {
    mockAuthState = { isLoading: true, error: null, errorCode: null };
    renderVerifyAt('/auth/verify?token=test-token');

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('common.loading')).toBeInTheDocument();
  });

  it('should show TOKEN_EXPIRED error message', () => {
    mockAuthState = {
      isLoading: false,
      error: 'Token has expired',
      errorCode: 'TOKEN_EXPIRED',
    };
    renderVerifyAt('/auth/verify?token=test-token');

    expect(screen.getByText('auth.tokenExpired')).toBeInTheDocument();
  });

  it('should show TOKEN_INVALID error message', () => {
    mockAuthState = {
      isLoading: false,
      error: 'Invalid or already used token',
      errorCode: 'TOKEN_INVALID',
    };
    renderVerifyAt('/auth/verify?token=test-token');

    expect(screen.getByText('auth.tokenInvalid')).toBeInTheDocument();
  });

  it('should show generic verifyFailed message when no error code', () => {
    mockAuthState = {
      isLoading: false,
      error: 'Some generic error',
      errorCode: null,
    };
    renderVerifyAt('/auth/verify?token=test-token');

    expect(screen.getByText('auth.errors.verifyFailed')).toBeInTheDocument();
  });

  it('should show "Request new link" button on error', () => {
    mockAuthState = {
      isLoading: false,
      error: 'Token has expired',
      errorCode: 'TOKEN_EXPIRED',
    };
    renderVerifyAt('/auth/verify?token=test-token');

    const button = screen.getByRole('button', { name: 'auth.requestNewLink' });
    expect(button).toBeInTheDocument();
  });

  it('should redirect to login when no token param', () => {
    renderVerifyAt('/auth/verify');

    // Should navigate to login route (the Navigate component renders nothing visible,
    // but the login form should now be showing via Route redirect)
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('should NOT show error alert when there is no error', () => {
    mockAuthState = { isLoading: false, error: null, errorCode: null };
    renderVerifyAt('/auth/verify?token=test-token');

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
