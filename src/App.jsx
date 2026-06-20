// Ficheiro: frontend/src/App.jsx
import Cadastro from './pages/Cadastro';
import RotaPrivada from './components/RotaPrivada';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LayoutBase from './components/LayoutBase';

import Login from './pages/Login';
import PDV from './pages/PDV';
import Produtos from './pages/Produtos';
import Dashboard from './pages/Dashboard';
import Relatorios from './pages/Relatorios';
import Perfil from './pages/Perfil'; // <-- Importado!

export default function App() {
    return (
        <Router>
            <Routes>
                {/* Rota Pública */}
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/cadastro" element={<Cadastro />} />
                {/* Rotas Protegidas (Dentro do LayoutBase) */}
                <Route path="/dashboard" element={<LayoutBase><Dashboard /></LayoutBase>} />
                <Route path="/pdv" element={<LayoutBase><PDV /></LayoutBase>} />
                <Route path="/produtos" element={<LayoutBase><Produtos /></LayoutBase>} />
                <Route path="/relatorios" element={<LayoutBase><Relatorios /></LayoutBase>} />
                <Route path="/perfil" element={<LayoutBase><Perfil /></LayoutBase>} />
            </Routes>
        </Router>
    );
}
<Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Navigate to="/login" replace />} />
    
    {/* Rotas Protegidas - Agora só entra se estiver logado! */}
    <Route path="/dashboard" element={<RotaPrivada><LayoutBase><Dashboard /></LayoutBase></RotaPrivada>} />
    <Route path="/pdv" element={<RotaPrivada><LayoutBase><PDV /></LayoutBase></RotaPrivada>} />
    <Route path="/produtos" element={<RotaPrivada><LayoutBase><Produtos /></LayoutBase></RotaPrivada>} />
    <Route path="/relatorios" element={<RotaPrivada><LayoutBase><Relatorios /></LayoutBase></RotaPrivada>} />
    <Route path="/perfil" element={<RotaPrivada><LayoutBase><Perfil /></LayoutBase></RotaPrivada>} />
</Routes>