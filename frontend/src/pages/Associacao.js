import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import ProfessionalHeader from '../components/ProfessionalHeader';
import Footer from '../components/Footer';
import WhatsappIcon from '../components/WhatsappIcon';

// Página de Associação - Listagem de Produtos com Estoque
function Associacao() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroFornecedor, setFiltroFornecedor] = useState('');
  const relatorioRef = useRef();  // Função para buscar produtos do backend
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

  useEffect(() => {
    buscarProdutos();
  }, []);
  const handleExportCSV = () => {
    const header = 'Produto,Preço,Estoque,Fornecedor\n';
    const rows = filteredProdutos.map(p => 
      `${p.nome},R$ ${p.preco},${p.quantidade_estoque || 0},${p.fornecedor_nome || 'N/A'}`
    ).join('\n');
    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio_produtos_estoque.csv';
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleExportPDF = () => {
    import('jspdf').then(jsPDF => {
      const doc = new jsPDF.jsPDF();
      doc.text('Relatório de Produtos e Estoque', 10, 10);
      let y = 20;
      filteredProdutos.forEach((produto, idx) => {
        doc.text(`${idx + 1}. ${produto.nome} | Preço: R$ ${produto.preco} | Estoque: ${produto.quantidade_estoque || 0} | Fornecedor: ${produto.fornecedor_nome || 'N/A'}`, 10, y);
        y += 10;
        if (y > 280) { // Nova página se necessário
          doc.addPage();
          y = 20;
        }
      });
      doc.save('relatorio_produtos_estoque.pdf');
    });
  };

  const handlePrint = () => {
    window.print();
  };
  const filteredProdutos = produtos.filter(produto =>
    (filtroNome ? produto.nome.toLowerCase().includes(filtroNome.toLowerCase()) : true) &&
    (filtroFornecedor ? produto.fornecedor_nome && produto.fornecedor_nome.toLowerCase().includes(filtroFornecedor.toLowerCase()) : true)
  );
  if (loading) return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      fontSize: '1.2rem'
    }}>
      Carregando produtos...
    </div>
  );
  
  if (erro) return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      fontSize: '1.2rem'
    }}>
      {erro}
    </div>
  );  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <ProfessionalHeader />
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '300px',
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
            RELATÓRIO DE ESTOQUE
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: '#fff',
            opacity: 0.9,
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
          }}>
            Controle completo de produtos e fornecedores da Leo Tech
          </p>
        </div>
      </section>
      
      {/* Conteúdo Principal */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '50px 20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <Link 
            to="/" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 24px',
              backgroundColor: '#6c757d',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '50px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(108, 117, 125, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#5a6268';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#6c757d';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            ← Voltar para Home
          </Link>
        </div>

        {/* Filtros */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#343a40',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            Filtros de Busca
          </h3>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            alignItems: 'center'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontWeight: '500',
                color: '#343a40',
                marginBottom: '8px'
              }}>
                Filtrar por nome do produto:
              </label>
              <input 
                type="text" 
                value={filtroNome} 
                onChange={e => setFiltroNome(e.target.value)}
                placeholder="Digite o nome do produto"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e9ecef',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontWeight: '500',
                color: '#343a40',
                marginBottom: '8px'
              }}>
                Filtrar por fornecedor:
              </label>
              <input 
                type="text" 
                value={filtroFornecedor} 
                onChange={e => setFiltroFornecedor(e.target.value)}
                placeholder="Digite o nome do fornecedor"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e9ecef',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#343a40',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            Ações do Relatório
          </h3>
          
          <div style={{ 
            display: 'flex', 
            gap: '15px', 
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <button 
              onClick={handleExportCSV} 
              style={{ 
                padding: '12px 24px',
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '25px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#218838';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#28a745';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              📊 Exportar CSV
            </button>
            <button 
              onClick={handleExportPDF} 
              style={{ 
                padding: '12px 24px',
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '25px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(220, 53, 69, 0.3)'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#c82333';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#dc3545';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              📄 Gerar PDF
            </button>
            <button 
              onClick={handlePrint} 
              style={{ 
                padding: '12px 24px',
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '25px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#0056b3';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#007bff';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🖨️ Imprimir
            </button>
          </div>
        </div>

        {/* Lista de Produtos */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#343a40',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Produtos Cadastrados ({filteredProdutos.length} itens)
          </h3>
          
          <div style={{ marginTop: 20 }} ref={relatorioRef}>
            {filteredProdutos.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#6c757d'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '20px'
                }}>
                  📦
                </div>
                <h4 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '10px'
                }}>
                  Nenhum produto encontrado
                </h4>
                <p style={{ fontSize: '1.1rem' }}>
                  Tente ajustar os filtros de busca ou cadastre novos produtos.
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '20px' }}>
                {filteredProdutos.map((produto, idx) => (
                  <div key={produto.id || idx} style={{ 
                    padding: '25px', 
                    border: '2px solid #e9ecef',
                    borderRadius: '15px',
                    backgroundColor: produto.quantidade_estoque <= 5 ? '#fff3cd' : '#d1ecf1',
                    borderColor: produto.quantidade_estoque <= 5 ? '#ffeaa7' : '#b6d7ff',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '15px'
                    }}>
                      <h4 style={{ 
                        margin: 0, 
                        color: '#343a40',
                        fontSize: '1.4rem',
                        fontWeight: 'bold'
                      }}>
                        {produto.nome}
                      </h4>
                      {produto.quantidade_estoque <= 5 && (
                        <span style={{ 
                          backgroundColor: '#f0ad4e',
                          color: '#fff',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}>
                          ⚠️ ESTOQUE BAIXO
                        </span>
                      )}
                    </div>
                    
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                      gap: '15px' 
                    }}>
                      <div style={{
                        padding: '15px',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '10px'
                      }}>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#6c757d' }}>
                          <strong>Preço</strong>
                        </p>
                        <p style={{ 
                          margin: 0, 
                          fontSize: '1.2rem', 
                          fontWeight: 'bold',
                          color: '#28a745'
                        }}>
                          R$ {produto.preco}
                        </p>
                      </div>
                      
                      <div style={{
                        padding: '15px',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '10px'
                      }}>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#6c757d' }}>
                          <strong>Estoque</strong>
                        </p>
                        <p style={{ 
                          margin: 0, 
                          fontSize: '1.2rem', 
                          fontWeight: 'bold',
                          color: produto.quantidade_estoque <= 5 ? '#dc3545' : '#28a745'
                        }}>
                          {produto.quantidade_estoque || 0} unidades
                        </p>
                      </div>
                      
                      <div style={{
                        padding: '15px',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '10px'
                      }}>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#6c757d' }}>
                          <strong>Fornecedor</strong>
                        </p>
                        <p style={{ 
                          margin: 0, 
                          fontSize: '1.1rem', 
                          fontWeight: '500',
                          color: '#343a40'
                        }}>
                          {produto.fornecedor_nome || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <WhatsappIcon />
      </main>
      <Footer />
    </div>
  );
}
export default Associacao;
