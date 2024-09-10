import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      proxy: mode === 'development' ? {
        '/api': {
          target: 'http://localhost:7000', // Backend server during development
          changeOrigin: true,
        }
      } : undefined, // No proxy needed in production
    },
    build: {
      outDir: path.resolve(__dirname, 'client', 'gainzTracker', 'dist'), // Ensure the build output goes to the correct folder
    }
  };
});
