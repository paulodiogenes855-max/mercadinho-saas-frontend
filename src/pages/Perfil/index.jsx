// Arquivo: frontend/src/pages/Perfil/index.jsx
import React, { useState } from 'react';
import { 
    User, Users, Headphones, FileText, LogOut, ChevronRight, 
    Trophy, Target, CreditCard, ShieldCheck 
} from 'lucide-react';

export default function Perfil() {
    // ==========================================
    // SIMULADOR DE PAPEL (MOCK)
    // Alterne entre 'DONO' e 'CAIXA' para ver a interface a mudar
    // ==========================================
    const [perfilUsuario, setPerfilUsuario] = useState('CAIXA'); 

    const mockUsuario = {
        nome: perfilUsuario === 'DONO' ? 'Thaís Almeida' : 'Carlos Souza',
        funcao: perfilUsuario === 'DONO' ? 'Administrador' : 'Operador de Caixa',
        foto: 'https://ui-avatars.com/api/?name=' + (perfilUsuario === 'DONO' ? 'Thais+Almeida' : 'Carlos+Souza') + '&background=FF7A00&color=fff',
        // Dados de Gamificação exclusivos do Caixa
        metas: {
            vendasAtuais: 112,
            metaMensal: 150,
            bonusAcumulado: 45.50,
            posicaoRanking: 1
        }
    };

    return (
        <div style={styles.telaTravada}>
            
            {/* ==========================================
                BLOCO 1: TOPO FIXO (Cabeçalho do Perfil)
            ========================================== */}
            <div style={styles.topoFixo}>
                <div style={styles.cabecalhoPerfil}>
                    <img src={mockUsuario.foto} alt="Perfil" style={styles.fotoGrande} />
                    <div style={styles.infoPerfil}>
                        <h2 style={styles.nomePerfil}>{mockUsuario.nome}</h2>
                        <div style={styles.badgeFuncao}>
                            {perfilUsuario === 'DONO' ? <ShieldCheck size={14} /> : <User size={14} />}
                            <span>{mockUsuario.funcao}</span>
                        </div>
                    </div>
                </div>

                {/* Botão temporário apenas para você testar a mudança de layout */}
                <button 
                    style={styles.btnSimulador} 
                    onClick={() => setPerfilUsuario(perfilUsuario === 'DONO' ? 'CAIXA' : 'DONO')}
                >
                    Simular visão como: {perfilUsuario === 'DONO' ? 'CAIXA' : 'DONO'}
                </button>
            </div>

            {/* ==========================================
                BLOCO 2: ÁREA DE ROLAGEM (Menus e Metas)
            ========================================== */}
            <div style={styles.areaRolagemInterna}>
                
                {/* PAINEL DE GAMIFICAÇÃO (Visível apenas para o CAIXA) */}
                {perfilUsuario === 'CAIXA' && (
                    <div style={styles.cardGamificacao}>
                        <div style={styles.linhaRanking}>
                            <div style={styles.destaqueRanking}>
                                <Trophy size={20} color="#FFD700" />
                                <span><strong>{mockUsuario.metas.posicaoRanking}º Lugar</strong> em Vendas</span>
                            </div>
                            <span style={styles.valorBonus}>+ R$ {mockUsuario.metas.bonusAcumulado.toFixed(2)}</span>
                        </div>
                        
                        <div style={styles.progressoContainer}>
                            <div style={styles.progressoHeader}>
                                <span style={styles.textoMeta}>Meta Mensal: {mockUsuario.metas.metaMensal} vendas</span>
                                <strong>{mockUsuario.metas.vendasAtuais} / {mockUsuario.metas.metaMensal}</strong>
                            </div>
                            <div style={styles.barraFundo}>
                                <div 
                                    style={{
                                        ...styles.barraPreenchida, 
                                        width: `${(mockUsuario.metas.vendasAtuais / mockUsuario.metas.metaMensal) * 100}%`
                                    }}
                                />
                            </div>
                            <span style={styles.dicaMeta}>Faltam {mockUsuario.metas.metaMensal - mockUsuario.metas.vendasAtuais} vendas para o próximo bónus!</span>
                        </div>
                    </div>
                )}

                {/* MENU DE CONFIGURAÇÕES DINÂMICO */}
                <h3 style={styles.tituloSecao}>Configurações da Conta</h3>
                <div style={styles.listaMenu}>
                    
                    {/* Item Comum a todos */}
                    <div style={styles.itemMenu}>
                        <div style={styles.itemMenuIcone}><User size={20} color="#7A7A7A" /></div>
                        <span style={styles.itemMenuTexto}>Meus Dados Pessoais</span>
                        <ChevronRight size={20} color="#C0C0C0" />
                    </div>

                    {/* Itens Exclusivos do DONO */}
                    {perfilUsuario === 'DONO' && (
                        <>
                            <div style={styles.itemMenu}>
                                <div style={styles.itemMenuIcone}><Users size={20} color="#FF7A00" /></div>
                                <span style={styles.itemMenuTexto}>Gestão de Funcionários</span>
                                <ChevronRight size={20} color="#C0C0C0" />
                            </div>
                            <div style={styles.itemMenu}>
                                <div style={styles.itemMenuIcone}><CreditCard size={20} color="#7A7A7A" /></div>
                                <span style={styles.itemMenuTexto}>Assinatura Meu Mercadinho</span>
                                <ChevronRight size={20} color="#C0C0C0" />
                            </div>
                        </>
                    )}

                    {/* Itens Exclusivos do CAIXA */}
                    {perfilUsuario === 'CAIXA' && (
                        <div style={styles.itemMenu}>
                            <div style={styles.itemMenuIcone}><Target size={20} color="#00C853" /></div>
                            <span style={styles.itemMenuTexto}>Histórico de Comissões</span>
                            <ChevronRight size={20} color="#C0C0C0" />
                        </div>
                    )}

                    {/* Itens Comuns */}
                    <div style={styles.itemMenu}>
                        <div style={styles.itemMenuIcone}><Headphones size={20} color="#7A7A7A" /></div>
                        <span style={styles.itemMenuTexto}>Suporte e Ajuda</span>
                        <ChevronRight size={20} color="#C0C0C0" />
                    </div>
                    <div style={styles.itemMenu}>
                        <div style={styles.itemMenuIcone}><FileText size={20} color="#7A7A7A" /></div>
                        <span style={styles.itemMenuTexto}>Termos de Uso</span>
                        <ChevronRight size={20} color="#C0C0C0" />
                    </div>
                </div>

            </div>

            {/* ==========================================
                BLOCO 3: RODAPÉ FIXO (Sair do Sistema)
            ========================================== */}
            <div style={styles.rodapeFixo}>
                <button style={styles.btnSair}>
                    <LogOut size={20} />
                    Sair da Conta
                </button>
            </div>
        </div>
    );
}

