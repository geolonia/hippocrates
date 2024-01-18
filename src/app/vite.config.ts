import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    // 出力ディレクトリの指定
    outDir: path.resolve(process.cwd(), '..', '..', 'dist/app'),
  }
});
