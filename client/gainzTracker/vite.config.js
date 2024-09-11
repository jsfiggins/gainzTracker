import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    root: 'client/gainzTracker/dist', // Use a simple relative path to the root folder
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
