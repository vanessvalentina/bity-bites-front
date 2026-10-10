import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  // Importaciones absolutas: "@/components/Navbar" en vez de "../components/Navbar"
  // (fuente: documentación de Vite, resolve.alias)
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
