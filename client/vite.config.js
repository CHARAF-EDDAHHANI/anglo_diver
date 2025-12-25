import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Export the configuration to attach frontend to backend server communication
export default defineConfig({
  plugins: [react()], 


  server: {
    hmr: true,
    port: 5173, 
    strictPort: true, 
    host: 'localhost', 
    open: true, 
    cors: true, 
    proxy: {
      '/api': {
        target: 'http://localhost:5000', 
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },

    watch: {
      usePolling: true, 
      interval: 100, 
      ignored: ['**/node_modules/**', '**/.git/**'], 
      persistent: true, 
      followSymlinks: true, 
    },
  },
});