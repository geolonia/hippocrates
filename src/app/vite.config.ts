import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    // 出力ディレクトリの指定
    outDir: '../../dist',
  }
});
