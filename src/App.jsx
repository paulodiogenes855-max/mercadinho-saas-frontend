import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Componentes Base e Segurança
import LayoutBase from './components/LayoutBase';
import RotaPrivada from './components/RotaPrivada';

// Páginas Públicas
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';

// Páginas Protegidas
import Dashboard from './pages/Dashboard';
import PDV from './pages/PDV';
import Produtos from './pages/Produtos';
import Relatorios from './pages/Relatorios';
import Perfil from './pages/Perfil';

export default function App() {
    return (
        <Router>
            <Routes>
                {/* ============================== */}
                {/* ROTAS PÚBLICAS (Sem login)     */}
                {/* ============================== */}
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* ============================== */}
                {/* ROTAS PROTEGIDAS (Com login)   */}
                {/* ============================== */}
                <Route 
                    path="/dashboard" 
                    element={<RotaPrivada><LayoutBase><Dashboard /></LayoutBase></RotaPrivada>} 
                />
                <Route 
                    path="/pdv" 
                    element={<RotaPrivada><LayoutBase><PDV /></LayoutBase></RotaPrivada>} 
                />
                <Route 
                    path="/produtos" 
                    element={<RotaPrivada><LayoutBase><Produtos /></LayoutBase></RotaPrivada>} 
                />
                <Route 
                    path="/relatorios" 
                    element={<RotaPrivada><LayoutBase><Relatorios /></LayoutBase></RotaPrivada>} 
                />
                <Route 
                    path="/perfil" 
                    element={<RotaPrivada><LayoutBase><Perfil /></LayoutBase></RotaPrivada>} 
                />
            </Routes>
        </Router>
    );
}