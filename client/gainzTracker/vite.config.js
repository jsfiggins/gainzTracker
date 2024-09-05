import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: 4173,      // Ensure this matches the port Render expects (you can choose a different port if needed)
    proxy: {
      '/api': {
        target: 'https://gainztracker-uc6w.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
      
  },
});
