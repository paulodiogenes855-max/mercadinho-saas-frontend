// src/components/RotaPrivada.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function RotaPrivada({ children }) {
    const { usuario } = useContext(AuthContext);

    // Se não existir usuário logado no Firebase, expulsa de volta para o login
    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    // Se estiver tudo certo, renderiza a página
    return children;
}