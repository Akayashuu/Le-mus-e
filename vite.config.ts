import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        hmr: true,
        port: 5173,
        proxy: {
            '/.netlify/functions/': {
                target: 'http://localhost:8888',
                changeOrigin: true,
                rewrite: (path) => path.replace('', ''),
            },
        },
    },
});
