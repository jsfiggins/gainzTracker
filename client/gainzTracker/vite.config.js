import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    root: path.resolve(__dirname, 'client/gainzTracker/src'), // Adjust to where your index.html is located
    server: {
      proxy: mode === 'development' ? {
        '/api': {
          target: 'http://localhost:7000',
          changeOrigin: true,
        }
      } : undefined,
    },
    build: {
      outDir: path.resolve(__dirname, 'client/gainzTracker/dist'), // Ensure the build output goes to the correct folder
    }
  };
});
