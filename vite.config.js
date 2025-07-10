import { defineConfig } from 'vite';
import path from 'path';
import { glob } from 'glob';

export default defineConfig({
  base: '/goit-js-hw-10/',
  root: path.resolve(__dirname, 'src'),
  
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      // 1. Явно укажите все HTML-файлы
      input: {
        main: path.resolve(__dirname, './src/index.html'),
        timer: path.resolve(__dirname, 'src/1-timer.html'),
        snackbar: path.resolve(__dirname, 'src/2-snackbar.html'),
      },
      
      // 2. Настройка вывода для разных типов файлов
      output: {
        // Для JS
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        
        // Для CSS
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          // Для изображений и других ресурсов
          return 'assets/media/[name]-[hash][extname]';
        }
      }
    }
  },
  
  server: {
    port: 5173,
    open: '/index.html'
  }
});