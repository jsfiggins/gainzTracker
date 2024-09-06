import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'client/gainzTracker', // Use this directory as the root for Vite
  build: {
    outDir: '../dist', // Build output directory (relative to root)
    emptyOutDir: true // Clean output directory before building
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:7000', // Adjust if needed
        changeOrigin: true,
      }
    }
  }
});
