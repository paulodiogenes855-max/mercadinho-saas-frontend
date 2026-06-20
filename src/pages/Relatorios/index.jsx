// Arquivo: frontend/src/pages/Relatorios/index.jsx
import React, { useState } from 'react';
import { Calendar, FileText, Download, DollarSign, CalendarDays, Clock } from 'lucide-react';

// ==========================================
// DADOS HISTÓRICOS (MOCK) DE VENDAS
// ==========================================
const historicoVendasMock = [
    { id: 'VND-1024', horario: '19:22', funcionario: 'Carlos Souza', metodo: 'PIX', valor: 45.90 },
    { id: 'VND-1023', horario: '18:45', funcionario: 'Ana Costa', metodo: 'CARTÃO', valor: 124.50 },
    { id: 'VND-1022', horario: '18:10', funcionario: 'Carlos Souza', metodo: 'DINHEIRO', valor: 18.20 },
    { id: 'VND-1021', horario: '17:05', funcionario: 'Marcos Lima', metodo: 'PIX', valor: 89.90 },
    { id: 'VND-1020', horario: '16:30', funcionario: 'Ana Costa', metodo: 'CARTÃO', valor: 210.00 },
    { id: 'VND-1019', horario: '15:15', funcionario: 'Carlos Souza', metodo: 'DINHEIRO', valor: 7.50 },
    { id: 'VND-1018', horario: '14:02', funcionario: 'Marcos Lima', metodo: 'PIX', valor: 54.30 },
];

const metodosResumoMock = [
    { metodo: 'Pix', valor: 1250.00, cor: '#00B4D8' },
    { metodo: 'Cartão de Crédito/Débito', valor: 1980.50, cor: '#FF7A00' },
    { metodo: 'Dinheiro em Caixa', valor: 640.00, cor: '#00C853' },
];

