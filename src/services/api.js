// Arquivo: frontend/src/services/api.js
import axios from 'axios';
import { auth } from '../config/firebase';

// Cria a instância do Axios apontando para o seu backend no Render
const api = axios.create({
    // URL do backend que acabamos de colocar no ar
    baseURL: 'https://mercadinho-api-vw3q.onrender.com/api'
});

// INTERCEPTOR: O "Segurança" das requisições
// Antes de qualquer chamada (GET, POST) ir para o backend, ele roda essa função:
api.interceptors.request.use(
    async (config) => {
        // Verifica se existe um usuário logado no Firebase neste exato momento
        const usuarioAtual = auth.currentUser;
        
        if (usuarioAtual) {
            // Pega o token de segurança fresquinho e atualizado do Google
            const token = await usuarioAtual.getIdToken();
            
            // Injeta o token no cabeçalho da requisição (padrão Bearer Token)
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;