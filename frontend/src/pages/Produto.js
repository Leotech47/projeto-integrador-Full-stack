import ProfessionalHeader from '../components/ProfessionalHeader';
import Footer from '../components/Footer';
import WhatsappIcon from '../components/WhatsappIcon';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Produto() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidadeEstoque, setQuantidadeEstoque] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [editId, setEditId] = useState(null);
  const [editNome, setEditNome] = useState('');
  const [editPreco, setEditPreco] = useState('');
  const [editQuantidadeEstoque, setEditQuantidadeEstoque] = useState('');
  const [editFornecedor, setEditFornecedor] = useState('');  // Função para buscar produtos do backend
  const buscarProdutos = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/produtos');
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setProdutos(Array.isArray(data) ? data : []);
      setErro(null);
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
      setErro('Erro ao carregar produtos: ' + err.message);
      setProdutos([]);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar fornecedores do backend
  const buscarFornecedores = async () => {
    try {
      const response = await fetch('http://localhost:3001/fornecedores');
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setFornecedores(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Erro ao buscar fornecedores:', err);
      setFornecedores([]);
    }
  };

  useEffect(() => {
    buscarProdutos();
    buscarFornecedores();
  }, []);  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');
    
    if (!nome.trim()) {
      setErro('Nome é obrigatório');
      return;
    }

    if (!preco || isNaN(preco) || parseFloat(preco) <= 0) {
      setErro('Preço deve ser um número positivo');
      return;
    }
    
    try {
      const novoProduto = {
        nome: nome.trim(),
        preco: parseFloat(preco),
        quantidade_estoque: parseInt(quantidadeEstoque) || 0,
        fornecedor_id: fornecedor ? parseInt(fornecedor) : null
      };

      const response = await fetch('http://localhost:3001/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoProduto)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ${response.status}`);
      }

      setMensagem('Produto cadastrado com sucesso!');
      setNome('');
      setPreco('');
      setQuantidadeEstoque('');
      setFornecedor('');
      
      // Recarregar a lista de produtos
      await buscarProdutos();
      
    } catch (err) {
      console.error('Erro ao cadastrar produto:', err);
      setErro('Erro ao cadastrar produto: ' + err.message);
    }
  };  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover este produto?')) {
      return;
    }
    
    setErro('');
    setMensagem('');
    
    try {
      const response = await fetch(`http://localhost:3001/produtos/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ${response.status}`);
      }
      
      setMensagem('Produto removido com sucesso!');
      await buscarProdutos();
      
    } catch (err) {
      console.error('Erro ao remover produto:', err);
      setErro('Erro ao remover produto: ' + err.message);
    }
  };
  const handleEdit = (produto) => {
    setEditId(produto.id);
    setEditNome(produto.nome);
    setEditPreco(produto.preco);
    setEditQuantidadeEstoque(produto.quantidade_estoque || 0);
    setEditFornecedor(produto.fornecedor_id || '');
  };  const handleUpdate = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');
    
    if (!editNome.trim()) {
      setErro('Nome é obrigatório');
      return;
    }

    if (!editPreco || isNaN(editPreco) || parseFloat(editPreco) <= 0) {
      setErro('Preço deve ser um número positivo');
      return;
    }

    try {
      const produtoAtualizado = {
        nome: editNome.trim(),
        preco: parseFloat(editPreco),
        quantidade_estoque: parseInt(editQuantidadeEstoque) || 0,
        fornecedor_id: editFornecedor ? parseInt(editFornecedor) : null
      };

      const response = await fetch(`http://localhost:3001/produtos/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produtoAtualizado)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ${response.status}`);
      }

      setMensagem('Produto atualizado com sucesso!');
      setEditId(null);
      setEditNome('');
      setEditPreco('');
      setEditQuantidadeEstoque('');
      setEditFornecedor('');
      
      // Recarregar a lista de produtos
      await buscarProdutos();
      
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      setErro('Erro ao atualizar produto: ' + err.message);
    }
  };  const handleUpdateEstoque = async (id, operacao, quantidade = 1) => {
    setErro('');
    setMensagem('');
    
    try {
      console.log(`Atualizando estoque: produto ${id}, operacao ${operacao}, quantidade ${quantidade}`);
      
      const response = await fetch(`http://localhost:3001/produtos/${id}/estoque`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ operacao, quantidade })
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
        console.error('Erro na resposta:', errorData);
        throw new Error(errorData.message || `Erro HTTP ${response.status}`);
      }

      const result = await response.json();
      console.log('Resposta da API:', result);
      
      setMensagem(`Estoque ${operacao === 'adicionar' ? 'adicionado' : 'subtraído'} com sucesso!`);
      await buscarProdutos();
      
    } catch (err) {
      console.error('Erro completo ao atualizar estoque:', err);
      setErro(`Erro ao atualizar estoque: ${err.message || 'Erro desconhecido'}`);
    }
  };

  if (loading) return <div>Carregando produtos...</div>;
  if (erro) return <div>{erro}</div>;
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <ProfessionalHeader />
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.3)'
        }}></div>
        
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          position: 'relative',
          zIndex: 2,
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
          }}>
            GESTÃO DE PRODUTOS
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: '#ecf0f1',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
          }}>
            Gerencie seu inventário com controle total de estoque e preços
          </p>
          <Link to="/" style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '12px 25px',
            background: 'rgba(255, 255, 255, 0.2)',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '25px',
            border: '2px solid #fff',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#fff';
            e.target.style.color = '#27ae60';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.color = '#fff';
          }}>
            ← Voltar para Home
          </Link>
        </div>
      </section>

      {/* Seção Principal */}
      <section style={{
        padding: '80px 20px',
        background: '#fff'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Formulário de Cadastro */}
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            border: '2px solid #27ae6015',
            marginBottom: '60px'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(45deg, #27ae60, #229954)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '2rem'
              }}>
                📦
              </div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#2c3e50',
                marginBottom: '10px'
              }}>
                Cadastrar Novo Produto
              </h2>
            </div>

            <form onSubmit={handleSubmit} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>
                  Nome do Produto:
                </label>
                <input
                  type="text"
                  placeholder="Digite o nome do produto"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '2px solid #e1e8ed',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#27ae60'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>
                  Preço (R$):
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={preco}
                  onChange={e => setPreco(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '2px solid #e1e8ed',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#27ae60'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>
                  Quantidade em Estoque:
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={quantidadeEstoque}
                  onChange={e => setQuantidadeEstoque(e.target.value)}
                  min="0"
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '2px solid #e1e8ed',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#27ae60'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>
                  Fornecedor:
                </label>
                <select
                  value={fornecedor}
                  onChange={e => setFornecedor(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '2px solid #e1e8ed',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#27ae60'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                >
                  <option value="">Selecione o fornecedor</option>
                  {fornecedores.map(f => (
                    <option key={f.id} value={f.id}>{f.nome}</option>
                  ))}
                </select>
              </div>

              <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '20px' }}>
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(45deg, #27ae60, #229954)',
                    color: '#fff',
                    border: 'none',
                    padding: '18px 40px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    boxShadow: '0 6px 20px rgba(39, 174, 96, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(39, 174, 96, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 6px 20px rgba(39, 174, 96, 0.4)';
                  }}
                >
                  Cadastrar Produto
                </button>
              </div>
            </form>

            {mensagem && (
              <div style={{
                marginTop: '30px',
                padding: '15px',
                borderRadius: '10px',
                background: mensagem.includes('sucesso') || mensagem.includes('cadastrado') ? '#d4edda' : '#f8d7da',
                color: mensagem.includes('sucesso') || mensagem.includes('cadastrado') ? '#155724' : '#721c24',
                border: `1px solid ${mensagem.includes('sucesso') || mensagem.includes('cadastrado') ? '#c3e6cb' : '#f5c6cb'}`,
                textAlign: 'center',
                fontWeight: '600'
              }}>
                {mensagem}
              </div>
            )}
          </div>

          {/* Lista de Produtos */}
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Produtos Cadastrados
            </h2>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p style={{ color: '#555', fontSize: '1.1rem' }}>Carregando produtos...</p>
              </div>
            ) : produtos.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p style={{ color: '#555', fontSize: '1.1rem' }}>Nenhum produto cadastrado ainda.</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gap: '20px'
              }}>
                {produtos.map((produto, idx) => (
                  <div key={produto.id || idx} style={{
                    background: '#f8f9fa',
                    borderRadius: '15px',
                    padding: '25px',
                    border: '2px solid #e1e8ed',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#27ae60';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(39, 174, 96, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e1e8ed';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    {editId === produto.id ? (
                      <form onSubmit={handleUpdate} style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '15px',
                        alignItems: 'end'
                      }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Nome:</label>
                          <input 
                            value={editNome} 
                            onChange={e => setEditNome(e.target.value)} 
                            required 
                            style={{
                              width: '100%',
                              padding: '12px',
                              border: '2px solid #e1e8ed',
                              borderRadius: '8px',
                              fontSize: '1rem'
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Preço:</label>
                          <input 
                            value={editPreco} 
                            onChange={e => setEditPreco(e.target.value)} 
                            required 
                            type="number" 
                            step="0.01"
                            style={{
                              width: '100%',
                              padding: '12px',
                              border: '2px solid #e1e8ed',
                              borderRadius: '8px',
                              fontSize: '1rem'
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Fornecedor:</label>
                          <select 
                            value={editFornecedor} 
                            onChange={e => setEditFornecedor(e.target.value)} 
                            required
                            style={{
                              width: '100%',
                              padding: '12px',
                              border: '2px solid #e1e8ed',
                              borderRadius: '8px',
                              fontSize: '1rem'
                            }}
                          >
                            <option value="">Selecione o fornecedor</option>
                            {fornecedores.map(f => (
                              <option key={f.id} value={f.id}>{f.nome}</option>
                            ))}
                          </select>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button 
                            type="submit"
                            style={{
                              background: '#27ae60',
                              color: 'white',
                              border: 'none',
                              padding: '12px 20px',
                              borderRadius: '25px',
                              cursor: 'pointer',
                              fontWeight: 'bold'
                            }}
                          >
                            Salvar
                          </button>
                          <button 
                            type="button" 
                            onClick={() => setEditId(null)}
                            style={{
                              background: '#6c757d',
                              color: 'white',
                              border: 'none',
                              padding: '12px 20px',
                              borderRadius: '25px',
                              cursor: 'pointer',
                              fontWeight: 'bold'
                            }}
                          >
                            Cancelar
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                          gap: '20px',
                          marginBottom: '20px'
                        }}>
                          <div>
                            <h4 style={{
                              color: '#2c3e50',
                              fontSize: '1.3rem',
                              marginBottom: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px'
                            }}>
                              📦 {produto.nome}
                            </h4>
                          </div>
                          <div>
                            <p style={{ margin: '5px 0', color: '#555' }}>
                              <strong>💰 Preço:</strong> R$ {parseFloat(produto.preco).toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p style={{ margin: '5px 0', color: '#555' }}>
                              <strong>📊 Estoque:</strong> {produto.quantidade_estoque || 0} unidades
                            </p>
                          </div>
                          <div>
                            <p style={{ margin: '5px 0', color: '#555' }}>
                              <strong>🏭 Fornecedor:</strong> {produto.fornecedor_nome}
                            </p>
                          </div>
                        </div>
                        
                        <div style={{
                          display: 'flex',
                          gap: '10px',
                          flexWrap: 'wrap',
                          justifyContent: 'center'
                        }}>
                          <button 
                            onClick={() => handleEdit(produto)}
                            style={{
                              backgroundColor: '#3498db',
                              color: 'white',
                              border: 'none',
                              padding: '10px 20px',
                              borderRadius: '25px',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                          >
                            ✏️ Editar
                          </button>
                          <button 
                            onClick={() => handleDelete(produto.id)}
                            style={{
                              backgroundColor: '#e74c3c',
                              color: 'white',
                              border: 'none',
                              padding: '10px 20px',
                              borderRadius: '25px',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                          >
                            🗑️ Excluir
                          </button>
                          <button 
                            onClick={() => handleUpdateEstoque(produto.id, 'adicionar', 1)}
                            style={{
                              backgroundColor: '#27ae60',
                              color: 'white',
                              border: 'none',
                              padding: '10px 20px',
                              borderRadius: '25px',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                          >
                            ➕ Adicionar 1
                          </button>
                          <button 
                            onClick={() => handleUpdateEstoque(produto.id, 'subtrair', 1)}
                            style={{
                              backgroundColor: '#f39c12',
                              color: 'white',
                              border: 'none',
                              padding: '10px 20px',
                              borderRadius: '25px',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                          >
                            ➖ Subtrair 1
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <WhatsappIcon />
      <Footer />
    </div>
  );
}
export default Produto;
