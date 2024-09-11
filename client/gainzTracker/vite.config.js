import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    root: 'client/gainzTracker', // This should point to the folder containing index.html
    server: {
      proxy: mode === 'development' ? {
        '/api': {
          target: 'http://localhost:7000', // Backend server during development
          changeOrigin: true,
        }
      } : undefined, // No proxy needed in production
    },
    build: {
      outDir: 'dist', // Output directory for the build files
      rollupOptions: {
        input: 'client/gainzTracker/index.html' // Ensure Rollup knows where the entry point is
      }
    }
  };
});
