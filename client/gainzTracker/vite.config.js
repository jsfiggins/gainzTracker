import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './', // This tells Vite to use the current directory as the root
  build: {
    outDir: 'dist' // Specify your build output directory
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
