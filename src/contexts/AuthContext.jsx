// Ficheiro: frontend/src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Criamos o contexto
export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        // O Firebase fica a "escutar". Se o utilizador logar ou deslogar, isto é ativado.
        const unsubscribe = onAuthStateChanged(auth, async (userFirebase) => {
            if (userFirebase) {
                // O utilizador logou! Vamos buscar o Token de Segurança dele
                const token = await userFirebase.getIdToken();
                
                setUsuario({
                    uid: userFirebase.uid,
                    nome: userFirebase.displayName,
                    email: userFirebase.email,
                    fotoUrl: userFirebase.photoURL,
                    token: token
                });
            } else {
                setUsuario(null);
            }
            setCarregando(false); // Terminou de carregar
        });

        // Limpa a "escuta" quando o componente for destruído
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ usuario, carregando }}>
            {!carregando && children}
        </AuthContext.Provider>
    );
}