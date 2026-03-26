/**
 * ErrorBoundary
 *
 * React class component that catches JavaScript errors anywhere in the
 * child component tree. Renders a fallback UI instead of crashing.
 *
 * Why a class component? Error boundaries must be class components —
 * there is no hook equivalent for componentDidCatch / getDerivedStateFromError.
 *
 * The fallback UI is extracted into a separate function component (ErrorFallback)
 * so it can use hooks like useTranslation(), which are forbidden in class bodies.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <SomeComponent />
 *   </ErrorBoundary>
 */
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ErrorOutline as ErrorOutlineIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

// ─── Fallback UI ──────────────────────────────────────────────────────────────
// Extracted as a function component so useTranslation() can be used here.

interface ErrorFallbackProps {
  error: Error | null;
  onReset: () => void;
}

function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      py={8}
    >
      <ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main' }} />
      <Typography variant="h5" fontWeight={600}>
        {t('errors.generic')}
      </Typography>
      {import.meta.env.DEV && error?.message && (
        <Typography color="text.secondary" variant="body2" maxWidth={400} textAlign="center">
          {error.message}
        </Typography>
      )}
      <Button variant="contained" onClick={onReset}>
        {t('errors.tryAgain')}
      </Button>
    </Box>
  );
}

// ─── Error Boundary ───────────────────────────────────────────────────────────

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In production, send to an error tracking service (e.g. Sentry.captureException)
    console.error('Uncaught error:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <ErrorFallback
          error={this.state.error}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}
