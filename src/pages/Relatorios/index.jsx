// Arquivo: frontend/src/pages/Relatorios/index.jsx
import React, { useState, useEffect } from 'react';
import { TrendingUp, CreditCard, Banknote, QrCode, AlertTriangle, FileText, Calendar } from 'lucide-react';
import api from '../../services/api';

export default function Relatorios() {
    const [vendas, setVendas] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    // Quando a página carrega, vai à API buscar as vendas reais e os produtos
    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            setCarregando(true);
            const [respostaVendas, respostaProdutos] = await Promise.all([
                api.get('/vendas').catch(() => ({ data: [] })),
                api.get('/produtos').catch(() => ({ data: [] }))
            ]);

            setVendas(respostaVendas.data || []);
            setProdutos(respostaProdutos.data || []);
        } catch (error) {
            console.error("Erro ao carregar relatórios:", error);
        } finally {
            setCarregando(false);
        }
    };

    // ==========================================
    // CÁLCULOS DOS DADOS REAIS
    // ==========================================
    
    // 1. Total Faturado
    const totalFaturado = vendas.reduce((acc, venda) => acc + Number(venda.total_bruto), 0);
    
    // 2. Ticket Médio (Média gasta por cliente)
    const ticketMedio = vendas.length > 0 ? (totalFaturado / vendas.length) : 0;

    // 3. Contagem por Método de Pagamento
    const pagamentos = vendas.reduce((acc, venda) => {
        const metodo = venda.metodo_pagamento;
        acc[metodo] = (acc[metodo] || 0) + Number(venda.total_bruto);
        return acc;
    }, {});

    // 4. Produtos com Estoque Baixo
    const estoqueBaixo = produtos.filter(p => p.estoque_atual <= p.estoque_minimo);

    // ==========================================
    // RENDERIZAÇÃO
    // ==========================================
    if (carregando) {
        return (
            <div style={styles.telaTravada}>
                <div style={styles.centro}>A carregar relatórios do sistema...</div>
            </div>
        );
    }

    return (
        <div style={styles.telaTravada}>
            
            <div style={styles.topoFixo}>
                <h2 style={styles.tituloSecao}>Relatórios e Gestão</h2>
                <p style={styles.subtitulo}>Histórico das últimas 50 vendas e alertas.</p>
            </div>

            <div style={styles.areaRolagemInterna}>
                
                {/* BLOCO 1: VISÃO GERAL (Ticket e Faturamento) */}
                <div style={styles.gridDuplo}>
                    <div style={styles.cardInfo}>
                        <div style={styles.cardHeader}>
                            <span style={styles.cardLabel}>Faturamento</span>
                            <TrendingUp size={18} color="#FF7A00" />
                        </div>
                        <h3 style={styles.cardValor}>R$ {totalFaturado.toFixed(2)}</h3>
                    </div>
                    
                    <div style={styles.cardInfo}>
                        <div style={styles.cardHeader}>
                            <span style={styles.cardLabel}>Ticket Médio</span>
                            <FileText size={18} color="#1976D2" />
                        </div>
                        <h3 style={styles.cardValor}>R$ {ticketMedio.toFixed(2)}</h3>
                    </div>
                </div>

                {/* BLOCO 2: DIVISÃO POR PAGAMENTOS */}
                <h3 style={styles.tituloBloco}>Receitas por Pagamento</h3>
                <div style={styles.listaPagamentos}>
                    <div style={styles.itemPagamento}>
                        <div style={styles.iconePagamento}><Banknote size={20} color="#FF7A00" /></div>
                        <span style={styles.nomePagamento}>Dinheiro</span>
                        <strong style={styles.valorPagamento}>R$ {(pagamentos['DINHEIRO'] || 0).toFixed(2)}</strong>
                    </div>
                    <div style={styles.itemPagamento}>
                        <div style={styles.iconePagamento}><CreditCard size={20} color="#1976D2" /></div>
                        <span style={styles.nomePagamento}>Cartão</span>
                        <strong style={styles.valorPagamento}>R$ {(pagamentos['CARTAO'] || 0).toFixed(2)}</strong>
                    </div>
                    <div style={styles.itemPagamento}>
                        <div style={styles.iconePagamento}><QrCode size={20} color="#00B4D8" /></div>
                        <span style={styles.nomePagamento}>Pix</span>
                        <strong style={styles.valorPagamento}>R$ {(pagamentos['PIX'] || 0).toFixed(2)}</strong>
                    </div>
                </div>

                {/* BLOCO 3: HISTÓRICO DAS ÚLTIMAS VENDAS */}
                <h3 style={styles.tituloBloco}>Últimas Vendas</h3>
                <div style={styles.listaVendas}>
                    {vendas.length === 0 ? (
                        <div style={styles.mensagemVazia}>Nenhuma venda registada ainda.</div>
                    ) : (
                        vendas.map(venda => {
                            const dataFormatada = new Date(venda.data_venda).toLocaleDateString('pt-BR', {
                                day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                            });

                            return (
                                <div key={venda.id} style={styles.cardVenda}>
                                    <div style={styles.vendaIcone}><ShoppingCart size={18} color="#7A7A7A" /></div>
                                    <div style={styles.vendaDados}>
                                        <span style={styles.vendaMetodo}>{venda.metodo_pagamento}</span>
                                        <span style={styles.vendaData}><Calendar size={12} style={{marginRight: 4}}/> {dataFormatada}</span>
                                    </div>
                                    <div style={styles.vendaValor}>R$ {Number(venda.total_bruto).toFixed(2)}</div>
                                </div>
                            )
                        })
                    )}
                </div>

                {/* BLOCO 4: ALERTAS DE ESTOQUE */}
                <h3 style={styles.tituloBloco}>Atenção ao Estoque ({estoqueBaixo.length})</h3>
                <div style={styles.listaVendas}>
                    {estoqueBaixo.length === 0 ? (
                        <div style={styles.mensagemVazia}>Nenhum produto a acabar. Tudo OK!</div>
                    ) : (
                        estoqueBaixo.map(prod => (
                            <div key={prod.id} style={styles.cardAlerta}>
                                <div style={styles.alertaIcone}><AlertTriangle size={18} color="#D32F2F" /></div>
                                <div style={styles.alertaDados}>
                                    <span style={styles.alertaNome}>{prod.descricao}</span>
                                    <span style={styles.alertaDesc}>Apenas {prod.estoque_atual} restantes (Mínimo: {prod.estoque_minimo})</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}

// ==========================================
// ESTILOS
// ==========================================
import { ShoppingCart } from 'lucide-react';

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
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    gridDuplo: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
    },
    cardInfo: {
        backgroundColor: '#FFF',
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    cardLabel: {
        fontSize: '0.85rem',
        fontWeight: '600',
        color: '#7A7A7A',
    },
    cardValor: {
        fontSize: '1.4rem',
        fontWeight: '800',
        color: '#333',
    },
    tituloBloco: {
        fontSize: '1rem',
        fontWeight: '700',
        color: '#333',
        marginBottom: '-10px', 
    },
    listaPagamentos: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    itemPagamento: {
        backgroundColor: '#FFF',
        borderRadius: '12px',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    },
    iconePagamento: {
        backgroundColor: '#F5F6F8',
        padding: '8px',
        borderRadius: '8px',
        display: 'flex',
        marginRight: '12px',
    },
    nomePagamento: {
        flex: 1,
        fontSize: '0.95rem',
        fontWeight: '600',
        color: '#333',
    },
    valorPagamento: {
        fontSize: '1rem',
        color: '#333',
    },
    listaVendas: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    mensagemVazia: {
        textAlign: 'center',
        padding: '20px',
        color: '#A0A0A0',
        backgroundColor: '#FFF',
        borderRadius: '12px',
        fontSize: '0.9rem',
    },
    cardVenda: {
        backgroundColor: '#FFF',
        borderRadius: '12px',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    },
    vendaIcone: {
        backgroundColor: '#F5F6F8',
        padding: '8px',
        borderRadius: '8px',
        marginRight: '12px',
    },
    vendaDados: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    vendaMetodo: {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#333',
    },
    vendaData: {
        fontSize: '0.75rem',
        color: '#A0A0A0',
        display: 'flex',
        alignItems: 'center',
        marginTop: '2px',
    },
    vendaValor: {
        fontWeight: '800',
        color: '#FF7A00',
    },
    cardAlerta: {
        backgroundColor: '#FFF',
        borderRadius: '12px',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        borderLeft: '4px solid #D32F2F',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    },
    alertaIcone: {
        backgroundColor: '#FFEBEE',
        padding: '8px',
        borderRadius: '8px',
        marginRight: '12px',
    },
    alertaDados: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    alertaNome: {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#333',
    },
    alertaDesc: {
        fontSize: '0.75rem',
        color: '#D32F2F',
        fontWeight: '600',
        marginTop: '2px',
    }
};