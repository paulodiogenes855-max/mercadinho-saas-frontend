// Arquivo: frontend/src/pages/Dashboard/index.jsx
import React, { useState, useEffect } from 'react';
import { DollarSign, Package, ShoppingCart, AlertTriangle, TrendingUp } from 'lucide-react';
import api from '../../services/api';

export default function Dashboard() {
    const [resumo, setResumo] = useState({
        receitaTotal: 0,
        qtdVendas: 0,
        totalProdutos: 0,
        produtosEmAlerta: 0
    });
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            setCarregando(true);
            
            // Fazemos duas chamadas à API ao mesmo tempo para ser mais rápido
            const [respostaVendas, respostaProdutos] = await Promise.all([
                api.get('/vendas').catch(() => ({ data: [] })), // Se falhar, retorna array vazio
                api.get('/produtos').catch(() => ({ data: [] }))
            ]);

            const vendas = respostaVendas.data || [];
            const produtos = respostaProdutos.data || [];

            // Calculamos os totais
            const receita = vendas.reduce((acc, venda) => acc + Number(venda.total), 0);
            const emAlerta = produtos.filter(p => p.estoque_atual <= p.estoque_minimo).length;

            setResumo({
                receitaTotal: receita,
                qtdVendas: vendas.length,
                totalProdutos: produtos.length,
                produtosEmAlerta: emAlerta
            });

        } catch (error) {
            console.error("Erro ao carregar Dashboard:", error);
        } finally {
            setCarregando(false);
        }
    };

    if (carregando) {
        return (
            <div style={styles.telaTravada}>
                <div style={styles.centro}>A carregar métricas da loja...</div>
            </div>
        );
    }

    return (
        <div style={styles.telaTravada}>
            <div style={styles.topoFixo}>
                <h2 style={styles.tituloSecao}>Resumo do Negócio</h2>
                <p style={styles.subtitulo}>Acompanhe o desempenho da sua loja em tempo real.</p>
            </div>

            <div style={styles.areaRolagemInterna}>
                <div style={styles.gridCards}>
                    
                    {/* Card de Receita */}
                    <div style={{...styles.cardDashboard, background: 'linear-gradient(135deg, #FF7A00 0%, #FF9D42 100%)'}}>
                        <div style={styles.cardHeader}>
                            <span style={{...styles.cardTitulo, color: '#FFF'}}>Receita Total</span>
                            <div style={{...styles.iconeWrapper, backgroundColor: 'rgba(255,255,255,0.2)'}}>
                                <DollarSign size={20} color="#FFF" />
                            </div>
                        </div>
                        <h3 style={{...styles.cardValor, color: '#FFF'}}>
                            R$ {resumo.receitaTotal.toFixed(2)}
                        </h3>
                        <span style={{...styles.cardDetalhe, color: 'rgba(255,255,255,0.8)'}}>
                            <TrendingUp size={14} style={{marginRight: 4}}/>
                            Baseado nas vendas registadas
                        </span>
                    </div>

                    {/* Card de Vendas */}
                    <div style={styles.cardDashboard}>
                        <div style={styles.cardHeader}>
                            <span style={styles.cardTitulo}>Vendas Realizadas</span>
                            <div style={{...styles.iconeWrapper, backgroundColor: '#F0F4F8'}}>
                                <ShoppingCart size={20} color="#1976D2" />
                            </div>
                        </div>
                        <h3 style={styles.cardValor}>{resumo.qtdVendas}</h3>
                        <span style={styles.cardDetalhe}>Operações no caixa</span>
                    </div>

                    {/* Card de Produtos */}
                    <div style={styles.cardDashboard}>
                        <div style={styles.cardHeader}>
                            <span style={styles.cardTitulo}>Itens no Estoque</span>
                            <div style={{...styles.iconeWrapper, backgroundColor: '#F5F6F8'}}>
                                <Package size={20} color="#7A7A7A" />
                            </div>
                        </div>
                        <h3 style={styles.cardValor}>{resumo.totalProdutos}</h3>
                        <span style={styles.cardDetalhe}>Produtos cadastrados</span>
                    </div>

                    {/* Card de Alerta de Estoque */}
                    <div style={{...styles.cardDashboard, borderColor: resumo.produtosEmAlerta > 0 ? '#FFD5CC' : 'transparent', borderWidth: 1, borderStyle: 'solid'}}>
                        <div style={styles.cardHeader}>
                            <span style={{...styles.cardTitulo, color: resumo.produtosEmAlerta > 0 ? '#D32F2F' : '#7A7A7A'}}>Alertas de Estoque</span>
                            <div style={{...styles.iconeWrapper, backgroundColor: resumo.produtosEmAlerta > 0 ? '#FFEBEE' : '#F5F6F8'}}>
                                <AlertTriangle size={20} color={resumo.produtosEmAlerta > 0 ? "#D32F2F" : "#7A7A7A"} />
                            </div>
                        </div>
                        <h3 style={{...styles.cardValor, color: resumo.produtosEmAlerta > 0 ? '#D32F2F' : '#333'}}>
                            {resumo.produtosEmAlerta}
                        </h3>
                        <span style={styles.cardDetalhe}>Produtos no nível mínimo</span>
                    </div>

                </div>
            </div>
        </div>
    );
}

// ==========================================
// ESTILOS DO DASHBOARD
// ==========================================
const styles = {
    telaTravada: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%', 
        maxHeight: 'calc(100dvh - 100px)', 
        backgroundColor: '#F5F6F8',
        overflow: 'hidden', 
    },
    centro: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#7A7A7A',
        fontWeight: '600',
    },
    topoFixo: {
        flexShrink: 0,
        marginBottom: '15px',
    },
    tituloSecao: {
        fontSize: '1.4rem',
        fontWeight: '800',
        color: '#333',
        marginBottom: '4px',
    },
    subtitulo: {
        fontSize: '0.9rem',
        color: '#7A7A7A',
    },
    areaRolagemInterna: {
        flex: 1, 
        overflowY: 'auto', 
        paddingBottom: '20px', 
    },
    gridCards: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '12px',
    },
    cardDashboard: {
        backgroundColor: '#FFF',
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '130px',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '10px',
    },
    cardTitulo: {
        fontSize: '0.85rem',
        fontWeight: '600',
        color: '#7A7A7A',
        maxWidth: '70%',
    },
    iconeWrapper: {
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardValor: {
        fontSize: '1.6rem',
        fontWeight: '800',
        color: '#333',
        marginBottom: '6px',
    },
    cardDetalhe: {
        fontSize: '0.75rem',
        color: '#A0A0A0',
        display: 'flex',
        alignItems: 'center',
    }
};