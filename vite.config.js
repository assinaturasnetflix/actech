import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Importe o módulo 'path' do Node.js

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Configuração do alias @ para src/
    },
  },
  // Opcional: Configurações do servidor de desenvolvimento
  server: {
    port: 3000, // Define a porta para o servidor de desenvolvimento
    open: true,   // Abre o navegador automaticamente ao iniciar
  },
  // Opcional: Configurações de build
  build: {
    outDir: 'dist', // Pasta de saída para o build
    // sourcemap: true, // Gera sourcemaps para produção (pode aumentar o tamanho do build)
  }
})
