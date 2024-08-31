import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: 4173,      // Ensure this matches the port Render expects (you can choose a different port if needed)
    proxy: {
      '/api': {
        target: 'http://localhost:7000', // Update this to match your backend server's address
        changeOrigin: true,
      },
    },
  },
});
