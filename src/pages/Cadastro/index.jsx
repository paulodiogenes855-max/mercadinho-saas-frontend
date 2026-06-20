// Ficheiro: frontend/src/pages/Cadastro/index.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Mail, Lock, Users, CreditCard, QrCode, ArrowRight, CheckCircle, ChevronLeft } from 'lucide-react';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import api from '../../services/api';

export default function Cadastro() {
    const navigate = useNavigate();
    const [etapa, setEtapa] = useState(1);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    // Dados do Formulário
    const [loja, setLoja] = useState({
        nomeLoja: '',
        email: '',
        senha: '',
        funcionarios: '1' // 1 significa apenas o dono
    });
    
    const [pagamento, setPagamento] = useState({
        plano: 'MENSAL', // MENSAL ou ANUAL
        metodo: '' // PIX ou CARTAO
    });

    // Avançar ou recuar etapas
    const proximaEtapa = () => setEtapa(etapa + 1);
    const voltarEtapa = () => setEtapa(etapa - 1);

    // O Grande Momento: Criar a conta e gerar o pagamento
    const finalizarCadastro = async () => {
        if (!pagamento.metodo) {
            setErro("Escolha uma forma de pagamento para continuar.");
            return;
        }

        try {
            setCarregando(true);
            setErro('');

            // 1. Cria a conta no Firebase
            const credenciais = await createUserWithEmailAndPassword(auth, loja.email, loja.senha);
            
            // 2. Envia os dados para o seu Backend criar a cobrança
            const resposta = await api.post('/lojas', {
                nome_loja: loja.nomeLoja,
                tamanho_equipe: loja.funcionarios,
                plano_escolhido: pagamento.plano,
                metodo_pagamento: pagamento.metodo
            });

            // 3. REDIRECIONA PARA O MERCADO PAGO (CHECKOUT PRO)
            if (resposta.data.url_pagamento) {
                // Sai do seu site e abre a tela segura de pagamento do Mercado Pago
                window.location.href = resposta.data.url_pagamento;
            } else {
                // Plano B caso algo falhe
                navigate('/dashboard');
            }

        } catch (error) {
            console.error("Erro no cadastro:", error);
            if (error.code === 'auth/email-already-in-use') {
                setErro("Este e-mail já possui uma loja registada.");
            } else {
                setErro("Ocorreu um erro ao criar a loja. Tente novamente.");
            }
            setCarregando(false); // Só desativa o loading se der erro. Se der certo, ele muda de página.
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                
                {/* CABEÇALHO COM BOTÃO VOLTAR */}
                <div style={styles.header}>
                    {etapa > 1 ? (
                        <button style={styles.btnVoltar} onClick={voltarEtapa}>
                            <ChevronLeft size={24} color="#7A7A7A" />
                        </button>
                    ) : (
                        <button style={styles.btnVoltar} onClick={() => navigate('/login')}>
                            <ChevronLeft size={24} color="#7A7A7A" />
                        </button>
                    )}
                    <div style={styles.progressoContainer}>
                        <div style={styles.barraFundo}>
                            <div style={{...styles.barraPreenchida, width: `${(etapa / 3) * 100}%`}}></div>
                        </div>
                        <span style={styles.textoEtapa}>Passo {etapa} de 3</span>
                    </div>
                </div>

                {erro && <div style={styles.alertaErro}>{erro}</div>}

                {/* ETAPA 1: DADOS DA LOJA */}
                {etapa === 1 && (
                    <div style={styles.conteudoEtapa}>
                        <div style={styles.iconeTop}>
                            <Store size={32} color="#FFF" />
                        </div>
                        <h2 style={styles.titulo}>Crie o seu Mercadinho</h2>
                        <p style={styles.subtitulo}>O primeiro passo para modernizar as suas vendas.</p>

                        <div style={styles.formulario}>
                            <div style={styles.inputGroup}>
                                <Store size={20} color="#7A7A7A" />
                                <input 
                                    placeholder="Nome do seu Comércio" 
                                    style={styles.input}
                                    value={loja.nomeLoja}
                                    onChange={(e) => setLoja({...loja, nomeLoja: e.target.value})}
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <Mail size={20} color="#7A7A7A" />
                                <input 
                                    type="email" 
                                    placeholder="Seu melhor E-mail" 
                                    style={styles.input}
                                    value={loja.email}
                                    onChange={(e) => setLoja({...loja, email: e.target.value})}
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <Lock size={20} color="#7A7A7A" />
                                <input 
                                    type="password" 
                                    placeholder="Crie uma Palavra-passe forte" 
                                    style={styles.input}
                                    value={loja.senha}
                                    onChange={(e) => setLoja({...loja, senha: e.target.value})}
                                />
                            </div>

                            <button 
                                style={styles.btnPrimario} 
                                onClick={proximaEtapa}
                                disabled={!loja.nomeLoja || !loja.email || !loja.senha || loja.senha.length < 6}
                            >
                                Continuar <ArrowRight size={20} style={{marginLeft: 8}}/>
                            </button>
                        </div>
                    </div>
                )}

                {/* ETAPA 2: EQUIPE */}
                {etapa === 2 && (
                    <div style={styles.conteudoEtapa}>
                        <div style={styles.iconeTop}>
                            <Users size={32} color="#FFF" />
                        </div>
                        <h2 style={styles.titulo}>Quem vai usar o sistema?</h2>
                        <p style={styles.subtitulo}>Ajustamos o sistema ao tamanho do seu negócio.</p>

                        <div style={styles.formulario}>
                            <label style={styles.labelRadio}>
                                <input 
                                    type="radio" 
                                    name="equipe" 
                                    checked={loja.funcionarios === '1'} 
                                    onChange={() => setLoja({...loja, funcionarios: '1'})}
                                    style={styles.radio}
                                />
                                <div style={styles.radioTexto}>
                                    <strong>Trabalho sozinho</strong>
                                    <span>Apenas eu serei o dono e operador de caixa.</span>
                                </div>
                            </label>

                            <label style={styles.labelRadio}>
                                <input 
                                    type="radio" 
                                    name="equipe" 
                                    checked={loja.funcionarios === '2-5'} 
                                    onChange={() => setLoja({...loja, funcionarios: '2-5'})}
                                    style={styles.radio}
                                />
                                <div style={styles.radioTexto}>
                                    <strong>Tenho uma pequena equipa (2 a 5)</strong>
                                    <span>Vou precisar cadastrar operadores de caixa.</span>
                                </div>
                            </label>

                            <label style={styles.labelRadio}>
                                <input 
                                    type="radio" 
                                    name="equipe" 
                                    checked={loja.funcionarios === '5+'} 
                                    onChange={() => setLoja({...loja, funcionarios: '5+'})}
                                    style={styles.radio}
                                />
                                <div style={styles.radioTexto}>
                                    <strong>Supermercado (Mais de 5 funcionários)</strong>
                                    <span>Vários caixas rodando ao mesmo tempo.</span>
                                </div>
                            </label>

                            <button style={styles.btnPrimario} onClick={proximaEtapa}>
                                Ir para Pagamento <ArrowRight size={20} style={{marginLeft: 8}}/>
                            </button>
                        </div>
                    </div>
                )}

                {/* ETAPA 3: ASSINATURA E PAGAMENTO */}
                {etapa === 3 && (
                    <div style={styles.conteudoEtapa}>
                        <h2 style={styles.titulo}>Finalizar Assinatura</h2>
                        <p style={styles.subtitulo}>Escolha o seu plano e liberte o acesso à sua loja.</p>

                        <div style={styles.selecaoPlano}>
                            <div 
                                style={{...styles.cardPlano, borderColor: pagamento.plano === 'MENSAL' ? '#FF7A00' : '#E0E0E0', backgroundColor: pagamento.plano === 'MENSAL' ? '#FFF3E0' : '#FFF'}}
                                onClick={() => setPagamento({...pagamento, plano: 'MENSAL'})}
                            >
                                {pagamento.plano === 'MENSAL' && <CheckCircle size={20} color="#FF7A00" style={styles.iconeCheck}/>}
                                <strong>Plano Mensal</strong>
                                <span style={styles.precoPlano}>R$ 49,90<small>/mês</small></span>
                            </div>
                            
                            <div 
                                style={{...styles.cardPlano, borderColor: pagamento.plano === 'ANUAL' ? '#FF7A00' : '#E0E0E0', backgroundColor: pagamento.plano === 'ANUAL' ? '#FFF3E0' : '#FFF'}}
                                onClick={() => setPagamento({...pagamento, plano: 'ANUAL'})}
                            >
                                {pagamento.plano === 'ANUAL' && <CheckCircle size={20} color="#FF7A00" style={styles.iconeCheck}/>}
                                <strong>Plano Anual <span style={styles.tagDesconto}>-20%</span></strong>
                                <span style={styles.precoPlano}>R$ 479,00<small>/ano</small></span>
                            </div>
                        </div>

                        <h3 style={styles.tituloSecaoMenor}>Como deseja pagar?</h3>
                        <div style={styles.botoesPagamento}>
                            <button 
                                style={{...styles.btnPgto, backgroundColor: pagamento.metodo === 'PIX' ? '#EBFBFF' : '#FFF', borderColor: pagamento.metodo === 'PIX' ? '#00B4D8' : '#E0E0E0'}}
                                onClick={() => setPagamento({...pagamento, metodo: 'PIX'})}
                            >
                                <QrCode size={24} color="#00B4D8" />
                                <span>Pagar com Pix</span>
                            </button>
                            
                            <button 
                                style={{...styles.btnPgto, backgroundColor: pagamento.metodo === 'CARTAO' ? '#F4F0FF' : '#FFF', borderColor: pagamento.metodo === 'CARTAO' ? '#673AB7' : '#E0E0E0'}}
                                onClick={() => setPagamento({...pagamento, metodo: 'CARTAO'})}
                            >
                                <CreditCard size={24} color="#673AB7" />
                                <span>Cartão de Crédito</span>
                            </button>
                        </div>

                        <button 
                            style={{...styles.btnPrimario, marginTop: '20px', opacity: carregando ? 0.7 : 1}} 
                            onClick={finalizarCadastro}
                            disabled={carregando}
                        >
                            {carregando ? 'A processar loja...' : 'Pagar e Acessar o Sistema'}
                        </button>
                        
                        <p style={styles.avisoSeguro}>🔒 Pagamento processado com segurança por Mercado Pago.</p>
                    </div>
                )}

            </div>
        </div>
    );
}

// ==========================================
// ESTILOS FOCADOS EM CONVERSÃO E VENDAS
// ==========================================
const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#F5F6F8',
        padding: '20px',
    },
    card: {
        backgroundColor: '#FFF',
        padding: '30px',
        borderRadius: '24px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '450px',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    btnVoltar: {
        background: 'none',
        border: 'none',
        padding: '0',
        cursor: 'pointer',
        marginRight: '15px',
        display: 'flex',
    },
    progressoContainer: {
        flex: 1,
    },
    barraFundo: {
        height: '6px',
        backgroundColor: '#F0F0F0',
        borderRadius: '3px',
        overflow: 'hidden',
        marginBottom: '4px',
    },
    barraPreenchida: {
        height: '100%',
        backgroundColor: '#FF7A00',
        transition: 'width 0.3s ease-in-out',
    },
    textoEtapa: {
        fontSize: '0.75rem',
        color: '#A0A0A0',
        fontWeight: '600',
    },
    conteudoEtapa: {
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeIn 0.3s ease',
    },
    iconeTop: {
        backgroundColor: '#FF7A00',
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '15px',
        alignSelf: 'center',
        boxShadow: '0 4px 12px rgba(255, 122, 0, 0.3)',
    },
    titulo: {
        fontSize: '1.4rem',
        fontWeight: '800',
        color: '#333',
        textAlign: 'center',
        marginBottom: '4px',
    },
    subtitulo: {
        fontSize: '0.9rem',
        color: '#7A7A7A',
        textAlign: 'center',
        marginBottom: '20px',
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
        height: '54px',
        border: '1px solid transparent',
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
        height: '54px',
        fontSize: '1.05rem',
        fontWeight: '700',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5px',
        boxShadow: '0 4px 12px rgba(255, 122, 0, 0.2)',
    },
    alertaErro: {
        backgroundColor: '#FFEBEE',
        color: '#D32F2F',
        padding: '12px',
        borderRadius: '12px',
        fontSize: '0.85rem',
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: '15px',
    },
    labelRadio: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: '16px',
        border: '1px solid #E0E0E0',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    radio: {
        marginTop: '4px',
        marginRight: '12px',
        transform: 'scale(1.2)',
        accentColor: '#FF7A00',
    },
    radioTexto: {
        display: 'flex',
        flexDirection: 'column',
    },
    selecaoPlano: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
    },
    cardPlano: {
        flex: 1,
        border: '2px solid',
        borderRadius: '16px',
        padding: '16px 12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.2s',
    },
    iconeCheck: {
        position: 'absolute',
        top: '-10px',
        right: '-10px',
        backgroundColor: '#FFF',
        borderRadius: '50%',
    },
    tagDesconto: {
        backgroundColor: '#4CAF50',
        color: '#FFF',
        fontSize: '0.65rem',
        padding: '2px 6px',
        borderRadius: '8px',
        marginLeft: '4px',
        verticalAlign: 'middle',
    },
    precoPlano: {
        fontSize: '1.3rem',
        fontWeight: '800',
        color: '#333',
        marginTop: '8px',
    },
    tituloSecaoMenor: {
        fontSize: '1rem',
        color: '#333',
        marginBottom: '10px',
        textAlign: 'center',
    },
    botoesPagamento: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    btnPgto: {
        display: 'flex',
        alignItems: 'center',
        padding: '14px 20px',
        borderRadius: '12px',
        border: '1px solid',
        cursor: 'pointer',
        gap: '15px',
        fontSize: '1rem',
        fontWeight: '600',
        color: '#333',
        transition: 'all 0.2s',
    },
    avisoSeguro: {
        textAlign: 'center',
        fontSize: '0.75rem',
        color: '#A0A0A0',
        marginTop: '15px',
    }
};