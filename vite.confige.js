import { defineConfig } from 'vite';
import { glob } from 'glob';
import path from 'path';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    root: path.resolve(__dirname, 'src'), // Корень - папка src
    base: command === 'build' ? '/goit-js-hw-10/' : './', // Базовый путь
    
    build: {
      sourcemap: true,
      outDir: '../dist',
      emptyOutDir: true,
      
      rollupOptions: {
        input: glob.sync(path.resolve(__dirname, 'src', '*.html')),
        output: {
          assetFileNames: assetInfo => {
            if (/\.(css|scss)$/.test(assetInfo.name)) {
              return 'assets/css/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          }
        }
      }
    },
    
    server: {
      port: 5173,
      open: '/index.html' // Открывать index.html при запуске
    },
    
    plugins: [
      injectHTML(),
      FullReload(['src/**/*.html']),
    ]
  };
});
