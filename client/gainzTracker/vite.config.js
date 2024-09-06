import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root:'../client/gainzTracker',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:7000', // Backend server
        changeOrigin: true,
    
      }
    }
  }
});
