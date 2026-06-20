// Arquivo: frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Ativa o plugin do React para o Vite
  plugins: [react()],
  
  // Configurações do servidor de desenvolvimento
  server: {
    port: 5173, // Porta padrão do Vite
    host: true, // Permite que a rede local acesse
  }
});