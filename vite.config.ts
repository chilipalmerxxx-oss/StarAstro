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
    VitePWA({
      disable: process.env.NIGHTSTAR_OPEN_DESIGN_BUILD === '1',
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon.svg'],
      manifest: {
        name: 'AstroThème',
        short_name: 'AstroThème',
        description: 'Votre thème astral personnalisé',
        theme_color: '#111111',
        background_color: '#111111',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: 'icons/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'icons/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Keep precache tiny for mobile: heavy images/videos must NOT be installed into the SW.
        globPatterns: ['index.html', 'assets/*.js', 'assets/*.css', 'icons/*.svg', 'manifest.webmanifest'],
        globIgnores: ['**/costar-**', '**/*-4k.*', '**/*.mp4', '**/*.jpg', '**/*.jpeg', '**/*.png'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//, /\.[a-zA-Z0-9]+$/],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'nightstar-pages',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 4,
                maxAgeSeconds: 60 * 60,
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === 'script' || request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'nightstar-assets',
              expiration: {
                maxEntries: 24,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
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
