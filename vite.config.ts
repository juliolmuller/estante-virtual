import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import rollupAnalyze from 'rollup-plugin-analyzer';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        rollupAnalyze({
          summaryOnly: true,
          limit: 10,
        }),
      ],
    },
  },
  plugins: [vue()],
});
