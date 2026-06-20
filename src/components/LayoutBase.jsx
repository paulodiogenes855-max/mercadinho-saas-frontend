// Arquivo: frontend/src/components/LayoutBase.jsx
import React from 'react';
import { Home, ShoppingCart, Package, BarChart2 } from 'lucide-react';
import '../index.css';

// No futuro, isso virá do AuthContext (Firebase)
const usuarioMock = {
    nome: "Thaís Almeida",
    loja: "Mercadinho Central",
    // Uma foto genérica do Google só para visualização inicial
    fotoUrl: "https://lh3.googleusercontent.com/a/default-user=s120-c" 
};

export default function LayoutBase({ children }) {
    // Função simples para simular qual botão do menu está ativo
    const rotaAtual = window.location.pathname;

    return (
        <div className="app-layout">
            {/* PAINEL SUPERIOR */}
            <header className="header-superior">
                <div className="header-info">
                    <h1>Olá, {usuarioMock.nome.split(' ')[0]}</h1>
                    <p>{usuarioMock.loja}</p>
                </div>
                <img 
                    src={usuarioMock.fotoUrl} 
                    alt="Perfil do Google" 
                    className="foto-perfil"
                />
            </header>

            {/* CONTEÚDO CENTRAL (Dinâmico, muda conforme a tela) */}
            <main className="conteudo-principal">
                {children}
            </main>

            {/* MENU INFERIOR HORIZONTAL */}
            <nav className="menu-inferior">
                <a href="/dashboard" className={`item-menu ${rotaAtual === '/dashboard' ? 'ativo' : ''}`}>
                    <Home size={24} />
                    <span>Início</span>
                </a>
                
                <a href="/pdv" className={`item-menu ${rotaAtual === '/pdv' ? 'ativo' : ''}`}>
                    <ShoppingCart size={24} />
                    <span>Vender</span>
                </a>
                
                <a href="/produtos" className={`item-menu ${rotaAtual === '/produtos' ? 'ativo' : ''}`}>
                    <Package size={24} />
                    <span>Estoque</span>
                </a>
                
                <a href="/relatorios" className={`item-menu ${rotaAtual === '/relatorios' ? 'ativo' : ''}`}>
                    <BarChart2 size={24} />
                    <span>Gestão</span>
                </a>
            </nav>
        </div>
    );
}