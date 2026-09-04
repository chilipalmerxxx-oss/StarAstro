import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import AppErrorBoundary from './components/AppErrorBoundary.tsx';
import ThemeToggle from './components/ThemeToggle.tsx';
import './index.css';

const rootEl = document.getElementById('root');

function showBootError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error('[Nightstar boot error]', error);
  if (!rootEl) return;
  const shell = document.createElement('div');
  shell.className = 'boot-error';
  const panel = document.createElement('div');
  const brand = document.createElement('p');
  brand.textContent = 'Nightstar';
  const title = document.createElement('h1');
  title.textContent = "Impossible de démarrer l'app";
  const detail = document.createElement('p');
  detail.textContent = message;
  const retry = document.createElement('button');
  retry.type = 'button';
  retry.textContent = 'Réessayer';
  retry.addEventListener('click', () => window.location.reload());
  panel.append(brand, title, detail, retry);
  shell.append(panel);
  rootEl.replaceChildren(shell);
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

if ('caches' in window) {
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
      <AppErrorBoundary>
        <Suspense fallback={<div className="route-loading" role="status">Chargement…</div>}>
          <App />
        </Suspense>
      </AppErrorBoundary>
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
