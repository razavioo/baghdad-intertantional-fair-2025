import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/baghdad-intertantional-fair-2025/',
  build: {
    outDir: 'docs',
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
