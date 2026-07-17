import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import ThemeToggle from './components/ThemeToggle.tsx';
import './index.css';

if (import.meta.env.DEV) {
  navigator.serviceWorker?.getRegistrations()
    .then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister().catch(() => undefined);
      });
    })
    .catch(() => undefined);
} else {
  registerSW({
    immediate: true,
    onRegisteredSW(_swUrl, registration) {
      if (!registration) return;

      registration.update().catch(() => undefined);
      window.setInterval(() => {
        registration.update().catch(() => undefined);
      }, 60 * 60 * 1000);
    },
    onNeedRefresh() {
      window.location.reload();
    },
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeToggle />
    <App />
  </StrictMode>
);
