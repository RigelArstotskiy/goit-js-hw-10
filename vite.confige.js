import { defineConfig } from 'vite';
import { glob } from 'glob';
import path from 'path';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    root: path.resolve(__dirname, 'src'),
    base: command === 'build' ? '/goit-js-hw-10/' : '/',
    
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      
      // Критически важный блок для копирования всех HTML
      rollupOptions: {
        input: Object.fromEntries(
          // Находим все HTML-файлы в src и подпапках
          glob.sync(path.join(__dirname, 'src', '**/*.html')).map(file => [
            // Имя файла без пути (например: 'about' для about.html)
            path.relative('src', file).replace(/\.html$/, ''),
            // Абсолютный путь к файлу
            file
          ])
        ),
        output: {
          // Сохраняем оригинальные имена HTML-файлов
          entryFileNames: 'assets/js/[name]-[hash].js',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const extType = assetInfo.name.split('.').pop();
            
            // Для HTML сохраняем оригинальную структуру
            if (extType === 'html') {
              const relativePath = path.relative(
                path.join(__dirname, 'src'), 
                assetInfo.source
              );
              return relativePath;
            }
            
            // Для CSS
            if (['css', 'scss'].includes(extType)) {
              return 'assets/css/[name]-[hash][extname]';
            }
            
            // Для остальных ресурсов
            return 'assets/[name]-[hash][extname]';
          }
        }
      }
    },
    
    plugins: [
      injectHTML(),
      FullReload(['src/**/*.html'])
    ],
    
    server: {
      port: 5173,
      open: '/index.html'
    }
  };
});
