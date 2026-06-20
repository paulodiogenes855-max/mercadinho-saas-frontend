// Arquivo: frontend/src/pages/PDV/index.jsx
import React, { useState } from 'react';
import { Camera, Search, Plus, Trash2, QrCode, CreditCard, Banknote } from 'lucide-react';

const estoqueMock = [
    { id: 1, codigo: '7891000', descricao: 'Arroz Branco Tio João 5kg', custo: 18.50, venda: 24.90 },
    { id: 2, codigo: '7892000', descricao: 'Feijão Carioca 1kg', custo: 6.00, venda: 8.50 },
    { id: 3, codigo: '7893000', descricao: 'Óleo de Soja Soya 900ml', custo: 5.20, venda: 6.99 },
];

export default function PDV() {
    const [carrinho, setCarrinho] = useState([]);
    const [busca, setBusca] = useState('');
    const [produtoAtual, setProdutoAtual] = useState(null);
    const [quantidadeInput, setQuantidadeInput] = useState(1);
    const [precoVendaInput, setPrecoVendaInput] = useState(0);
    const [metodoPagamento, setMetodoPagamento] = useState('');

    const buscarProduto = (texto) => {
        setBusca(texto);
        const encontrado = estoqueMock.find(p => p.codigo === texto || p.descricao.toLowerCase().includes(texto.toLowerCase()));
        if (encontrado) {
            setProdutoAtual(encontrado);
            setPrecoVendaInput(encontrado.venda);
            setQuantidadeInput(1);
        } else {
            setProdutoAtual(null);
        }
    };

    const adicionarAoCarrinho = () => {
        if (!produtoAtual || quantidadeInput <= 0 || precoVendaInput <= 0) return;

        const novoItem = {
            ...produtoAtual,
            id_venda: Date.now(),
            quantidade: parseFloat(quantidadeInput),
            precoVendido: parseFloat(precoVendaInput),
            subtotal: parseFloat(quantidadeInput) * parseFloat(precoVendaInput)
        };

        setCarrinho([novoItem, ...carrinho]); 
        setBusca('');
        setProdutoAtual(null);
        setQuantidadeInput(1);
        setPrecoVendaInput(0);
    };

    const removerItem = (id_venda) => {
        setCarrinho(carrinho.filter(item => item.id_venda !== id_venda));
    };

    const totalVenda = carrinho.reduce((acc, item) => acc + item.subtotal, 0);

    return (
        <div style={styles.telaTravada}>
            
            {/* ==========================================
                BLOCO 1: TOPO FIXO (Não se move)
            ========================================== */}
            <div style={styles.topoFixo}>
                <div style={styles.inputBuscaContainer}>
                    <Search size={20} color="#7A7A7A" style={{ marginLeft: 12 }} />
                    <input 
                        style={styles.inputBusca} 
                        placeholder="Buscar ou bipar..." 
                        value={busca}
                        onChange={(e) => buscarProduto(e.target.value)}
                    />
                    <button style={styles.btnCamera}>
                        <Camera size={20} color="#FFF" />
                    </button>
                </div>

                {produtoAtual && (
                    <div style={styles.cardAdicionar}>
                        <div style={styles.infoProdutoTopo}>
                            <h4 style={styles.nomeProduto}>{produtoAtual.descricao}</h4>
                            <span style={styles.tagCusto}>Custo: R$ {produtoAtual.custo.toFixed(2)}</span>
                        </div>
                        
                        <div style={styles.linhaInputsMobile}>
                            <div style={styles.campoWrapper}>
                                <label style={styles.labelPequena}>Preço (R$)</label>
                                <input 
                                    type="number" 
                                    style={styles.inputGrande} 
                                    value={precoVendaInput}
                                    onChange={(e) => setPrecoVendaInput(e.target.value)}
                                />
                            </div>
                            <div style={styles.campoWrapper}>
                                <label style={styles.labelPequena}>Qtd</label>
                                <input 
                                    type="number" 
                                    style={styles.inputGrande} 
                                    value={quantidadeInput}
                                    onChange={(e) => setQuantidadeInput(e.target.value)}
                                />
                            </div>
                            <button style={styles.btnAddCarrinho} onClick={adicionarAoCarrinho}>
                                <Plus size={24} color="#FFF" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* ==========================================
                BLOCO 2: ÁREA DE ROLAGEM INTERNA (Ocupa o espaço que sobrar)
            ========================================== */}
            <div style={styles.areaRolagemInterna}>
                <h3 style={styles.tituloLista}>Itens ({carrinho.length})</h3>
                
                <div style={styles.listaProdutos}>
                    {carrinho.length === 0 ? (
                        <div style={styles.carrinhoVazio}>Aguardando itens...</div>
                    ) : (
                        carrinho.map((item) => (
                            <div key={item.id_venda} style={styles.cartItem}>
                                <div style={styles.cartItemDados}>
                                    <span style={styles.cartItemNome}>{item.descricao}</span>
                                    <span style={styles.cartItemDetalhe}>
                                        {item.quantidade}x R$ {item.precoVendido.toFixed(2)}
                                    </span>
                                </div>
                                <div style={styles.cartItemAcoes}>
                                    <strong style={styles.cartItemSubtotal}>R$ {item.subtotal.toFixed(2)}</strong>
                                    <button style={styles.btnLixeira} onClick={() => removerItem(item.id_venda)}>
                                        <Trash2 size={20} color="#FF4D4D" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* ==========================================
                BLOCO 3: RODAPÉ FIXO (Intocável na base do celular)
            ========================================== */}
            <div style={styles.rodapeFixo}>
                <div style={styles.botoesPagamento}>
                    <button 
                        style={{...styles.btnPgto, backgroundColor: metodoPagamento === 'DINHEIRO' ? '#FFF3E0' : '#FFF', borderColor: metodoPagamento === 'DINHEIRO' ? '#FF7A00' : '#E0E0E0', color: metodoPagamento === 'DINHEIRO' ? '#FF7A00' : '#7A7A7A'}}
                        onClick={() => setMetodoPagamento('DINHEIRO')}
                    >
                        <Banknote size={20} /> Dinheiro
                    </button>
                    <button 
                        style={{...styles.btnPgto, backgroundColor: metodoPagamento === 'CARTAO' ? '#FFF3E0' : '#FFF', borderColor: metodoPagamento === 'CARTAO' ? '#FF7A00' : '#E0E0E0', color: metodoPagamento === 'CARTAO' ? '#FF7A00' : '#7A7A7A'}}
                        onClick={() => setMetodoPagamento('CARTAO')}
                    >
                        <CreditCard size={20} /> Cartão
                    </button>
                    <button 
                        style={{...styles.btnPgto, backgroundColor: metodoPagamento === 'PIX' ? '#EBFBFF' : '#FFF', borderColor: metodoPagamento === 'PIX' ? '#00B4D8' : '#E0E0E0', color: metodoPagamento === 'PIX' ? '#00B4D8' : '#7A7A7A'}}
                        onClick={() => setMetodoPagamento('PIX')}
                    >
                        <QrCode size={20} /> Pix
                    </button>
                </div>

                {metodoPagamento === 'PIX' && (
                    <div style={styles.alertaPix}>
                        <span>Chave CNPJ: 00.000.000/0001-00</span>
                    </div>
                )}

                <div style={styles.linhaFinalizar}>
                    <div style={styles.blocoTotal}>
                        <span style={styles.labelTotal}>Total a cobrar</span>
                        <span style={styles.valorTotal}>R$ {totalVenda.toFixed(2)}</span>
                    </div>
                    <button 
                        style={{...styles.btnFinalizar, opacity: carrinho.length > 0 && metodoPagamento ? 1 : 0.5}}
                        disabled={carrinho.length === 0 || !metodoPagamento}
                    >
                        Cobrar
                    </button>
                </div>
            </div>
        </div>
    );
}

// ==========================================
// ESTILOS: ESTRUTURA RÍGIDA E ERGONÔMICA
// ==========================================
const styles = {
    // 1. TELA TRAVADA: Ocupa toda a altura, esconde rolagem global
    telaTravada: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%', 
        maxHeight: 'calc(100dvh - 140px)', // Desconta o header laranja e o menu inferior do layout principal
        backgroundColor: '#F5F6F8',
        overflow: 'hidden', 
    },
    // 2. TOPO FIXO: Não encolhe (flexShrink: 0)
    topoFixo: {
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '10px',
    },
    inputBuscaContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: '12px',
        height: '52px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        overflow: 'hidden',
    },
    inputBusca: {
        border: 'none',
        outline: 'none',
        flex: 1,
        padding: '0 12px',
        fontSize: '1rem',
        backgroundColor: 'transparent',
    },
    btnCamera: {
        backgroundColor: '#FF7A00',
        border: 'none',
        height: '100%',
        width: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    cardAdicionar: {
        backgroundColor: '#FFF',
        borderRadius: '16px',
        padding: '12px 16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: '1px solid #FF7A00',
    },
    infoProdutoTopo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '8px',
    },
    nomeProduto: {
        fontSize: '0.95rem',
        color: '#333',
        fontWeight: '700',
        flex: 1,
        paddingRight: '10px',
    },
    tagCusto: {
        fontSize: '0.75rem',
        color: '#FF7A00',
        backgroundColor: '#FFF3E0',
        padding: '4px 8px',
        borderRadius: '8px',
        fontWeight: '600',
    },
    linhaInputsMobile: {
        display: 'flex',
        gap: '8px',
        alignItems: 'flex-end',
    },
    campoWrapper: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: '4px',
    },
    labelPequena: {
        fontSize: '0.75rem',
        color: '#7A7A7A',
        fontWeight: '600',
    },
    inputGrande: {
        height: '44px', 
        borderRadius: '10px',
        border: '1px solid #E0E0E0',
        padding: '0 10px',
        fontSize: '1rem',
        fontWeight: '700',
        textAlign: 'center',
    },
    btnAddCarrinho: {
        height: '44px',
        width: '56px',
        backgroundColor: '#FF7A00',
        border: 'none',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    // 3. ÁREA DE ROLAGEM INTERNA: Estica (flex: 1) e rola
    areaRolagemInterna: {
        flex: 1, 
        overflowY: 'auto', 
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '10px', 
    },
    tituloLista: {
        fontSize: '0.85rem',
        color: '#7A7A7A',
        marginBottom: '8px',
        fontWeight: '600',
        flexShrink: 0,
    },
    listaProdutos: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    carrinhoVazio: {
        textAlign: 'center',
        color: '#B0B5BD',
        marginTop: '20px',
        fontSize: '0.9rem',
    },
    cartItem: {
        backgroundColor: '#FFF',
        borderRadius: '12px',
        padding: '12px 14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
        flexShrink: 0, 
    },
    cartItemDados: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    cartItemNome: {
        fontSize: '0.9rem',
        color: '#333',
        fontWeight: '600',
        marginBottom: '2px',
    },
    cartItemDetalhe: {
        fontSize: '0.8rem',
        color: '#7A7A7A',
    },
    cartItemAcoes: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    cartItemSubtotal: {
        fontSize: '0.95rem',
        color: '#333',
        fontWeight: '700',
    },
    btnLixeira: {
        background: 'none',
        border: 'none',
        padding: '4px',
    },
    // 4. RODAPÉ FIXO: Não encolhe (flexShrink: 0)
    rodapeFixo: {
        flexShrink: 0,
        backgroundColor: '#FFF',
        padding: '14px',
        borderRadius: '16px',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '5px',
    },
    botoesPagamento: {
        display: 'flex',
        gap: '6px',
    },
    btnPgto: {
        flex: 1,
        height: '42px',
        borderRadius: '10px',
        border: '1px solid',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        fontSize: '0.8rem',
        fontWeight: '700',
        transition: 'all 0.2s',
    },
    alertaPix: {
        textAlign: 'center',
        backgroundColor: '#EBFBFF',
        padding: '6px',
        borderRadius: '8px',
        fontSize: '0.8rem',
        color: '#00B4D8',
        fontWeight: '600',
    },
    linhaFinalizar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
    },
    blocoTotal: {
        display: 'flex',
        flexDirection: 'column',
    },
    labelTotal: {
        fontSize: '0.75rem',
        color: '#7A7A7A',
    },
    valorTotal: {
        fontSize: '1.3rem',
        fontWeight: '800',
        color: '#FF7A00',
    },
    btnFinalizar: {
        flex: 1,
        height: '48px',
        backgroundColor: '#FF7A00',
        color: '#FFF',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: '700',
        boxShadow: '0 4px 12px rgba(255, 122, 0, 0.3)',
    }
};