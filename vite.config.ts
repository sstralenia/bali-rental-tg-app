import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    envDir: 'src/env',
    base: mode === 'staging' ? '/bali-rental-tg-app/' : '/',
    plugins: [react()],
    build: {
      outDir: 'public',
    },
  };
})
