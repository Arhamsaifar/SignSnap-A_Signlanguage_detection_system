// vite.config.ts - Minimal version without extra dependencies
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(), // Default React plugin without custom options
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './shared'),
    }
  },
  build: {
    // Optimize chunk size
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split code into smaller chunks
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    // Disable source map for production
    sourcemap: false,
    // Minify CSS
    cssMinify: true,
  },
  // Cache optimization
  server: {
    // Improve file watching
    watch: {
      // Don't watch node_modules
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
  },
  // Enable fast refresh
  optimizeDeps: {
    // Pre-bundle these dependencies
    include: ['react', 'react-dom'],
  }
});