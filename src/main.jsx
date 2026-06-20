// Ficheiro: frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Puxa o nosso CSS estilo Banco Inter!

// IMPORTANTE: Importamos o fornecedor do nosso Contexto de Autenticação
import { AuthProvider } from './contexts/AuthContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* O AuthProvider "abraça" a App, partilhando os dados de login com todas as páginas */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);