import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 👇 IMPORTA test
import { configDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js', // este lo crearemos ahora
    exclude: [...configDefaults.exclude, 'e2e/*'],
  },
})
