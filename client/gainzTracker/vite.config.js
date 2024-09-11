import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    root: 'client/gainzTracker', // This should point to where your index.html is
    server: {
      proxy: mode === 'development' ? {
        '/api': {
          target: 'http://localhost:7000',
          changeOrigin: true,
        }
      } : undefined,
    },
    build: {
      outDir: 'dist', // Outputs to client/gainzTracker/dist
      rollupOptions: {
        input: 'client/gainzTracker/index.html', // This ensures Rollup knows where the entry point is
      },
    },
  };
});