export default function Relatorios() {
    const [periodo, setPeriodo] = useState('hoje');

    return (
        <div style={styles.telaTravada}>
            
            {/* ==========================================
                BLOCO 1: TOPO FIXO (Filtros de Período e Exportação)
            ========================================== */}
            <div style={styles.topoFixo}>
                <div style={styles.linhaFiltros}>
                    <button 
                        style={{...styles.btnFiltro, backgroundColor: periodo === 'hoje' ? '#FF7A00' : '#FFF', color: periodo === 'hoje' ? '#FFF' : '#7A7A7A'}}
                        onClick={() => setPeriodo('hoje')}
                    >
                        Hoje
                    </button>
                    <button 
                        style={{...styles.btnFiltro, backgroundColor: periodo === '7dias' ? '#FF7A00' : '#FFF', color: periodo === '7dias' ? '#FFF' : '#7A7A7A'}}
                        onClick={() => setPeriodo('7dias')}
                    >
                        7 Dias
                    </button>
                    <button 
                        style={{...styles.btnFiltro, backgroundColor: periodo === '30dias' ? '#FF7A00' : '#FFF', color: periodo === '30dias' ? '#FFF' : '#7A7A7A'}}
                        onClick={() => setPeriodo('30dias')}
                    >
                        30 Dias
                    </button>
                </div>

                {/* Card de Faturamento Consolidado do Filtro */}
                <div style={styles.cardFaturamento}>
                    <div style={styles.blocoFaturamentoTexto}>
                        <span style={styles.labelFaturamento}>Faturamento Bruto Retido</span>
                        <h2 style={styles.valorFaturamento}>R$ 3.870,50</h2>
                    </div>
                    <div style={styles.iconeFundoDolar}>
                        <DollarSign size={24} color="#FFF" />
                    </div>
                </div>
            </div>

            {/* ==========================================
                BLOCO 2: ÁREA DE ROLAGEM INTERNA (Fechamento e Auditoria)
            ========================================== */}
            <div style={styles.areaRolagemInterna}>
                
                {/* Divisão por Meio de Pagamento */}
                <div style={styles.cardGestao}>
                    <h4 style={styles.tituloPainel}>Entradas por Meio de Pagamento</h4>
                    <div style={styles.listaMetodos}>
                        {metodosResumoMock.map((item, idx) => (
                            <div key={idx} style={styles.linhaMetodo}>
                                <div style={styles.metodoIdentificador}>
                                    <span style={{...styles.indicadorCor, backgroundColor: item.cor}}></span>
                                    <span style={styles.nomeMetodo}>{item.metodo}</span>
                                </div>
                                <strong style={styles.valorMetodo}>R$ {item.valor.toFixed(2)}</strong>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Log de Auditoria / Histórico de Cupons Lançados */}
                <h3 style={styles.tituloSecao}>Fluxo de Caixas em Tempo Real</h3>
                <div style={styles.listaVendasContainer}>
                    {historicoVendasMock.map((venda) => (
                        <div key={venda.id} style={styles.cardVendaLog}>
                            <div style={styles.vendaMetadados}>
                                <div style={styles.linhaIdHorario}>
                                    <strong style={styles.vendaId}>{venda.id}</strong>
                                    <div style={styles.blocoHora}>
                                        <Clock size={12} color="#7A7A7A" />
                                        <span>{venda.horario}</span>
                                    </div>
                                </div>
                                <span style={styles.vendaOperador}>Operador: {venda.funcionario}</span>
                            </div>
                            
                            <div style={styles.vendaValoresDireita}>
                                <strong style={styles.vendaValorTexto}>R$ {venda.valor.toFixed(2)}</strong>
                                <span style={styles.vendaBadgeMetodo}>{venda.metodo}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* ==========================================
                BLOCO 3: RODAPÉ FIXO (Exportador de Relatório)
            ========================================== */}
            <div style={styles.rodapeFixo}>
                <button style={styles.btnExportar}>
                    <Download size={20} style={{ marginRight: 8 }} />
                    Exportar Fechamento de Caixa
                </button>
            </div>
        </div>
    );
}

// ==========================================
// ESTILOS: PADRÃO ERGONÔMICO EXCLUSIVO MOBILE
// ==========================================
const styles = {
    telaTravada: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%', 
        maxHeight: 'calc(100dvh - 140px)', 
        backgroundColor: '#F5F6F8',
        overflow: 'hidden', 
    },
    topoFixo: {
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '15px',
    },
    linhaFiltros: {
        display: 'flex',
        gap: '8px',
    },
    btnFiltro: {
        flex: 1,
        height: '38px',
        border: '1px solid #E0E0E0',
        borderRadius: '10px',
        fontSize: '0.85rem',
        fontWeight: '700',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
        transition: 'all 0.2s',
    },
    cardFaturamento: {
        backgroundColor: '#FFF',
        borderRadius: '18px',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeft: '4px solid #FF7A00',
    },
    blocoFaturamentoTexto: {
        display: 'flex',
        flexDirection: 'column',
    },
    labelFaturamento: {
        fontSize: '0.8rem',
        color: '#7A7A7A',
        fontWeight: '600',
    },
    valorFaturamento: {
        fontSize: '1.4rem',
        color: '#333',
        fontWeight: '800',
        marginTop: '2px',
    },
    iconeFundoDolar: {
        backgroundColor: '#FF7A00',
        width: '42px',
        height: '42px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 10px rgba(255, 122, 0, 0.25)',
    },
    areaRolagemInterna: {
        flex: 1, 
        overflowY: 'auto', 
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        paddingBottom: '80px', 
    },
    cardGestao: {
        backgroundColor: '#FFF',
        borderRadius: '18px',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    tituloPainel: {
        fontSize: '0.85rem',
        color: '#333',
        fontWeight: '700',
    },
    listaMetodos: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    linhaMetodo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.85rem',
    },
    metodoIdentificador: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    indicadorCor: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
    },
    nomeMetodo: {
        color: '#555',
        fontWeight: '500',
    },
    valorMetodo: {
        color: '#333',
    },
    tituloSecao: {
        fontSize: '0.85rem',
        color: '#7A7A7A',
        fontWeight: '600',
        marginTop: '5px',
    },
    listaVendasContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    cardVendaLog: {
        backgroundColor: '#FFF',
        borderRadius: '14px',
        padding: '12px 14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    },
    vendaMetadados: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
    },
    linhaIdHorario: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    vendaId: {
        fontSize: '0.9rem',
        color: '#333',
    },
    blocoHora: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '0.75rem',
        color: '#7A7A7A',
    },
    vendaOperador: {
        fontSize: '0.8rem',
        color: '#7A7A7A',
    },
    vendaValoresDireita: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '4px',
    },
    vendaValorTexto: {
        fontSize: '0.95rem',
        color: '#333',
    },
    vendaBadgeMetodo: {
        fontSize: '0.7rem',
        backgroundColor: '#F5F6F8',
        color: '#555',
        padding: '2px 6px',
        borderRadius: '6px',
        fontWeight: '700',
    },
    rodapeFixo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        padding: '16px',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
    },
    btnExportar: {
        pointerEvents: 'auto',
        width: '100%',
        maxWidth: '350px',
        height: '50px',
        backgroundColor: '#FFF',
        color: '#FF7A00',
        border: '2px solid #FF7A00',
        borderRadius: '14px',
        fontSize: '1rem',
        fontWeight: '700',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
};