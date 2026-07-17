import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const localTempDir = resolve(process.cwd(), 'tmp');
mkdirSync(localTempDir, { recursive: true });
process.env.TEMP = localTempDir;
process.env.TMP = localTempDir;
process.env.TMPDIR = localTempDir;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // PWA disabled: old service workers were trapping recipients on an outdated shell.
    // Re-enable later only with network-first HTML and no index.html precache.
    VitePWA({
      disable: true,
      injectRegister: false,
      registerType: 'autoUpdate',
      manifest: false,
      workbox: {
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  server: {
    host: true,
    allowedHosts: true,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
