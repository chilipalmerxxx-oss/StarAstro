import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ThemeToggle from './components/ThemeToggle.tsx';
import './index.css';

const rootEl = document.getElementById('root');

function showBootError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error('[Nightstar boot error]', error);
  if (!rootEl) return;
  rootEl.innerHTML = `
    <div style="min-height:100svh;display:grid;place-items:center;padding:24px;background:#050608;color:#f4efe6;font-family:system-ui,sans-serif;text-align:center;">
      <div style="max-width:28rem;">
        <p style="margin:0 0 8px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;opacity:.55;">Nightstar</p>
        <h1 style="margin:0 0 12px;font-size:1.35rem;font-weight:600;">Impossible de démarrer l'app</h1>
        <p style="margin:0 0 18px;line-height:1.5;opacity:.78;">${message}</p>
        <button type="button" onclick="location.reload()" style="appearance:none;border:0;border-radius:999px;padding:12px 18px;background:linear-gradient(180deg,#ffe8bc,#d9a84e);color:#1a140f;font-weight:700;">
          Réessayer
        </button>
      </div>
    </div>
  `;
}

// Always remove leftover service workers from previous deploys.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister().catch(() => undefined);
      });
    })
    .catch(() => undefined);
}

if (window.caches?.keys) {
  caches
    .keys()
    .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
    .catch(() => undefined);
}

try {
  if (!rootEl) {
    throw new Error('Élément #root introuvable');
  }

  createRoot(rootEl).render(
    <StrictMode>
      <ThemeToggle />
      <App />
    </StrictMode>
  );
} catch (error) {
  showBootError(error);
}

window.addEventListener('error', (event) => {
  if (rootEl && rootEl.childElementCount === 0) {
    showBootError(event.error || event.message);
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (rootEl && rootEl.childElementCount === 0) {
    showBootError(event.reason);
  }
});
