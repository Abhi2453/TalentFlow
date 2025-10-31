import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// ✅ Vite configuration for React + Tailwind + Vercel
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // ✅ Ensures correct paths when deployed on Vercel or static hosts
  base: '/',

  build: {
    outDir: 'dist',
    sourcemap: false, // set true if you need source maps for debugging
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  // ✅ Local dev server configuration
  server: {
    port: 5173,
    open: true,
  },
});
