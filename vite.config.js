import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    base: '/',
    build: {
      outDir: 'dist',
    },
    server: {
      proxy: {
        '/api/chat': {
          target: 'https://api.groq.com/openai/v1/chat/completions',
          changeOrigin: true,
          rewrite: () => '',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Authorization', `Bearer ${env.GROQ_API_KEY}`);
            });
          },
        },
      },
    },
  }
})
