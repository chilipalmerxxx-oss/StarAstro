import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const localTempDir = resolve(process.cwd(), 'tmp');
mkdirSync(localTempDir, { recursive: true });
process.env.TEMP = localTempDir;
process.env.TMP = localTempDir;
process.env.TMPDIR = localTempDir;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Keep the development server private by default. Use an explicit host
    // locally when LAN testing is intentionally required.
    host: '127.0.0.1',
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/src/data/')) return 'interpretation-data';
          if (id.includes('/src/components/NatalChart.tsx')) return 'natal-chart';
        },
      },
    },
  },
});
