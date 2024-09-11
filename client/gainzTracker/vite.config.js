import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    root: 'client/gainzTracker', // Set root to the folder containing index.html and source files
    server: {
      proxy: mode === 'development' ? {
        '/api': {
          target: 'http://localhost:7000', // Backend server during development
          changeOrigin: true,
        }
      } : undefined, // No proxy needed in production
    },
    build: {
      outDir: 'dist', // Output will be client/gainzTracker/dist
    }
  };
});
