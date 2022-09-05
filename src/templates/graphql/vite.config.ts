import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './env',
  plugins: [react(), tsconfigPaths()],
  /* If proxy is needed

  server: {
    proxy: {
      "/api": "localhost:8080"
    }
  },
  */
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      tslib: 'tslib/tslib.es6.js',
    },
  },
});
