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
  let refreshing = false;

  // When a new SW takes control after deploy, force a clean reload once.
  navigator.serviceWorker?.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  const updateSW = registerSW({
    immediate: true,
    onRegisteredSW(_swUrl, registration) {
      if (!registration) return;

      const checkForUpdate = () => {
        registration.update().catch(() => undefined);
      };

      checkForUpdate();
      // Check often enough that shared mobile links pick up new deploys quickly.
      window.setInterval(checkForUpdate, 5 * 60 * 1000);
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') checkForUpdate();
      });
      window.addEventListener('focus', checkForUpdate);
      window.addEventListener('online', checkForUpdate);
    },
    onNeedRefresh() {
      // Activate the waiting worker immediately, then reload.
      updateSW(true).catch(() => {
        window.location.reload();
      });
    },
    onOfflineReady() {
      // no-op: keep install quiet
    },
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeToggle />
    <App />
  </StrictMode>
);
