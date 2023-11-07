import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()
  ],
  rollupOptions: {
    external: ['react', 'react-router', 'react-router-dom'],
    output: {
      globals: {
        react: 'React',
      }
    }
  }
})