// ==========================================
// ESTILOS ERGONÓMICOS E RESPONSIVOS
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
        backgroundColor: '#FFF',
        padding: '20px',
        borderRadius: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        marginBottom: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    cabecalhoPerfil: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    fotoGrande: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        border: '3px solid #FF7A00',
        padding: '2px',
    },
    infoPerfil: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    nomePerfil: {
        fontSize: '1.2rem',
        fontWeight: '800',
        color: '#333',
    },
    badgeFuncao: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: '#F5F6F8',
        color: '#555',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: '700',
        alignSelf: 'flex-start',
    },
    btnSimulador: {
        backgroundColor: '#EBFBFF',
        color: '#00B4D8',
        border: '1px dashed #00B4D8',
        padding: '8px',
        borderRadius: '8px',
        fontSize: '0.8rem',
        fontWeight: '700',
        cursor: 'pointer',
    },
    areaRolagemInterna: {
        flex: 1, 
        overflowY: 'auto', 
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        paddingBottom: '20px', 
    },
    cardGamificacao: {
        backgroundColor: '#FFF',
        borderRadius: '20px',
        padding: '16px',
        border: '1px solid #FFD700',
        boxShadow: '0 4px 12px rgba(255, 215, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    linhaRanking: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    destaqueRanking: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.9rem',
        color: '#333',
    },
    valorBonus: {
        fontSize: '1.1rem',
        fontWeight: '800',
        color: '#00C853',
        backgroundColor: '#E8F5E9',
        padding: '4px 10px',
        borderRadius: '12px',
    },
    progressoContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    progressoHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.8rem',
        color: '#555',
    },
    textoMeta: {
        fontWeight: '600',
    },
    barraFundo: {
        height: '10px',
        backgroundColor: '#F5F6F8',
        borderRadius: '5px',
        overflow: 'hidden',
    },
    barraPreenchida: {
        height: '100%',
        backgroundColor: '#FF7A00',
        borderRadius: '5px',
    },
    dicaMeta: {
        fontSize: '0.75rem',
        color: '#7A7A7A',
        marginTop: '2px',
    },
    tituloSecao: {
        fontSize: '0.85rem',
        color: '#7A7A7A',
        fontWeight: '700',
        marginLeft: '5px',
    },
    listaMenu: {
        backgroundColor: '#FFF',
        borderRadius: '20px',
        padding: '0 10px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
    },
    itemMenu: {
        display: 'flex',
        alignItems: 'center',
        padding: '16px 5px',
        borderBottom: '1px solid #F5F6F8',
        cursor: 'pointer',
    },
    itemMenuIcone: {
        width: '36px',
        height: '36px',
        backgroundColor: '#F5F6F8',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '12px',
    },
    itemMenuTexto: {
        flex: 1,
        fontSize: '0.95rem',
        fontWeight: '600',
        color: '#333',
    },
    rodapeFixo: {
        flexShrink: 0,
        paddingTop: '10px',
    },
    btnSair: {
        width: '100%',
        height: '50px',
        backgroundColor: '#FFEBEE',
        color: '#D32F2F',
        border: 'none',
        borderRadius: '16px',
        fontSize: '1rem',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: 'pointer',
    }
};