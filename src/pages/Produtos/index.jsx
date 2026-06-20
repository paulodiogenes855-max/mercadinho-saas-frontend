// Arquivo: frontend/src/pages/Produtos/index.jsx
import React, { useState, useEffect } from 'react';
import { Search, Upload, Plus, AlertTriangle, Package } from 'lucide-react';
import api from '../../services/api'; // Importamos a nossa ponte para o Backend!

export default function Produtos() {
    const [busca, setBusca] = useState('');
    const [produtos, setProdutos] = useState([]); // Agora começa vazio!
    const [carregando, setCarregando] = useState(true);

    // Assim que a tela abrir, ele roda essa função para buscar os dados no banco
    useEffect(() => {
        carregarProdutos();
    }, []);

    const carregarProdutos = async () => {
        try {
            setCarregando(true);
            // Faz um GET na rota do backend (que já identifica o dono da loja automaticamente)
            const resposta = await api.get('/produtos');
            setProdutos(resposta.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            // Não exibiremos um alerta invasivo, apenas deixamos a lista vazia
        } finally {
            setCarregando(false);
        }
    };

    // Filtra a lista de produtos baseada no que o usuário digita
    const produtosFiltrados = produtos.filter(p => 
         p.descricao.toLowerCase().includes(busca.toLowerCase()) || p.codigo_barras.includes(busca)
    );

    // Simulação da leitura da planilha pelo frontend
    const lidarComImportacaoCSV = (e) => {
        alert("A importação de planilha está em construção. Em breve conectaremos esta função à API!");
    };

    return (
        <div style={styles.telaTravada}>
            
            {/* ==========================================
                BLOCO 1: TOPO FIXO (Busca e Carga de Planilha)
            ========================================== */}
            <div style={styles.topoFixo}>
                <div style={styles.linhaAcoes}>
                    <div style={styles.inputBuscaContainer}>
                        <Search size={20} color="#7A7A7A" style={{ marginLeft: 12 }} />
                        <input 
                             style={styles.inputBusca} 
                             placeholder="Pesquisar no estoque..." 
                             value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                    
                    {/* Botão de Importação disfarçado de upload de arquivo */}
                    <label style={styles.btnUploadCSV}>
                        <Upload size={20} color="#FF7A00" />
                        <input 
                             type="file" 
                             accept=".csv" 
                             style={{ display: 'none' }} 
                             onChange={lidarComImportacaoCSV} 
                         />
                    </label>
                </div>
            </div>

            {/* ==========================================
                BLOCO 2: LISTA DE PRODUTOS COM ROLAGEM ISOLADA
            ========================================== */}
            <div style={styles.areaRolagemInterna}>
                <h3 style={styles.tituloLista}>Produtos Cadastrados ({produtosFiltrados.length})</h3>
                
                <div style={styles.listaProdutos}>
                    {carregando ? (
                        <div style={styles.estoqueVazio}>A carregar o estoque da nuvem...</div>
                    ) : produtosFiltrados.length === 0 ? (
                        <div style={styles.estoqueVazio}>Nenhum produto cadastrado no momento.</div>
                    ) : (
                        produtosFiltrados.map((prod) => {
                            const estoqueBaixo = prod.estoque_atual <= prod.estoque_minimo;
                            
                            return (
                                <div key={prod.id} style={styles.cardProduto}>
                                    <div style={styles.infoLayout}>
                                        <div style={styles.detalhesPrincipais}>
                                            <span style={styles.nomeProduto}>{prod.descricao}</span>
                                            <span style={styles.codigoProduto}>Cód: {prod.codigo_barras}</span>
                                        </div>
                                        
                                        {/* Badge de Alerta se o estoque estiver baixo */}
                                        {estoqueBaixo && (
                                            <div style={styles.badgeAlerta}>
                                                <AlertTriangle size={14} color="#FF7A00" />
                                                <span>Baixo</span>
                                            </div>
                                        )}
                                    </div>

                                    <div style={styles.linhaValores}>
                                        <div style={styles.blocoPreco}>
                                            <span style={styles.labelPreco}>Custo / Venda</span>
                                            <span style={styles.valoresTexto}>
                                                R$ {Number(prod.preco_custo).toFixed(2)} / <strong style={{color: '#333'}}>R$ {Number(prod.preco_venda).toFixed(2)}</strong>
                                            </span>
                                        </div>
                                        
                                        <div style={{...styles.blocoEstoque, backgroundColor: estoqueBaixo ? '#FFF3E0' : '#F5F6F8'}}>
                                            <span style={styles.labelPreco}>Qtd em Estoque</span>
                                            <span style={{...styles.qtdTexto, color: estoqueBaixo ? '#FF7A00' : '#333'}}>
                                                {prod.estoque_atual} un
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* ==========================================
                BLOCO 3: RODAPÉ FIXO (Botão de Cadastro Estático)
            ========================================== */}
            <div style={styles.rodapeFixo}>
                <button style={styles.btnNovoProduto} onClick={() => alert("Em breve: Abertura do formulário de criação.")}>
                    <Plus size={20} style={{ marginRight: 8 }} />
                    Cadastrar Produto Manual
                </button>
            </div>
        </div>
    );
}

// ==========================================
// DESIGN SYSTEM RÍGIDO E ERGONÔMICO (MOBILE)
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
        marginBottom: '10px',
    },
    linhaAcoes: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
    },
    inputBuscaContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: '12px',
        height: '50px',
        flex: 1,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    },
    inputBusca: {
        border: 'none',
        outline: 'none',
        width: '100%',
        padding: '0 12px',
        fontSize: '0.95rem',
        backgroundColor: 'transparent',
    },
    btnUploadCSV: {
        backgroundColor: '#FFF',
        border: '1px solid #E0E0E0',
        height: '50px',
        width: '50px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    },
    areaRolagemInterna: {
        flex: 1, 
        overflowY: 'auto', 
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '80px', // Evita que o rodapé tampe o último item
    },
    tituloLista: {
        fontSize: '0.85rem',
        color: '#7A7A7A',
        marginBottom: '10px',
        fontWeight: '600',
        flexShrink: 0,
    },
    listaProdutos: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    estoqueVazio: {
        textAlign: 'center',
        color: '#B0B5BD',
        marginTop: '30px',
        fontSize: '0.9rem',
    },
    cardProduto: {
        backgroundColor: '#FFF',
        borderRadius: '16px',
        padding: '14px 16px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        flexShrink: 0,
    },
    infoLayout: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    detalhesPrincipais: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    nomeProduto: {
        fontSize: '0.95rem',
        color: '#333',
        fontWeight: '700',
    },
    codigoProduto: {
        fontSize: '0.8rem',
        color: '#7A7A7A',
        marginTop: '2px',
    },
    badgeAlerta: {
        backgroundColor: '#FFF3E0',
        color: '#FF7A00',
        padding: '4px 8px',
        borderRadius: '8px',
        fontSize: '0.75rem',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    linhaValores: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #F0F0F0',
        paddingTop: '10px',
    },
    blocoPreco: {
        display: 'flex',
        flexDirection: 'column',
    },
    labelPreco: {
        fontSize: '0.75rem',
        color: '#7A7A7A',
        marginBottom: '2px',
    },
    valoresTexto: {
        fontSize: '0.85rem',
        color: '#7A7A7A',
    },
    blocoEstoque: {
        padding: '6px 12px',
        borderRadius: '10px',
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '90px',
    },
    qtdTexto: {
        fontSize: '0.9rem',
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
        pointerEvents: 'none', // Permite ver através da transparência estrutural
    },
    btnNovoProduto: {
        pointerEvents: 'auto', // Reativa o clique do botão
        width: '100%',
        maxWidth: '350px',
        height: '50px',
        backgroundColor: '#FF7A00',
        color: '#FFF',
        border: 'none',
        borderRadius: '14px',
        fontSize: '1rem',
        fontWeight: '700',
        boxShadow: '0 4px 16px rgba(255, 122, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
};