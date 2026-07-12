import {defineConfig} from 'vite';
import path from 'path';
import fs from 'fs';

// Helper to get all HTML files recursively from root (except node_modules, dist, assets)
function getHtmlFiles(dir: string, files: Record<string, string> = {}): Record<string, string> {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.resolve(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && !file.startsWith('.')) {
        getHtmlFiles(filePath, files);
      }
    } else if (file.endsWith('.html')) {
      const relativePath = path.relative(__dirname, filePath);
      const name = relativePath.replace(/\.html$/, '').replace(/\//g, '-');
      files[name || 'main'] = filePath;
    }
  }
  return files;
}

export default defineConfig(() => {
  const htmlInputs = getHtmlFiles(__dirname);
  
  return {
    build: {
      rollupOptions: {
        input: htmlInputs,
      },
      outDir: 'dist',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
