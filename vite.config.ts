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
      registerType: 'autoUpdate',
      injectRegister: null,
      manifestFilename: 'manifest.webmanifest',
      manifest: {
        name: 'Night One',
        short_name: 'Night One',
        description: 'La nuit ou tout a commence',
        lang: 'fr',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#080810',
        background_color: '#080810',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: [
          'assets/*.{js,css,svg,png,jpg,jpeg,webp,woff,woff2}',
          'icons/*.{svg,png}',
        ],
        globIgnores: ['**/index.html', '**/*.map'],
        navigateFallback: null,
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'night-one-images',
              expiration: {
                maxEntries: 160,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
              cacheableResponse: {
                statuses: [0, 200],
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
