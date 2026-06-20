// Arquivo: frontend/src/pages/Dashboard/index.jsx
import React, { useState } from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Users, PackageMinus, PackagePlus, Percent, BarChart3 } from 'lucide-react';

// ==========================================
// DADOS ANALÍTICOS (MOCK) PARA O DASHBOARD
// ==========================================
const lucrosMock = [
    { periodo: 'Diário', valor: 450.00, tendencia: '+12%', positivo: true },
    { periodo: 'Semanal', valor: 3200.00, tendencia: '+8%', positivo: true },
    { periodo: 'Quinzenal', valor: 6800.00, tendencia: '-2%', positivo: false },
    { periodo: 'Mensal', valor: 14500.00, tendencia: '+15%', positivo: true },
    { periodo: 'Anual', valor: 168000.00, tendencia: '+22%', positivo: true },
];

const maisVendidosMock = [
    { ranking: '1º', nome: 'Arroz Tio João 5kg', qtd: 142, total: 3535.80 },
    { ranking: '2º', nome: 'Feijão Carioca 1kg', qtd: 98, total: 833.00 },
    { ranking: '3º', nome: 'Óleo de Soja Soya', qtd: 85, total: 594.15 },
];

const menosVendidosMock = [
    { ranking: '30º', nome: 'Azeite Extra Virgem Importado', qtd: 2, total: 79.80 },
    { ranking: '31º', nome: 'Sabão em Pó Premium 2kg', qtd: 3, total: 54.00 },
    { ranking: '32º', nome: 'Conserva de Cogumelos 200g', qtd: 5, total: 49.50 },
];

const menorLucroMock = [
    { nome: 'Leite Longa Vida 1L', margem: '5.2%', lucro_un: 'R$ 0.25' },
    { nome: 'Açúcar Refinado 1kg', margem: '7.1%', lucro_un: 'R$ 0.32' },
    { nome: 'Óleo de Soja Soya', margem: '8.4%', lucro_un: 'R$ 0.58' },
];

const vendedoresMock = [
    { nome: 'Carlos Souza', vendas: 112, faturamento: 4200.00, porcentagem: 100 },
    { nome: 'Ana Costa', vendas: 95, faturamento: 3800.00, porcentagem: 90 },
    { nome: 'Marcos Lima', vendas: 64, faturamento: 2300.00, porcentagem: 54 },
];

