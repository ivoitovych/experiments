/**
 * main.tsx — application entry point
 *
 * Vite's `index.html` has a <script type="module" src="/src/main.tsx"> tag
 * which causes this file to be the first module executed.
 *
 * Order of initialization:
 *  1. Import i18n.ts → configures i18next with HTTP backend
 *  2. React.StrictMode → enables additional development checks
 *  3. App → renders the full component tree
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
// i18n must be imported before any component that calls useTranslation()
import './i18n';
import App from './App';

// Get the <div id="root"> from index.html
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element #root not found in index.html');

ReactDOM.createRoot(rootElement).render(
  // StrictMode renders components twice in development to help surface bugs
  // related to side effects. It has no effect in production.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
