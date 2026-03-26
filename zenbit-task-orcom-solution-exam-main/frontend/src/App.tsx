/**
 * App
 *
 * Root component. Responsibilities:
 * 1. Wrap the app in MUI ThemeProvider (our custom theme)
 * 2. Provide the Redux store via <Provider>
 * 3. Set up React Router <BrowserRouter>
 * 4. Rehydrate auth state from localStorage on mount
 * 5. Render the route tree via <AppRoutes>
 */
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { store } from '@/store/store';
import { loadFromStorage } from '@/store/slices/authSlice';
import { theme } from '@/styles/theme';
import { AppRoutes } from '@/routes';

// Load stored auth token on app start
// This is done here (outside the tree) so it runs before any protected routes
store.dispatch(loadFromStorage());

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline: MUI's normalize/reset CSS — establishes consistent baseline styles */}
        <CssBaseline />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
