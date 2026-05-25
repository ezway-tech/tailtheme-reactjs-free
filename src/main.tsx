import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import { APP_TITLE } from '@/config';
import '@/styles/globals.css';
import '@/i18n';

document.title = APP_TITLE;

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Missing root element');
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