export default function Dashboard() {
    const [abaProdutos, setAbaProdutos] = useState('mais'); // Controle de abas: mais, menos, lucro

    return (
        <div style={styles.telaTravada}>
            
            {/* ==========================================
                BLOCO 1: TOPO FIXO (Carrossel de Lucros)
            ========================================== */}
            <div style={styles.topoFixo}>
                <h3 style={styles.tituloSecao}>Evolução do Lucro Líquido</h3>
                <div style={styles.carrosselHorizontal}>
                    {lucrosMock.map((lucro, idx) => (
                        <div key={idx} style={styles.cardLucro}>
                            <span style={styles.cardPeriodo}>{lucro.periodo}</span>
                            <h2 style={styles.cardValor}>R$ {lucro.valor.toFixed(2)}</h2>
                            <div style={{...styles.cardTendencia, color: lucro.positivo ? '#00C853' : '#FF3D00'}}>
                                {lucro.positivo ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                <span>{lucro.tendencia}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ==========================================
                BLOCO 2: ÁREA DE ROLAGEM INTERNA (Métricas e Rankings)
            ========================================== */}
            <div style={styles.areaRolagemInterna}>
                
                {/* Painel Dinâmico de Performance de Produtos */}
                <div style={styles.cardPainel}>
                    <div style={styles.abasContainer}>
                        <button 
                            style={{...styles.btnAba, color: abaProdutos === 'mais' ? '#FF7A00' : '#7A7A7A', borderBottomColor: abaProdutos === 'mais' ? '#FF7A00' : 'transparent'}}
                            onClick={() => setAbaProdutos('mais')}
                        >
                            <PackagePlus size={16} /> Mais Vendidos
                        </button>
                        <button 
                            style={{...styles.btnAba, color: abaProdutos === 'menos' ? '#FF7A00' : '#7A7A7A', borderBottomColor: abaProdutos === 'menos' ? '#FF7A00' : 'transparent'}}
                            onClick={() => setAbaProdutos('menos')}
                        >
                            <PackageMinus size={16} /> Menos Vendidos
                        </button>
                        <button 
                            style={{...styles.btnAba, color: abaProdutos === 'lucro' ? '#FF7A00' : '#7A7A7A', borderBottomColor: abaProdutos === 'lucro' ? '#FF7A00' : 'transparent'}}
                            onClick={() => setAbaProdutos('lucro')}
                        >
                            <Percent size={16} /> Menor Lucro
                        </button>
                    </div>

                    <div style={styles.conteudoAba}>
                        {abaProdutos === 'mais' && maisVendidosMock.map((item, i) => (
                            <div key={i} style={styles.linhaRanking}>
                                <span style={styles.numeroRanking}>{item.ranking}</span>
                                <div style={styles.dadosRanking}>
                                    <strong>{item.nome}</strong>
                                    <span>{item.qtd} unidades vendidas</span>
                                </div>
                                <strong style={styles.valorRanking}>R$ {item.total.toFixed(2)}</strong>
                            </div>
                        ))}

                        {abaProdutos === 'menos' && menosVendidosMock.map((item, i) => (
                            <div key={i} style={styles.linhaRanking}>
                                <span style={{...styles.numeroRanking, backgroundColor: '#ECEFF1', color: '#607D8B'}}>{item.ranking}</span>
                                <div style={styles.dadosRanking}>
                                    <strong>{item.nome}</strong>
                                    <span>Apenas {item.qtd} saídas no mês</span>
                                </div>
                                <strong style={{...styles.valorRanking, color: '#607D8B'}}>R$ {item.total.toFixed(2)}</strong>
                            </div>
                        ))}

                        {abaProdutos === 'lucro' && menorLucroMock.map((item, i) => (
                            <div key={i} style={styles.linhaRanking}>
                                <div style={styles.iconeAlertaMargem}>
                                    <Percent size={14} color="#FF3D00" />
                                </div>
                                <div style={styles.dadosRanking}>
                                    <strong>{item.nome}</strong>
                                    <span>Margem comercial atual</span>
                                </div>
                                <div style={styles.blocoMargemDireita}>
                                    <strong style={{color: '#FF3D00'}}>{item.margem}</strong>
                                    <span style={{fontSize: '0.75rem', color: '#7A7A7A'}}>{item.lucro_un}/un</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desempenho da Equipe (Principais Vendedores) */}
                <div style={styles.cardPainel}>
                    <div style={styles.cabecalhoPainel}>
                        <Users size={18} color="#FF7A00" />
                        <h4 style={styles.tituloPainel}>Desempenho por Funcionário</h4>
                    </div>
                    
                    <div style={styles.listaVendedores}>
                        {vendedoresMock.map((vend, i) => (
                            <div key={i} style={styles.blocoVendedor}>
                                <div style={styles.linhaSuperiorVendedor}>
                                    <strong>{vend.nome}</strong>
                                    <span>{vend.vendas} vendas | <strong>R$ {vend.faturamento.toFixed(2)}</strong></span>
                                </div>
                                {/* Gráfico de barra horizontal ergonômico */}
                                <div style={styles.barraProgressoFundo}>
                                    <div style={{...styles.barraProgressoPreenchimento, width: `${vend.porcentagem}%`}}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

// ==========================================
// ESTILOS: CONCEITO VIEWPORT TRAVADO
// ==========================================
const styles = {
    telaTravada: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: 'calc(100dvh - 140px)', // Desconta rigidamente o cabeçalho e menu inferiores
        backgroundColor: '#F5F6F8',
        overflow: 'hidden',
    },
    topoFixo: {
        flexShrink: 0,
        marginBottom: '15px',
    },
    tituloSecao: {
        fontSize: '0.85rem',
        color: '#7A7A7A',
        fontWeight: '600',
        marginBottom: '10px',
    },
    carrosselHorizontal: {
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        paddingBottom: '5px',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
    },
    cardLucro: {
        flexShrink: 0,
        width: '140px',
        backgroundColor: '#FFF',
        borderRadius: '16px',
        padding: '14px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        scrollSnapAlign: 'start',
    },
    cardPeriodo: {
        fontSize: '0.75rem',
        color: '#7A7A7A',
        fontWeight: '600',
    },
    cardValor: {
        fontSize: '1.1rem',
        color: '#333',
        fontWeight: '700',
    },
    cardTendencia: {
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        fontSize: '0.75rem',
        fontWeight: '700',
    },
    areaRolagemInterna: {
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        paddingBottom: '20px',
    },
    cardPainel: {
        backgroundColor: '#FFF',
        borderRadius: '20px',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
    },
    abasContainer: {
        display: 'flex',
        borderBottom: '1px solid #F0F0F0',
        justifyContent: 'space-between',
    },
    btnAba: {
        flex: 1,
        background: 'none',
        border: 'none',
        borderBottom: '2px solid',
        paddingBottom: '10px',
        fontSize: '0.8rem',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        cursor: 'pointer',
    },
    conteudoAba: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    linhaRanking: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.85rem',
    },
    numeroRanking: {
        width: '28px',
        height: '28px',
        backgroundColor: '#FFF3E0',
        color: '#FF7A00',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '700',
        fontSize: '0.8rem',
    },
    dadosRanking: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    valorRanking: {
        color: '#00C853',
        fontSize: '0.9rem',
    },
    iconeAlertaMargem: {
        width: '28px',
        height: '28px',
        backgroundColor: '#FFEBEE',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    blocoMargemDireita: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'right',
    },
    cabecalhoPainel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    tituloPainel: {
        fontSize: '0.9rem',
        color: '#333',
        fontWeight: '700',
    },
    listaVendedores: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    blocoVendedor: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    linhaSuperiorVendedor: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.85rem',
        color: '#333',
    },
    barraProgressoFundo: {
        height: '8px',
        backgroundColor: '#F5F6F8',
        borderRadius: '4px',
        overflow: 'hidden',
    },
    barraProgressoPreenchimento: {
        height: '100%',
        backgroundColor: '#FF7A00',
        borderRadius: '4px',
    },
};