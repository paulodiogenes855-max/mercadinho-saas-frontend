// Ficheiro: frontend/src/pages/Login/index.jsx
import React, { useState } from 'react';
import { Store, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Importamos a magia do Firebase (Agora com signInWithEmailAndPassword adicionado!)
import { auth, googleProvider } from '../../config/firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

// O Ícone do Google em SVG direto no código
const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
  </svg>
);

export default function Login() {
    const navigate = useNavigate();
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    
    // NOVOS ESTADOS: Para capturar o que o utilizador escreve
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    // FUNÇÃO ATUALIZADA: Agora faz a verificação real no banco de dados!
    const fazerLoginManual = async (e) => {
        e.preventDefault();
        setCarregando(true);
        setErro('');
        
        try {
            // Tenta validar as credenciais no Firebase
            await signInWithEmailAndPassword(auth, email, senha);
            
            console.log("Sucesso! O utilizador entrou com E-mail e Palavra-Passe.");
            navigate('/dashboard'); 
            
        } catch (error) {
            console.error("Erro no login manual:", error);
            setErro('E-mail ou palavra-passe incorretos. Tente novamente.');
        } finally {
            setCarregando(false);
        }
    };

    const fazerLoginComGoogle = async () => {
        setCarregando(true);
        setErro('');
        
        try {
            const resultado = await signInWithPopup(auth, googleProvider);
            const usuario = resultado.user;
            
            console.log("Sucesso! O Firebase logou o utilizador:", usuario.displayName);
            navigate('/dashboard');
            
        } catch (error) {
            console.error("Erro no login com Google:", error);
            setErro('Falha ao conectar com o Google. Verifique a sua ligação.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.logoContainer}>
                    <div style={styles.iconeFundo}>
                        <Store size={32} color="#FFF" />
                    </div>
                    <h1 style={styles.titulo}>Meu Mercadinho</h1>
                    <p style={styles.subtitulo}>Gestão e PDV Inteligente</p>
                </div>

                {erro && <div style={styles.alertaErro}>{erro}</div>}

                <form style={styles.formulario} onSubmit={fazerLoginManual}>
                    <div style={styles.inputGroup}>
                        <Mail size={20} color="#7A7A7A" />
                        <input 
                            type="email" 
                            placeholder="O seu e-mail" 
                            style={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <Lock size={20} color="#7A7A7A" />
                        <input 
                            type="password" 
                            placeholder="A sua palavra-passe" 
                            style={styles.input}
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" style={styles.btnPrimario} disabled={carregando}>
                        {carregando ? 'A entrar...' : 'Entrar com Senha'}
                    </button>
                </form>

                <div style={styles.divisorContainer}>
                    <span style={styles.linha}></span>
                    <span style={styles.textoDivisor}>ou acesso rápido</span>
                    <span style={styles.linha}></span>
                </div>

                <button 
                    style={{...styles.btnGoogle, opacity: carregando ? 0.7 : 1}} 
                    type="button"
                    onClick={fazerLoginComGoogle}
                    disabled={carregando}
                >
                    <GoogleIcon />
                    {carregando ? 'A conectar...' : 'Continuar com o Google'}
                </button>

                <div style={styles.rodape}>
                    <p>
                        Ainda não tem uma conta?{' '}
                        <span 
                            onClick={() => navigate('/cadastro')} 
                            style={{...styles.link, cursor: 'pointer'}}
                        >
                            Criar loja
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#F5F6F8',
        padding: '20px',
    },
    card: {
        backgroundColor: '#FFF',
        padding: '40px 30px',
        borderRadius: '24px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '10px',
    },
    iconeFundo: {
        backgroundColor: '#FF7A00',
        width: '64px',
        height: '64px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '15px',
        boxShadow: '0 4px 12px rgba(255, 122, 0, 0.3)',
    },
    titulo: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#333',
    },
    subtitulo: {
        fontSize: '0.9rem',
        color: '#7A7A7A',
    },
    alertaErro: {
        backgroundColor: '#FFEBEE',
        color: '#D32F2F',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '0.85rem',
        textAlign: 'center',
        fontWeight: '600',
    },
    formulario: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    inputGroup: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#F5F6F8',
        borderRadius: '12px',
        padding: '0 15px',
        height: '50px',
        border: '1px solid transparent',
        transition: 'border 0.2s',
    },
    input: {
        border: 'none',
        backgroundColor: 'transparent',
        outline: 'none',
        width: '100%',
        marginLeft: '10px',
        fontSize: '1rem',
        color: '#333',
    },
    btnPrimario: {
        backgroundColor: '#FF7A00',
        color: '#FFF',
        border: 'none',
        borderRadius: '12px',
        height: '50px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '10px',
        boxShadow: '0 4px 12px rgba(255, 122, 0, 0.2)',
    },
    divisorContainer: {
        display: 'flex',
        alignItems: 'center',
        margin: '10px 0',
    },
    linha: {
        flex: 1,
        height: '1px',
        backgroundColor: '#E0E0E0',
    },
    textoDivisor: {
        margin: '0 15px',
        color: '#A0A0A0',
        fontSize: '0.85rem',
    },
    btnGoogle: {
        backgroundColor: '#FFF',
        color: '#333',
        border: '1px solid #E0E0E0',
        borderRadius: '12px',
        height: '50px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        transition: 'background 0.2s',
    },
    rodape: {
        textAlign: 'center',
        marginTop: '15px',
        fontSize: '0.9rem',
        color: '#7A7A7A',
    },
    link: {
        color: '#FF7A00',
        textDecoration: 'none',
        fontWeight: '600',
    }
};