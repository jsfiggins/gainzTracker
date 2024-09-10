import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Vite should generate the "dist" folder here
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:7000', // Backend server
        changeOrigin: true,
      }
    }
  }
});
